"""Return response for accouunt app."""
from django.db.models import Q
from rest_framework import generics
from rest_framework.response import Response

# from knox.models import AuthToken
from rest_framework.status import (
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from .serializers import (
    BlocksOrContentSerializer,
    SliderSerializer
)
from contents.models import (
    BlocksOrContent,
    Slider
)


class ContentListAPIView(generics.ListAPIView):
    """Return content list."""

    def get(self, request, *args, **kwargs):
        """Call this function if method is get retun content list."""
        content_type = request.query_params.get('content_type', '')
        condition = Q(status=True)
        if content_type:
            condition = Q(content_type=content_type)

        contents = BlocksOrContent.objects.filter(
            condition
        ).order_by('title').all()
        serializer = BlocksOrContentSerializer(
            contents,
            many=True
        )
        return Response({
            'status': 'success',
            'records': serializer.data
        })


class ContentDetailsAPIView(generics.RetrieveUpdateAPIView):
    """Return call this function return content details."""

    def get_objects(self, pk):
        """Return particular object."""
        try:
            return BlocksOrContent.objects.get(pk=int(pk))
        except BlocksOrContent.DoesNotExist:
            return Response({
                "status": "error",
                "errors": "Not Found"
            },
                status=HTTP_404_NOT_FOUND
            )

    def get(self, request, pk, format=None):
        """Return call this function when method is post."""
        output = {}
        content = self.get_objects(pk)
        serializer = BlocksOrContentSerializer(content)
        if serializer.data:
            output['status'] = "success"
            output['records'] = serializer.data
            return Response(output, status=HTTP_200_OK)


class SliderListAPIView(generics.ListAPIView):
    """Return slider list."""

    def get(self, request, *args, **kwargs):
        """Call this function if method is get retun content list."""
        content_id = request.query_params.get('content_id', 0)
        condition = Q(status=True)
        if int(content_id) > 0:
            condition &= Q(content_id=int(content_id))

        sliders = Slider.objects.filter(
            condition
        ).all()
        serializer = SliderSerializer(
            sliders,
            many=True
        )
        return Response({
            'status': 'success',
            'records': serializer.data
        })
