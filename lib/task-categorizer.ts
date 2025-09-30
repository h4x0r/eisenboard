"use client"

import type { Task } from "../types/task"
import { AI_CONFIG, AI_PROMPTS, getApiKey } from "./ai-config"

interface CategorizedTask {
  lane: Task["lane"]
  reasoning: string
}

export async function categorizeTask(taskTitle: string, taskDescription?: string): Promise<CategorizedTask> {
  const apiKey = getApiKey()

  if (!apiKey) {
    console.error("[Task Categorizer] No OpenRouter API key found")
    throw new Error("OpenRouter API key not configured")
  }

  const prompt = AI_PROMPTS.CATEGORIZE_TASK(taskTitle, taskDescription)

  console.log("[Task Categorizer] Starting categorization for task:", taskTitle)
  console.log("[Task Categorizer] Using model:", AI_CONFIG.MODEL_NAME)
  console.log("[Task Categorizer] Full prompt:", prompt)

  try {
    const response = await fetch(AI_CONFIG.ENDPOINT, {
      method: "POST",
      headers: AI_CONFIG.getHeaders(apiKey),
      body: JSON.stringify({
        model: AI_CONFIG.MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: AI_CONFIG.TEMPERATURE,
        max_tokens: AI_CONFIG.MAX_TOKENS
      })
    })

    console.log("[Task Categorizer] Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[Task Categorizer] API Error:", errorText)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[Task Categorizer] Raw API response:", data)

    const content = data.choices?.[0]?.message?.content
    if (!content) {
      console.error("[Task Categorizer] No content in response")
      throw new Error("No response content from AI")
    }

    console.log("[Task Categorizer] AI response content:", content)

    // Parse the JSON response
    try {
      const parsed = JSON.parse(content.trim()) as CategorizedTask
      console.log("[Task Categorizer] Parsed categorization:", parsed)

      // Validate the response
      const validLanes = ["urgent-important", "important-not-urgent", "urgent-not-important", "neither"]
      if (!validLanes.includes(parsed.lane)) {
        console.error("[Task Categorizer] Invalid lane in response:", parsed.lane)
        throw new Error("Invalid lane in AI response")
      }

      console.log("[Task Categorizer] ✓ Successfully categorized task")
      console.log(`[Task Categorizer] → Lane: ${parsed.lane}`)
      console.log(`[Task Categorizer] → Reasoning: ${parsed.reasoning}`)

      return parsed
    } catch (parseError) {
      console.error("[Task Categorizer] Failed to parse AI response as JSON:", parseError)
      console.error("[Task Categorizer] Content was:", content)
      throw new Error("Failed to parse AI categorization response")
    }
  } catch (error) {
    console.error("[Task Categorizer] Error during categorization:", error)

    // Fallback to default categorization
    console.log("[Task Categorizer] Falling back to default categorization (important-not-urgent)")
    return {
      lane: "important-not-urgent",
      reasoning: "Could not determine category automatically, defaulting to Important but Not Urgent"
    }
  }
}