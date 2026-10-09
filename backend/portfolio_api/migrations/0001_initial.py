from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Abhin Ashok', max_length=120)),
                ('role', models.CharField(default='Python Django Developer', max_length=160)),
                ('headline', models.CharField(default='Turning ideas into scalable digital experiences.', max_length=220)),
                ('about', models.TextField(blank=True)),
                ('location', models.CharField(blank=True, max_length=120)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('phone', models.CharField(blank=True, max_length=40)),
                ('profile_image_url', models.URLField(blank=True)),
                ('resume_url', models.URLField(blank=True)),
                ('github_url', models.URLField(blank=True)),
                ('linkedin_url', models.URLField(blank=True)),
                ('instagram_url', models.URLField(blank=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={'verbose_name': 'Profile', 'verbose_name_plural': 'Profile'},
        ),
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=254)),
                ('subject', models.CharField(max_length=180)),
                ('message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_read', models.BooleanField(default=False)),
            ],
            options={'ordering': ['-created_at']},
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=160)),
                ('company', models.CharField(max_length=160)),
                ('period', models.CharField(max_length=80)),
                ('description', models.TextField()),
                ('highlights', models.JSONField(blank=True, default=list)),
                ('sort_order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['sort_order']},
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=160)),
                ('slug', models.SlugField(unique=True)),
                ('description', models.TextField()),
                ('image_url', models.URLField(blank=True)),
                ('demo_url', models.URLField(blank=True)),
                ('github_url', models.URLField(blank=True)),
                ('technologies', models.JSONField(blank=True, default=list)),
                ('category', models.CharField(default='Web Application', max_length=60)),
                ('featured', models.BooleanField(default=True)),
                ('sort_order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['sort_order', 'title']},
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
                ('category', models.CharField(choices=[('language', 'Language'), ('framework', 'Framework'), ('frontend', 'Frontend'), ('database', 'Database'), ('devops', 'DevOps'), ('tool', 'Tool')], max_length=30)),
                ('icon', models.CharField(blank=True, max_length=80)),
                ('proficiency', models.PositiveSmallIntegerField(default=80)),
                ('sort_order', models.PositiveIntegerField(default=0)),
                ('is_featured', models.BooleanField(default=True)),
            ],
            options={'ordering': ['sort_order', 'name']},
        ),
    ]
