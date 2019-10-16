from rest_framework import serializers
from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ("id", "companyId", "firstName", "lastName", "email", "phoneNo")

    def create(self, validated_data):
        instance = Employee.objects.create(**validated_data)
        return instance
