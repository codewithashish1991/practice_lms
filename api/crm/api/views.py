"""Return all function for crm module."""
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST
)

from .serializers import (
    CareerSerializer,
    ContactSerializer
)


class ContactAPIView(generics.CreateAPIView):
    """Add contact details."""

    def post(self, request, *args, **kwargs):
        """Return add user response."""
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            msg = '''Contact submitted successfully.'''
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


class CarrerAPIView(generics.CreateAPIView):
    """Add contact details."""

    def post(self, request, *args, **kwargs):
        """Return add user response."""
        serializer = CareerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            msg = '''Career submitted successfully.'''
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
