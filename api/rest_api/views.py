"""Return the function for application root."""
import json
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.reverse import reverse
from rest_framework.response import Response


def index(request):
    """Will be soure you that your api is running."""
    return HttpResponse(
        json.dumps(
            {
                'result': 'Ok',
                'status': 'Working...'
            }
        )
    )


class ApiRoot(APIView):
    """Return root urls."""

    def get(self, request, format=None):
        """Will be work as root for api interface."""
        return Response({
            'Users': reverse(
                'our_team',
                request=request,
                format=format
            ),
            'Categories': reverse(
                'category_list',
                request=request,
                format=format
            ),
            'Courses': reverse(
                'course_list',
                request=request,
                format=format
            ),
            'Events': reverse(
                'event_list',
                request=request,
                format=format
            ),
            'Blogs': reverse(
                'blogs_list',
                request=request,
                format=format
            ),
            'Blocks & Contents': reverse(
                'content_list',
                request=request,
                format=format
            ),
            'Sliders': reverse(
                'sliders',
                request=request,
                format=format
            )
        })
