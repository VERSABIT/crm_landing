import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/animations";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    scrollToSection(id);
  };

  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <Badge variant="secondary" className="mb-4 py-1 px-3 bg-primary-100 text-primary-800 hover:bg-primary-100">
                AI-Powered CRM Solution
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Transform Your <span className="gradient-text">Customer Experience</span> With AI
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              Am<span className="text-accent">Do</span>CRM combines intelligent automation with deep customer insights to revolutionize how you build relationships and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Button 
                size="lg" 
                onClick={() => handleScrollTo("signup")}
                className="text-base"
              >
                Start Free Trial <span className="ml-2">→</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleScrollTo("features")}
                className="text-base"
              >
                <Play className="mr-2 h-4 w-4 text-primary" /> Watch Demo
              </Button>
            </div>
            <div className="pt-6">
              <p className="text-sm text-gray-500 mb-3">Trusted by forward-thinking companies</p>
              <div className="flex flex-wrap items-center gap-8">
                {/* Company logos would go here in a real implementation */}
                <div className="h-5 w-24 bg-gray-300 rounded opacity-70"></div>
                <div className="h-5 w-20 bg-gray-300 rounded opacity-70"></div>
                <div className="h-5 w-28 bg-gray-300 rounded opacity-70"></div>
                <div className="h-5 w-22 bg-gray-300 rounded opacity-70"></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-25"></div>
            <div className="absolute -bottom-8 right-4 w-36 h-36 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-25"></div>
            <div className="rounded-xl shadow-2xl overflow-hidden border border-gray-200 relative z-10">
              <img 
                className="w-full h-auto object-cover"
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                alt="Business professionals using AmDo CRM dashboard"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
