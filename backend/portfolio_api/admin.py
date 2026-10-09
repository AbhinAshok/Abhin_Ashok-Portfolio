from django.contrib import admin
from .models import ContactMessage, Experience, Profile, Project, Skill


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "email", "is_active")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency", "sort_order", "is_featured")
    list_filter = ("category", "is_featured")
    list_editable = ("proficiency", "sort_order", "is_featured")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "featured", "sort_order")
    list_filter = ("category", "featured")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "period", "sort_order")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at", "is_read")
    list_filter = ("is_read",)
    readonly_fields = ("created_at",)


from django.contrib import admin
from .models import Certification


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "issue_date")
    list_filter = ("issuer", "issue_date")
    search_fields = ("title", "issuer")

    ordering = (
        "display_order",
        "-issue_date",
    )