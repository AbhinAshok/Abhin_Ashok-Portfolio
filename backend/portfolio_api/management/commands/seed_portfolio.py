from django.core.management.base import BaseCommand
from portfolio_api.models import Experience, Profile, Project, Skill

PROFILE = {
    "name": "Abhin Ashok",
    "role": "Python Django Developer",
    "headline": "I build robust, scalable and efficient web applications that solve real-world problems and deliver great user experiences.",
    "about": (
        "I'm a passionate Python Django Developer with a strong focus on building secure, scalable web applications. "
        "I enjoy turning complex problems into simple, beautiful and intuitive solutions. I have experience developing RESTful APIs, "
        "integrating third-party services, designing databases and working with modern JavaScript frameworks."
    ),
    "location": "Kerala, India",
    "email": "abhinashok.dev@gmail.com",
    "phone": "",
    "profile_image_url": "https://raw.githubusercontent.com/AbhinAshok/Abhin_Portfolio/main/assets/images/Abhin11.png",
    "resume_url": "https://raw.githubusercontent.com/AbhinAshok/Abhin_Portfolio/main/assets/docs/ABHIN_CV.pdf",
    "github_url": "https://github.com/AbhinAshok",
    "linkedin_url": "https://www.linkedin.com/",
    "instagram_url": "https://www.instagram.com/",
}

SKILLS = [
    ("Python", "language", "python", 90),
    ("Django", "framework", "django", 88),
    ("Django REST Framework", "framework", "api", 90),
    ("JavaScript", "frontend", "javascript", 75),
    ("React", "frontend", "react", 78),
    ("HTML5", "frontend", "html", 92),
    ("CSS3", "frontend", "css", 88),
    ("Tailwind CSS", "frontend", "tailwind", 82),
    ("PostgreSQL", "database", "postgresql", 85),
    ("Git & GitHub", "tool", "git", 90),
    ("Docker", "devops", "docker", 78),
    ("AWS", "devops", "aws", 72),
]

PROJECTS = [
    {
        "title": "Learning Management System",
        "slug": "learning-management-system",
        "description": "A comprehensive LMS with student management, attendance, exams, results and role-based workflows.",
        "image_url": "https://raw.githubusercontent.com/AbhinAshok/Abhin_Portfolio/main/assets/images/LMS.png",
        "category": "Django",
        "technologies": ["Django", "DRF", "PostgreSQL", "React"],
    },
    {
        "title": "E-Commerce API",
        "slug": "e-commerce-api",
        "description": "RESTful API for an e-commerce platform with authentication, product management, cart and order processing.",
        "image_url": "https://raw.githubusercontent.com/AbhinAshok/Abhin_Portfolio/main/assets/images/Ecommerce.png",
        "category": "API",
        "technologies": ["Django REST Framework", "JWT", "PostgreSQL"],
    },
    {
        "title": "Portfolio Website",
        "slug": "portfolio-website",
        "description": "Personal portfolio website built with modern frontend technologies, responsive layouts and motion effects.",
        "image_url": "https://raw.githubusercontent.com/AbhinAshok/Abhin_Portfolio/main/assets/images/portfolio.png",
        "category": "Web Application",
        "technologies": ["React", "Tailwind CSS", "Framer Motion"],
    },
    {
        "title": "Conversua API",
        "slug": "conversua-api",
        "description": "A real-time chat API with messaging, notifications and WebSocket support.",
        "image_url": "",
        "category": "API",
        "technologies": ["Django", "DRF", "WebSocket"],
    },
]

EXPERIENCE = [
    {
        "title": "Python Django Developer",
        "company": "Tech Geum",
        "period": "Jan 2024 — Present",
        "description": "Developing scalable web applications using Django and DRF, with a focus on clean APIs, integrations and performance.",
        "highlights": [
            "Building scalable web applications using Django and DRF.",
            "Designing REST APIs and integrating third-party services.",
            "Optimizing application performance and database queries.",
            "Collaborating with frontend developers and stakeholders.",
        ],
    },
    {
        "title": "Python Developer Intern",
        "company": "Tech Geum",
        "period": "Aug 2023 — Dec 2023",
        "description": "Worked on backend development, API integration and bug fixes while gaining practical Django and PostgreSQL experience.",
        "highlights": [
            "Backend development and API integration.",
            "Bug fixing, testing and feature implementation.",
            "Hands-on work with Django and PostgreSQL.",
        ],
    },
    {
        "title": "B.Sc. Computer Science",
        "company": "Calicut University",
        "period": "2020 — 2023",
        "description": "Focused on software development, data structures, algorithms and practical programming projects.",
        "highlights": [
            "Graduated with strong academic performance.",
            "Focused on software development and data structures.",
            "Participated in coding projects and technical activities.",
        ],
    },
]


class Command(BaseCommand):
    help = "Seed portfolio content for local development."

    def handle(self, *args, **options):
        Profile.objects.update_or_create(id=1, defaults=PROFILE)
        Skill.objects.all().delete()
        for idx, (name, category, icon, proficiency) in enumerate(SKILLS, start=1):
            Skill.objects.create(
                name=name,
                category=category,
                icon=icon,
                proficiency=proficiency,
                sort_order=idx,
                is_featured=True,
            )

        Project.objects.all().delete()
        for idx, project in enumerate(PROJECTS, start=1):
            Project.objects.create(sort_order=idx, featured=True, **project)

        Experience.objects.all().delete()
        for idx, experience in enumerate(EXPERIENCE, start=1):
            Experience.objects.create(sort_order=idx, **experience)

        self.stdout.write(self.style.SUCCESS("Portfolio data seeded successfully."))
