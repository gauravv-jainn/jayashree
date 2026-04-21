# Jayashree Foundation Website

A modern, full-featured website for Jayashree Foundation built with React, Vite, and TailwindCSS. The site includes public-facing pages, an admin dashboard, news management, gallery, member directory, project showcase, and donation functionality.

## 🚀 Features

- **Public Pages**: Home, About, Projects, Gallery, News, Members
- **Admin Dashboard**: Manage members, projects, news, gallery, and view form submissions
- **Authentication**: JWT-based admin authentication with protected routes
- **Donation System**: Integrated donation page
- **Email Notifications**: Automated email sending for form submissions and notifications
- **Responsive Design**: Mobile-friendly UI using TailwindCSS
- **Theme Support**: Dark/Light theme toggle
- **Modern UI Components**: Built with Radix UI and Material UI
- **Form Management**: Comprehensive form handling with validation

## 📋 Tech Stack

- **Frontend**: React 18, Vite 6
- **Styling**: TailwindCSS 4, Emotion, Material UI
- **Components**: Radix UI, shadcn/ui components
- **Routing**: React Router v7
- **Backend**: Express.js
- **Authentication**: JWT + bcryptjs
- **Email**: Nodemailer
- **Data Storage**: Local storage management
- **Charts**: Recharts
- **Utilities**: Date-fns, React Hook Form, React DnD

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
   Or with pnpm:
   ```bash
   pnpm install
   ```

2. **Create environment file** (if needed for email/backend services)
   ```bash
   cp .env.example .env.local
   ```

## 🏃 Running the Project

### Development Server
```bash
npm run dev
```
The site will be available at `http://localhost:5173` (or the port Vite assigns)

### Production Build
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── pages/                 # Page components (Home, About, Projects, etc.)
├── pages/Admin/          # Admin dashboard pages
├── app/components/       # Main app components (Header, Footer, Hero, etc.)
├── app/components/ui/    # Reusable UI components
├── components/           # Utility components (ProtectedRoute, etc.)
├── context/              # React context (Auth, Theme)
├── hooks/                # Custom hooks
├── utils/                # Utility functions and store management
├── router/               # Route configuration
└── main.tsx              # Entry point
```

## 🔐 Authentication

The admin panel is protected with JWT authentication. Login credentials are managed through the AuthContext.

- Admin pages are protected by `ProtectedRoute` component
- Authentication state is managed via AuthContext
- Tokens are stored in local storage

## 📧 Email Configuration

Email notifications are handled via Nodemailer. Configure email settings in environment variables:
- Email provider credentials
- SMTP settings
- Sender email address

## 🎨 Customization

- **Theme**: Modify colors in TailwindCSS config
- **Components**: Edit UI components in `src/app/components/ui/`
- **Pages**: Customize pages in `src/pages/`
- **Styling**: TailwindCSS classes are used throughout for styling

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting service (Vercel, Netlify, etc.)

## 📝 License

This project is for Jayashree Foundation.

---

**Design Reference**: Original design is available at https://www.figma.com/design/K64fRgP77Y4zJXjaYccCVI/Replicate-Existing-Design
