from rest_framework import serializers
from .models import Campaign


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = ['id','name','status','budget','creative_url','click_url','created_at','updated_at']
        read_only_fields = ['id','created_at','updated_at']