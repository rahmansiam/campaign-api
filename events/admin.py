from django.contrib import admin
from .models import Event
# Register your models here.

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("event_type", "campaign", "created_at")
    list_filter = ("event_type",)