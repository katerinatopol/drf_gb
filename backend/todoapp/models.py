from django.db import models
from userapp.models import User


class Project(models.Model):
    name = models.CharField(
        max_length=64,
        unique=True,
    )
    repository = models.URLField(
        blank=True,
    )
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class TODO(models.Model):
    project = models.OneToOneField(
        Project,
        on_delete=models.CASCADE,
    )
    text = models.CharField(
        max_length=64,
    )
    date_create = models.DateTimeField(
        auto_now_add=True,
    )
    data_update = models.DateTimeField(
        auto_now=True,
    )

    author = models.ManyToManyField(
        User,

    )
    is_active = models.BooleanField(
        default=True,
    )

    def __str__(self):
        return self.text
