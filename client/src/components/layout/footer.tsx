import { Brain } from "lucide-react";
import { scrollToSection } from "@/lib/animations";
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const handleNavClick = (id: string) => {
    scrollToSection(id);
  };

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div 
              className="flex items-center space-x-2 text-white font-bold text-xl mb-6 cursor-pointer"
              onClick={() => handleNavClick("hero")}
            >
              <Brain className="h-6 w-6 text-accent" />
              <span>AICon<span className="text-accent">nect</span>CRM</span>
            </div>
            <p className="mb-6">Transforming customer relationships with the power of artificial intelligence. Our platform helps businesses of all sizes deliver exceptional experiences and drive growth.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Webinars</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Compliance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} AICon<span className="text-accent">nect</span>CRM. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 mr-4">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 mr-4">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
