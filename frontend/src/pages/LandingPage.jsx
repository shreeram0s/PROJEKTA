import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Code, 
  Zap, 
  Database, 
  Brain, 
  Cpu, 
  Lightbulb, 
  Users, 
  UserCheck, 
  Briefcase, 
  GraduationCap, 
  Download,
  FileText,
  BarChart3,
  Target,
  Award,
  Upload
} from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Resume Analysis',
    description: 'AI-powered analysis of your resume to extract skills and experiences using advanced NLP techniques.'
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: 'Analytics Dashboard',
    description: 'Visualize your skills and identify areas for improvement with interactive charts and graphs.'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Learning Resources',
    description: 'Get personalized learning recommendations based on your skill gaps from YouTube tutorials.'
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: 'AI Insights',
    description: 'Receive actionable insights to optimize your career profile using machine learning algorithms.'
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Job Recommendations',
    description: 'Discover job opportunities tailored to your skills using Adzuna API with location-based filtering.'
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: 'Interview Prep',
    description: 'Get personalized interview questions and study materials for technical and behavioral interviews.'
  }
];

const workflowSteps = [
  {
    icon: <Upload className="h-6 w-6" />,
    title: 'Upload Documents',
    description: 'Upload your resume and job description in PDF, DOCX, or TXT format'
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'AI Analysis',
    description: 'Our AI analyzes your skills and experiences using NLP and ML algorithms'
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Get Insights',
    description: 'Receive personalized recommendations and skill gap analysis'
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Visualize Data',
    description: 'View detailed analytics and visualizations of your skills'
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Learn & Improve',
    description: 'Access personalized learning resources for skill development'
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Find Opportunities',
    description: 'Discover job matches based on your profile and skills'
  },
  {
    icon: <UserCheck className="h-6 w-6" />,
    title: 'Prepare & Apply',
    description: 'Get interview prep materials and export your analysis'
  }
];

const technologies = [
  {
    category: 'Frontend',
    techs: [
      { name: 'React', icon: <Code className="h-5 w-5" /> },
      { name: 'Vite', icon: <Zap className="h-5 w-5" /> },
      { name: 'Tailwind CSS', icon: <Sparkles className="h-5 w-5" /> },
      { name: 'Framer Motion', icon: <Zap className="h-5 w-5" /> }
    ]
  },
  {
    category: 'Backend',
    techs: [
      { name: 'Django', icon: <Database className="h-5 w-5" /> },
      { name: 'PostgreSQL', icon: <Database className="h-5 w-5" /> },
      { name: 'REST API', icon: <Globe className="h-5 w-5" /> }
    ]
  },
  {
    category: 'AI/NLP/ML',
    techs: [
      { name: 'spaCy', icon: <Brain className="h-5 w-5" /> },
      { name: 'NLTK', icon: <Brain className="h-5 w-5" /> },
      { name: 'scikit-learn', icon: <Cpu className="h-5 w-5" /> },
      { name: 'TF-IDF', icon: <Lightbulb className="h-5 w-5" /> }
    ]
  },
  {
    category: 'APIs',
    techs: [
      { name: 'Adzuna', icon: <Briefcase className="h-5 w-5" /> },
      { name: 'YouTube', icon: <Users className="h-5 w-5" /> }
    ]
  }
];

const targetUsers = [
  {
    title: 'Job Seekers',
    description: 'Professionals looking to optimize their resumes and find better job opportunities.'
  },
  {
    title: 'Career Changers',
    description: 'Individuals transitioning to new fields who need guidance on skill development.'
  },
  {
    title: 'Students',
    description: 'Graduates preparing to enter the job market and build their professional profiles.'
  },
  {
    title: 'Recruiters',
    description: 'HR professionals who want to quickly analyze candidate profiles and match them with positions.'
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Career Analysis Platform</span>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
                <Brain className="h-16 w-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              ProFileMatch
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              AI-powered Resume Analyzer that helps you optimize your career profile and land your dream job using advanced NLP and Machine Learning techniques
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/home"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:opacity-90 transition-opacity shadow-lg"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            {/* Removed "Browse Jobs" button as per user request - jobs should only be fetched after resume upload */}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Career Insights</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to understand and optimize your career profile
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="bg-background p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 sm:px-6 py-16 bg-muted/50 rounded-3xl my-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Simple steps to optimize your career profile
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                  {step.icon}
                </div>
              </div>
              <div className="text-4xl font-bold text-primary/20 mb-2">0{index + 1}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technologies Used */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Modern Technologies</h2>
            <p className="text-muted-foreground text-lg">
              Built with cutting-edge tools and frameworks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                className="bg-background p-6 rounded-2xl border"
              >
                <h3 className="text-lg font-semibold mb-4 text-center">{category.category}</h3>
                <div className="space-y-3">
                  {category.techs.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center gap-3">
                      <div className="text-primary">
                        {tech.icon}
                      </div>
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Can Benefit</h2>
            <p className="text-muted-foreground text-lg">
              Designed for various career development needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {targetUsers.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-background p-6 rounded-2xl border"
              >
                <h3 className="text-xl font-semibold mb-2">{user.title}</h3>
                <p className="text-muted-foreground">{user.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;