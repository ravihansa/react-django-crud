from django.db import models
from backend.company.models import Company


class Employee(models.Model):
    companyId = models.ForeignKey(
        Company, related_name="employee", on_delete=models.CASCADE
    )
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.CharField(max_length=200)
    phoneNo = models.CharField(max_length=10)
