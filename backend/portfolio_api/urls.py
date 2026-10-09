from django.urls import path
from .views import ContactMessageView, PortfolioView

urlpatterns = [
    path("portfolio/", PortfolioView.as_view(), name="portfolio"),
    path("contact/", ContactMessageView.as_view(), name="contact"),
]
