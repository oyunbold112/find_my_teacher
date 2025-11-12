# course/permissions.py
from rest_framework import permissions

class IsTeacherOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Унших эрх бүгдэд нээлттэй
        if request.method in permissions.SAFE_METHODS:
            return True
        # Засах, устгах эрх зөвхөн тухайн хичээлийн багшид
        return obj.teacher == request.user

class IsSelfOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow a user to edit their own object.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the user themselves.
        return obj == request.user
