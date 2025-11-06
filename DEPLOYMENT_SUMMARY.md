# ProFileMatch Deployment Guide

## Overview

This guide provides instructions for deploying the ProFileMatch application to production environments. The application consists of a Django backend and a React frontend that can be deployed separately.

## Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL database
- API keys for YouTube and Adzuna services

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Django Settings
SECRET_KEY=your_secret_key_here
DEBUG=False
ALLOWED_HOSTS=your-backend-domain.com,localhost,127.0.0.1

# CORS Settings
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com,http://localhost:5176
CORS_ALLOW_ALL_ORIGINS=False

# Database Configuration
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=5432

# API Keys
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key
YOUTUBE_API_KEY=your_youtube_api_key
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory with the following variables:

```env
VITE_API_URL=https://your-backend-domain.com
```

## Local Development Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Production Deployment

### Render Deployment

1. Fork this repository to your GitHub account
2. Create a new Web Service on Render for the backend:
   - Connect your GitHub repository
   - Set Root Directory to: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python manage.py migrate && gunicorn profilematch.wsgi:application`
   - Add all required environment variables

3. Create another Web Service on Render for the frontend:
   - Connect your GitHub repository
   - Set Root Directory to: `frontend`
   - Build Command: `npm install && npm run build`
   - Set Publish Directory to: `dist`
   - Add environment variables as needed

### Manual Deployment

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn profilematch.wsgi:application
```

#### Frontend

```bash
cd frontend
npm install
npm run build
# Serve the dist folder with your preferred web server (nginx, Apache, etc.)
```

## Database Setup

The application uses PostgreSQL. Ensure you have a PostgreSQL database available and configure the connection details in your environment variables.

For Render deployment, you can use Render's built-in PostgreSQL service or an external database.

## API Keys Configuration

1. **YouTube Data API**:
   - Go to Google Cloud Console
   - Enable YouTube Data API v3
   - Create credentials (API key)
   - Add to your environment variables

2. **Adzuna API**:
   - Register at https://developer.adzuna.com/
   - Get your App ID and App Key
   - Add to your environment variables

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `CORS_ALLOWED_ORIGINS` includes your frontend domain
2. **Database Connection**: Verify database credentials and network access
3. **Missing Environment Variables**: Check that all required variables are set
4. **Static Files**: Run `collectstatic` for production deployments

### Logs and Monitoring

Check your deployment platform's logs for error messages and monitor application performance.

## Maintenance

- Regularly update dependencies
- Monitor API usage limits
- Backup database regularly
- Review and rotate API keys periodically

## Support

For support or questions, please open an issue on the repository.