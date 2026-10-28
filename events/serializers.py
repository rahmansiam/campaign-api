from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["id", "campaign", "event_type", "created_at"]
        read_only_fields = ["id","event_type","created_at"]

  