from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
# from django.contrib.auth.models import User
from .models import *
# from django.contrib.auth import get_user_model
# User = get_user_model()
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny

# Create your views here.
from django.http import HttpResponse
from .forms import UserSignUpForm, UserProfileForm, MedicalProfessionalProfile
from rest_framework.renderers import JSONRenderer

from .serializer import *
from rest_framework import viewsets
from .models import User
from django.db import IntegrityError
import simplejson as json


@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        data = User.objects.all()

        serializer = UserSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def login(request, **kwargs):
#     try:
#         data = User.objects.filter(pk=pk)
#         serializer = LoginSerializer(
#             data, context={'request': request}, many=True)
#         return Response(serializer.data)
#     except User.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)


# @api_view(['POST'])
# def register(request, **kwargs):
#     try:
#         # data = User.objects.all()
#         # serializer = RegisterSerializer(
#         #     data, context={'request': request}, many=True)
#         serializer = RegisterSerializer.create(self, validated_data)
#         return Response(serializer.data)
#     except User.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([AllowAny])
def Register_Users(request):
    try:
        data = []
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            account = serializer.save()
            account.is_active = True
            account.save()
            # token = Token.objects.get_or_create(user=account)[0].key
            # data["message"] = "user registered successfully"
            # data["email"] = account.email
            # data["username"] = account.username
            # data["first_name"] = account.first_name
            # data["token"] = token

        else:
            data = serializer.errors

        return Response(data)
    except IntegrityError as e:
        account = User.objects.get(username='')
        account.delete()
        raise ValidationError({"400": f'{str(e)}'})

    except KeyError as e:
        print(e)
        raise ValidationError({"400": f'Field {str(e)} missing'})


@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):

    data = {}
    reqBody = json.loads(request.data).decode('utf-8')
    email1 = reqBody['email']
    print(email1)
    password = reqBody['password']
    try:
        Account = User.objects.get(Email_Address=email1)
    except BaseException as e:
        raise ValidationError({"400": f'{str(e)}'})

    # token = Token.objects.get_or_create(user=Account)[0].key
    # print(token)
    if not check_password(password, Account.password):
        raise ValidationError({"message": "Incorrect Login credentials"})

    if Account:
        if Account.is_active:
            print(request.user)
            login(request, Account)
            data["message"] = "user logged in"
            data["email_address"] = Account.email

            Res = {"data": data}

            return Response(Res)

        else:
            raise ValidationError({"400": f'Account not active'})

    else:
        raise ValidationError({"400": f'Account doesnt exist'})


@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            date['response'] = 'User successfully Login'
        else:
            data['response'] = 'You have entered an invalid username or password'
        return Response(data)


@api_view(['GET'])
def user_detail(request, pk, **kwargs):
    try:
        data = User.objects.filter(pk=pk)
        print(data)
        if data.exists():
            serializer = UserSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


# class UserView(viewsets.ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()


# def register(request):
#     return render(request, 'registration/role.html')


# def user_signup(request):
#     if request.method == 'POST':
#         form = UserSignUpForm(request.POST)
#         profile_form = UserProfileForm(request.POST)
#         print("here")
#         if form.is_valid() and profile_form.is_valid():
#             print("Made it here")
#             print(request.POST)
#             user = form.save(commit=False)
#             user.is_user = True
#             user.save()
#             profile = profile_form.save(commit=False)
#             profile.user = user
#             profile.save()
#             login(request, user)
#             return redirect('home')
#     else:
#         form = UserSignUpForm()
#         profile_form = UserProfileForm()
#     return render(request, 'registration/user_signup.html', {'form': form, 'profile_form': profile_form})


# def prof_signup(request):
#     if request.method == 'POST':
#         form = UserSignUpForm(request.POST)
#         profile_form = MedicalProfessionalProfile(request.POST)
#         print("here")
#         if form.is_valid() and profile_form.is_valid():
#             print("Made it here")
#             user = form.save(commit=False)
#             user.is_medical_professional = True
#             user = form.save()
#             profile = profile_form.save(commit=False)
#             profile.user = user
#             profile.save()
#             login(request, user)
#             return redirect('home')
#     else:
#         form = UserSignUpForm()
#         profile_form = MedicalProfessionalProfile()
#     return render(request, 'registration/professional_signup.html', {'form': form, 'profile_form': profile_form})
