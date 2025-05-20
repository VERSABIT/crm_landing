import { useScrollAnimation } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/animations";

const testimonials = [
  {
    quote: "The AI capabilities have completely transformed how we understand our customers. We're now able to anticipate needs before customers even express them.",
    author: "Michael Johnson",
    role: "CTO, Elevated Digital",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    stars: 5
  },
  {
    quote: "Our sales team has increased productivity by 40% since implementing AIConnectCRM. The intelligent automation handles the repetitive tasks so our team can focus on relationships.",
    author: "Priya Patel",
    role: "Sales Director, GrowthForce",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    stars: 5
  },
  {
    quote: "The predictive analytics have completely changed our approach to customer retention. We've reduced churn by 32% in just six months.",
    author: "James Wilson",
    role: "Customer Success Manager, BlueWave",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    stars: 4.5
  }
];

export default function Testimonials() {
  const { ref, isInView } = useScrollAnimation();
  
  const renderStars = (count: number) => {
    const stars = [];
    const fullStars = Math.floor(count);
    const hasHalfStar = count % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" size={16} />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star className="text-yellow-400" size={16} />
          <Star className="absolute top-0 left-0 fill-yellow-400 text-yellow-400" size={16} style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </span>
      );
    }
    
    return stars;
  };
  
  return (
    <section id="testimonials" ref={ref} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover how companies of all sizes are transforming their customer relationships with AICon<span className="text-accent">nect</span>CRM.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
            >
              <div className="flex items-center space-x-1 text-yellow-400 mb-6">
                {renderStars(testimonial.stars)}
              </div>
              <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <img 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  src={testimonial.avatar}
                  alt={testimonial.author}
                />
                <div>
                  <p className="text-gray-900 font-medium">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-primary-50 rounded-xl p-8 border border-primary-100"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="md:col-span-3">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to transform your customer relationships?</h3>
              <p className="text-gray-600">Join thousands of companies using AI to deliver exceptional customer experiences.</p>
            </div>
            <div className="md:text-right">
              <Button 
                size="lg"
                onClick={() => scrollToSection("signup")}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
