import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/leads", async (req: Request, res: Response) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      return res.status(201).json({ 
        message: "Lead created successfully",
        data: lead 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      console.error("Error creating lead:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/contacts", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      return res.status(201).json({ 
        message: "Contact form submitted successfully",
        data: contact 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      console.error("Error creating contact:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/newsletters", async (req: Request, res: Response) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterByEmail(newsletterData.email);
      if (existingSubscription) {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      
      const newsletter = await storage.createNewsletter(newsletterData);
      return res.status(201).json({ 
        message: "Newsletter subscription successful",
        data: newsletter 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      console.error("Error creating newsletter subscription:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Analytics endpoint
  app.post("/api/analytics/pageview", (req: Request, res: Response) => {
    // In a real implementation, this would record the pageview to a database
    console.log("Page view recorded:", req.body.page);
    return res.status(200).json({ message: "Page view recorded" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
