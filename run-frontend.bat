@echo off
cd /d "%~dp0frontend"
npm install
if not exist .env copy .env.example .env
npm run dev
