from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
# from django.contrib.auth.models import User
from .models import *
# from django.contrib.auth import get_user_model
# User = get_user_model()

# Create your views here.
from django.http import HttpResponse
from .forms import UserSignUpForm, UserProfileForm, MedicalProfessionalProfile


def register(request):
    return render(request, 'registration/role.html')


def user_signup(request):
    if request.method == 'POST':
        form = UserSignUpForm(request.POST)
        profile_form = UserProfileForm(request.POST)
        print("here")
        if form.is_valid() and profile_form.is_valid():
            print("Made it here")
            print(request.POST)
            user = form.save(commit=False)
            user.is_user = True
            user.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            login(request, user)
            return redirect('home')
    else:
        form = UserSignUpForm()
        profile_form = UserProfileForm()
    return render(request, 'registration/user_signup.html', {'form': form, 'profile_form': profile_form})


def prof_signup(request):
    if request.method == 'POST':
        form = UserSignUpForm(request.POST)
        profile_form = MedicalProfessionalProfile(request.POST)
        print("here")
        if form.is_valid() and profile_form.is_valid():
            print("Made it here")
            user = form.save(commit=False)
            user.is_medical_professional = True
            user = form.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            login(request, user)
            return redirect('home')
    else:
        form = UserSignUpForm()
        profile_form = MedicalProfessionalProfile()
    return render(request, 'registration/professional_signup.html', {'form': form, 'profile_form': profile_form})
