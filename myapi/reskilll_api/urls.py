# reskilll_api/urls.py
from django.urls import path
from .views import HackListView

urlpatterns = [
    path('hacks/', HackListView.as_view(), name='hack-list'),
]
