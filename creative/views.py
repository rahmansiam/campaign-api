from rest_framework import viewsets
from .models import Creative
from .serializers import CreativeSerializer

# Create your views here.

class CreativeViewSet(viewsets.ModelViewSet):
    queryset = Creative.objects.all()
    serializer_class = CreativeSerializer