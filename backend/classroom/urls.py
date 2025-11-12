from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LessonViewSet, ReservationViewSet, LessonTypesViewSet

router = DefaultRouter()
router.register(r'lessons', LessonViewSet)
router.register(r'reservations', ReservationViewSet)
router.register(r'lessontypes', LessonTypesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]