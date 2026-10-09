#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/backend"
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
[ -f .env ] || cp .env.example .env
python manage.py migrate
python manage.py seed_portfolio
python manage.py runserver
