from rest_framework.viewsets import ModelViewSet
from .models import Project, TODO
from backend.todoapp.serializers import ProjectSerializer, TODOSerializer
from rest_framework.pagination import LimitOffsetPagination


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TODOViewSet(ModelViewSet):
    serializer_class = TODOSerializer
    queryset = TODO.objects.all()
    filterset_fields = ['project']
    pagination_class = TODOLimitOffsetPagination

    def delete(self):
        instance = self.get_object()
        instance.is_active = False
        instance.save()


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filterset_fields = ['name']
    pagination_class = ProjectLimitOffsetPagination
