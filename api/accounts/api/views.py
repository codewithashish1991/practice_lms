"""Return response for accouunt app."""
import os
import secrets
from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.db.models import Q
from django.template import loader
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import generics, permissions
from rest_framework.response import Response

# from knox.models import AuthToken
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from .serializers import (
    ForgotPasswordSerializer,
    LoginSerializer,
    ProfileSerializer,
    RegisterSerializer,
    UserResetPasswordSerializer,
    UserReviewSerializers,
)
from accounts.models import Profile, UserToken, Review


class UserRegisterAPIView(generics.CreateAPIView):
    """Return reponse when user register."""

    permission_class = []
    authentication_classes = []
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        """Return call this function when method is post."""
        output = {}
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        password = request.data.get('password')
        email = request.data.get('email')
        username = request.data.get('username')
        if request.data and username and email and first_name and password:
            condition = (
                Q(username=request.data.get('username')) |
                Q(email=request.data.get('email'))
            )
            if User.objects.filter(condition).exists():
                return Response({
                    'status': 'error',
                    'message': 'Username or Email Address already exist!'
                },
                    status=HTTP_400_BAD_REQUEST
                )
            form = self.get_serializer(
                data={
                    'username': username,
                    'email': email,
                    'first_name': first_name,
                    'last_name': last_name,
                    'password': password
                },
                partial=True
            )
            if not form.is_valid():
                message = form.errors
                return Response(
                    {
                        "status": "error",
                        "message": message
                    },
                    status=HTTP_400_BAD_REQUEST
                )
            else:
                user = form.save()
                if user is not None:
                    output['status'] = 'success'

                    if request.data.get('groups_id'):
                        user.groups.set([request.data.get('groups_id')])
                    else:
                        user.groups.set([settings.FRONT_GROUPS_ID])

                    profile = Profile(
                        users=user
                    )
                    profile.save()
                    output['records'] = form.data
                    print(output)
                    return Response(
                        output,
                        status=HTTP_200_OK
                    )
                else:
                    return Response({
                        'status': 'error',
                        'message': 'Something went wrong.'
                    },
                        status=HTTP_400_BAD_REQUEST
                    )
        else:
            return Response({
                'status': 'error',
                'message': 'Invalid/Empty request'
            },
                status=HTTP_400_BAD_REQUEST
            )


class UserLoginAPIView(generics.RetrieveAPIView):
    """Return call this function when user try to login."""

    permission_class = []
    authentication_classes = []
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        """Return call this function when method is post."""
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            message = serializer.errors
            return Response(
                {
                    "status": "error",
                    "message": message
                },
                status=HTTP_400_BAD_REQUEST
            )
        else:
            user = serializer.validated_data
            return Response({
                "status": "success",
                "user": RegisterSerializer(
                    user,
                    context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1]
            })


class ChangePasswordAPIView(generics.UpdateAPIView):
    """Return call this function when user try to login."""

    permission_class = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = UserResetPasswordSerializer

    def get_objects(self, pk):
        """Return particular object."""
        try:
            return User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response({
                'status': "error",
                'errors': 'Not Found'
            },
                status=HTTP_404_NOT_FOUND
            )

    def post(self, request, format=None):
        """Return call this function when method is post."""
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            message = serializer.errors
            return Response(
                {
                    "status": "errors",
                    "message": message,
                    "user": serializer.data
                },
                status=HTTP_400_BAD_REQUEST
            )
        else:
            user_id = request.user.id
            user = self.get_objects(user_id)
            if not user.check_password(serializer.data.get('old_password')):
                return Response({
                    'status': 'errors',
                    'message': 'Wrong old password. Please try again.'
                },
                    status=HTTP_400_BAD_REQUEST
                )
            else:
                user.set_password(serializer.data.get('new_password'))
                user.save()
                return Response({
                    "status": "success",
                    "message": "Password updated successfully."
                },
                    status=HTTP_200_OK
                )


class UserDetailsAPIView(generics.RetrieveUpdateAPIView):
    """Return call this function return user or update."""

    serializer_class = RegisterSerializer

    def get_objects(self, pk):
        """Return particular object."""
        try:
            return Profile.objects.get(users=pk)
        except Profile.DoesNotExist:
            return Response({
                "status": "error",
                "errors": "Not Found"
            },
                status=HTTP_404_NOT_FOUND
            )

    def post(self, request, pk, format=None):
        """Return call this function when method is post."""
        output = {}
        profile = self.get_objects(pk)
        serializer = ProfileSerializer(profile)
        if serializer.data:
            output['status'] = "success"
            output['records'] = serializer.data
            return Response(output, status=HTTP_200_OK)

    permission_class = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def put(self, request, format=None):
        """Return call this function when method is put."""
        pk = request.data.get('users_id')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        username = request.data.get('username')
        profile = self.get_objects(pk)
        if request.FILES and profile.profile_img:
            try:
                os.remove(settings.BASE_DIR + profile.profile_img.url)
            except Exception:
                pass

        serializer = ProfileSerializer(profile, data=request.data)
        if not serializer.is_valid():
            message = serializer.errors
            return Response(
                {
                    "status": "error",
                    "message": message
                },
                status=HTTP_400_BAD_REQUEST
            )
        else:
            serializer.save()
            user = User.objects.filter(id=pk).first()
            user.first_name = first_name
            user.last_name = last_name
            user.username = username
            user.email = email
            user.save()
            return Response({
                'status': "success",
                'record': serializer.data
            })


class ForgotPasswordAPIView(generics.CreateAPIView):
    """Return reponse when user forgot his/her password."""

    def get_objects(self, token):
        """Return particular object."""
        try:
            return UserToken.objects.filter(token=token)
        except Exception:
            return Response({
                "status": "error",
                "errors": "Invalid Token"
            },
                status=HTTP_400_BAD_REQUEST
            )

    def get(self, request, token, format=None):
        """Return call this function when method is get."""
        token_verify = self.get_objects(token)
        serializer = ForgotPasswordSerializer(token_verify, many=True)
        if serializer.data:
            return Response({
                "status": "success",
                "records": serializer.data
            },
                status=HTTP_200_OK
            )
        else:
            return Response({
                'status': "errors",
                'records': "Invalid Token"
            },
                status=HTTP_400_BAD_REQUEST
            )

    def put(self, request, format=None):
        """Return call this function when method is put."""
        password = request.data.get('password')
        token = request.data.get('token')
        result = self.get_objects(token)
        token_data = result.first()
        if result is None:
            return Response({
                'status': "errors",
                'records': "Invalid Token"
            },
                status=HTTP_400_BAD_REQUEST
            )
        else:
            pk = token_data.user.id
            token_data.delete()
            user = User.objects.filter(id=pk).first()
            user.set_password(password)
            user.save()
            return Response({
                'status': "success",
                'records': "Password changed successfully."
            },
                status=HTTP_200_OK
            )

    def post(self, request, *args, **kwargs):
        """Return call this function when method is post."""
        email = request.data.get('email')
        token = secrets.token_hex(16)
        token_type = 'forgot_password'
        user = User.objects.filter(email=email).first()
        token_verified = False
        if user is None:
            msg = 'Email address not found. Please try again with another one.'
            return Response({
                'status': 'errors',
                'message': msg
            },
                status=HTTP_400_BAD_REQUEST
            )
        else:
            serializer = ForgotPasswordSerializer(data={
                'token': token,
                'user': user.id,
                'token_type': token_type,
                'email': email,
                'token_verified': token_verified
            },
                partial=True
            )
            if not serializer.is_valid():
                message = serializer.errors
                return Response(
                    {
                        "status": "error",
                        "message": message
                    },
                    status=HTTP_400_BAD_REQUEST
                )
            else:
                subject = "Forgot Password."
                from_email = "wtit786@gmail.com"
                param = {
                    "email": email,
                    "verify_token": token
                }
                html_message = loader.render_to_string(
                    'forgot_password.html',
                    param
                )
                try:
                    send_mail(
                        subject,
                        '',
                        from_email,
                        [email],
                        fail_silently=False,
                        html_message=html_message
                    )
                except Exception:
                    pass
                serializer.save()
                msg = 'Verification link sent to your email address.'
                msg = msg + 'Plase check your email.'
                return Response({
                    'status': "success",
                    'message': msg
                },
                    status=HTTP_200_OK
                )


class UserReviewsAPIView(generics.ListCreateAPIView):
    """Return review list and add new reviews."""

    def get(self, request, *args, **kwargs):
        """Return review list."""
        users = request.query_params.get('users', '')
        conditions = Q(status=True)
        if users:
            conditions &= Q(users=users)
        reviews = Review.objects.filter(conditions)
        serializer = UserReviewSerializers(reviews, many=True)
        return Response({
            'status': 'success',
            'records': serializer.data
        },
            status=HTTP_200_OK
        )

    permission_class = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        """Return add review response."""
        condition = (Q(
            reviewers=request.data.get('reviewers')
        ) & Q(
            users=request.data.get('users')
        ))
        if Review.objects.filter(condition).exists():
            review = Review.objects.get(condition)
            serializer = UserReviewSerializers(review, data=request.data)
        else:
            serializer = UserReviewSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            msg = '''Comment added successfully.
            Your comment is pendding for administration
            approval.
            Once our administration approved your comment
            You will be able to show it on user profile's review list.'''
            return Response({
                'status': 'success',
                'message': msg
            },
                status=HTTP_200_OK
            )
        else:
            return Response({
                'status': 'errors',
                'errors': serializer.errors
            },
                status=HTTP_400_BAD_REQUEST
            )


class UserListAPIView(generics.ListAPIView):
    """Return users list."""

    def get(self, request, *args, **kwargs):
        """Call this function if method is get retun course list."""
        our_team = request.query_params.get('ourTeam', '')
        limit = request.query_params.get('limit', '')
        page = request.query_params.get('page', '')
        offset = 0
        if page:
            offset = (int(page) - 1) * int(limit)
        if our_team:
            if limit:
                users = Profile.objects.exclude(
                    users__groups__id=3
                )[offset:offset + int(limit)]
            else:
                users = Profile.objects.exclude(
                    users__groups__id=3
                ).order_by('users_id')
            total_records = Profile.objects.exclude(
                users__groups__id=3
            ).count()
        else:
            users = Profile.objects.order_by('users_id')
            total_records = Profile.objects.count()

        serializer = ProfileSerializer(
            users,
            many=True
        )
        return Response({
            'status': 'success',
            'records': serializer.data,
            'total_records': total_records
        })
