from rest_framework import serializers
from .models import User, MedicalProfessionalProfile, UserProfile
from django.contrib.auth.hashers import make_password
from django.contrib.auth import login, authenticate, logout


# User Serializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_superuser',
                  'password', 'first_name', 'last_name')


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='User.username')

    class Meta:
        model = UserProfile
        fields = ('user', 'medical_history', 'date_of_birth', 'phone')


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalProfessionalProfile
        fields = ('users', 'credentials', 'degree', 'is_logged')

# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password',
                  'gender', 'first_name', 'last_name', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print("here")
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()

        profile_data = validated_data.pop('profile')
        print(profile_data)
        print("Above")
        profile = UserProfile.objects.create(
            user=user,
            medical_history=profile_data['medical_history'],
            date_of_birth=profile_data['date_of_birth'])
        profile.save()

        return user


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        print('Made it here')
        username = data.get('username')
        password = data.get("password")
        # username1 = data['username']
        # print(username1)
        print(username, password)
        print("ABOVE IS")
        for user in User.objects.filter(username=username):
            if user.check_password(password):
                # … we found a user with password 'test'
                print("found a match")
                return True
            else:
                print("no match")
                raise serializers.ValidationError("Incorrect Credentials")

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('first_name', 'last_name', 'id', 'email', 'is_user',
#                   'is_medical_professional', 'is_superuser', 'gender', 'username', 'password')
