from django.core.mail import send_mail
from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactMessage, Experience, Profile, Project, Skill, Certification
from .serializers import (
    ContactMessageSerializer,
    ExperienceSerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillSerializer,
    CertificationSerializer
)


class PortfolioView(APIView):
    """Single payload endpoint used by the React landing page."""

    def get(self, request):
        profile = Profile.objects.filter(is_active=True).first()
        payload = {
            "profile": ProfileSerializer(profile).data if profile else None,
            "skills": SkillSerializer(Skill.objects.filter(is_featured=True), many=True).data,
            "projects": ProjectSerializer(Project.objects.filter(featured=True), many=True).data,
            "experience": ExperienceSerializer(Experience.objects.all(), many=True).data,
            "certificate": CertificationSerializer(Certification.objects.all(), many=True).data,
        }
        return Response(payload)


class ContactMessageView(APIView):
    @transaction.atomic
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = serializer.save()

        # Console backend in development; SMTP can be enabled with environment variables.
        try:
            recipient = Profile.objects.filter(is_active=True).values_list("email", flat=True).first()
            if recipient:
                send_mail(
                    subject=f"Portfolio contact: {contact.subject}",
                    message=(
                        f"From: {contact.name} <{contact.email}>\n\n{contact.message}"
                    ),
                    from_email=None,
                    recipient_list=[recipient],
                    fail_silently=True,
                )
        except Exception:
            # Message is still saved; email delivery should never break the API response.
            pass

        return Response(
            {"message": "Thanks — your message has been received.", "id": contact.id},
            status=status.HTTP_201_CREATED,
        )


