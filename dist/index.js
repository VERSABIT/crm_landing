// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  leads;
  contacts;
  newsletters;
  userCurrentId;
  leadCurrentId;
  contactCurrentId;
  newsletterCurrentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.leads = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.newsletters = /* @__PURE__ */ new Map();
    this.userCurrentId = 1;
    this.leadCurrentId = 1;
    this.contactCurrentId = 1;
    this.newsletterCurrentId = 1;
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Lead methods
  async createLead(insertLead) {
    const id = this.leadCurrentId++;
    const createdAt = /* @__PURE__ */ new Date();
    const lead = {
      ...insertLead,
      id,
      createdAt,
      phone: insertLead.phone ?? null
    };
    this.leads.set(id, lead);
    return lead;
  }
  async getLeads() {
    return Array.from(this.leads.values());
  }
  // Contact methods
  async createContact(insertContact) {
    const id = this.contactCurrentId++;
    const createdAt = /* @__PURE__ */ new Date();
    const contact = { ...insertContact, id, createdAt };
    this.contacts.set(id, contact);
    return contact;
  }
  async getContacts() {
    return Array.from(this.contacts.values());
  }
  // Newsletter methods
  async createNewsletter(insertNewsletter) {
    const id = this.newsletterCurrentId++;
    const createdAt = /* @__PURE__ */ new Date();
    const newsletter = { ...insertNewsletter, id, createdAt };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  async getNewsletterByEmail(email) {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email
    );
  }
  async getNewsletters() {
    return Array.from(this.newsletters.values());
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  companySize: text("company_size").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertLeadSchema = createInsertSchema(leads).pick({
  fullName: true,
  company: true,
  email: true,
  phone: true,
  companySize: true
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});
var newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertNewsletterSchema = createInsertSchema(newsletters).pick({
  email: true
});

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  app2.post("/api/leads", async (req, res) => {
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
  app2.post("/api/contacts", async (req, res) => {
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
  app2.post("/api/newsletters", async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
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
  app2.post("/api/analytics/pageview", (req, res) => {
    console.log("Page view recorded:", req.body.page);
    return res.status(200).json({ message: "Page view recorded" });
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const tryPort = (portToTry) => {
    server.listen({
      port: portToTry,
      host: "0.0.0.0",
      reusePort: true
    }, () => {
      log(`serving on port ${portToTry}`);
    }).on("error", (err) => {
      if (err.code === "EADDRINUSE" && portToTry === 5e3) {
        log(`Port ${portToTry} is already in use, trying port 5001...`);
        tryPort(5001);
      } else {
        log(`Failed to start server: ${err.message}`);
        throw err;
      }
    });
  };
  const port = process.env.PORT ? Number(process.env.PORT) : 5e3;
  tryPort(port);
})();
