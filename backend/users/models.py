from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomerUser(AbstractUser):
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)

    REQUIRED_FIELDS = ['email','first_name']
    
    def __str__(self):
        return self.username