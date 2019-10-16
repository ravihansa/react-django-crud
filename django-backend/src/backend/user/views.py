from django.shortcuts import render
from rest_framework import generics, mixins, views, status, exceptions
from rest_framework.response import Response
from django.http import HttpResponse
from datetime import datetime, timedelta
from .serializers import UserSerializer
from .models import User
import jwt, json
import bcrypt
import ast

JWT_SECRET = "SECRET_KEY"
JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA_SECONDS = 3600


class UserRegisterView(generics.CreateAPIView):
    lookup_field = "pk"
    serializer_class = UserSerializer
    # queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserLoginView(views.APIView):
    def post(self, request, *args, **kwargs):
        if not request.data:
            return Response(
                {"Error": "Please provide your email and password"}, status="400"
            )

        email = request.data["email"]
        password = request.data["password"].encode("utf8")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return HttpResponse(
                json.dumps({"Error": "Invalid email"}),
                status=400,
                content_type="application/json",
            )
        if user:
            usrPassword = ast.literal_eval(user.password)
            # salt = ast.literal_eval(user.saltSecret)
            # hashPassword = bcrypt.hashpw(password, salt)

            # if usrPassword == hashPassword:
            if bcrypt.checkpw(password, usrPassword):
                payload = {
                    "id": user.id,
                    "email": user.email,
                    "exp": datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS),
                }
                # jwt_token = {
                #     "token": (jwt.encode(payload, "SECRET_KEY")).decode("utf-8")
                # }
                # return json_response({"token": jwt_token.decode("utf-8")})
                jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
                return HttpResponse(
                    json.dumps({"token": jwt_token.decode("utf-8")}),
                    status=200,
                    content_type="application/json",
                )
            else:
                return HttpResponse(
                    json.dumps({"Error": "Invalid passowrd"}),
                    status=400,
                    content_type="application/json",
                )

