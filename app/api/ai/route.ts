import { NextRequest, NextResponse } from "next/server"

// AI configuration
const AI_CONFIG = {
  MODEL: "anthropic/claude-3-opus",
  ENDPOINT: "https://openrouter.ai/api/v1/chat/completions",
  TEMPERATURE: 0.3,
  MAX_TOKENS: 500,
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json()

    if (!prompt || !type) {
      return NextResponse.json({ error: "Missing prompt or type" }, { status: 400 })
    }

    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      console.error("[AI API Route] No OpenRouter API key found")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log(`[AI API Route] Processing ${type} request`)
    console.log(`[AI API Route] Prompt length: ${prompt.length} characters`)

    const response = await fetch(AI_CONFIG.ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": request.headers.get("origin") || "http://localhost:3000",
        "X-Title": "Eisenboard AI Assistant"
      },
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

    console.log(`[AI API Route] OpenRouter response status: ${response.status}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[AI API Route] OpenRouter error: ${errorText}`)
      return NextResponse.json(
        { error: `OpenRouter API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      console.error("[AI API Route] No content in OpenRouter response")
      return NextResponse.json(
        { error: "No response content from AI" },
        { status: 500 }
      )
    }

    console.log(`[AI API Route] Successfully processed ${type} request`)

    // Parse the JSON response from the AI
    try {
      const parsed = JSON.parse(content)
      return NextResponse.json(parsed)
    } catch (parseError) {
      console.error("[AI API Route] Failed to parse AI response as JSON:", content)
      // Return the raw content if it's not JSON
      return NextResponse.json({ content })
    }
  } catch (error) {
    console.error("[AI API Route] Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}