from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_superuser',
                  'password', 'first_name', 'last_name')

# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password',
                  'gender', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

    # def create(self, validated_data):
    #     password = validated_data.pop('password', None)
    #     instance = self.Meta.model(**validated_data)
    #     if password is not None:
    #         instance.set_password(password)
    #     instance.save()
    #     return instance


# Login Serializer


class LoginSerializer(serializers.Serializer):

    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        username = data.get("username", None)
        password = data.get("password", None)
        print(username, password)
        if Account.objects.filter(email=email, password=password).exists():
            return True

        # return False

        # if user and user.is_active:
        #     return user
        raise serializers.ValidationError("Incorrect Credentials")

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('first_name', 'last_name', 'id', 'email', 'is_user',
#                   'is_medical_professional', 'is_superuser', 'gender', 'username', 'password')
