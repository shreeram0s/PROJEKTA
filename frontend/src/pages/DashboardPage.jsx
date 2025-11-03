import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  BarChart3, 
  PieChartIcon, 
  TrendingUp,
  ArrowRight,
  FileText,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    // Get analysis data from localStorage
    const lastAnalysis = localStorage.getItem('lastAnalysis');
    
    if (lastAnalysis) {
      try {
        const parsedAnalysis = JSON.parse(lastAnalysis);
        setAnalysisData(parsedAnalysis);
      } catch (e) {
        console.error('Error parsing last analysis:', e);
      }
    }
  }, []);

  // Prepare data for charts if analysisData exists
  const skillMatchData = analysisData ? [
    { name: 'Matched Skills', value: analysisData.resume_skills?.filter(skill => analysisData.job_skills?.includes(skill)).length || 0 },
    { name: 'Missing Skills', value: analysisData.missing_skills?.length || 0 },
  ] : [];

  const COLORS = ['#3b82f6', '#ef4444'];
  
  // Prepare bar chart data for skill frequencies
  const resumeSkillFreq = analysisData && analysisData.resume_keyword_freq ? 
    Object.entries(analysisData.resume_keyword_freq)
      .map(([skill, freq]) => ({ name: skill, frequency: freq }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10) : [];
  
  const jobSkillFreq = analysisData && analysisData.jd_keyword_freq ? 
    Object.entries(analysisData.jd_keyword_freq)
      .map(([skill, freq]) => ({ name: skill, frequency: freq }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10) : [];
  
  // Combine data for comparison chart
  const combinedSkillData = [];
  if (analysisData) {
    const allSkills = [...new Set([
      ...Object.keys(analysisData.resume_keyword_freq || {}), 
      ...Object.keys(analysisData.jd_keyword_freq || {})
    ])];
    
    allSkills.forEach(skill => {
      combinedSkillData.push({
        name: skill,
        resume: analysisData.resume_keyword_freq?.[skill] || 0,
        job: analysisData.jd_keyword_freq?.[skill] || 0
      });
    });
  }
  
  // Sort by job frequency and take top 10
  const sortedCombinedData = combinedSkillData
    .sort((a, b) => b.job - a.job)
    .slice(0, 10);
  
  // Prepare scatter plot data for skill comparison
  const scatterData = analysisData && analysisData.resume_skills ? 
    analysisData.resume_skills.map((skill, index) => ({
      x: index,
      y: analysisData.resume_keyword_freq?.[skill] || 0,
      z: analysisData.job_skills?.includes(skill) ? 200 : 100,
      skill: skill
    })) : [];

  // Helper function to safely get a rounded percentage value
  const getRoundedPercentage = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return 0;
    }
    return Math.round(Math.max(0, Math.min(100, value)));
  };

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
              Analytics <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Dashboard</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Visualize your skills, match scores, and career insights with interactive charts and graphs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {analysisData ? (
            <div className="space-y-12">
              {/* Score Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-background border rounded-2xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {getRoundedPercentage(analysisData.overall_score || analysisData.match_score)}%
                  </div>
                  <div className="text-muted-foreground">Overall Match</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-background border rounded-2xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-blue-500 mb-2">
                    {getRoundedPercentage(analysisData.semantic_similarity)}%
                  </div>
                  <div className="text-muted-foreground">Semantic Similarity</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-background border rounded-2xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-purple-500 mb-2">
                    {getRoundedPercentage(analysisData.skill_match_score)}%
                  </div>
                  <div className="text-muted-foreground">Skill Match</div>
                </motion.div>
              </div>

              {/* Charts Grid - Only Relevant Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skill Distribution Pie Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-background border rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-primary" />
                    Skill Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={skillMatchData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillMatchData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Top Skills Bar Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-background border rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Top Skills in Resume
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={resumeSkillFreq}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" scale="band" />
                      <Tooltip />
                      <Bar dataKey="frequency" fill="#3b82f6" name="Frequency" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Skill Comparison Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-background border rounded-2xl p-6 lg:col-span-2"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Skill Frequency Comparison (Resume vs Job Description)
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={sortedCombinedData}
                      margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="resume" name="Resume Frequency" fill="#3b82f6" />
                      <Bar dataKey="job" name="Job Description Frequency" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Document Comparison Scatter Plot */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-background border rounded-2xl p-6 lg:col-span-2"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Document Skill Comparison
                  </h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={sortedCombinedData}
                      margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="resume" name="Resume Skills" fill="#3b82f6" />
                      <Bar dataKey="job" name="Job Description Skills" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Analysis Data Available</h3>
              <p className="text-muted-foreground mb-6">
                Complete an analysis to view your personalized dashboard with charts and graphs.
              </p>
              <Link
                to="/home"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Continue Your Career Journey</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Get personalized suggestions and learning resources to improve your skills
          </p>
          <Link
            to="/suggestions"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            View Suggestions
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;