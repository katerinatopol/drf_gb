from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 1


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filterset_fields = ['username']
    pagination_class = UserLimitOffsetPagination
