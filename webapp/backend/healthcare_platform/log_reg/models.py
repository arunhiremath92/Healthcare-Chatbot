from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(unique=True)
    is_user = models.BooleanField(default=False)
    is_medical_professional = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    gender = models.CharField(max_length=1, default='M')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='user_profile')
    medical_history = models.TextField(max_length=200, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=11, default='', null=True, blank=True)


class MedicalProfessionalProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='hr_profile')
    credentials = models.CharField(max_length=100, blank=True)
    degree = models.CharField(max_length=100, blank=True)
