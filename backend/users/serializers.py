from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import CustomerUser
from django.contrib.auth.models import User

class TeacherSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = CustomerUser
        fields = ['username',  'email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        # Use create_user to ensure the password is properly hashed.
        user = CustomerUser.objects.create_user(**validated_data)
        return user
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model=CustomerUser
        fields = ('username', 'password', 'email')

        def create(self, validate_data):
            user = CustomerUser.objects.create(
                username=validate_data['username'],
                email=validate_data('email')
            )
            user.set_password(validate_data['password'])
            user.save()
            return user