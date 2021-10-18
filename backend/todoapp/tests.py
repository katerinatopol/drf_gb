from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient, APITestCase, APISimpleTestCase, APIRequestFactory, force_authenticate

from todoapp.models import TODO
from userapp.models import User

from django.contrib.auth.models import User
from mixer.backend.django import mixer


class MixerTestCase(APITestCase):

    def test_todo_list(self):
        for i in range(100):
            mixer.blend(TODO, project__name='Test')


# APIClient
class TODOTestCase(APIClient):

    def test_user_post(self):
        User.objects.create_superuser('Supertest', 'super@test.com', 'qwerty')
        client = APIClient()
        client.login(username='Supertest', password='qwerty')

        res = client.post('/api/todos/', {
            'project': 1,
            'text': 'test-text'})
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        todo = TODO.objects.get(id=res.data['id'])
        self.assertEqual(todo.text, 'test-text')
