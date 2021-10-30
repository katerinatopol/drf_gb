"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.urls import path, include, re_path
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.views.generic import TemplateView
from todoapp.views import TODOViewSet, ProjectViewSet
from userapp.views import UserViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from graphene_django.views import GraphQLView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


router = DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('todos', TODOViewSet)
router.register('projects', ProjectViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='Users',
        default_version='v2',
        description='description'
    ),
    public=True,
    permission_classes=[AllowAny]
)


class GraphQLView:
    pass


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/', include(router.urls)),
    # path('filters/kwargs/<str:name>/', TODOViewSet.as_view()),
    # path('filters/kwargs/<str:name>/', ProjectViewSet.as_view())

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui()),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('', TemplateView.as_view(template_name='index.html'))
]
