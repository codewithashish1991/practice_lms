"""Return all function for course module."""
from categories.models import Categorie
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.auth import TokenAuthentication
from django.db.models import Q
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
)
from courses.models import (
    Course,
    CourseEnrollUser,
    CourseUserReview,
    CourseUserWishList,
)
from .serializers import (
    CourseEnrollUserSerializers,
    CourseSerializers,
    CourseUserReviewSerializers,
    CourseUserWishListSerializers,
)


class CourseListAPIView(generics.ListAPIView):
    """Return course list."""

    def get_sub_cat(self, cat_id):
        """Return course list."""
        sarr = []
        subcat = Categorie.objects.select_related('parent').filter(
            parent=cat_id
        ).all()
        if subcat.exists():
            for sc in subcat:
                res = self.get_sub_cat(sc.category_id)
                sarr.append(sc.category_id)
                if res:
                    for re in res:
                        sarr.append(re)
        if sarr:
            return sarr
        else:
            return ''

    def get(self, request, *args, **kwargs):
        """Call this function if method is get retun course list."""
        search_query = request.query_params.get('query', '')
        category_slug = request.query_params.get('category_slug', '')
        featured = request.query_params.get('featured', '')
        user_id = request.query_params.get('userId', '')
        account_id = request.query_params.get('user_id', '')
        my_course = request.query_params.get('my_course', '')
        limit = request.query_params.get('limit', '')
        page = request.query_params.get('page', '')
        wishlist = request.query_params.get('wishlist', '')
        offset = 0
        category_name = ''
        if page:
            offset = (int(page) - 1) * int(limit)
        conditions = Q(status=True)
        if featured:
            conditions &= Q(featured=True)
        if category_slug:
            cat = Categorie.objects.get(slug=category_slug)
            category_name = cat.title
            sub_cat = self.get_sub_cat(cat.category_id)
            if sub_cat:
                sub_cat.append(cat.category_id)
            else:
                sub_cat = [cat.category_id]

            conditions &= Q(category_id__in=sub_cat)
        if my_course:
            enrolluser = CourseEnrollUser.objects.filter(
                users=account_id
            ).all()
            fil_course_id = []
            for eu in enrolluser:
                fil_course_id.append(eu.course.course_id)
            conditions &= Q(pk__in=fil_course_id)

        if wishlist:
            wlist = CourseUserWishList.objects.filter(
                user=account_id
            ).all()
            wl_course_id = []
            for wl in wlist:
                wl_course_id.append(wl.course.course_id)
            conditions &= Q(pk__in=wl_course_id)

        if search_query:
            conditions &= (
                Q(title__contains=search_query) |
                Q(slug__contains=search_query) |
                Q(description__contains=search_query) |
                Q(category__title__contains=search_query)
            )

        if limit:
            courses = Course.objects.filter(conditions).order_by(
                '-created_at'
            )[offset:offset + int(limit)]
        else:
            courses = Course.objects.filter(conditions)
        total_records = Course.objects.filter(conditions).count()
        serializer = CourseSerializers(
            courses,
            many=True,
            context={'user_id': user_id}
        )
        return Response({
            'status': 'success',
            'records': serializer.data,
            'total_records': total_records,
            'category_name': category_name
        })


class CourseDetailsAPIView(generics.RetrieveAPIView):
    """Return course's details."""

    def get_objects(self, slug):
        """Get particular course queryset."""
        try:
            return Course.objects.get(slug=slug)
        except Course.DoesNotExist:
            return Response({
                'status': 'errors',
                'message': 'Not Found'
            },
                status=HTTP_404_NOT_FOUND
            )

    def get(self, request, slug, *args, **kwargs):
        """Return course details."""
        course = self.get_objects(slug)
        user_id = request.query_params.get('userId', '')

        serializer = CourseSerializers(
            course,
            context={'user_id': user_id}
        )
        return Response({
            'status': 'success',
            'records': serializer.data
        },
            status=HTTP_200_OK
        )


class CourseReviewsAPIView(generics.ListCreateAPIView):
    """Return review list and add new reviews."""

    def get(self, request, *args, **kwargs):
        """Return review list."""
        course_id = request.query_params.get('course_id', '')
        conditions = Q(status=True)
        if course_id:
            conditions &= Q(course_id=course_id)
        reviews = CourseUserReview.objects.filter(conditions)
        serializer = CourseUserReviewSerializers(reviews, many=True)
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
            course=request.data.get('course')
        ) & Q(
            user=request.data.get('user')
        ))
        if CourseUserReview.objects.filter(condition).exists():
            review = CourseUserReview.objects.get(condition)
            serializer = CourseUserReviewSerializers(review, data=request.data)
        else:
            serializer = CourseUserReviewSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            msg = '''Comment added successfully.
            Your comment is pendding for administration
            approval.
            Once our administration approved your comment
            You will be able to show it on course's review list.'''
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


class CourseEnrollUsersAPIView(generics.CreateAPIView):
    """Add users in course."""

    permission_class = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        """Return add user response."""
        condition = (Q(
            course=request.data.get('course')
        ) & Q(
            users=request.data.get('users')
        ))
        if CourseEnrollUser.objects.filter(condition).exists():
            enroll_user = CourseEnrollUser.objects.get(condition)
            serializer = CourseEnrollUserSerializers(
                enroll_user,
                data=request.data
            )
        else:
            serializer = CourseEnrollUserSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            msg = '''Your enrollment request submitted successfully.
            We will be contact you as soon as possible
            for purchase proccess.'''
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


class CourseUserWishListAPIView(generics.CreateAPIView):
    """Add users in course."""

    permission_class = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        """Return add user response."""
        condition = (Q(
            course=request.data.get('course')
        ) & Q(
            user=request.data.get('user')
        ))
        if CourseUserWishList.objects.filter(condition).exists():
            wishlist = CourseUserWishList.objects.get(condition)
            wishlist.delete()
            added = 'removed from'
        else:
            serializer = CourseUserWishListSerializers(data=request.data)
            if serializer.is_valid():
                serializer.save()
                added = 'added in'
            else:
                return Response({
                    'status': 'errors',
                    'errors': serializer.errors
                },
                    status=HTTP_400_BAD_REQUEST
                )
        msg = "Course " + added + " your wishlist successfully."
        return Response({
            'status': 'success',
            'message': msg
        },
            status=HTTP_200_OK
        )
