from rest_framework.viewsets import ModelViewSet
from .models import Project, TODO
from backend.todoapp.serializers import ProjectSerializer, TODOSerializer
from rest_framework.pagination import LimitOffsetPagination


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 1


class TODOViewSet(ModelViewSet):
    serializer_class = TODOSerializer
    queryset = TODO.objects.all()
    pagination_class = TODOLimitOffsetPagination


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 1


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filterset_fields = ['name']
    pagination_class = ProjectLimitOffsetPagination
