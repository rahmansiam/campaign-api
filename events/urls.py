from django.urls import path
from .views import ClickView, ImpressionView

urlpatterns = [
    path("api/events/impression/", ImpressionView.as_view()),
    path("api/events/click/", ClickView.as_view()),
]