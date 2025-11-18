# signals.py
from django.db.models.signals import post_save
from users.models import CustomerUser
from django.dispatch import receiver
from classroom.models import Profile

@receiver(post_save, sender=CustomerUser)
def create_profile(sender, instance, created, **kwargs):
    Profile.objects.create(user=instance)

@receiver(post_save, sender=CustomerUser)
def save_profile(sender, instance, **kwargs):
    """
    Saves the associated profile for a User when it is saved.
    """
    instance.profile.save()