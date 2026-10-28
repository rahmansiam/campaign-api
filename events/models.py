from django.db import models

# Create your models here.

class Event(models.Model):
    class EventType(models.TextChoices):
        IMPRESSION = "impression","Impression"
        CLICK = "click","Click"

    campaign = models.ForeignKey("campaign.Campaign",on_delete=models.CASCADE,related_name="events")
    event_type = models.CharField(max_length=20,choices=EventType.choices,db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.event_type} - {self.campaign_id}"