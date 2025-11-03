import os
import sys
import django
import json

# Add the project directory to the Python path
sys.path.append('c:\\Users\\shree\\OneDrive\\Desktop\\Magic 2\\backend')

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'profilematch.settings')
django.setup()

def test_analysis_data():
    """Test what data is being returned by the analyze endpoint"""
    try:
        from analyzer.models import Analysis
        
        # Get the most recent analysis
        analysis = Analysis.objects.order_by('-created_at').first()
        
        if not analysis:
            print("No analysis found in the database")
            return
            
        print(f"Analysis ID: {analysis.id}")
        print(f"Match score: {analysis.match_score}")
        print(f"Semantic similarity: {analysis.semantic_similarity}")
        print(f"Skill match score: {analysis.skill_match_score}")
        print(f"Missing skills: {analysis.missing_skills}")
        print(f"Resume skills: {analysis.extracted_skills}")
        
        # Test the ML analysis to see what data would be generated
        from analyzer.ml_analysis import ResumeAnalyzer
        from django.conf import settings
        
        if analysis.resume and analysis.jd:
            analyzer = ResumeAnalyzer(settings.YOUTUBE_API_KEY)
            result = analyzer.perform_comprehensive_analysis(
                analysis.resume.extracted_text or "",
                analysis.jd.extracted_text or ""
            )
            
            print("\n--- ML Analysis Results ---")
            print(f"Overall score: {result['overall_score']}")
            print(f"Semantic similarity: {result['semantic_similarity']}")
            print(f"Skill match score: {result['skill_match_score']}")
            print(f"Missing skills: {result['missing_skills']}")
            print(f"Resume skills: {result['resume_skills']}")
            print(f"Job skills: {result['job_skills']}")
            
            # Check if any values are NaN
            import math
            if math.isnan(result['overall_score']):
                print("ERROR: Overall score is NaN!")
            if math.isnan(result['semantic_similarity']):
                print("ERROR: Semantic similarity is NaN!")
            if math.isnan(result['skill_match_score']):
                print("ERROR: Skill match score is NaN!")
                
    except Exception as e:
        print(f"Error testing analysis data: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_analysis_data()