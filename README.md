# Abhin Ashok Portfolio — Django + React

A full-stack rebuild of the portfolio concept we designed: **Cosmic Neon / Ocean Blue**, responsive, animated, and content-managed through Django Admin.

## Architecture

```text
abhin-fullstack-portfolio/
├── backend/                 # Django + DRF API + Admin
│   ├── config/
│   └── portfolio_api/
├── frontend/                # React + Vite SPA
│   ├── public/
│   └── src/
├── docker-compose.yml       # PostgreSQL + Django development stack
└── README.md
```

### Backend API

- `GET /api/portfolio/` — profile, skills, projects and experience
- `POST /api/contact/` — stores a contact message and attempts email delivery
- `/admin/` — edit portfolio content and review messages

### Frontend

The React app provides:

- animated cosmic starfield
- ocean-blue glassmorphism UI
- orbital/parallax hero visual
- animated reveal-on-scroll sections
- animated skill progress bars
- project filtering and hover effects
- responsive mobile navigation
- light/dark preference toggle
- working contact form wired to Django
- reduced-motion accessibility support

## Local setup

### 1. Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
# macOS/Linux
# source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_portfolio
python manage.py runserver
```

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## PostgreSQL with Docker

```bash
docker compose up --build
```

The Django API runs on `http://localhost:8000` and PostgreSQL on `localhost:5432`.

## Production

Use PostgreSQL, a strong secret key, `DEBUG=False`, explicit `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`, and SMTP credentials for the contact form. Build the React app with `npm run build` and deploy the generated `dist/` directory to a static frontend host, while deploying Django separately.

## Content management

The React UI does not hardcode your portfolio records. The database is the source of truth, so after `seed_portfolio` you can edit the following from Django Admin:

- Profile and social links
- Skills and proficiency values
- Projects, technology tags and links
- Career / education timeline
- Contact submissions

## Notes on assets

The seed data points the profile image and CV to the corresponding public files in your existing GitHub portfolio repository so the starter works immediately. Replace those URLs with local files or your production CDN when deploying the new project independently.
