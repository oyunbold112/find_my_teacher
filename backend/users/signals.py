# classroom/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import CustomerUser
from classroom.models import Profile, Role

@receiver(post_save, sender=CustomerUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # Get the "student" role object
        student_role = Role.objects.filter(display_name="student").first()
        Profile.objects.create(
            user=instance,
            user_type=student_role,
            email=f'empty{instance.id}@gmail.com'  # safer unique default
        )