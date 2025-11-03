# ProFileMatch - AI-powered Resume Analyzer

ProFileMatch is an AI-based platform that analyzes resumes, extracts skills, provides recommendations, and suggests learning resources.

## 🧠 Overview

ProFileMatch helps users optimize their career journey by providing AI-powered analysis of resumes. The platform offers:

- **Resume Analysis**: Upload resumes for detailed AI analysis
- **Skill Extraction**: Identify technical and soft skills
- **Data Visualization**: Interactive charts and graphs
- **Learning Resources**: Personalized recommendations for skill development

## ⚙️ Tech Stack

### Frontend
- **React + Vite** (running on port 5176)
- **React Router DOM** for navigation
- **Tailwind CSS + shadcn/ui** for styling and layout
- **Framer Motion** for advanced animations
- **Lucide-react** for icons
- **Recharts** for data visualizations
- **Axios** for backend API communication
- Supports both **light and dark themes**

### Backend
- **Django + Django REST Framework**
- **PostgreSQL** (hosted on Render)
- **spaCy** for NLP and skill extraction
- **scikit-learn** for TF-IDF and similarity analysis
- **pdfplumber**, **docx2txt** for document text extraction
- **google-api-python-client** for YouTube integration
- **requests** for external API calls

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL database

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
├── backend/
│   ├── analyzer/          # Main Django app
│   │   ├── models.py      # Database models
│   │   ├── views.py       # API endpoints
│   │   ├── ml_analysis.py # NLP and ML analysis
│   │   └── urls.py        # URL routing
│   ├── profilematch/      # Django project settings
│   └── manage.py          # Django CLI tool
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   └── vite.config.js     # Vite configuration
```

## 🧩 Frontend Pages

1. **LandingPage.jsx** - Hero section with features and CTA
2. **Home.jsx** - Resume upload and analysis
3. **HistoryPage.jsx** - Analysis history and tracking
4. **ComparePage.jsx** - Resume comparison with visualizations
5. **AdminPanel.jsx** - Admin dashboard with analytics

## ⚙️ Backend Endpoints

- `POST /api/upload/` - Upload resume
- `POST /api/analyze/` - Perform NLP analysis and return results
- `GET /api/history/` - Retrieve analysis history
- `POST /api/compare/` - Compare two resumes

## 🧠 APPLICATION WORKFLOW

1. **Landing Page → Get Started**
2. **Document Upload (Resume)**
3. **AI/NLP Analysis:**
   - Extracts text
   - Identifies skills, experience, and keywords
   - Computes similarity score
   - Displays:
     - Match % (TF-IDF cosine similarity)
     - Missing Skills
     - Strengths & Weaknesses
4. **Visualization:**
   - Pie chart for match %
   - Bar chart for missing vs matched skills
5. **Learning Resources:**
   - Provides YouTube tutorials for missing skills

## 🗄️ Database Models

### Resume
- id
- file
- upload_date
- extracted_text

### Analysis
- resume_id
- match_score
- missing_skills
- extracted_skills
- semantic_similarity
- skill_match_score
- suggestions
- resume_keyword_freq
- jd_keyword_freq
- created_at

## 🎨 Design & UI Guidelines

- Modern AI SaaS style design
- Soft gradients and glassmorphism effects
- Blue-purple color palette for professional appeal
- Responsive layout for all device sizes
- Dark and light mode support
- Framer Motion animations for enhanced UX

## 🚀 Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set environment variables:
   - DATABASE_URL
   - YOUTUBE_API_KEY
4. Add build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
5. Add start command: `gunicorn profilematch.wsgi:application`

### Frontend (Vercel)
1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set environment variables if needed
4. Deploy with default settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For support or inquiries, please contact the development team.