from django.urls import path,include
from rest_framework.routers import SimpleRouter
from .views import CreativeViewSet

router = SimpleRouter()
router.register("creatives",CreativeViewSet)

urlpatterns = [
    path("api/",include(router.urls)),
]