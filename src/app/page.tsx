"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Code, Database, Settings, Shield, Brain, Terminal, Layers, Lightbulb } from "lucide-react";

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

  const handleBuild = () => {
    if (!input.trim()) return;
    setIsBuilding(true);
    setProgress(0);
    setOutput("");

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setIsBuilding(false);
        setTimeout(() => {
          setOutput("✅ Build Complete! Project generated successfully.\n\n📁 File Structure:\n├── src/\n│   ├── components/\n│   ├── app/\n│   ├── lib/\n│   └── hooks/\n├── public/\n└── package.json\n\n🚀 Run 'npm install' then 'npm run dev' to start!");
        }, 500);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 500);
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
