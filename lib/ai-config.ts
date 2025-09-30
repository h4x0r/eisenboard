/**
 * Centralized AI/LLM configuration and prompts
 * All OpenRouter API calls should use these settings for consistency
 */

export const AI_CONFIG = {
  // Model selection - single source of truth
  MODEL: "anthropic/claude-3-opus" as const,
  MODEL_NAME: "Claude Opus 4.1",

  // API configuration
  TEMPERATURE: 0.3,
  MAX_TOKENS: 500,

  // Request headers
  getHeaders: (apiKey: string) => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
    "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
    "X-Title": "Eisenboard AI Assistant"
  }),

  // API endpoint
  ENDPOINT: "https://openrouter.ai/api/v1/chat/completions" as const
}

/**
 * Centralized prompt templates
 * All prompts should be defined here for consistency and maintainability
 */
export const AI_PROMPTS = {
  /**
   * Task categorization prompt
   * Determines which Eisenhower Matrix quadrant a task belongs to
   */
  CATEGORIZE_TASK: (taskTitle: string, taskDescription?: string) => {
    const taskContent = taskDescription
      ? `Task: ${taskTitle}\nDescription: ${taskDescription}`
      : `Task: ${taskTitle}`

    return `You are an expert at categorizing tasks using the Eisenhower Matrix. Given a task, determine which quadrant it belongs to based on its urgency and importance.

The Eisenhower Matrix has four quadrants:
1. "urgent-important": Tasks that are both urgent and important - crises, deadlines, problems that need immediate attention
2. "important-not-urgent": Tasks that are important but not urgent - planning, prevention, improvement, development, relationships
3. "urgent-not-important": Tasks that are urgent but not important - interruptions, some emails/calls, some meetings
4. "neither": Tasks that are neither urgent nor important - time wasters, trivial tasks, excessive entertainment

${taskContent}

Analyze this task and respond with ONLY a JSON object in this exact format:
{
  "lane": "urgent-important" | "important-not-urgent" | "urgent-not-important" | "neither",
  "reasoning": "Brief explanation of why this task belongs in this quadrant"
}

Important: Respond ONLY with the JSON object, no additional text or markdown formatting.`
  },

  /**
   * Task breakdown prompt
   * Breaks down a task into actionable subtasks
   */
  BREAKDOWN_TASK: (taskTitle: string, taskDescription?: string, currentLane?: string) => {
    const taskContent = taskDescription
      ? `Task: ${taskTitle}\nDescription: ${taskDescription}`
      : `Task: ${taskTitle}`

    const laneContext = currentLane
      ? `\nCurrent Priority: This task is in the "${currentLane.replace("-", " & ")}" quadrant.`
      : ""

    return `You are an expert at breaking down complex tasks into actionable subtasks. Given a task, create a list of concrete, actionable steps needed to complete it.

${taskContent}${laneContext}

Break down this task into 3-7 actionable subtasks. Each subtask should be:
- Specific and concrete (can be completed in one work session)
- Action-oriented (starts with a verb)
- Independent when possible (can be worked on separately)
- Appropriately sized (not too granular, not too broad)

Respond with ONLY a JSON object in this exact format:
{
  "subtasks": [
    {
      "title": "Specific action to take",
      "lane": "urgent-important" | "important-not-urgent" | "urgent-not-important" | "neither",
      "reasoning": "Brief explanation of priority"
    }
  ],
  "overall_approach": "Brief explanation of the breakdown strategy"
}

Important: Respond ONLY with the JSON object, no additional text or markdown formatting.`
  },

  /**
   * Task expansion prompt (for existing expand functionality)
   * Expands a task with more detail and subtasks
   */
  EXPAND_TASK: (taskTitle: string, taskDescription?: string) => {
    return `Break down this task into actionable subtasks. Be concise and specific.

Task: ${taskTitle}${taskDescription ? `\nDescription: ${taskDescription}` : ""}

Provide 3-5 clear, actionable subtasks. Return ONLY a JSON array of subtask strings, no additional text or formatting.

Example format:
["First specific action", "Second specific action", "Third specific action"]`
  }
}

/**
 * Get API key from environment
 */
export function getApiKey(): string | undefined {
  if (typeof window !== "undefined") {
    // Client-side
    return process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
  }
  // Server-side
  return process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
}