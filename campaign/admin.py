from django.contrib import admin
from .models import Campaign

# Register your models here.
@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ("name", "status", "budget", "created_at")
    list_filter = ("status",)
    search_fields = ("name",)