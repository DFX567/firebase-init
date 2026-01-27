# Replit.md

## Overview

This is a personal romantic web application built for a couple to celebrate special occasions like Valentine's Day, birthdays, and anniversaries. The app features Firebase authentication with Google Sign-In, restricted to specific allowed email addresses. It provides themed interactive experiences with animations, typewriter effects, and year-based content unlocking for different celebration sections.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, built using Vite
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **State Management**: React Query for server state, React hooks for local state
- **Animations**: Framer Motion for page transitions and interactive animations
- **Fonts**: DM Sans (body) and Outfit (display) via Google Fonts

### Application Structure
- **Authentication Flow**: Firebase Auth with Google provider, whitelist-based access control
- **Navigation**: Single-page app with internal section routing (Hub → Anniversary/Birthday/Valentine sections)
- **Content Pattern**: Year-based content with date-locked reveals for special occasions
- **Theme System**: Dynamic CSS variable theming per celebration type (valentine/birthday/anniversary)

### Backend Architecture
- **Server**: Express.js (v5) with TypeScript running on Node.js
- **API Pattern**: Minimal REST API structure - the app is primarily client-side with Firebase
- **Build System**: Custom esbuild script for production bundling with Vite for client
- **Static Serving**: Express serves the built Vite output in production

### Data Storage
- **Primary Storage**: In-memory storage (MemStorage class) for basic user data
- **Schema Definition**: Drizzle ORM with PostgreSQL schema defined but database not actively used
- **User Content**: Hardcoded event data in `client/src/data/events.ts` for celebration messages

### Key Design Decisions

1. **Firebase-First Authentication**: Chosen for simple Google Sign-In integration without managing credentials. The allowed emails list provides access control without complex backend logic.

2. **Client-Side Routing**: Uses internal state-based navigation rather than URL routing to keep the experience contained and private.

3. **Year-Based Content Model**: Events are organized by year with unlock dates, allowing future content to be prepared but hidden until the appropriate date.

4. **Shared Type Definitions**: The `shared/` directory contains schema and route definitions accessible to both client and server for type safety.

## External Dependencies

### Authentication & Database
- **Firebase**: Authentication (Google Sign-In), Firestore available but not heavily used
- **PostgreSQL**: Schema defined via Drizzle ORM, requires DATABASE_URL environment variable

### Required Environment Variables
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `DATABASE_URL` (PostgreSQL connection string)

### Development Tools
- **Replit Plugins**: vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner for development experience
- **Build Tools**: esbuild for server bundling, Vite for client bundling

### UI Libraries
- **Radix UI**: Full suite of accessible primitives (dialog, dropdown, tabs, etc.)
- **Framer Motion**: Animation library for page transitions
- **Lucide React**: Icon library
- **date-fns**: Date manipulation utilities