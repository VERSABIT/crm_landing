import { useScrollAnimation } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/animations";

const steps = [
  {
    number: "1",
    title: "First Contact Intelligence",
    description: "AI analyzes prospects from the first interaction, instantly creating rich profiles and suggesting personalized engagement strategies."
  },
  {
    number: "2",
    title: "Opportunity Prediction",
    description: "Smart algorithms identify high-value opportunities and recommend optimal next steps to move deals forward."
  },
  {
    number: "3",
    title: "Relationship Development",
    description: "Continuous analysis of customer interactions provides insights to deepen relationships and maximize customer satisfaction."
  },
  {
    number: "4",
    title: "Retention & Growth",
    description: "Proactive churn prevention and automated upsell recommendations help maximize customer lifetime value."
  }
];

export default function ProductShowcase() {
  const { ref, isInView } = useScrollAnimation();
  
  return (
    <section id="showcase" ref={ref} className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Your Customer Journey, Reimagined
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            See how Am<span className="text-accent">Do</span>CRM transforms every customer touchpoint with intelligent insights and automation.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img 
              className="w-full h-auto rounded-xl shadow-lg border border-gray-200"
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
              alt="AI visualization overlaid on customer journey map"
            />
          </motion.div>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="space-y-4"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary font-semibold">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 pl-13 ml-13">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button 
            size="lg" 
            onClick={() => scrollToSection("features")}
            className="gradient-bg hover:opacity-90 transition-opacity duration-200"
          >
            <PlayCircle className="mr-2 h-5 w-5" /> Watch the Full Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
