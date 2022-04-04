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
from django.http.response import JsonResponse
from .forms import UserSignUpForm, UserProfileForm, MedicalProfessionalProfile
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt

from .serializer import *
from rest_framework import viewsets
from .models import User, MedicalProfessionalProfile, UserProfile
from django.db import IntegrityError
import simplejson as json

from rest_framework.parsers import JSONParser

from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError


@api_view(['GET', 'POST'])
def get_user_list_view(request):
    if request.method == 'GET':
        data = User.objects.all()

        serializer = UserSerializer(
            data, context={'request': request}, many=True)

        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user_view(request):
    try:
        data = []
        print(request.data)
        user_serializer = UserRegisterSerializer(data=request.data)

        if user_serializer.is_valid():
            user_serializer.save()
            print("THIS IS ", user_serializer.data)
            id = user_serializer.data['id']
            request.data.update(
                {'user_id': id})
            # print("data request", request.data)
            profile_serializer = UserProfileSerializer(
                data=request.data)
            # print("data request2", request.data)
            # profile_serializer = UserProfileSerializer(
            #     data=request.data)
            if profile_serializer.is_valid():
                # print(user_profile_serializer.data)
                print("user_profile valid")
                # profile_serializer['user_id'] = request.user.id
                profile_serializer.save()
                # print(user_profile_serializer.data)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                print("user_profile not valid")

        else:
            print("seralizer is not valid")
            # data = serializer.errors
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except KeyError as e:
        print(e)
        raise ValidationError({"400": f'Field {str(e)} missing'})


@api_view(["POST"])
@permission_classes([AllowAny])
def register_doctor_view(request):
    try:
        data = []
        print(request.data)
        doctor_serializer = DoctorRegisterSerializer(data=request.data)

        if doctor_serializer.is_valid():
            doctor_serializer.save()
            print("THIS IS ", doctor_serializer.data)
            id = doctor_serializer.data['id']
            request.data.update(
                {'user_id': id})
            # print("data request", request.data)
            profile_serializer = DoctorProfileSerializer(
                data=request.data)
            # print("data request2", request.data)
            # profile_serializer = UserProfileSerializer(
            #     data=request.data)
            if profile_serializer.is_valid():
                # print(user_profile_serializer.data)
                print("doctor_profile valid")
                # profile_serializer['user_id'] = request.user.id
                profile_serializer.save()
                # print(user_profile_serializer.data)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(doctor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                print("doctor_serializer not valid")

        else:
            print("seralizer is not valid")
            # data = serializer.errors
            return Response(doctor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except KeyError as e:
        print(e)
        raise ValidationError({"400": f'Field {str(e)} missing'})


@api_view(['GET'])
def doctor_list(request):
    if(request.method == 'GET'):
        data = MedicalProfessionalProfile.objects.all()

        serializer = DoctorSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)


@api_view(['GET'])
def user_profile_view(request):
    print("here")
    if(request.method == 'GET'):
        print("here")
        data = UserProfile.objects.all()

        # serializer = UserProfileSerializer(
        #     data, context={'request': request}, many=True)

        return Response(serializer.data)


class ProfileAPI(APIView):
    def get(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=kwargs['id'])
        return Response(profile_serializer.data)


@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        is_medical = User.objects.get(
            username=request.data['username']).is_medical_professional
        is_user_bool = User.objects.get(
            username=request.data['username']).is_user
        id_u = User.objects.get(
            username=request.data['username']).id
        print("tester")
        print(is_user_bool)
        print(id_u)
        data = {}
        if serializer.is_valid():
            print("good")

            # data = User.objects.filter(pk=pk)
            # print(user)
            return Response(data={"is_medical": is_medical, "is_user": is_user_bool, "id": id_u}, status=status.HTTP_202_ACCEPTED)
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


@api_view(['GET'])
def user_detail_username(request, username, **kwargs):
    try:
        data = User.objects.filter(username=username)
        print(data)
        if data.exists():
            serializer = UserSerializer(
                data, context={'request': request}, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
