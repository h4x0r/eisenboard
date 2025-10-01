"use client"

import type { Task } from "../types/task"
import { AI_PROMPTS } from "./ai-config"

interface SubtaskItem {
  title: string
  lane: Task["lane"]
  reasoning: string
  estimatedMinutes: number
  difficulty: "easy" | "medium" | "hard"
  energyLevel: "low" | "medium" | "high"
}

interface BreakdownResult {
  subtasks: SubtaskItem[]
  overall_approach: string
}

export async function breakdownTask(
  taskTitle: string,
  taskDescription?: string,
  currentLane?: Task["lane"]
): Promise<BreakdownResult> {
  const prompt = AI_PROMPTS.BREAKDOWN_TASK(taskTitle, taskDescription, currentLane)

  console.log("[Task Breakdown] Starting breakdown for task:", taskTitle)
  console.log("[Task Breakdown] Current lane:", currentLane)
  console.log("[Task Breakdown] Full prompt:", prompt)

  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        type: "breakdown"
      })
    })

    console.log("[Task Breakdown] Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[Task Breakdown] API Error:", errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[Task Breakdown] API response:", data)

    // The API route already parses the JSON, so data should be the parsed object
    // or it might have a content field if parsing failed server-side
    let parsed: BreakdownResult

    if (data.content && typeof data.content === 'string') {
      // If we got raw content back, parse it
      try {
        parsed = JSON.parse(data.content) as BreakdownResult
      } catch (parseError) {
        console.error("[Task Breakdown] Failed to parse content:", parseError)
        throw new Error("Failed to parse AI response")
      }
    } else if (data.subtasks && data.overall_approach) {
      // Already parsed on server
      parsed = data as BreakdownResult
    } else {
      console.error("[Task Breakdown] Unexpected response format:", data)
      throw new Error("Unexpected response format from API")
    }

    // Continue with validation
    try {
      console.log("[Task Breakdown] Parsed breakdown:", parsed)

      // Validate the response
      const validLanes = ["urgent-important", "important-not-urgent", "urgent-not-important", "neither"]

      if (!parsed.subtasks || !Array.isArray(parsed.subtasks)) {
        console.error("[Task Breakdown] Invalid response format - missing subtasks array")
        throw new Error("Invalid response format from AI")
      }

      // Validate each subtask
      const validDifficulties = ["easy", "medium", "hard"]
      const validEnergyLevels = ["low", "medium", "high"]

      for (const subtask of parsed.subtasks) {
        if (!subtask.title || !subtask.lane || !validLanes.includes(subtask.lane)) {
          console.error("[Task Breakdown] Invalid subtask:", subtask)
          throw new Error("Invalid subtask in AI response")
        }

        // Validate new fields, but provide defaults if missing for backward compatibility
        if (typeof subtask.estimatedMinutes !== 'number') {
          subtask.estimatedMinutes = 10 // Default to 10 minutes
        }

        if (!subtask.difficulty || !validDifficulties.includes(subtask.difficulty)) {
          subtask.difficulty = "medium" // Default difficulty
        }

        if (!subtask.energyLevel || !validEnergyLevels.includes(subtask.energyLevel)) {
          subtask.energyLevel = "medium" // Default energy level
        }
      }

      console.log("[Task Breakdown] ✓ Successfully broke down task")
      console.log(`[Task Breakdown] → Generated ${parsed.subtasks.length} subtasks`)
      console.log(`[Task Breakdown] → Approach: ${parsed.overall_approach}`)

      return parsed
    } catch (parseError) {
      console.error("[Task Breakdown] Failed to parse AI response as JSON:", parseError)
      console.error("[Task Breakdown] Content was:", content)
      throw new Error("Failed to parse AI breakdown response")
    }
  } catch (error) {
    console.error("[Task Breakdown] Error during breakdown:", error)
    throw error
  }
}