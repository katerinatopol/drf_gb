from rest_framework import mixins, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer, UserSerializerV2
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions, BasePermission


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 1


class UserViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):

    # permission_classes = [DjangoModelPermissions]
    # serializer_class = UserSerializer
    queryset = User.objects.all()
    filterset_fields = ['username']
    pagination_class = UserLimitOffsetPagination
    # renderer_classes = [JSONRenderer]

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserSerializerV2
        return UserSerializer

