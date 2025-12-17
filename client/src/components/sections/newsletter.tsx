import { useScrollAnimation } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { isApiAvailable } from "@/lib/config";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Newsletter() {
  const { ref, isInView } = useScrollAnimation();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      if (isApiAvailable()) {
        // Use API in development
        const response = await apiRequest("POST", "/api/newsletters", values);
        await response.json();
        toast({
          title: "Subscribed successfully!",
          description: "Thank you for subscribing to our newsletter.",
        });
      } else {
        // Use Netlify Forms in production
        const formData = new URLSearchParams();
        formData.append('form-name', 'newsletter');
        formData.append('email', values.email);
        
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString()
        });
        
        if (response.ok) {
          toast({
            title: "Subscribed successfully!",
            description: "Thank you for subscribing to our newsletter.",
          });
        } else {
          throw new Error('Submission failed');
        }
      }
      form.reset();
    } catch (error: any) {
      if (error.message && error.message.includes("409")) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter.",
        });
      } else {
        toast({
          title: "Error subscribing",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated on Am<span className="text-accent">Do</span> CRM Innovation</h2>
          <p className="text-gray-300 mb-8">Join our newsletter for the latest product updates, industry insights, and CRM best practices.</p>
          
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
              name="newsletter"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Your email address" 
                        className="px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-primary-300 bg-gray-800 text-white placeholder-gray-400"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-left text-red-300 text-sm mt-1" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 px-6 py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </Form>
          
          <p className="text-gray-400 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </motion.div>
      </div>
    </section>
  );
}
