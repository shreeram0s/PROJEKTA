import os
import django
import sys

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'profilematch.settings')
django.setup()

from analyzer.views import fetch_jobs_from_adzuna

# Test the function
skills = ['python', 'javascript', 'react']
jobs = fetch_jobs_from_adzuna(skills)

print(f"Fetched {len(jobs)} jobs")
for i, job in enumerate(jobs[:3]):
    print(f"{i+1}. {job['title']} at {job['company']} in {job['location']}")