import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Youtube, 
  BookOpen, 
  GraduationCap, 
  ArrowRight,
  ExternalLink,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SuggestionsPage = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [missingSkills, setMissingSkills] = useState([]);

  useEffect(() => {
    // Get analysis data from localStorage
    const lastAnalysis = localStorage.getItem('lastAnalysis');
    const storedMissingSkills = localStorage.getItem('missingSkills');
    
    if (lastAnalysis) {
      try {
        const parsedAnalysis = JSON.parse(lastAnalysis);
        setAnalysisData(parsedAnalysis);
      } catch (e) {
        console.error('Error parsing last analysis:', e);
      }
    }
    
    if (storedMissingSkills) {
      try {
        const parsedSkills = JSON.parse(storedMissingSkills);
        setMissingSkills(parsedSkills);
      } catch (e) {
        console.error('Error parsing missing skills:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Suggestions</span> & Learning
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Personalized recommendations to improve your skills and advance your career based on your analysis results
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Suggestions Section */}
      <section className="container mx-auto px-4 sm:px-6 py-16 bg-muted/50 rounded-3xl my-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Lightbulb className="h-8 w-8 text-primary" />
              AI-Powered Suggestions
            </h2>
            <p className="text-muted-foreground text-lg">
              Actionable insights to optimize your career profile
            </p>
          </div>
          
          {analysisData && analysisData.suggestions && analysisData.suggestions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysisData.suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background border rounded-2xl p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-primary">
                      <Lightbulb className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Recommendation #{index + 1}</h3>
                      <p className="text-muted-foreground">{suggestion}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Suggestions Available</h3>
              <p className="text-muted-foreground">
                Please complete an analysis to receive personalized suggestions.
              </p>
              <Link
                to="/home"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Analyze Your Resume
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Learning Resources Section */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              Learning Resources
            </h2>
            <p className="text-muted-foreground text-lg">
              Personalized tutorials to help you develop missing skills
            </p>
          </div>
          
          {analysisData && analysisData.youtube_recommendations && 
           Object.keys(analysisData.youtube_recommendations).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(analysisData.youtube_recommendations).map(([skill, videos], skillIndex) => (
                <motion.div
                  key={skillIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                  className="bg-background border rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{skill}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {videos.map((video, videoIndex) => (
                      <a
                        key={videoIndex}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                            {video.title}
                          </h4>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <ExternalLink className="h-3 w-3" />
                            <span>Watch on YouTube</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Learning Resources Available</h3>
              <p className="text-muted-foreground">
                Please complete an analysis to receive personalized learning recommendations.
              </p>
              <Link
                to="/home"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Analyze Your Resume
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Next Steps?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Discover job opportunities tailored to your skills and prepare for interviews
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors shadow-lg"
            >
              <ExternalLink className="h-5 w-5" />
              Find Jobs
            </Link>
            <Link
              to="/interview-prep"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors"
            >
              <GraduationCap className="h-5 w-5" />
              Interview Prep
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuggestionsPage;