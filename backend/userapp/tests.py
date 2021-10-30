from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient, APITestCase, APISimpleTestCase, APIRequestFactory, force_authenticate
from userapp.models import User
from .views import UserViewSet
from django.contrib.auth.models import User, AbstractUser
from mixer.backend.django import mixer


# mixer
class MixerTestCase(APITestCase):

    def test_user_list(self):
        for i in range(100):
            mixer.blend(User, project=1)


# APITestCase
class UserTestCase(APITestCase):

    def setUp(self):
        self.admin = User.objects.create_superuser('Supertest', 'super@test.com', 'qwerty')
        self.client.login(username='Supertest', password='qwerty')

    def test_user_list(self):
        User.objects.create(first_name='Ivan', last_name='Ivanov', email='ivan@ivan.ru')
        res = self.client.get('/api/users/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.client.logout()
        res = self.client.get('/api/authors/')
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_post(self):
        res = self.client.post('/api/users/', {
            'first_name': 'Ivan',
            'last_name': 'Ivanov',
            'email': 'ivan@ivan.ru'})
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(id=res.data['id'])
        self.assertEqual(user.last_name, 'Ivanov')

    # APIRequestFactory
    def test_factory(self):
        factory = APIRequestFactory()
        view = UserViewSet.as_view({'get': 'list'})
        request = factory.get('/api/authors/')
        res = view(request)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

        request = factory.get('/api/authors/')
        force_authenticate(request, self.admin)
        res = view(request)
        self.assertEqual(res.status_code, status.HTTP_200_OK)


# class FuncTest(APISimpleTestCase):
#
#     def test_func(self):
#         self.assertTrue(True)
