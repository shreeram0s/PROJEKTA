import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Brain, 
  BarChart3, 
  Target, 
  Zap,
  Loader2
} from 'lucide-react';

const AnalysisAnimation = ({ isLoading, onComplete }) => {
  const [animationStep, setAnimationStep] = useState(0);
  
  const animationSteps = [
    { 
      title: 'Scanning Document', 
      description: 'Extracting text from your document',
      icon: <FileText className="h-12 w-12" />
    },
    { 
      title: 'Processing Text', 
      description: 'Analyzing content with NLP algorithms',
      icon: <Brain className="h-12 w-12" />
    },
    { 
      title: 'Identifying Skills', 
      description: 'Detecting key skills and qualifications',
      icon: <Zap className="h-12 w-12" />
    },
    { 
      title: 'Comparing Skills', 
      description: 'Matching with job requirements',
      icon: <Target className="h-12 w-12" />
    },
    { 
      title: 'Generating Insights', 
      description: 'Creating personalized recommendations',
      icon: <BarChart3 className="h-12 w-12" />
    }
  ];

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setAnimationStep(prev => {
          if (prev < animationSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(timer);
            // Simulate completion
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 1000);
            return prev;
          }
        });
      }, 1500);
      
      return () => clearInterval(timer);
    }
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-background border rounded-2xl p-8 max-w-md w-full mx-4"
      >
        <div className="text-center">
          <div className="h-32 w-32 mx-auto mb-6 relative">
            <motion.div
              key={animationStep}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`icon-${animationStep}`}
                  initial={{ scale: 0.5, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0.5, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  className="text-white"
                >
                  {animationSteps[animationStep]?.icon}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            {/* Pulsing animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-30"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
          
          <motion.h3
            key={`title-${animationStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold mb-2"
          >
            {animationSteps[animationStep]?.title || 'Analyzing'}
          </motion.h3>
          
          <motion.p
            key={`desc-${animationStep}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-6"
          >
            {animationSteps[animationStep]?.description || 'Processing your documents'}
          </motion.p>
          
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((animationStep + 1) / animationSteps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            Step {animationStep + 1} of {animationSteps.length}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisAnimation;