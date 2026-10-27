from django.db import models

# Create your models here.
class Creative(models.Model):
    name = models.CharField(max_length=100)
    headline = models.CharField(max_length=100)
    body_text = models.CharField(max_length=255,blank=True)
    image_url = models.URLField(max_length=500)
    cta_text = models.CharField(max_length=30,default="Learn More")
    click_url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name