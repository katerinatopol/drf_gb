import django_filters
from django_filters import rest_framework as filters
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Project, TODO
from .serializers import ProjectSerializer, TODOSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.generics import DestroyAPIView


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TODOFilter(filters.FilterSet):
    timestamp_gte = django_filters.DateTimeFilter(name="date_create", lookup_expr='gte')

    class Meta:
        model = TODO
        fields = ['project', 'text', 'date_create', 'timestamp_gte']


class TODOViewSet(ModelViewSet):
    serializer_class = TODOSerializer
    queryset = TODO.objects.all()
    pagination_class = TODOLimitOffsetPagination

    def get_queryset(self):
        name = self.kwargs['project']
        return TODO.objects.filter(name__contains=name)

    def perform_destroy(self):
        instance = self.get_object()
        instance.is_active = False
        instance.save()


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        name = self.kwargs['name']
        return Project.objects.filter(name__contains=name)


