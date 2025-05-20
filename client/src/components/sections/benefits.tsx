import { useScrollAnimation } from "@/lib/animations";
import { motion } from "framer-motion";

const benefits = [
  {
    percentage: "37%",
    title: "Increase in Sales Productivity",
    description: "AI-powered automation eliminates busywork, letting your team focus on building relationships and closing deals.",
    color: "border-primary-500"
  },
  {
    percentage: "28%",
    title: "Reduction in Customer Churn",
    description: "Predictive analytics identify at-risk customers early, enabling proactive intervention and relationship rescue.",
    color: "border-accent-500"
  },
  {
    percentage: "41%",
    title: "Higher Customer Satisfaction",
    description: "Personalized experiences and faster resolution times dramatically improve customer happiness and loyalty.",
    color: "border-secondary-500"
  },
  {
    percentage: "52%",
    title: "Faster Onboarding",
    description: "Intelligent workflows and guided processes help new team members become productive quickly.",
    color: "border-primary-500"
  },
  {
    percentage: "63%",
    title: "Improved Lead Conversion",
    description: "AI-driven lead scoring and nurturing delivers higher quality prospects to your sales team.",
    color: "border-accent-500"
  },
  {
    percentage: "19%",
    title: "Revenue Growth",
    description: "Companies using AICon<span class='text-accent'>nect</span>CRM report significant increases in average deal size and overall revenue.",
    color: "border-secondary-500"
  }
];

export default function Benefits() {
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
    <section id="benefits" ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Business Outcomes That Matter
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our customers are achieving transformative results with AICon<span className="text-accent">nect</span>CRM.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className={`bg-gray-50 rounded-xl p-8 border-t-4 ${benefit.color} shadow-sm`}
              variants={itemVariants}
            >
              <div className={`text-4xl font-bold mb-4 ${benefit.color.includes('primary') ? 'text-primary' : benefit.color.includes('accent') ? 'text-accent' : 'text-secondary'}`}>
                {benefit.percentage}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: benefit.description }}></p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 max-w-3xl mx-auto bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <img 
              className="w-24 h-24 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
              alt="Sarah Chen, VP of Sales"
            />
            <div>
              <p className="text-gray-600 italic mb-4">"AICon<span className="text-accent">nect</span>CRM has transformed how our sales team works. The AI-powered insights help us focus on the right opportunities at the right time, and our reps love how much administrative work has been automated away."</p>
              <div>
                <p className="text-gray-900 font-medium">Sarah Chen</p>
                <p className="text-gray-500">VP of Sales, TechVision Inc.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
