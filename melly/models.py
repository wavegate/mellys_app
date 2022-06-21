from django.db import models
from django.utils import timezone

class Dogs(models.Model):
    name = models.CharField(max_length=255)
    dob = models.DateField(default = timezone.now)
    breed = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    weight = models.IntegerField()
    lastFed = models.DateTimeField()
    lastPooped = models.DateTimeField()