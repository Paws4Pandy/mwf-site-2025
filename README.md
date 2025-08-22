# Mortgage with Ford - August 2025

Professional mortgage brokerage website built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd mortgage-with-ford-august-2025
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at http://localhost:8080

## 📁 Project Structure

```
src/
├── pages/           # Route components
├── components/      # Reusable UI components
├── components/ui/   # shadcn/ui component library
├── assets/
│   ├── config/      # Centralized configuration
│   ├── images/      # Static images
│   └── data/        # Data files
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── contexts/        # React contexts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is configured for **Vercel deployment**.

### Deploy to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables if needed
4. Deploy!

The build settings are automatically detected:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Framework**: Vite

## 🎨 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI)
- **Routing**: React Router DOM
- **State Management**: React Query
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## 📝 Configuration

All configuration files are centralized in `/src/assets/config/`:

- `contact.ts` - Contact information and emails
- `links.ts` - External and internal URLs
- `cta.ts` - Call-to-action buttons
- `forms.ts` - Form configurations
- `social.ts` - Social media links
- `navigation.ts` - Site navigation structure

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
# Add any required environment variables here
VITE_API_URL=your_api_url
```

## 📄 License

Copyright © 2025 Mortgage with Ford. All rights reserved.

## 👩‍💻 Development Notes

- Always use the centralized config files for links and contact info
- Follow the established design system (colors, typography)
- Test all changes on mobile devices
- Run `npm run lint` before committing

## 🆘 Support

For questions or issues, contact: hello@mortgagewithford.ca