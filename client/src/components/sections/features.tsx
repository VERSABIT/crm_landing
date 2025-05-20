import { useScrollAnimation } from "@/lib/animations";
import { Brain, MessageCircle, TrendingUp, Bot, Target, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Predictive Analytics",
    description: "Forecast customer behaviors, identify sales opportunities, and predict future trends with AI-powered insights.",
    icon: <Brain className="text-primary text-xl" />,
    iconBg: "bg-primary-100",
    items: [
      "Lead scoring and prioritization",
      "Customer churn prediction",
      "Revenue forecasting"
    ]
  },
  {
    title: "Conversational AI",
    description: "Engage customers through intelligent chatbots and virtual assistants that understand context and intent.",
    icon: <MessageCircle className="text-accent text-xl" />,
    iconBg: "bg-accent-100",
    items: [
      "Natural language processing",
      "24/7 intelligent support",
      "Seamless human handoff"
    ]
  },
  {
    title: "Dynamic Personalization",
    description: "Automatically tailor customer interactions based on behavior, preferences, and historical data.",
    icon: <TrendingUp className="text-secondary text-xl" />,
    iconBg: "bg-secondary-100",
    items: [
      "1:1 customer journeys",
      "Smart content recommendations",
      "Behavioral triggers"
    ]
  },
  {
    title: "Intelligent Automation",
    description: "Streamline workflows and eliminate repetitive tasks with smart automation that learns and improves.",
    icon: <Bot className="text-primary text-xl" />,
    iconBg: "bg-primary-100",
    items: [
      "Smart workflow optimization",
      "Auto-categorization of inquiries",
      "Data entry automation"
    ]
  },
  {
    title: "Customer Insights",
    description: "Uncover hidden patterns and actionable insights from your customer data with advanced analytics.",
    icon: <Target className="text-accent text-xl" />,
    iconBg: "bg-accent-100",
    items: [
      "Sentiment analysis",
      "Customer segmentation",
      "Trend identification"
    ]
  },
  {
    title: "AI-Enhanced Security",
    description: "Protect sensitive customer data with intelligent threat detection and privacy-focused design.",
    icon: <Shield className="text-secondary text-xl" />,
    iconBg: "bg-secondary-100",
    items: [
      "Anomaly detection",
      "Automated compliance checks",
      "Adaptive security protocols"
    ]
  }
];

export default function Features() {
  const { ref, isInView } = useScrollAnimation();
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <section id="features" ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            AI-Powered Features That Drive Results
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Harness the power of artificial intelligence to understand your customers, anticipate their needs, and create personalized experiences at scale.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2 text-gray-600">
                {feature.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-5 w-5 text-secondary mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
