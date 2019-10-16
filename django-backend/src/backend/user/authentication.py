from rest_framework.authentication import get_authorization_header, BaseAuthentication
from rest_framework import exceptions
from django.http import HttpResponse
from .models import User
import jwt, json
from jwt import InvalidTokenError, DecodeError, InvalidSignatureError
from django.utils.translation import ugettext_lazy as _

from rest_framework import HTTP_HEADER_ENCODING, exceptions
import base64
import binascii

JWT_SECRET = "SECRET_KEY"


class TokenAuthentication(BaseAuthentication):
    keyword = "Token"
    model = None

    def get_model(self):
        return User

    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if len(auth) == 1:
            msg = _("Invalid token header. No credentials provided.")
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _("Invalid token header. Token string should not contain spaces.")
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = auth[1].decode()
        except UnicodeError:
            msg = _(
                "Invalid token header. Token string should not contain invalid characters."
            )
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)

    # def authenticate(self, request):
    #     auth = get_authorization_header(request).split()
    #     if not auth or auth[0].lower() != b"token":
    #         return None

    #     if len(auth) == 1:
    #         msg = "Invalid token header. No credentials provided."
    #         raise exceptions.AuthenticationFailed(msg)
    #     elif len(auth) > 2:
    #         msg = "Invalid token header"
    #         raise exceptions.AuthenticationFailed(msg)

    #     try:
    #         token = auth[1]
    #         if token == "null":
    #             msg = "Null token not allowed"
    #             raise exceptions.AuthenticationFailed(msg)
    #     except UnicodeError:
    #         msg = "Invalid token header. Token string should not contain invalid characters."
    #         raise exceptions.AuthenticationFailed(msg)

    #     return self.authenticate_credentials(token)

    def authenticate_credentials(self, token):
        model = self.get_model()
        try:
            payload = jwt.decode(token, JWT_SECRET)
            email = payload["email"]
            userid = payload["id"]
            # msg = {"Error": "Token mismatch", "status": "401"}

            user = model.objects.get(email=email, id=userid)
            print(user)

            # if not user.token["token"] == token:
            #     raise exceptions.AuthenticationFailed(msg)

        except InvalidSignatureError:
            return HttpResponse({"Error": "Token is invalid"}, status="403")
        except DecodeError:
            return HttpResponse({"Error": "Token is invalid"}, status="403")
        except InvalidTokenError:
            return HttpResponse({"Error": "Token is invalid"}, status="403")
        except User.DoesNotExist:
            return HttpResponse({"Error": "Internal server error"}, status="500")

        return (user, token)

    def authenticate_header(self, request):
        return "Token"
