from graphene_django import DjangoObjectType
import graphene
from todoapp.models import User, Project, TODO


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):

    all_users = graphene.List(UserType)

    # вывод информации для юзера (проекты и todo)
    all_info_for_user = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_info_for_user(root, info):
        try:
            return User.objects.get(pk=id)
        except User.DoesNotExist:
            return None


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        birthday_year = graphene.Int(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, first_name, last_name, birthday_year):
        user = User(first_name=first_name, last_name=last_name, birthday_year=birthday_year)
        user.save()
        return UserCreateMutation(user)


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        birthday_year = graphene.Int(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, id, birthday_year):
        user = User.objects.get(pk=id)
        user.birthday_year = birthday_year
        user.save()
        return UserUpdateMutation(user)


class Mutations(graphene.ObjectType):
    create_user = UserCreateMutation.Field()
    update_user = UserUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
