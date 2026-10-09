from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=120, default="Abhin Ashok")
    role = models.CharField(max_length=160, default="Python Django Developer")
    headline = models.CharField(max_length=220, default="Turning ideas into scalable digital experiences.")
    about = models.TextField(blank=True)
    location = models.CharField(max_length=120, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    profile_image_url = models.URLField(blank=True)
    resume_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.name


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ("language", "Language"),
        ("framework", "Framework"),
        ("frontend", "Frontend"),
        ("database", "Database"),
        ("devops", "DevOps"),
        ("tool", "Tool"),
    ]
    name = models.CharField(max_length=80)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    icon = models.CharField(max_length=80, blank=True)
    proficiency = models.PositiveSmallIntegerField(default=80)
    sort_order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=160)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    image_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    technologies = models.JSONField(default=list, blank=True)
    category = models.CharField(max_length=60, default="Web Application")
    featured = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self):
        return self.title


class Experience(models.Model):
    title = models.CharField(max_length=160)
    company = models.CharField(max_length=160)
    period = models.CharField(max_length=80)
    description = models.TextField()
    highlights = models.JSONField(default=list, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return f"{self.title} — {self.company}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=180)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.subject}"




class Certification(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    issue_date = models.DateField(null=True, blank=True)
    certificate_image = models.ImageField(upload_to="certifications/", blank=True, null=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "-issue_date"]

    def __str__(self):
        return self.title