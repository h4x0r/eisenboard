interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

interface Subtask {
  title: string
  description?: string
}

export class OpenRouterClient {
  private apiKey: string
  private baseUrl = 'https://openrouter.ai/api/v1'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async generateSubtasks(taskTitle: string, taskDescription?: string): Promise<Subtask[]> {
    const prompt = this.buildPrompt(taskTitle, taskDescription)

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.href : '',
          'X-Title': 'Eisenboard Task Expansion'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`)
      }

      const data: OpenRouterResponse = await response.json()
      const content = data.choices[0]?.message?.content

      if (!content) {
        throw new Error('No content received from OpenRouter API')
      }

      return this.parseSubtasks(content)
    } catch (error) {
      console.error('Error generating subtasks:', error)
      throw new Error(`Failed to generate subtasks: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private buildPrompt(taskTitle: string, taskDescription?: string): string {
    const baseTask = taskDescription
      ? `Task: ${taskTitle}\nDescription: ${taskDescription}`
      : `Task: ${taskTitle}`

    return `You are a productivity expert helping break down a task into actionable subtasks.

${baseTask}

Please break this task down into 3-6 specific, actionable subtasks. Each subtask should:
- Be clear and actionable (start with a verb)
- Be completable in a reasonable amount of time
- Build logically toward completing the main task
- Be specific enough to know when it's done

Format your response as JSON with this exact structure:
{
  "subtasks": [
    {
      "title": "Clear, actionable subtask title",
      "description": "Brief description explaining what needs to be done (optional)"
    }
  ]
}

Respond only with valid JSON, no additional text.`
  }

  private parseSubtasks(content: string): Subtask[] {
    try {
      // Clean the content - remove any markdown formatting or extra text
      const cleanContent = content
        .replace(/```json\s*/, '')
        .replace(/```\s*$/, '')
        .trim()

      const parsed = JSON.parse(cleanContent)

      if (!parsed.subtasks || !Array.isArray(parsed.subtasks)) {
        throw new Error('Invalid response format: missing subtasks array')
      }

      return parsed.subtasks.map((subtask: any) => ({
        title: subtask.title || 'Untitled Subtask',
        description: subtask.description
      }))
    } catch (error) {
      console.error('Error parsing subtasks response:', error)
      console.error('Raw content:', content)

      // Fallback: try to extract tasks from a more free-form response
      return this.extractSubtasksFromText(content)
    }
  }

  private extractSubtasksFromText(content: string): Subtask[] {
    // Fallback parser for non-JSON responses
    const lines = content.split('\n').filter(line => line.trim())
    const subtasks: Subtask[] = []

    for (const line of lines) {
      // Look for numbered lists, bullet points, or lines starting with action verbs
      const match = line.match(/^(?:\d+\.|\-|\*)\s*(.+)$/) ||
                   (line.match(/^[A-Z][a-z]+\s+.+/) ? [null, line] : null)

      if (match && match[1]) {
        const title = match[1].trim()
        if (title.length > 3) { // Ensure it's not just a short fragment
          subtasks.push({ title })
        }
      }
    }

    // If we couldn't extract any subtasks, provide a helpful default
    if (subtasks.length === 0) {
      subtasks.push({
        title: 'Review and plan the task details',
        description: 'Break down the requirements and create an action plan'
      })
    }

    return subtasks.slice(0, 6) // Limit to 6 subtasks
  }
}

// Utility function to create an OpenRouter client
export function createOpenRouterClient(): OpenRouterClient | null {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ||
                process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    console.warn('OpenRouter API key not found. Task expansion will not be available.')
    return null
  }

  return new OpenRouterClient(apiKey)
}