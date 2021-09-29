from rest_framework.serializers import ModelSerializer
from .models import Project, TODO
from ..userapp.serializers import UserSerializer


class ProjectSerializer(ModelSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TODOSerializer(ModelSerializer):

    class Meta:
        model = TODO
        fields = '__all__'
