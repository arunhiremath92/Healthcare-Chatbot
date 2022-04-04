from rest_framework import serializers
from .models import User, MedicalProfessionalProfile, UserProfile
from django.contrib.auth.hashers import make_password
from django.contrib.auth import login, authenticate, logout
from django.shortcuts import get_object_or_404


# User Serializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_superuser',
                  'password', 'first_name', 'last_name')

    def create(self, validated_data):
        print("here")
        print(validated_data.pop('profile'))
        print("here 2")
        # print(validated_data)
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.is_user = True
        user.save()

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(source='User.username')
    # user_id = serializers.ReadOnlyField()
    user_id = serializers.CharField(source='User.id')

    class Meta:
        model = UserProfile
        fields = ('id', 'user_id',
                  'medical_history', 'date_of_birth', 'phone')

    def create(self, validated_data, *args, **kwargs):
        print("made it now finally here")
        print(validated_data)
        # user = self.context['request'].user_id
        user_id = validated_data['User']['id']
        # user1 = User.objects.get(username=validated_data['User'].username).pk
        # print(user1, " tester")
        # user_id = self.context['user_id']
        # print(self.user_id)
        # user = self.context['request'].user
        profile = UserProfile.objects.create(
            user_id=user_id,
            medical_history=validated_data['medical_history'],
            date_of_birth=validated_data['date_of_birth'],
            phone=validated_data['phone'])
        profile.save()

        return profile


class DoctorProfileSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(source='User.username')
    # user_id = serializers.ReadOnlyField()
    user_id = serializers.CharField(source='User.id')

    class Meta:
        model = MedicalProfessionalProfile
        fields = ('id', 'user_id',
                  'credentials', 'degree')

    def create(self, validated_data, *args, **kwargs):
        print("made it now finally here")
        print(validated_data)
        # user = self.context['request'].user_id
        user_id = validated_data['User']['id']
        profile = MedicalProfessionalProfile.objects.create(
            user_id=user_id,
            credentials=validated_data['credentials'],
            degree=validated_data['degree'])
        profile.save()

        return profile


class UserRegisterSerializer(serializers.ModelSerializer):
    # profile = UserProfileSerializer(required=False)
    # medical_history = serializers.CharField()
    # date_of_birth = serializers.DateField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_superuser', 'password',
                  'first_name', 'last_name', 'gender')
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print("here")
        # print(validated_data)
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.is_user = True
        user.save()
        print(user.id)

        # profile_data = validated_data.pop('profile')
        # print(profile_data)
        # print("Above")
        # profile = UserProfile.objects.create(
        #     user_id=user.id,
        #     medical_history=validated_data['medical_history'],
        #     date_of_birth=validated_data['date_of_birth'])
        # profile.save()

        return user


class DoctorRegisterSerializer(serializers.ModelSerializer):
    # profile = UserProfileSerializer(required=False)
    # medical_history = serializers.CharField()
    # date_of_birth = serializers.DateField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_superuser', 'password',
                  'first_name', 'last_name', 'gender')
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print("here")
        # print(validated_data)
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.is_medical_professional = True
        user.save()
        print(user.id)

        # profile_data = validated_data.pop('profile')
        # print(profile_data)
        # print("Above")
        # profile = UserProfile.objects.create(
        #     user_id=user.id,
        #     medical_history=validated_data['medical_history'],
        #     date_of_birth=validated_data['date_of_birth'])
        # profile.save()

        return user


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalProfessionalProfile
        fields = ('users', 'credentials', 'degree', 'is_logged')

# Register Serializer


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('username', 'password', 'is_medical_professional', 'is_user')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        print('Made it here')
        username = data.get('username')
        password = data.get("password")
        # username1 = data['username']
        # print(username1)
        print(username, password)
        print("ABOVE IS")
        print("HERERERE")
        print(User.objects.filter(username=username))
        for user in User.objects.filter(username=username):
            print(user)
            print("HERERERE")
            print(User.objects.filter(username=username))
            if(user):
                if user.check_password(password):
                    # … we found a user with password 'test'
                    print("found a match")
                    return data
                else:
                    print("no match")
                    raise serializers.ValidationError("Incorrect Credentials")
            else:
                raise serializers.ValidationError("Incorrect Credentials")
        else:
            raise serializers.ValidationError("Incorrect Credentials")
        return data

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('first_name', 'last_name', 'id', 'email', 'is_user',
#                   'is_medical_professional', 'is_superuser', 'gender', 'username', 'password')
