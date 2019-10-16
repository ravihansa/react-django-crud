from django.conf.urls import url
from rest_framework import routers
from .views import UserRegisterView, UserLoginView


urlpatterns = [
    url(r"^register/$", UserRegisterView.as_view(), name="user-register"),
    url(r"^login/$", UserLoginView.as_view(), name="user-login"),
    # url(r"^(?P<pk>\d+)/$", EmployeeRUDview.as_view(), name="employee-rud"),
    # url(
    #     r"^company/(?P<companyId>\d+)/$",
    #     EmployeeRetrieveview.as_view(),
    #     name="employee-retrieve",
    # ),
]
