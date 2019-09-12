from django.conf.urls import url
from rest_framework import routers
from .views import CompanyViewSet, CompanyLogoUploadView, CompanyLogoDownloadView

router = routers.DefaultRouter()
router.register(r"company", CompanyViewSet)

# urlpatterns = router.urls

urlpatterns = [
    url(
        r"^companylogo/(?P<companyId>\d+)/$",
        CompanyLogoUploadView.as_view(),
        name="company-logo-upload",
    ),
    url(
        r"^companylogodownload/(?P<companyId>\d+)/$",
        CompanyLogoDownloadView.as_view(),
        name="company-logo-download",
    ),
]

urlpatterns += router.urls
