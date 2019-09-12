from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'name', 'email', 'webSite', 'logoPath')

    def create(self, validated_data):
        instance = Company.objects.create(**validated_data)
        return instance
