import { useScrollAnimation } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/animations";

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for small teams getting started with AI-powered CRM.",
    features: [
      "Up to 3 users",
      "Basic AI analytics",
      "Contact & lead management",
      "Email integration",
      "Mobile app access"
    ],
    cta: "Start Free Trial",
    ctaAction: "signup",
    highlight: false
  },
  {
    name: "Professional",
    price: "$99",
    description: "Advanced AI features for growing businesses with multiple teams.",
    features: [
      "Up to 15 users",
      "Full predictive analytics",
      "Intelligent automation",
      "Conversational AI chatbots",
      "Advanced reporting",
      "API access"
    ],
    cta: "Start Free Trial",
    ctaAction: "signup",
    highlight: true,
    badge: "Most Popular"
  },
  {
    name: "Enterprise",
    price: "$249",
    description: "Maximum AI power and customization for large organizations.",
    features: [
      "Unlimited users",
      "Advanced AI training",
      "Custom AI models",
      "Dedicated success manager",
      "Premium integrations",
      "SLA guarantees",
      "24/7 priority support"
    ],
    cta: "Contact Sales",
    ctaAction: "contact",
    highlight: false
  }
];

export default function Pricing() {
  const { ref, isInView } = useScrollAnimation();
  
  const handleCTA = (action: string) => {
    scrollToSection(action);
  };
  
  return (
    <section id="pricing" ref={ref} className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Flexible Plans for Every Business
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Choose the right plan to accelerate your customer relationships with AI.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`bg-white rounded-xl overflow-hidden shadow-sm border ${plan.highlight ? 'border-primary-200 transform scale-105 relative z-10' : 'border-gray-200'} hover:shadow-md transition-shadow duration-300`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
            >
              {plan.highlight && plan.badge && (
                <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                  {plan.badge}
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-xl font-medium text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mt-0.5 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Button 
                  onClick={() => handleCTA(plan.ctaAction)}
                  className={`w-full ${plan.highlight ? 'bg-primary hover:bg-primary/90' : 'bg-primary-50 hover:bg-primary-100 text-primary'}`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-gray-500">All plans include a 14-day free trial. No credit card required.</p>
        </motion.div>
      </div>
    </section>
  );
}
