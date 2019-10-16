from django.conf.urls import url
from rest_framework import routers
from .views import EmployeeRUDview, EmployeeAPIview, EmployeeRetrieveview

# from .views import EmployeeViewSet

# router = routers.DefaultRouter()
# router.register(r'employee', EmployeeViewSet)
# urlpatterns = router.urls

urlpatterns = [
    url(r"^$", EmployeeAPIview.as_view(), name="employee-create"),
    url(r"^(?P<pk>\d+)/$", EmployeeRUDview.as_view(), name="employee-rud"),
    url(
        r"^company/(?P<companyId>\d+)/$",
        EmployeeRetrieveview.as_view(),
        name="employee-retrieve",
    ),
]
