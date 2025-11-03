# Workflow Improvements

## Overview
This document outlines the improvements made to ensure all processes in the ProFileMatch application are properly linked and use NLP/ML techniques for skill extraction and personalized recommendations.

## Improved Workflow

### 1. Document Upload and Analysis
- User uploads both resume and job description
- System uses NLP techniques (spaCy, NLTK) to extract text from PDF, DOCX, and TXT files
- Text preprocessing includes lemmatization, stopword removal, and POS filtering

### 2. Skill Extraction
- Uses curated technical and soft skills dictionaries
- Case-insensitive substring matching for skill identification
- Job description skills include priority scoring based on frequency and emphasis words
- Missing skills calculated as job_skills minus resume_skills

### 3. Analysis and Scoring
- Semantic similarity calculated using SentenceTransformer embeddings (primary) with TF-IDF fallback
- Skill match score calculated as intersection of resume and job skills
- Overall match score uses weighted combination (40% semantic similarity, 50% skill match) with penalties for missing skills

### 4. Data Storage and Sharing
- Analysis results stored in localStorage for sharing between pages
- All subsequent pages (Jobs, Interview Prep) use data from the same analysis

### 5. Job Recommendations
- Fetches jobs from Adzuna API based on extracted resume skills
- Uses actual skills from the most recent analysis, not static defaults
- Results tailored to user's specific skill set

### 6. Interview Preparation
- Generates personalized questions based on missing skills
- Provides YouTube learning resources for skill improvement
- Uses data from the same analysis to maintain consistency

## NLP and ML Techniques Used

### Text Extraction
- **pdfplumber**: PDF text extraction
- **docx2txt**: DOC/DOCX text extraction

### Text Preprocessing
- **spaCy**: Lemmatization, POS tagging, stopword removal (primary)
- **NLTK**: Tokenization, lemmatization, stopword removal (fallback)

### Skill Extraction
- **Custom dictionaries**: Curated lists of technical and soft skills
- **Substring matching**: Case-insensitive skill identification
- **Priority scoring**: Frequency and emphasis word boosting for job skills

### Semantic Analysis
- **SentenceTransformer**: all-MiniLM-L6-v2 model for embedding-based similarity (primary)
- **scikit-learn**: TF-IDF with cosine similarity (fallback)

## Data Flow

1. User uploads resume and job description
2. Text extracted using NLP techniques
3. Skills extracted from both documents
4. Analysis performed using ML models
5. Results stored in localStorage
6. Jobs page uses resume skills for job recommendations
7. Interview Prep page uses missing skills for personalized questions
8. All visualizations based on actual analysis data

## Benefits of Improvements

- **Consistency**: All pages use data from the same analysis
- **Personalization**: Recommendations based on actual skill extraction
- **Accuracy**: NLP/ML techniques provide better skill identification
- **Relevance**: Job recommendations and interview questions match user's specific skills