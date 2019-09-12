from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=200)
    webSite = models.CharField(max_length=100)
    logoPath = models.CharField(max_length=200, null=True, blank=True)
