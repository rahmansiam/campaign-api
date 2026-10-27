from django.db import models
from django.core.validators import MinValueValidator


# Create your models here.
class Campaign(models.Model):

    class Status(models.TextChoices):
        DRAFT = "draft","Draft"
        ACTIVE = "active","Active"
        PAUSED = "paused","Paused"
        ENDED = "ended","Ended"
    

    name = models.CharField(max_length=100)
    status = models.CharField(max_length=20,
     choices=Status.choices,default=Status.DRAFT,db_index=True)
    budget = models.DecimalField(max_digits=12,decimal_places=2,validators=[MinValueValidator(0)])
    creative_url = models.URLField(max_length=500)
    click_url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} {self.status}"
