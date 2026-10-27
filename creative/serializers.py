from rest_framework import serializers
from .models import Creative


class CreativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creative
        fields = [
            "id", "name", "headline", "body_text", "image_url",
            "cta_text", "click_url", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
    