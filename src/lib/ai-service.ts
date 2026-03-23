// AI Service with z.ai GLM-4.7-flash as primary, deepseek-3.2 as fallback

interface AIGeneratedFile {
  path: string;
  content: string;
}

interface AIProjectResponse {
  files: AIGeneratedFile[];
  fileStructure: string[];
  setupInstructions: string;
  techStack: string;
}

const AGENT_CONFIGS: Record<string, { role: string; tasks: string[]; codeFocus: string }> = {
  architect: {
    role: "Analyzes requests and determines best tech stack and architecture",
    tasks: ["Analyze user requirements", "Determine tech stack", "Design architecture", "Plan structure"],
    codeFocus: "Architecture and structure"
  },
  ui: {
    role: "Creates stunning, modern UI with animations",
    tasks: ["Design component hierarchy", "Create component structure", "Implement animations", "Responsive design"],
    codeFocus: "Component design and UI"
  },
  frontend: {
    role: "Builds fully functional React/Next.js components",
    tasks: ["Implement components with state", "Set up routing", "Add form validation", "Optimize performance"],
    codeFocus: "Component implementation"
  },
  backend: {
    role: "Builds APIs, databases, and authentication",
    tasks: ["Design API endpoints", "Set up database schemas", "Implement auth", "Add data persistence"],
    codeFocus: "API development and DB schema"
  },
  devops: {
    role: "Configures build, deploy, and CI/CD",
    tasks: ["Configure build tools", "Set up dev environment", "Create deployment scripts", "Define CI/CD"],
    codeFocus: "Configuration and deployment"
  },
  qa: {
    role: "Reviews, optimizes, and ensures quality",
    tasks: ["Review code for bugs", "Add error handling", "Optimize performance", "Ensure best practices"],
    codeFocus: "Code review and optimization"
  }
};

const SYSTEM_PROMPT = `You are an expert full-stack developer with 6 specialized AI agents. Generate production-ready code based on user requirements.

Rules:
- Generate clean, maintainable, type-safe code
- Use modern best practices and design patterns
- Include proper error handling and logging
- Write accessible and performant code
- Add comments for complex logic
- Follow framework conventions

Output format (JSON):
{
  "files": [
    {
      "path": "path/to/file.ext",
      "content": "file content"
    }
  ],
  "fileStructure": ["src/", "src/components/", "src/app/"],
  "setupInstructions": "Installation steps",
  "techStack": "Technology stack used"
}

Generate realistic file contents. Do not use placeholders.`;

export async function generateWithAI(userProject: string, stack: string, selectedAgent: string | null = null): Promise<AIProjectResponse> {
  const agentConfig = selectedAgent ? AGENT_CONFIGS[selectedAgent] : null;

  try {
    const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ZAI_API_KEY || ""}`
      },
      body: JSON.stringify({
        model: "glm-4-flash",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT
          },
          {
            role: "user",
            content: `Project requirements: "${userProject}"

Technology stack: ${stack}

Agent focus:
${agentConfig ? `- Role: ${agentConfig.role}
- Tasks: ${agentConfig.tasks.join(', ')}
- Code focus: ${agentConfig.codeFocus}` : "General full-stack development"}

Generate a complete, production-ready project with real implementations (no placeholders). Return JSON.`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`z.ai failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No content returned from AI");
    }

    const parsed = JSON.parse(content);
    return {
      files: parsed.files || [],
      fileStructure: parsed.fileStructure || [],
      setupInstructions: parsed.setupInstructions || "",
      techStack: parsed.techStack || stack
    };
  } catch (error) {
    console.error("AI generation error:", error);
    throw error;
  }
}
