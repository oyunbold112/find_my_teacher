from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomerUser
from classroom.models import Profile

@receiver(post_save, sender=CustomerUser)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Automatically create a Profile whenever a new CustomerUser is created.
    """
    if created:
        Profile.objects.create(user=instance)