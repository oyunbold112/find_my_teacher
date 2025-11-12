from . import serializers
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Lesson, Reservation, LessonTypes
from .serializers import LessonSerializer, ReservationSerializer, LessonTypesSerializer
from .permissions import IsTeacher, IsStudent, IsTeacherOrReadOnly, IsStudentOrTeacherOfLesson
from .filters import LessonFilter
import logging
logging.basicConfig()
logging.getLogger('django.db.backends').setLevel(logging.DEBUG)


from django_filters import rest_framework as filters

class LessonTypesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows lesson types to be viewed or edited.
    """
    queryset = LessonTypes.objects.all()
    serializer_class = serializers.LessonTypesSerializer

class LessonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows lessons to be viewed or edited.
    Teachers can create, retrieve, update, and delete their own lessons.
    Students can only retrieve lessons.
    """
    queryset = Lesson.objects.all()
    print(queryset)
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated, IsTeacherOrReadOnly]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = LessonFilter


    def get_queryset(self):
        # For teachers, show only their lessons. For students, show all lessons.
        if self.request.user.profile.user_type.name == 'teacher':
            return Lesson.objects.filter(teacher=self.request.user)
        return Lesson.objects.all()

    def perform_create(self, serializer):
        # Ensure the logged-in user is a teacher and set them as the lesson's teacher
        if self.request.user.profile.user_type.name == 'teacher':
            serializer.save(teacher=self.request.user)
        else:
            # This case should ideally be caught by permissions, but good for safety
            raise serializers.ValidationError("Only teachers can create lessons.")

class ReservationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows reservations to be viewed or created.
    Students can create reservations and view their own reservations.
    Teachers can view reservations for their lessons.
    """
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated, IsStudentOrTeacherOfLesson] # Default permission

    def get_queryset(self):
        if self.request.user.profile.user_type.name == 'student':
            return Reservation.objects.filter(student=self.request.user)
        elif self.request.user.profile.user_type.name == 'teacher':
            return Reservation.objects.filter(lesson__teacher=self.request.user)
        return Reservation.objects.none() # Should not happen with IsAuthenticated