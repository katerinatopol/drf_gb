from django.urls import path
from .views import UserViewSet

app_name = 'userapp'

urlpatterns = [
    path('', UserViewSet.as_view({'get': 'list'}))
]
