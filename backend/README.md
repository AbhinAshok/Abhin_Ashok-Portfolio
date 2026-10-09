# Abhin Ashok — Django + React Portfolio

Production-oriented full-stack portfolio starter using Django REST Framework and React/Vite.

## Stack
- Django + Django REST Framework
- PostgreSQL-ready via `DATABASE_URL`; SQLite works out of the box for local development
- CORS + WhiteNoise
- React + Vite
- Responsive Cosmic Neon / Ocean Blue UI
- Django Admin for profile, skills, projects, experience and contact messages

## Backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env   # Windows
# cp .env.example .env   # Linux/macOS
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_portfolio
python manage.py runserver
```

API: `http://localhost:8000/api/portfolio/`
Admin: `http://localhost:8000/admin/`

## Frontend
```bash
cd frontend
npm install
copy .env.example .env   # Windows
# cp .env.example .env   # Linux/macOS
npm run dev
```

Open `http://localhost:5173`.

## Production notes
- Use PostgreSQL and set `DATABASE_URL`.
- Set a strong `DJANGO_SECRET_KEY` and `DJANGO_DEBUG=False`.
- Set `DJANGO_ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` to your real domains.
- Configure SMTP environment variables if you want contact-form email delivery instead of Django's console email backend.
- The frontend can be built with `npm run build` and deployed to Vercel/Netlify/Cloudflare Pages, while the Django API can run on Render/Railway/Fly.io or another Python host.
