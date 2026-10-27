from rest_framework import serializers
from .models import Campaign
from creative.serializers import CreativeSerializer


class CampaignSerializer(serializers.ModelSerializer):
    creative_detail = CreativeSerializer(source="creative",read_only=True)
    class Meta:
        model = Campaign
        fields = ['id','name','status','budget','creative','creative_detail','creative_url','click_url','created_at','updated_at']
        read_only_fields = ['id','created_at','updated_at']