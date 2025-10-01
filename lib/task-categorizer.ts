"use client"

import type { Task } from "../types/task"
import { AI_PROMPTS } from "./ai-config"

interface CategorizedTask {
  lane: Task["lane"]
  reasoning: string
}

export async function categorizeTask(taskTitle: string, taskDescription?: string): Promise<CategorizedTask> {
  const prompt = AI_PROMPTS.CATEGORIZE_TASK(taskTitle, taskDescription)

  console.log("[Task Categorizer] Starting categorization for task:", taskTitle)
  console.log("[Task Categorizer] Full prompt:", prompt)

  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        type: "categorize"
      })
    })

    console.log("[Task Categorizer] Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[Task Categorizer] API Error:", errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[Task Categorizer] API response:", data)

    // The API route already parses the JSON, so data should be the parsed object
    // or it might have a content field if parsing failed server-side
    let parsed: CategorizedTask

    if (data.content && typeof data.content === 'string') {
      // If we got raw content back, parse it
      try {
        parsed = JSON.parse(data.content) as CategorizedTask
      } catch (parseError) {
        console.error("[Task Categorizer] Failed to parse content:", parseError)
        throw new Error("Failed to parse AI response")
      }
    } else if (data.lane && data.reasoning) {
      // Already parsed on server
      parsed = data as CategorizedTask
    } else {
      console.error("[Task Categorizer] Unexpected response format:", data)
      throw new Error("Unexpected response format from API")
    }

    try {
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