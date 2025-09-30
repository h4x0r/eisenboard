"use client"

import type { Task } from "../types/task"
import { AI_CONFIG, AI_PROMPTS, getApiKey } from "./ai-config"

interface SubtaskItem {
  title: string
  lane: Task["lane"]
  reasoning: string
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
  const apiKey = getApiKey()

  if (!apiKey) {
    console.error("[Task Breakdown] No OpenRouter API key found")
    throw new Error("OpenRouter API key not configured")
  }

  const prompt = AI_PROMPTS.BREAKDOWN_TASK(taskTitle, taskDescription, currentLane)

  console.log("[Task Breakdown] Starting breakdown for task:", taskTitle)
  console.log("[Task Breakdown] Current lane:", currentLane)
  console.log("[Task Breakdown] Using model:", AI_CONFIG.MODEL_NAME)
  console.log("[Task Breakdown] Full prompt:", prompt)

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

    console.log("[Task Breakdown] Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[Task Breakdown] API Error:", errorText)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[Task Breakdown] Raw API response:", data)

    const content = data.choices?.[0]?.message?.content
    if (!content) {
      console.error("[Task Breakdown] No content in response")
      throw new Error("No response content from AI")
    }

    console.log("[Task Breakdown] AI response content:", content)

    // Parse the JSON response
    try {
      const parsed = JSON.parse(content.trim()) as BreakdownResult
      console.log("[Task Breakdown] Parsed breakdown:", parsed)

      // Validate the response
      const validLanes = ["urgent-important", "important-not-urgent", "urgent-not-important", "neither"]

      if (!parsed.subtasks || !Array.isArray(parsed.subtasks)) {
        console.error("[Task Breakdown] Invalid response format - missing subtasks array")
        throw new Error("Invalid response format from AI")
      }

      // Validate each subtask
      for (const subtask of parsed.subtasks) {
        if (!subtask.title || !subtask.lane || !validLanes.includes(subtask.lane)) {
          console.error("[Task Breakdown] Invalid subtask:", subtask)
          throw new Error("Invalid subtask in AI response")
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