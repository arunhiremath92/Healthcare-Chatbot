from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('platform_health.urls')),
    path('admin/', admin.site.urls),
    path("login/", include("log_reg.urls")),
]
