from rest_framework import permissions

class IsTeacher(permissions.BasePermission):
    """
    Custom permission to only allow teachers to access.
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.profile.user_type.name == 'teacher'
        return False

class IsStudent(permissions.BasePermission):
    """
    Custom permission to only allow students to access.
    """
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.profile.user_type.name == 'student'
        return False

class IsTeacherOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow teachers to edit/create, and others to read.
    """
    def has_permission(self, request, view):
        # Read permissions are allowed to any authenticated request.
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        
        # Write permissions are only allowed to teachers.
        return request.user.is_authenticated and request.user.profile.user_type.name == 'teacher'

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any authenticated request.
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Object-level write permissions are only allowed to the teacher who owns the lesson.
        return obj.teacher == request.user

class IsStudentOrTeacherOfLesson(permissions.BasePermission):
    """
    Custom permission to allow a student to view their own reservation,
    or a teacher to view a reservation for their lesson.
    """
    def has_object_permission(self, request, view, obj):
        return obj.student == request.user or obj.lesson.teacher == request.user