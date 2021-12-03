"""Return all function for blogs module."""

from rest_framework.response import Response
from rest_framework import generics, permissions
from knox.auth import TokenAuthentication
from django.db.models import Q
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
)
from .serializers import (
    BlogCommentsSerializer,
    BlogSerializer,
)
from blogs.models import (
    Blog,
    UserComment,
)


class BlogListAPIView(generics.ListAPIView):
    """Return blogs list."""

    def get(self, request, *args, **kwargs):
        """Return list when method is get."""
        page = request.query_params.get('page', '')
        limit = request.query_params.get('limit', '')
        category = request.query_params.get('category_id', 0)
        search_text = request.query_params.get('search_text', '')
        most_viewed = request.query_params.get('most_viewed', '')
        user_id = request.query_params.get('user_id', '')
        offset = 0
        order_by = '-created_at'

        conditions = Q(status=True)
        if page:
            offset = (int(page) - 1) * int(limit)

        if category and int(category) > 0:
            conditions &= Q(category=category)

        if search_text:
            conditions &= (
                Q(title__contains=search_text) |
                Q(category__title__contains=search_text) |
                Q(description__contains=search_text)
            )

        if user_id:
            conditions &= Q(owner=user_id)

        if most_viewed:
            order_by = '-no_of_views'

        if limit:
            blogs = Blog.objects.filter(conditions).order_by(
                order_by
            )[offset:offset + int(limit)]
        else:
            blogs = Blog.objects.filter(conditions).order_by(
                order_by
            ).all()
        total_records = Blog.objects.filter(conditions).count()
        serializer = BlogSerializer(blogs, many=True)
        return Response({
            'status': 'success',
            'records': serializer.data,
            'total_records': total_records
        },
            status=HTTP_200_OK
        )


class BlogDetailsAPIView(generics.RetrieveAPIView):
    """Get particular blog queryset."""

    def get_objects(self, slug):
        """Return particular blog query."""
        try:
            return Blog.objects.get(slug=slug)
        except Blog.DoesNotExist:
            return Response({
                'status': 'error',
                'message': 'Not Found'
            },
                status=HTTP_404_NOT_FOUND
            )

    def get(self, request, slug, *args, **kwargs):
        """Return blog details if method is get."""
        blog = self.get_objects(slug)
        serializer = BlogSerializer(blog)
        count = int(blog.no_of_views) + 1
        blog.no_of_views = count
        blog.save()

        return Response({
            'status': 'success',
            'records': serializer.data
        },
            status=HTTP_200_OK
        )


class BlogCommentsAPIView(generics.ListCreateAPIView):
    """Return comment list and add new comment."""

    def get(self, request, *args, **kwargs):
        """Return review list."""
        blog_id = request.query_params.get('blog_id', '')
        page = request.query_params.get('page', '')
        limit = request.query_params.get('limit', '')
        offset = 0
        if page:
            offset = (int(page) - 1) * int(limit)

        conditions = Q(status=True)
        if blog_id:
            conditions &= Q(blog_id=blog_id)

        if limit:
            comments = UserComment.objects.filter(
                conditions
            )[offset:offset + int(limit)]
        else:
            comments = UserComment.objects.filter(
                conditions
            ).all()
        total_records = UserComment.objects.filter(
            conditions
        ).count()
        serializer = BlogCommentsSerializer(comments, many=True)
        return Response({
            'status': 'success',
            'records': serializer.data,
            'total_records': total_records
        },
            status=HTTP_200_OK
        )

    permission_class = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, *args, **kwargs):
        """Return add review response."""
        serializer = BlogCommentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            msg = "Comment added successfully."
            return Response({
                'status': 'success',
                'records': serializer.data,
                'message': msg
            },
                status=HTTP_200_OK
            )
        else:
            return Response({
                'status': 'errors',
                'message': serializer.errors
            },
                status=HTTP_400_BAD_REQUEST
            )
