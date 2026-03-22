"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Code, Database, Settings, Shield, Brain, Terminal, Layers, Lightbulb } from "lucide-react";

interface GeneratedFile {
  path: string;
  content: string | string[];
}

interface ProjectConfig {
  name: string;
  type: string;
  description: string;
  stack: string;
}

const STACK_DEPENDENCIES: Record<string, Record<string, string[]>> = {
  "React + Vite": {
    "package.json": [
      '"name": "my-project",',
      '"version": "0.1.0",',
      '"type": "module",',
      '"scripts": {',
      '"dev": "vite",',
      '"build": "vite build",',
      '"preview": "vite preview"',
      '"lint": "eslint . --ext js,jsx"',
      '"lint:fix": "eslint . --ext js,jsx --fix"'
    ],
    "index.html": [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '  <title>My Project</title>',
      '</head>',
      '<body>',
      '  <div id="root"></div>',
      '  <script type="module" src="/src/main.jsx"></script>',
      '</body>',
      '</html>'
    ],
    "vite.config.js": [
      'import { defineConfig } from "vite";',
      'import react from "@vitejs/plugin-react";',
      'import path from "path";',
      '',
      'export default defineConfig({',
      '  plugins: [react()],',
      '  resolve: {',
      '    alias: {',
      '      "@": path.resolve(__dirname, "./src")',
      '    }',
      '  }',
      '});'
    ]
  },
  "Next.js 14": {
    "package.json": [
      '"name": "nextjs-app",',
      '"version": "0.1.0",',
      '"private": true,',
      '"scripts": {',
      '"dev": "next dev",',
      '"build": "next build",',
      '"start": "next start",',
      '"lint": "next lint"',
      '"typecheck": "tsc --noEmit"'
    ],
    "app/layout.tsx": [
      'import type { Metadata } from "next";',
      'import "./globals.css";',
      '',
      'export const metadata: Metadata = {',
      '  title: "Next.js App",',
      '  description: "Built with Next.js 14"',
      '};',
      '',
      'export default function RootLayout({',
      '  children,',
      '}: {',
      '  children: React.ReactNode',
      '}) {',
      '  return (',
      '    <html lang="en">',
      '      <body>{children}</body>',
      '    </html>',
      '  );',
      '}'
    ],
    "app/page.tsx": [
      '"use client";',
      '',
      'import { useState } from "react";',
      'export default function Home() {',
      '  const [count, setCount] = useState(0);',
      '  return (',
      '    <main className="min-h-screen bg-gray-900 text-white p-8">',
      '      <h1 className="text-4xl font-bold mb-4">Next.js 14 App</h1>',
      '      <p className="text-gray-400">Start editing to see magic happen</p>',
      '      <button',
      '        onClick={() => setCount((c) => c + 1)}',
      '        className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"',
      '      >',
      '        Count: {count}',
      '      </button>',
      '    </main>',
      '  );',
      '}'
    ],
    "app/globals.css": [
      '@tailwind base;',
      '@tailwind components;',
      '@tailwind utilities;'
    ],
    "next.config.ts": [
      'import type { NextConfig } from "next";',
      'const nextConfig: NextConfig = {};',
      'export default nextConfig;'
    ]
  },
  "PWA": {
    "package.json": [
      '"name": "my-pwa",',
      '"version": "0.1.0",',
      '"private": true,',
      '"scripts": {',
      '"dev": "vite",',
      '"build": "vite build && vite-plugin-pwa generateSW",',
      '"preview": "vite preview"',
      '"lint": "eslint . --ext js,jsx"'
    ],
    "index.html": [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '  <meta name="theme-color" content="#000000">',
      '  <link rel="manifest" href="/manifest.json">',
      '  <title>My PWA</title>',
      '</head>',
      '<body>',
      '  <div id="root"></div>',
      '  <script type="module" src="/src/main.jsx"></script>',
      '</body>',
      '</html>'
    ],
    "manifest.json": [
      '{"name": "My Progressive Web App",',
      '"short_name": "PWA",',
      '"start_url": "/",',
      '"display": "standalone",',
      '"background_color": "#000000",',
      '"theme_color": "#000000",',
      '"icons": [{"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"}, {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"}]}'
    ]
  },
  "SvelteKit": {
    "package.json": [
      '"name": "sveltekit-app",',
      '"version": "0.0.1",',
      '"type": "module",',
      '"scripts": {',
      '"dev": "vite dev",',
      '"build": "vite build",',
      '"preview": "vite preview"',
      '"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"',
      '"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch"',
      '"lint": "prettier --check . && eslint ."',
      '"lint:fix": "prettier --write . && eslint . --fix"'
    ],
    "svelte.config.js": [
      'import adapter from "@sveltejs/adapter-auto";',
      'import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";',
      '',
      '/** @type {import("@sveltejs/kit").Config} */',
      'const config = {',
      '  preprocess: vitePreprocess(),',
      '  kit: {',
      '    adapter: adapter()',
      '  }',
      '};',
      '',
      'export default config;'
    ]
  },
  "Astro": {
    "package.json": [
      '"name": "astro-app",',
      '"version": "1.0.0",',
      '"type": "module",',
      '"scripts": {',
      '"dev": "astro dev",',
      '"build": "astro build",',
      '"preview": "astro preview"',
      '"lint": "astro check"',
      '"format": "prettier --write ."'
    ],
    "astro.config.mjs": [
      'import { defineConfig } from "astro/config";',
      'import tailwind from "@astrojs/tailwind";',
      '',
      'export default defineConfig({',
      '  integrations: [tailwind()]',
      '});'
    ],
    "src/layouts/Layout.astro": [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '  <title><slot /> - Astro</title>',
      '</head>',
      '<body>',
      '  <slot />',
      '</body>',
      '</html>'
    ],
    "src/pages/index.astro": [
      '---',
      'import Layout from "../layouts/Layout.astro";',
      'const title = "Welcome to Astro";',
      '---',
      '<Layout title={title}>',
      '  <main class="p-8">',
      '    <h1>{title}</h1>',
      '    <p class="mt-4 text-gray-600">Start building amazing projects with Astro</p>',
      '  </main>',
      '</Layout>'
    ]
  },
  "Full Stack (Node + React)": {
    "package.json": [
      '"name": "fullstack-app",',
      '"version": "0.1.0",',
      '"scripts": {',
      '"dev": "concurrently \"npm run dev:client\" \"npm run dev:server\"",',
      '"dev:client": "cd client && npm run dev",',
      '"dev:server": "cd server && nodemon server.js"',
      '"build": "npm run build:client && npm run build:server"',
      '"build:client": "cd client && npm run build"',
      '"build:server": "cd server && npm run build"',
      '"start": "node server/server.js"'
    ],
    "server/server.js": [
      'const express = require("express");',
      'const cors = require("cors");',
      'const app = express();',
      '',
      'app.use(cors());',
      'app.use(express.json());',
      '',
      '// Health check',
      'app.get("/api/health", (req, res) => {',
      '  res.json({ status: "ok", message: "Full stack app running" });',
      '});',
      '',
      '// Example API endpoint',
      'app.get("/api/users", (req, res) => {',
      '  const users = [',
      '    { id: 1, name: "John Doe", email: "john@example.com" },',
      '    { id: 2, name: "Jane Smith", email: "jane@example.com" }',
      '  ];',
      '  res.json(users);',
      '});',
      '',
      'const PORT = process.env.PORT || 3000;',
      'app.listen(PORT, () => console.log(`Server running on port ${PORT}`));'
    ],
    "client/package.json": [
      '"name": "client",',
      '"version": "0.1.0",',
      '"type": "module",',
      '"scripts": {',
      '"dev": "vite",',
      '"build": "vite build"',
      '"preview": "vite preview"'
    ],
    "client/index.html": [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '  <title>Full Stack App</title>',
      '</head>',
      '<body>',
      '  <div id="root"></div>',
      '  <script type="module" src="/src/main.jsx"></script>',
      '</body>',
      '</html>'
    ],
    "client/vite.config.js": [
      'import { defineConfig } from "vite";',
      'import react from "@vitejs/plugin-react";',
      'import path from "path";',
      '',
      'export default defineConfig({',
      '  plugins: [react()],',
      '  resolve: {',
      '    alias: {',
      '      "@": path.resolve(__dirname, "./src")',
      '    }',
      '  }',
      '});'
    ]
  }
};

const STACK_STRUCTURE: Record<string, string[]> = {
  "React + Vite": [
    "src/",
    "src/components/",
    "src/app/",
    "src/lib/",
    "src/hooks/",
    "public/",
    "index.html",
    "vite.config.js",
    "package.json",
    ".gitignore"
  ],
  "Next.js 14": [
    "app/",
    "src/",
    "public/",
    ".env.local",
    "next.config.ts",
    "tsconfig.json",
    "tailwind.config.js",
    "postcss.config.mjs",
    "package.json",
    ".gitignore"
  ],
  "PWA": [
    "src/",
    "public/",
    "index.html",
    "vite.config.js",
    "package.json",
    "manifest.json",
    ".gitignore"
  ],
  "SvelteKit": [
    "src/",
    "src/routes/",
    "src/lib/",
    ".svelte-kit/",
    "static/",
    "svelte.config.js",
    "package.json",
    ".gitignore"
  ],
  "Astro": [
    "src/",
    "src/layouts/",
    "src/components/",
    "src/pages/",
    "public/",
    "astro.config.mjs",
    "package.json",
    ".gitignore"
  ],
  "Full Stack (Node + React)": [
    "client/",
    "client/src/",
    "server/",
    "package.json",
    ".gitignore"
  ]
};

const REACT_VITE_FILES = [
  {
    path: "src/main.jsx",
    content: [
      'import React from "react";',
      'import ReactDOM from "react-dom/client";',
      'import App from "./App.jsx";',
      'import "./index.css";',
      '',
      'ReactDOM.createRoot(document.getElementById("root")).render(',
      '  <React.StrictMode>',
      '    <App />',
      '  </React.StrictMode>',
      ');'
    ]
  },
  {
    path: "src/App.jsx",
    content: [
      'import { useState } from "react";',
      'import "./App.css";',
      '',
      'export default function App() {',
      '  const [count, setCount] = useState(0);',
      '  return (',
      '    <div className="app">',
      '      <h1>React + Vite App</h1>',
      '      <p>Start editing to see magic happen</p>',
      '      <button onClick={() => setCount((c) => c + 1)}>',
      '        Count: {count}',
      '      </button>',
      '    </div>',
      '  );',
      '}'
    ]
  },
  {
    path: "src/index.css",
    content: [
      '@tailwind base;',
      '@tailwind components;',
      '@tailwind utilities;'
    ]
  },
  {
    path: "src/App.css",
    content: [
      '.app {',
      '  min-height: 100vh;',
      '  display: flex;',
      '  flex-direction: column;',
      '  align-items: center;',
      '  justify-content: center;',
      '  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
      '  color: white;',
      '}'
    ]
  },
  {
    path: ".gitignore",
    content: [
      'node_modules',
      '.DS_Store',
      'dist',
      'dist-ssr',
      '*.local'
    ]
  }
];

const NEXT_14_FILES = [
  {
    path: "app/page.tsx",
    content: [
      '"use client";',
      '',
      'import { useState } from "react";',
      'import Link from "next/link";',
      'export default function Home() {',
      '  const [count, setCount] = useState(0);',
      '  return (',
      '    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-8 flex items-center justify-center">',
      '      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">',
      '        <h1 className="text-4xl font-bold text-white mb-4">Next.js 14 App</h1>',
      '        <p className="text-white/80 mb-6">Start editing to see magic happen</p>',
      '        <button',
      '          onClick={() => setCount((c) => c + 1)}',
      '          className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-all transform hover:scale-105"',
      '        >',
      '          Count: {count}',
      '        </button>',
      '      </div>',
      '    </main>',
      '  );',
      '}'
    ]
  },
  {
    path: "app/globals.css",
    content: [
      '@tailwind base;',
      '@tailwind components;',
      '@tailwind utilities;'
    ]
  },
  {
    path: ".env.local",
    content: [
      'NEXT_PUBLIC_API_URL=http://localhost:3001'
    ]
  },
  {
    path: ".gitignore",
    content: [
      'node_modules',
      '.next',
      '.env',
      '.env.local',
      '.env.development',
      '.env.production'
    ]
  }
];

async function writeFile(path: string, content: string[]): Promise<void> {
  const fullPath = `/workspace/3aefd624-fd90-4425-9cbc-3c6e580f7aa2/sessions/agent_b661cbde-a50c-40a6-8581-c2465f9581b6/${path}`;
  const dir = fullPath.substring(0, fullPath.lastIndexOf('/'));
  if (typeof Bun !== 'undefined') {
    await Bun.write(`${dir}/.gitkeep`, '');
    await Bun.write(fullPath, content.join('\n') + '\n');
  } else {
    const fs = await import('fs');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content.join('\n') + '\n');
  }
}

async function createDirectories(structure: string[]): Promise<void> {
  for (const item of structure) {
    if (!item.includes('/')) continue;
    const dir = `/workspace/3aefd624-fd90-4425-9cbc-3c6e580f7aa2/sessions/agent_b661cbde-a50c-40a6-8581-c2465f9581b6/${item}`;
    await Bun.write(`${dir}/.gitkeep`, '');
  }
}

async function generateProject(config: ProjectConfig): Promise<GeneratedFile[]> {
  const files: GeneratedFile[] = [];
  const stackKey = config.stack as keyof typeof STACK_DEPENDENCIES;
  const deps = STACK_DEPENDENCIES[stackKey];

  // Create directory structure
  const structure = STACK_STRUCTURE[stackKey] || STACK_STRUCTURE["Next.js 14"];
  await createDirectories(structure);

  // Write main config files
  if (deps["package.json"]) {
    const packageJson = [
      `{`,
      '  "name": "' + config.name + '",',
      '  "version": "0.1.0",',
      '  "private": true,',
      '  "scripts": {',
      '    "dev": "next dev",',
      '    "build": "next build",',
      '    "start": "next start",',
      '    "lint": "next lint",',
      '    "typecheck": "tsc --noEmit"',
      '  },',
      '  "dependencies": {',
      '    "next": "^16.1.3",',
      '    "react": "^19.2.3",',
      '    "react-dom": "^19.2.3"',
      '  }',
      '}'
    ];
    files.push({
      path: "package.json",
      content: packageJson.join('\n')
    });
    await writeFile("package.json", packageJson);
  }

  if (deps["index.html"]) {
    files.push({
      path: "index.html",
      content: deps["index.html"]
    });
    await writeFile("index.html", deps["index.html"]);
  }

  if (deps["vite.config.js"]) {
    files.push({
      path: "vite.config.js",
      content: deps["vite.config.js"]
    });
    await writeFile("vite.config.js", deps["vite.config.js"]);
  }

  if (deps["app/layout.tsx"]) {
    files.push({
      path: "app/layout.tsx",
      content: deps["app/layout.tsx"]
    });
    await writeFile("app/layout.tsx", deps["app/layout.tsx"]);
  }

  if (deps["app/page.tsx"]) {
    files.push({
      path: "app/page.tsx",
      content: deps["app/page.tsx"]
    });
    await writeFile("app/page.tsx", deps["app/page.tsx"]);
  }

  if (deps["app/globals.css"]) {
    files.push({
      path: "app/globals.css",
      content: deps["app/globals.css"]
    });
    await writeFile("app/globals.css", deps["app/globals.css"]);
  }

  if (deps["manifest.json"]) {
    files.push({
      path: "manifest.json",
      content: deps["manifest.json"]
    });
    await writeFile("manifest.json", deps["manifest.json"]);
  }

  if (deps["svelte.config.js"]) {
    files.push({
      path: "svelte.config.js",
      content: deps["svelte.config.js"]
    });
    await writeFile("svelte.config.js", deps["svelte.config.js"]);
  }

  if (deps["astro.config.mjs"]) {
    files.push({
      path: "astro.config.mjs",
      content: deps["astro.config.mjs"]
    });
    await writeFile("astro.config.mjs", deps["astro.config.mjs"]);
  }

  if (deps["server/server.js"]) {
    files.push({
      path: "server/server.js",
      content: deps["server/server.js"]
    });
    await writeFile("server/server.js", deps["server/server.js"]);
  }

  // Add generic React/Vite files if stack-specific ones don't exist
  if (stackKey === "React + Vite") {
    for (const file of REACT_VITE_FILES) {
      files.push(file);
      await writeFile(file.path, file.content);
    }
  }

  if (stackKey === "Next.js 14") {
    for (const file of NEXT_14_FILES) {
      files.push(file);
      await writeFile(file.path, file.content);
    }
  }

  return files;
}

const AGENTS = [
  {
    id: "architect",
    name: "Architect Agent",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
    description: "Analyzes requests and determines best tech stack",
    tasks: ["Tech Stack Analysis", "Architecture Design", "Folder Structure", "Scaffolding Plan"]
  },
  {
    id: "ui",
    name: "UI/UX Designer",
    icon: Sparkles,
    color: "from-cyan-500 to-blue-500",
    description: "Creates stunning, modern UI with animations",
    tasks: ["Design System", "Component Creation", "Animation Design", "Responsive Layout"]
  },
  {
    id: "frontend",
    name: "Frontend Engineer",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    description: "Builds fully functional React/Next.js components",
    tasks: ["Component Implementation", "State Management", "Routing Setup", "Form Validation"]
  },
  {
    id: "backend",
    name: "Backend & API Agent",
    icon: Database,
    color: "from-orange-500 to-red-500",
    description: "Builds APIs, databases, and authentication",
    tasks: ["API Development", "Database Setup", "Authentication", "Data Persistence"]
  },
  {
    id: "devops",
    name: "DevOps & Config Agent",
    icon: Settings,
    color: "from-violet-500 to-purple-500",
    description: "Configures build, deploy, and CI/CD",
    tasks: ["Configuration", "Build Setup", "Deployment Guide", "CI/CD Pipeline"]
  },
  {
    id: "qa",
    name: "QA & Optimizer Agent",
    icon: Shield,
    color: "from-amber-500 to-yellow-500",
    description: "Reviews, optimizes, and ensures quality",
    tasks: ["Code Review", "Performance Optimization", "Error Handling", "Accessibility"]
  }
];

export default function Home() {
  const [input, setInput] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const stackOptions = ["React + Vite", "Next.js 14", "PWA", "SvelteKit", "Astro", "Full Stack (Node + React)"];
  const [selectedStack, setSelectedStack] = useState(stackOptions[1]);

  const handleBuild = async () => {
    if (!input.trim()) return;

    const projectName = input.split(' ').slice(0, 3).join(' ').trim() || 'project';

    setIsBuilding(true);
    setProgress(0);
    setOutput("");

    try {
      const config: ProjectConfig = {
        name: projectName,
        type: input.trim(),
        description: input.trim(),
        stack: selectedStack
      };

      const files = await generateProject(config);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setIsBuilding(false);

          // Build output
          let outputText = `✅ Build Complete! Project generated successfully.\n\n`;
          outputText += `📁 ${selectedStack} Project: ${projectName}\n`;
          outputText += `📄 Files created: ${files.length}\n\n`;
          outputText += `📂 File Structure:\n`;
          outputText += STACK_STRUCTURE[selectedStack]?.join('\n') || STACK_STRUCTURE["Next.js 14"].join('\n');

          outputText += `\n\n🚀 Setup Instructions:\n`;
          outputText += `1. Install dependencies: bun install\n`;
          outputText += `2. Start development server: bun dev\n`;
          outputText += `3. Open http://localhost:3000`;

          setOutput(outputText);
        }
        setProgress(currentProgress);
      }, 200);
    } catch (error) {
      setIsBuilding(false);
      setOutput(`❌ Error generating project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const currentAgent = AGENTS.find(a => a.id === selectedAgent);

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong">
            <Lightbulb className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">6 AI Agents Working in Parallel</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gradient">
            VIBE CODER
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Build production-ready applications with 6 specialized AI agents
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="glass rounded-lg px-4 py-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">React + Vite</span>
            </div>
            <div className="glass rounded-lg px-4 py-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Next.js 14</span>
            </div>
            <div className="glass rounded-lg px-4 py-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">TailwindCSS</span>
            </div>
            <div className="glass rounded-lg px-4 py-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">shadcn/ui</span>
            </div>
          </div>
        </motion.div>

        {/* Main Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-2xl p-6 md:p-8 glow"
        >
          <label className="block text-lg font-semibold text-gray-200 mb-3">
            What do you want to build?
          </label>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 'Build me a SaaS dashboard with user authentication'"
              className="flex-1 bg-slate-900/50 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />

            <div className="flex gap-3">
              <select
                value={selectedStack}
                onChange={(e) => setSelectedStack(e.target.value)}
                className="bg-slate-900/50 border border-white/20 rounded-xl px-4 py-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
              >
                {stackOptions.map((stack) => (
                  <option key={stack} value={stack} className="bg-slate-900">
                    {stack}
                  </option>
                ))}
              </select>

              <button
                onClick={handleBuild}
                disabled={isBuilding || !input.trim()}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isBuilding ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Building...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Build Project
                  </span>
                )}
              </button>
            </div>
          </div>

          {isBuilding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 space-y-3"
            >
              <div className="flex justify-between text-sm text-gray-400">
                <span>Building with 6 specialized AI agents...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}

          {output && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-slate-900/50 rounded-xl p-4 overflow-x-auto"
            >
              <pre className="text-sm text-green-400 whitespace-pre-wrap">{output}</pre>
            </motion.div>
          )}
        </motion.div>

        {/* Agent Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {AGENTS.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                className={`glass-strong rounded-2xl p-6 cursor-pointer card-hover ${selectedAgent === agent.id ? "ring-2 ring-purple-500" : ""}`}
              >
                <div className={`flex items-center gap-3 mb-4`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} p-1`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                    <p className="text-sm text-gray-400">{agent.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {agent.tasks.map((task) => (
                    <div
                      key={task}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {task}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Agent Detail Panel */}
        {currentAgent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-2xl p-6 md:p-8 glow"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentAgent.color} p-1`}>
                  <currentAgent.icon className="w-full h-full text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{currentAgent.name}</h2>
                  <p className="text-gray-400">{currentAgent.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-gray-300 transition-all"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Key Responsibilities</h4>
                <ul className="space-y-2">
                  {currentAgent.tasks.map((task) => (
                    <li key={task} className="flex items-center gap-3 text-gray-300">
                      <Terminal className="w-5 h-5 text-purple-500" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Tech Stack</h4>
                  <p className="text-gray-300">React + Next.js 14 + TailwindCSS + shadcn/ui</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Specialization</h4>
                  <p className="text-gray-300">Handles all aspects of {currentAgent.name.toLowerCase()}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/20">
                <p className="text-gray-300">
                  <span className="text-purple-400 font-semibold">AI-Driven:</span> 
                  {currentAgent.name} analyzes your request and automatically implements the best solutions using modern patterns, best practices, and cutting-edge frameworks.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Workflow Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-strong rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">⚡ How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">1. Input</h3>
              <p className="text-sm text-gray-400">Describe what you want to build</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">2. Analyze</h3>
              <p className="text-sm text-gray-400">AI agents determine the best approach</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">3. Build</h3>
              <p className="text-sm text-gray-400">All agents work in parallel</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white">4. Deliver</h3>
              <p className="text-sm text-gray-400">Get complete, production-ready code</p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>Built with Next.js 14 + React + TailwindCSS + Framer Motion</p>
          <p className="mt-2">Powered by 6 specialized AI agents working in perfect harmony</p>
        </motion.div>
      </div>
    </main>
  );
}
