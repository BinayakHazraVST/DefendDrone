# D.E.F.E.N.D Drone Project

## Overview

The D.E.F.E.N.D (Defense Engineering for Enhanced National Defense) project is a professional landing page application showcasing advanced drone defense technology. The application features a patriotic, military-inspired design aesthetic that communicates precision, authority, and technical excellence. Built as a single-page application with a contact form for inquiries, it serves as a digital presence for defense drone technology.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR (Hot Module Replacement) and optimized production builds
- **Wouter** for lightweight client-side routing (single-page application pattern)
- **TanStack Query (React Query)** for server state management, data fetching, and caching

**UI Component System**
- **Radix UI** primitives providing unstyled, accessible component foundations
- **shadcn/ui** component library built on top of Radix UI, configured with "new-york" style
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Framer Motion** for animation and motion effects
- Component architecture follows atomic design principles with components organized in `client/src/components/ui/`

**Design System**
- Custom color palette emphasizing patriotic navy/red/gold theme defined in CSS variables
- Typography system using **Rajdhani** (headings - angular, military-inspired) and **Inter** (body - clean, legible) from Google Fonts
- Consistent spacing primitives based on Tailwind's spacing scale
- Responsive design with mobile-first approach

**Form Management**
- **React Hook Form** for performant form state management with minimal re-renders
- **Zod** schema validation integrated via `@hookform/resolvers`
- Type-safe form validation matching backend schema definitions

### Backend Architecture

**Server Framework**
- **Express.js** serving both API endpoints and static assets
- RESTful API design with `/api/contact` endpoint for handling contact form submissions
- Development mode uses Vite middleware for seamless frontend integration
- Production mode serves pre-built static assets from `dist/public`

**Request Processing**
- JSON body parsing with raw body preservation for webhook verification scenarios
- URL-encoded form data support
- Request logging middleware tracking method, path, status, and duration
- Error handling with appropriate HTTP status codes

**Build & Deployment**
- **esbuild** for server-side bundling with selective dependency externalization
- Dependencies bundled to reduce syscalls and improve cold start performance
- Separate build processes for client (Vite) and server (esbuild)
- TypeScript compilation with path aliases for clean imports

### Data Layer

**Database ORM**
- **Drizzle ORM** configured for PostgreSQL with schema-first approach
- Schema defined in `shared/schema.ts` for type sharing between frontend and backend
- Database migrations managed via `drizzle-kit` in `migrations/` directory

**Schema Design**
- **Users table**: ID (UUID), username (unique), password (hashed)
- **Contact Messages table**: ID (UUID), name, email, organization (optional), clearance level (optional), message, created timestamp
- Zod schemas derived from Drizzle schemas ensure validation consistency across stack

**Storage Abstraction**
- `IStorage` interface defines data access contract
- `MemStorage` in-memory implementation for development/testing
- Production ready for PostgreSQL via Neon serverless driver
- Abstraction allows easy swapping between storage backends

### Type Safety & Code Sharing

**Shared Types**
- Common schema definitions in `shared/` directory accessible to both client and server
- Zod schemas provide runtime validation and TypeScript type inference
- Path aliases (`@shared/*`) enable clean cross-boundary imports

**TypeScript Configuration**
- Strict mode enabled for maximum type safety
- Path mappings for `@/` (client), `@shared/` (shared), and `@assets/` (assets)
- ESNext module system with bundler resolution strategy

## External Dependencies

### Core Infrastructure
- **Neon Database** (`@neondatabase/serverless`) - Serverless PostgreSQL database provider optimized for edge and serverless environments
- **Drizzle ORM** - Type-safe SQL query builder and ORM for PostgreSQL interactions
- **Express.js** - Backend HTTP server framework

### UI & Interaction
- **Radix UI** - Complete suite of accessible, unstyled React components (18+ individual packages)
- **Tailwind CSS** - Utility-first CSS framework with PostCSS processing
- **Framer Motion** - Production-ready animation library
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets (SiLinkedin, SiX for social media)

### Form & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Integration bridge between React Hook Form and Zod

### Data Fetching & State
- **TanStack React Query** - Asynchronous state management and data fetching
- Custom query client configuration with 401 handling and optimistic caching strategies

### Development Tools
- **Vite** - Frontend build tool with hot module replacement
- **esbuild** - Fast JavaScript bundler for server builds
- **TypeScript** - Static type checking
- **Replit plugins** - Development environment enhancements (error modal, cartographer, dev banner)

### Session & Security
- **express-session** - Session middleware (configured but not actively used in current implementation)
- **connect-pg-simple** - PostgreSQL session store (available for future session persistence)

### Styling Utilities
- **class-variance-authority** - Type-safe variant-based component styling
- **clsx** & **tailwind-merge** - Conditional CSS class composition
- **cmdk** - Command menu component

### Additional UI Components
- **embla-carousel-react** - Carousel/slider component
- **date-fns** - Date utility library
- **vaul** - Drawer component primitive