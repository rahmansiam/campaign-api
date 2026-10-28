
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Event
from .serializers import EventSerializer

# Create your views here.


class BaseEventView(generics.CreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    event_type = None

    def perform_create(self, serializer):
        serializer.save(event_type=self.event_type)


class ImpressionView(BaseEventView):
    event_type = Event.EventType.IMPRESSION


class ClickView(BaseEventView):
    event_type = Event.EventType.CLICK