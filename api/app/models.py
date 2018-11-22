from django.db import models

# Create your models here.
class Profil(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    id = models.AutoField(primary_key=True)