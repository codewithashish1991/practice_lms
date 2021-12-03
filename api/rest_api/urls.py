"""rest_api URL Configuration.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.index, name='first_page'),
    path('jet/', include('jet.urls', 'jet')),
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path('myadmin/', admin.site.urls),
    path('accounts/profile/', views.ApiRoot.as_view(), name='myaccount'),
    path('api/v1/', views.ApiRoot.as_view(), name='myaccount'),
    path('api/auth/', include('rest_framework.urls')),
    path('api/v1/accounts/', include('accounts.api.urls'), name="accounts"),
    path('api/v1/crm/', include('crm.api.urls'), name="crm"),
    path('api/v1/events/', include('events.api.urls'), name="events"),
    path('api/v1/contents/', include('contents.api.urls'), name="contents"),
    path(
        'api/v1/categories/',
        include('categories.api.urls'),
        name="categories"
    ),
    path(
        'api/v1/courses/',
        include('courses.api.urls'),
        name="course"
    ),
    path(
        'api/v1/blogs/',
        include('blogs.api.urls'),
        name="blogs"
    ),
    path('ckeditor/', include('ckeditor_uploader.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
