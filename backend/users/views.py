# course/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from .serializers import RegisterSerializer
from .serializers import TeacherSerializer
from .permissions import IsSelfOrReadOnly
from .models import CustomerUser

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomerUser.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [AllowAny,]