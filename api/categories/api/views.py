"""Return response for categories app."""
from categories.models import Categorie
from .serializers import CategoriesSerializer
from rest_framework import generics
from rest_framework.response import Response
from django.db.models import Q


class CategoryListAPIView(generics.ListAPIView):
    """return categories list."""

    def get(self, request, format=None):
        """Call this function if method is post retun category list."""
        cat_type = None
        parent_id = None
        if request.query_params:
            cat_type = request.query_params['cat_type']
            parent_id = request.query_params['parent_id']
        condition = Q(status=True)
        if cat_type is not None:
            condition &= Q(cat_type=cat_type)

        if parent_id and parent_id == 'root':
            condition &= Q(parent=None)

        categories = Categorie.objects.filter(condition)
        serializer = CategoriesSerializer(categories, many=True)
        return Response({
            "status": "success",
            "records": serializer.data
        })
