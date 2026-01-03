# JBNU Notice Alarm (Frontend)

## Project Overview

This is a **Next.js 16** web application designed to serve as a mobile-friendly frontend for the "JBNU & CSAI Notice Alarm" system. It displays university notices, manages read status, and allows users to subscribe to specific notice categories.

### Key Technologies

- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** React Hooks (`useState`, `useEffect`), Custom Hooks
- **Data Fetching:** Axios
- **Icons:** React Icons
- **Date Handling:** Day.js

## Building and Running

### Prerequisites

- Node.js (v20+ recommended)
- npm
- A running backend instance (expected at `http://localhost:8000`)

### Commands

| Action                   | Command         | Description                                             |
| :----------------------- | :-------------- | :------------------------------------------------------ |
| **Install Dependencies** | `npm install`   | Installs all required packages.                         |
| **Development Server**   | `npm run dev`   | Starts the local dev server at `http://localhost:3000`. |
| **Build for Production** | `npm run build` | Compiles the application for production.                |
| **Start Production**     | `npm run start` | Runs the built application.                             |
| **Lint Code**            | `npm run lint`  | Runs ESLint to check for code quality issues.           |

## Architecture & Directory Structure

### Key Directories

- `app/` - Contains the App Router pages and layouts.
  - `page.tsx` - Main dashboard (notice list, refresh logic, filtering).
  - `layout.tsx` - Root layout (HTML structure, fonts, global styles).
  - `settings/` - Settings page for category subscriptions.
  - `components/` - Reusable UI components.
    - `NoticeCard.tsx` - Individual notice item.
    - `CategoryAccordion.tsx` - Grouped category selection UI.
    - `CategoryBadge.tsx` - Visual badge for notice categories.
    - `OnboardingModal.tsx` - Initial setup for new users.
  - `lib/` - Shared utilities and API definitions.
    - `api.ts` - Centralized API service functions.
    - `categories.ts` - Category data and grouping logic.
    - `theme.ts` - Theme constants (colors, styles).
  - `hooks/` - Custom React hooks.
    - `useSelectedCategories.ts` - Manages user's subscribed categories.

### Design Patterns

- **Mobile-First UI:** The application is designed with a centered `max-w-md` (expanding to `max-w-4xl` on desktop) container to simulate a mobile app experience.
- **Optimistic Updates:** UI state updates immediately (e.g., marking as read, changing filters) before waiting for the API response to improve perceived performance.
- **Componentization:** The UI is broken down into small, reusable components (Badges, Cards, Modals) rather than monolithic pages.

## API Integration

The frontend communicates with a backend server defined in `app/lib/api.ts` (default: `http://localhost:8000`).

### Key Endpoints

- `GET /notices`: Fetch notices with pagination and read-status filtering.
- `POST /notices/crawl`: Manually trigger the notice crawler.
- `POST /notices/:id/read`: Mark a specific notice as read.
- `GET /user/config`: Fetch user preferences (e.g., include read notices).
- `PATCH /user/config`: Update user preferences.

## Development Conventions

- **Path Aliases:** Use `@/` to import from the `app/` directory.
- **Linting:** Run `npm run lint` before committing to ensure code quality (ESLint + Prettier).
- **Styling:** Use Tailwind CSS utility classes for all styling needs.
