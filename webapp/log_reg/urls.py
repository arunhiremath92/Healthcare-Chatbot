from django.urls import path
# from .views import edit, dashboard, register
from . import views
from django.urls import reverse_lazy
from django.contrib.auth.views import (LoginView, LogoutView, PasswordResetDoneView, PasswordResetView,
                                       PasswordResetCompleteView, PasswordResetConfirmView,
                                       PasswordChangeView, PasswordChangeDoneView,
                                       PasswordResetDoneView)

urlpatterns = [
    path('', LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', LogoutView.as_view(template_name='authapp/logged_out.html'), name='logout'),
    path('register/', views.register, name='register'),
    path('signup/user', views.user_signup, name='user_signup'),
    path('signup/professsional/', views.prof_signup, name='prof_signup'),
    # path('accounts/signup/student/', students.StudentSignUpView.as_view(), name='student_signup'),
    # path('accounts/signup/teacher/', teachers.TeacherSignUpView.as_view(), name='teacher_signup'),
    path('reset_password/', PasswordResetView.as_view(
        template_name='passwordReset/resetpassword.html'), name='reset_password'),
    path('reset_password_sent/', PasswordResetDoneView.as_view(
        template_name="password_reset_sent.html"), name='password_reset_done'),
    path('reset/<uidb64>/<token>', PasswordResetConfirmView.as_view(
        template_name="password_reset_form.html"), name='password_reset_confirm'),
    path('reset_password_complete/', PasswordResetCompleteView.as_view(
        template_name="password_reset_done.html"), name='password_reset_complete')

]
