import os
import django
import sys

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'profilematch.settings')
django.setup()

from analyzer.models import Analysis

try:
    analysis = Analysis.objects.get(id=1)
    print(f"Analysis found: {analysis.id}")
    print(f"Resume text length: {len(analysis.resume.extracted_text) if analysis.resume.extracted_text else 0}")
    print(f"JD text length: {len(analysis.jd.extracted_text) if analysis.jd.extracted_text else 0}")
    print(f"Match score: {analysis.match_score}")
    print(f"Missing skills: {analysis.missing_skills}")
except Analysis.DoesNotExist:
    print("Analysis not found")
except Exception as e:
    print(f"Error: {e}")