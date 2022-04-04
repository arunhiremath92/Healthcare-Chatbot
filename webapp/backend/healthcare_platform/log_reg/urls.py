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
    path('all_users', views.get_user_list_view),  # working
    path('users/<int:pk>', views.user_detail),  # working
    path('users/<username>', views.user_detail_username),  # working
    path('login', views.login_view),  # working
    path('register/user', views.register_user_view),  # working
    path('register/doctor', views.register_doctor_view),  # working
    path('doctors', views.doctor_list),  # not working
    # path('doctors', views.doctor_list),  # not working
    path('users/profile', views.user_profile_view),  # not working
    path('users/<user_id>/profile', ProfileAPI.as_view()),  # not working

]
