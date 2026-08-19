// app/api/generate/route.ts
//
// Using Groq API — FREE, no credit card, very fast
// Uses Llama 3 model (open source, excellent quality)
// Get your free key at: https://console.groq.com/keys

import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Groq client.
// Reads GROQ_API_KEY from your .env.local file automatically.
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { topic, platform, length, tone } = body

    // Basic validation
    if (!topic || !platform || !length || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, platform, length, tone' },
        { status: 400 }
      )
    }

    // Check API key exists
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not set in .env.local' },
        { status: 500 }
      )
    }

    // Build the prompt
    const platformLabels: Record<string, string> = {
      linkedin: 'LinkedIn post',
      twitter: 'Twitter / X thread',
      blog: 'Blog article intro',
      instagram: 'Instagram caption',
      newsletter: 'Newsletter section',
    }

    const lengthInstructions: Record<string, string> = {
      short: 'Keep it short: 50–100 words max.',
      medium: 'Write 150–250 words.',
      long: 'Write 400–600 words with depth and detail.',
    }

    const platformLabel = platformLabels[platform] || platform
    const lengthInstruction = lengthInstructions[length] || 'Write 150–250 words.'

    const prompt = `You are an expert content writer and social media strategist.

Write a ${platformLabel} about the following topic:
"${topic}"

Tone: ${tone}
${lengthInstruction}

Platform-specific instructions:
- LinkedIn: Start with a strong hook line. Use short paragraphs. End with a question or CTA. Add 3–5 relevant hashtags at the end.
- Twitter / X thread: Write as a numbered thread (1/, 2/, 3/ etc). Each tweet max 280 chars. Make tweet 1 a strong hook. End with a summary tweet.
- Blog article intro: Write an engaging opening paragraph that hooks the reader, states the problem, and previews what they'll learn. No headers needed.
- Instagram caption: Conversational, punchy, with line breaks for readability. Add 5–8 hashtags at the end.
- Newsletter section: Warm, personal tone. Start with a relatable opener. Include a clear takeaway.

Write ONLY the content. No preamble, no explanation, no quotes around the content.`

    // Call Groq API — llama-3.3-70b-versatile is free and very capable
    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024,
    })

    const text = completion.choices[0]?.message?.content || ''
    return NextResponse.json({ result: text })

  } catch (error) {
    console.error('Groq API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    )
  }
}
