from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from .models import *
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
from .models import User, MedicalProfessionalProfile, UserProfile
from django.db import IntegrityError
import simplejson as json

from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


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


@api_view(['GET'])
def doctor_list(request):
    if(request.method == 'GET'):
        data = MedicalProfessionalProfile.objects.all()

        serializer = DoctorSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)


@api_view(['GET'])
def user_profile(request):
    if(request.method == 'GET'):
        data = UserProfile.objects.all()

        serializer = UserProfileSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)


class ProfileAPI(APIView):
    def get(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=kwargs['id'])
        return Response(profile_serializer.data)


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
        else:
            data = serializer.errors

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except IntegrityError as e:
        account = User.objects.get(username='')
        account.delete()
        raise ValidationError({"400": f'{str(e)}'})

    except KeyError as e:
        print(e)
        raise ValidationError({"400": f'Field {str(e)} missing'})


@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        print(request.data)
        data = {}
        if serializer.is_valid():
            print("good")
            return Response("Login Successful", status=status.HTTP_202_ACCEPTED)
        else:
            print("bad")
            print(serializer.errors)
            return Response("Incorrect username/password combination", status=status.HTTP_400_BAD_REQUEST)


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
