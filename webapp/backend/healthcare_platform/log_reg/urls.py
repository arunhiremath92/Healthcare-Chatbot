from django.urls import path, include
# from .views import edit, dashboard, register
from . import views
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
    path('api/users', views.user_list),
    path('api/users/<int:pk>', views.user_detail),
    path('api/users/login', views.login_view),
    path('api/users/register', views.Register_Users),


    path('', LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', LogoutView.as_view(template_name='authapp/logged_out.html'), name='logout'),
    # path('register/', views.register, name='register'),
    # path('signup/user', views.user_signup, name='user_signup'),
    # path('signup/professsional/', views.prof_signup, name='prof_signup'),
    path('reset_password/', PasswordResetView.as_view(
        template_name='passwordReset/resetpassword.html'), name='reset_password'),
    path('reset_password_sent/', PasswordResetDoneView.as_view(
        template_name="password_reset_sent.html"), name='password_reset_done'),
    path('reset/<uidb64>/<token>', PasswordResetConfirmView.as_view(
        template_name="password_reset_form.html"), name='password_reset_confirm'),
    path('reset_password_complete/', PasswordResetCompleteView.as_view(
        template_name="password_reset_done.html"), name='password_reset_complete')

]
