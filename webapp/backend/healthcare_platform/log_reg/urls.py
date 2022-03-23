from django.urls import path, include
# from .views import edit, dashboard, register
from . import views
from .views import ProfileAPI
from django.urls import reverse_lazy
from django.contrib.auth.views import (LoginView, LogoutView, PasswordResetDoneView, PasswordResetView,
                                       PasswordResetCompleteView, PasswordResetConfirmView,
                                       PasswordChangeView, PasswordChangeDoneView,
                                       PasswordResetDoneView)

from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'User', views.UserView, 'user')


urlpatterns = [
    # path('api/', include(router.urls)),
    path('get/all_users', views.user_list),  # working
    path('get/users/<int:pk>', views.user_detail),  # working
    path('login', views.login_view),  # working
    path('register', views.Register_Users),  # working
    path('api/users/doctors', views.doctor_list),  # not working
    path('api/users/userprofile', views.user_profile),  # not working
    path('users/<user_id>/profile', ProfileAPI.as_view()),  # not working

]
