# VIBE CODER - Multi-Agent Autonomous Development System

A revolutionary web application that harnesses the power of 6 specialized AI agents working in parallel to design, build, and ship production-ready applications.

## 🚀 Features

- **6 Specialized AI Agents**: Each agent focuses on a specific aspect of development
- **Parallel Processing**: All agents work simultaneously for faster development
- **Modern Tech Stack**: Built with Next.js 14, React, TailwindCSS, and Framer Motion
- **Stunning UI**: Glassmorphism design with smooth animations and gradients
- **Real-time Progress**: See the building process in action
- **Interactive Dashboard**: Explore each agent's capabilities
- **Dark Mode**: Beautiful dark theme by default

## 🧠 The 6 AI Agents

### 1. Architect Agent 📐
Analyzes user requests and determines the best tech stack, designs the folder/file structure, and creates a complete scaffolding plan.

**Key Responsibilities:**
- Tech Stack Analysis
- Architecture Design
- Folder Structure Design
- Scaffolding Plan

### 2. UI/UX Designer Agent ✨
Creates stunning, modern user interfaces with animations, responsive design, and beautiful aesthetics.

**Key Responsibilities:**
- Design System
- Component Creation
- Animation Design
- Responsive Layout

### 3. Frontend Engineer Agent 💻
Builds fully functional React/Next.js components with state management, routing, and form validation.

**Key Responsibilities:**
- Component Implementation
- State Management
- Routing Setup
- Form Validation

### 4. Backend & API Agent 🗄️
Builds REST or GraphQL APIs, sets up databases, handles authentication, and ensures data persistence.

**Key Responsibilities:**
- API Development
- Database Setup
- Authentication
- Data Persistence

### 5. DevOps & Config Agent ⚙️
Configures build systems, deployment pipelines, CI/CD, and provides comprehensive deployment guides.

**Key Responsibilities:**
- Configuration Management
- Build Setup
- Deployment Guide
- CI/CD Pipeline

### 6. QA & Optimizer Agent 🛡️
Reviews code for bugs, performance issues, and security vulnerabilities, adds error handling and accessibility.

**Key Responsibilities:**
- Code Review
- Performance Optimization
- Error Handling
- Accessibility

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 🚀 Quick Start

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

### Build for Production

```bash
bun run build
```

### Type Check

```bash
bun run typecheck
```

### Lint

```bash
bun run lint
```

## 📖 How to Use

1. **Enter Your Request**: Describe what you want to build in the input field
2. **Select Tech Stack**: Choose from available options (React + Vite, Next.js 14, PWA, etc.)
3. **Click Build**: Watch as all 6 AI agents work in parallel
4. **Explore Agents**: Click on any agent card to learn more about their capabilities
5. **View Output**: See the complete project structure and setup instructions

## 🎨 Design Highlights

- **Gradient Backgrounds**: Purple and pink gradients for visual appeal
- **Glassmorphism**: Frosted glass effect on cards and panels
- **Smooth Animations**: Framer Motion for fluid transitions
- **Dark Mode**: Optimized for dark themes
- **Responsive**: Mobile-first design that scales to desktop
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🌟 Supported App Types

| Request Type | Stack Used |
|---|---|
| Landing page / website | React + Vite + TailwindCSS + Framer Motion |
| Web app / dashboard | React + Vite + shadcn/ui + Zustand |
| PWA | React + Vite + Workbox + Web App Manifest |
| Full stack app | Next.js 14 + Prisma + Supabase + TailwindCSS |
| Simple site | HTML + CSS + Vanilla JS (optimized) |
| SaaS | Next.js + Clerk Auth + Stripe + Supabase |
| Portfolio | Astro or Next.js + TailwindCSS + Framer Motion |
| E-commerce | Next.js + Stripe + Supabase + shadcn/ui |

## 🏗️ Architecture

### Folder Structure
```
src/
├── app/
│   ├── layout.tsx    # Root layout with global styles
│   ├── page.tsx      # Main VIBE CODER dashboard
│   └── globals.css   # Global styles and animations
└── (future modules)
```

### Key Components
- **Main Dashboard**: Central interface for interacting with VIBE CODER
- **Agent Cards**: Visual representation of each AI agent
- **Input Section**: Where users describe their project
- **Progress Tracker**: Real-time building progress visualization
- **Output Display**: Generated code and instructions

## 🚀 Deployment

### Vercel (Recommended)
```bash
npx vercel --prod
```

### Netlify
```bash
npx netlify deploy --prod
```

### Railway
Push to GitHub and connect your Railway project.

## 📝 Rules

1. **NEVER output placeholder code** - Every function must work
2. **NEVER ask unnecessary questions** - Make smart decisions
3. **ALWAYS write TypeScript** - Type safety by default
4. **ALWAYS include error handling** - Try/catch, fallback UI, toasts
5. **ALWAYS make it impressive** - Choose the more beautiful option
6. **COMPLETE ALL FILES** - Don't truncate code
7. **SELF-CORRECT** - Fix issues before outputting

## 🎯 Example Triggers

- *"Build me a SaaS dashboard"* → Full Next.js app with sidebar, stats, charts, auth
- *"Make me a landing page for my AI startup"* → Hero with animations, features, pricing
- *"I need a PWA todo app"* → Installable PWA with offline support
- *"Create a portfolio website"* → Stunning portfolio with animations and responsive design

## 🔧 Development

### Adding New Agents

To add a new specialized agent:

1. Add agent configuration to the `AGENTS` array in `src/app/page.tsx`
2. Choose an icon from `lucide-react`
3. Define color gradients and responsibilities
4. Update the agent cards grid accordingly

### Customizing Design

- **Colors**: Modify the gradient classes in `src/app/page.tsx`
- **Animations**: Edit Framer Motion variants in component props
- **Glass Effect**: Adjust `glass-strong` and `glass` classes in `src/app/globals.css`

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun typecheck` and `bun lint`
5. Submit a pull request

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Next.js 14, React, and the power of AI collaboration**
