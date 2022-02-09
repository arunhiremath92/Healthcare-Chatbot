from django.http import HttpResponse
from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from .models import User, UserProfile, MedicalProfessionalProfile


class UserSignUpForm(UserCreationForm):
    username = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form_input', 'placeholder':''}))
    email = forms.EmailField(widget=forms.EmailInput(
        attrs={'class': 'form_input', 'placeholder': ''}))
    first_name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form_input', 'placeholder': ''}))
    last_name = forms.CharField(widget=forms.TextInput(

        attrs={'class': 'form_input', 'placeholder': ' '}))
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = forms.ChoiceField(choices=GENDER_CHOICES)


    class Meta:
        model = User
        fields = ("username", "email", "first_name", "last_name", "gender")


class UserProfileForm(ModelForm):

    date_of_birth = forms.DateField()
    phone = forms.CharField(
        widget=forms.NumberInput(attrs={'maxlength': '11'}))
    medical_history = forms.Textarea()

    class Meta:
        model = UserProfile
        fields = ("medical_history", "date_of_birth", "phone")


class MedicalProfessionalProfile(ModelForm):

    credentials = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form_input', 'placeholder': ' '}))
    degree = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form_input', 'placeholder': ' '}))

    class Meta:
        model = MedicalProfessionalProfile
        fields = ("credentials", "degree")
