import os
import sys
import django
from django.conf import settings

# Add the project directory to the Python path
sys.path.append('c:\\Users\\shree\\OneDrive\\Desktop\\Magic 2\\backend')

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'profilematch.settings')
django.setup()

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def test_youtube_api():
    """Test YouTube API with the configured key"""
    try:
        # Get the YouTube API key from Django settings
        api_key = settings.YOUTUBE_API_KEY
        print(f"Using API Key: {api_key[:10]}...{api_key[-5:]}")  # Show partial key for verification
        
        if not api_key:
            print("Error: No YouTube API key found in settings")
            return False
            
        # Test the YouTube API
        youtube = build('youtube', 'v3', developerKey=api_key)
        
        # Search for a simple query
        search_response = youtube.search().list(
            q="python tutorial",
            part='snippet',
            type='video',
            maxResults=3
        ).execute()
        
        print("YouTube API Test Results:")
        print(f"Found {len(search_response.get('items', []))} videos")
        
        for i, item in enumerate(search_response.get('items', [])):
            print(f"{i+1}. {item['snippet']['title']}")
            print(f"   URL: https://www.youtube.com/watch?v={item['id']['videoId']}")
            print(f"   Thumbnail: {item['snippet']['thumbnails']['default']['url']}")
            print()
            
        return True
        
    except HttpError as e:
        if 'quotaExceeded' in str(e):
            print("YouTube API quota has been exceeded. This is a common limitation with the free tier.")
            print("Error details:", str(e))
            return False
        else:
            print(f"HTTP Error testing YouTube API: {e}")
            return False
    except Exception as e:
        print(f"Error testing YouTube API: {e}")
        return False

def test_ml_youtube_recommendations():
    """Test the ML analysis YouTube recommendations"""
    try:
        print("\n--- Testing ML Analysis YouTube Recommendations ---")
        from analyzer.ml_analysis import YouTubeRecommendationEngine
        
        # Get the YouTube API key from Django settings
        api_key = settings.YOUTUBE_API_KEY
        print(f"Using API Key: {api_key[:10]}...{api_key[-5:]}")
        
        # Test with some sample skills
        skills = ['python', 'javascript', 'react']
        
        engine = YouTubeRecommendationEngine(api_key)
        recommendations = engine.get_skill_recommendations(skills)
        
        print(f"Recommendations for skills {skills}:")
        print(f"Found recommendations for {len(recommendations)} skills")
        
        for skill, videos in recommendations.items():
            print(f"\n{skill}:")
            if videos:
                print(f"  Found {len(videos)} videos:")
                for i, video in enumerate(videos):
                    print(f"    {i+1}. {video['title']}")
                    print(f"       URL: {video['url']}")
            else:
                print("  No videos found (possibly due to quota limits)")
                
        return True
    except Exception as e:
        print(f"Error testing ML YouTube recommendations: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("=== Testing YouTube API Directly ===")
    test_youtube_api()
    
    print("\n=== Testing ML Analysis YouTube Integration ===")
    test_ml_youtube_recommendations()