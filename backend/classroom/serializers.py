from rest_framework import serializers
from .models import Lesson, Reservation, Profile, LessonTypes
from users.models import CustomerUser

# Serializer for the CustomerUser model, specifically for displaying teacher/student info
class CustomerUserDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerUser
        fields = ['id', 'email'] # You can add 'first_name', 'last_name' if they are on CustomerUser

# Serializer for the Profile model, to include in user details
class ProfileSerializer(serializers.ModelSerializer):
    user_type_display = serializers.CharField(source='user_type.display_name', read_only=True)

    class Meta:
        model = Profile
        fields = ['profile_picture', 'first_name', 'last_name', 'user_type_display']

class LessonTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonTypes
        fields = ['name', 'display_name']

# Serializer for Lesson model
class LessonSerializer(serializers.ModelSerializer):
    teacher_email = serializers.EmailField(source='teacher.email', read_only=True)
    teacher_profile = ProfileSerializer(source='teacher.profile', read_only=True)
    
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'lesson_type', 'lesson_duration', 'description', 'teacher', 'teacher_email', 'teacher_profile']
        read_only_fields = ['teacher'] # Teacher is set automatically

    def create(self, validated_data):
        # Automatically set the teacher to the logged-in user
        validated_data['teacher'] = self.context['request'].user
        return super().create(validated_data)
# Serializer for Reservation model
class ReservationSerializer(serializers.ModelSerializer):
    lesson_title = serializers.CharField(source='lesson.title', read_only=True)
    teacher_email = serializers.EmailField(source='lesson.teacher.email', read_only=True)
    student_email = serializers.EmailField(source='student.email', read_only=True)

    class Meta:
        model = Reservation
        fields = ['id', 'lesson', 'lesson_title', 'duration', 'teacher_email', 'student', 'student_email', 'reservation_time', 'is_booked']
        read_only_fields = ['student', 'is_booked'] # Student is set automatically, is_booked managed by teacher

    def create(self, validated_data):
        # Automatically set the student to the logged-in user
        validated_data['student'] = self.context['request'].user
        validated_data['is_booked'] = True # A reservation is booked upon creation
        return super().create(validated_data)

    def validate(self, data):
        # Ensure the lesson exists and is taught by a teacher
        lesson = data.get('lesson')
        if not lesson or not lesson.teacher.profile.user_type.name == 'teacher':
            raise serializers.ValidationError("Invalid lesson or lesson not taught by a teacher.")
        
        # Add more validation here, e.g., check for time conflicts, lesson availability
        return data