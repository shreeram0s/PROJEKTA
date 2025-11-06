# ProFileMatch - AI-Powered Resume Analysis Platform

ProFileMatch is an intelligent career development platform that helps job seekers optimize their resumes and advance their careers through AI-powered analysis and personalized recommendations.

## Features

- **Resume Analysis**: Upload your resume and job description for detailed skill matching
- **AI Insights**: Get actionable insights to optimize your career profile using machine learning algorithms
- **Skill Gap Identification**: Discover missing skills compared to job requirements
- **Match Scoring**: Receive comprehensive match percentages based on semantic similarity and skill overlap
- **Learning Resources**: Access personalized YouTube tutorials for missing skills
- **Job Recommendations**: Find job opportunities tailored to your skills
- **Interview Preparation**: Get personalized interview questions and study materials
- **PDF Export**: Save your analysis results as a professional PDF report

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion for animations
- Recharts for data visualization
- Lucide-react for icons

### Backend
- Django + Django REST Framework
- PostgreSQL database
- spaCy for NLP processing
- scikit-learn for similarity calculations
- YouTube Data API for learning resources
- Adzuna API for job recommendations

## Deployment

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL

### Environment Variables
Use the provided samples and copy them to real env files for local dev (never commit your real keys):

Backend (Django): `backend/env.sample` → copy to `backend/.env` and fill values

Frontend (Vite): `frontend/env.sample` → copy to `frontend/.env` and set `VITE_API_URL`.

On Render, set all secrets in the Render Dashboard or via `render.yaml` `envVars`.

### Local Development Setup

1. **Backend Setup**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

2. **Frontend Setup**:
```bash
cd frontend
npm install
npm run dev
```

### Deployment on Render

This repo includes `render.yaml` which provisions:
- A Python Web Service for the backend in `backend/`
- A Static Site for the frontend in `frontend/`
- A managed Postgres database

Steps:
1. Push this repository to GitHub.
2. In Render, New + → Blueprint → select this repo (it will detect `render.yaml`).
3. Before first deploy, set environment variables in each service:
   - Backend: `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, `DB_*`, `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`, `YOUTUBE_API_KEY`.
   - Frontend: `VITE_API_URL` pointing to the backend URL.
4. Deploy. Render will build and start both services automatically.

## Project Structure
```
├── backend/
│   ├── analyzer/     # Core Django app with ML analysis
│   ├── profilematch/ # Project settings
│   └── manage.py
├── frontend/
│   ├── src/components/ # UI components
│   ├── src/pages/      # Page routes
│   └── vite.config.js
└── README.md
```

## API Endpoints

- `POST /api/upload/` - Upload resume and job description
- `POST /api/analyze/` - Analyze uploaded documents
- `GET /api/jobs/` - Get job recommendations
- `POST /api/interview-kit/` - Get interview preparation materials
- `GET /api/history/` - Get analysis history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or questions, please open an issue on this repository.