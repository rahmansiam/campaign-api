from django.contrib import admin
from .models import Creative

# Register your models here.




@admin.register(Creative)
class CreativeAdmin(admin.ModelAdmin):
    list_display = ("name", "headline", "cta_text", "created_at")
    search_fields = ("name", "headline")