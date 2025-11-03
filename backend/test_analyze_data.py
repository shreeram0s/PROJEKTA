import os
import sys
import django
import json

# Add the project directory to the Python path
sys.path.append('c:\\Users\\shree\\OneDrive\\Desktop\\Magic 2\\backend')

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'profilematch.settings')
django.setup()

def test_analyze_data():
    """Test what data is being returned by the analyze endpoint"""
    try:
        from analyzer.models import Analysis
        
        # Get the most recent analysis
        analysis = Analysis.objects.order_by('-created_at').first()
        
        if not analysis:
            print("No analysis found in the database")
            return
            
        print(f"Analysis ID: {analysis.id}")
        print(f"Missing skills: {analysis.missing_skills}")
        print(f"Resume skills: {analysis.extracted_skills}")
        print(f"Match score: {analysis.match_score}")
        
        # Test the ML analysis to see what YouTube recommendations would be generated
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
            print(f"Missing skills: {result['missing_skills']}")
            print(f"Resume skills: {result['resume_skills']}")
            print(f"Job skills: {result['job_skills']}")
            print(f"Semantic similarity: {result['semantic_similarity']}")
            print(f"Skill match score: {result['skill_match_score']}")
            
            # Check YouTube recommendations specifically
            youtube_recommendations = result.get('youtube_recommendations', {})
            print(f"\nYouTube recommendations: {youtube_recommendations}")
            print(f"Number of skills with recommendations: {len(youtube_recommendations)}")
            
            for skill, videos in youtube_recommendations.items():
                print(f"  {skill}: {len(videos) if videos else 0} videos")
                
    except Exception as e:
        print(f"Error testing analyze data: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_analyze_data()