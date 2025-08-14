# AIConnectCRM

## Overview

AIConnectCRM is a modern AI-powered customer relationship management platform built as a full-stack web application. The system features a React-based frontend with a professional landing page and an Express.js backend API. The application is designed to help businesses manage leads, contacts, and newsletter subscriptions through intelligent automation and user-friendly interfaces.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI components with shadcn/ui design system for consistent, accessible interfaces
- **Styling**: Tailwind CSS with custom CSS variables for theming support
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for robust form validation and submission
- **Animations**: Framer Motion for smooth UI transitions and scroll-based animations
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless) for reliable data persistence
- **Validation**: Zod schemas shared between frontend and backend for consistent data validation
- **Storage Pattern**: Abstract storage interface with both in-memory and database implementations for flexibility

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM providing type-safe schema definitions
- **Schema Design**: Four main entities - users, leads, contacts, and newsletters with appropriate relationships
- **Migration System**: Drizzle Kit for database schema migrations and updates
- **Connection**: Neon serverless PostgreSQL for cloud-based database hosting

### API Design
- **Architecture**: RESTful API endpoints following standard HTTP conventions
- **Data Flow**: JSON request/response format with comprehensive error handling
- **Validation**: Server-side validation using shared Zod schemas from the frontend
- **Error Handling**: Centralized error middleware with proper HTTP status codes and user-friendly messages
- **Logging**: Request logging middleware for API monitoring and debugging

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production database needs
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect support

### UI and Styling
- **Radix UI**: Comprehensive set of accessible React components
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Animation library for enhanced user experience
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets including social media icons

### Development Tools
- **TypeScript**: Static type checking across the entire application
- **Vite**: Modern build tool with fast hot module replacement
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

### Runtime and Deployment
- **Node.js**: JavaScript runtime for the backend server
- **TSX**: TypeScript execution for development server
- **Express.js**: Web application framework for the API server