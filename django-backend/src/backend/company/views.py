from django.shortcuts import render
from rest_framework import viewsets, views, status
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from .models import Company
from .serializers import CompanySerializer
import json
import boto3
from botocore.client import Config
from backend.aws.conf import (
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_STORAGE_BUCKET_NAME,
    PUBLIC_URL,
)


class CompanyViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class CompanyLogoUploadView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):

        s3 = boto3.resource(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            config=Config(signature_version="s3v4"),
        )

        if not request.data:
            return HttpResponse({"Error": "Please add the logo"}, status="400")

        data = request.data["logo"]
        fileName = request.data["fileName"]
        companyId = request.data["companyId"]
        logoPath = "profile-pictures/" + companyId + "/" + fileName

        s3.Bucket(AWS_STORAGE_BUCKET_NAME).put_object(
            Key=logoPath, Body=data, ACL="public-read"
        )
        return self.update_logo_path(companyId, logoPath)

    def update_logo_path(self, companyId, logoPath):

        try:
            company = Company.objects.get(id=companyId)
        except Company.DoesNotExist:
            return HttpResponse(
                json.dumps({"Error": "Invalid Company"}),
                status=400,
                content_type="application/json",
            )
        if company:
            company.logoPath = logoPath
            company.save()
            return HttpResponse(
                json.dumps({"Success": "Successfully uploaded"}),
                status=200,
                content_type="application/json",
            )


class CompanyLogoDownloadView(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        companyId = request.parser_context["kwargs"]["companyId"]
        c_id = int(companyId)
        try:
            company = Company.objects.get(id=c_id)
        except Company.DoesNotExist:
            return HttpResponse(
                json.dumps({"Error": "Invalid Company"}),
                status=400,
                content_type="application/json",
            )
        if company:
            logoPath = company.logoPath
            if logoPath:
                URL = PUBLIC_URL + logoPath
                return HttpResponse(
                    json.dumps({"Success": "Successfully generated url", "url": URL}),
                    status=200,
                    content_type="application/json",
                )
            else:
                return HttpResponse(
                    json.dumps({"Success": "Logo was not uploaded"}),
                    status=200,
                    content_type="application/json",
                )

