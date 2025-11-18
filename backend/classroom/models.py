# classroom/models.py
from django.db import models
from users.models import CustomerUser
from django.contrib.postgres.fields import ArrayField

class Role(models.Model):
    name = models.CharField(max_length=20, unique=True, default="student")
    display_name = models.CharField(max_length=50, default="student")

    def __str__(self):
        return self.display_name

class Profile(models.Model):
    user = models.OneToOneField(CustomerUser, on_delete=models.CASCADE)
    user_type = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True, default="student")
    email = models.EmailField(unique=True, default='empty')
    first_name = models.CharField(max_length=16, default='empty')
    last_name = models.CharField(max_length=16, default='empty')
    profile_picture = models.ImageField(upload_to='profile_pic', height_field='profile_height', width_field='profile_width', default='profile_pic/01.jpg')
    profile_width = models.IntegerField(null=True, blank=True, default=300)
    profile_height = models.IntegerField(null=True, blank=True, default=300)
    def __str__(self):
        return f'{self.user.username} - {self.user_type.display_name if self.user_type else "No Role"}'

class LessonTypes(models.Model):
    name = models.CharField(max_length=50, unique=True)
    display_name = models.CharField(max_length=50)

    def __str__(self):
        return self.display_name

class Lesson(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    teacher = models.ForeignKey(CustomerUser, on_delete=models.CASCADE, limit_choices_to={'profile__user_type__name': 'teacher'})
    lesson_type = models.CharField(max_length=30, default='oyunbold')
    lesson_duration = models.IntegerField(default=60)

    class Meta:
        managed = True
        db_table = 'classroom_lesson'

    def __str__(self):
        return self.title

class Reservation(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    student = models.ForeignKey(CustomerUser, on_delete=models.CASCADE, null=True, blank=True, limit_choices_to={'profile__user_type__name': 'student'})
    reservation_time = models.DateTimeField()
    duration = models.IntegerField(default=60)
    is_booked = models.BooleanField(default=False)

    class Meta:
        managed = True
        db_table = 'reservation'

    def __str__(self):
        status = "Захиалсан" if self.is_booked else "Боломжтой"
        student_name = self.student.username if self.is_booked else "Хоосон"
        return f'{self.lesson.title} хичээл {self.reservation_time.strftime("%Y-%m-%d %H:%M")} (Оюутан: {student_name}, Төлөв: {status})'