from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    username = None
    first_name = None
    last_name = None
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.EmailField(_("email address"), unique=True)
    phoneNo = models.CharField(max_length=10)
    password = models.CharField(max_length=500)
    saltSecret = models.CharField(max_length=500, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["firstName", "lastName", "password"]
