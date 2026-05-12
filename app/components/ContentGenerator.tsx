'use client'

import { useState } from 'react'

import {
  Sparkles,
  Settings2,
  Check,
  Wand2,
  Copy,
  Loader2,
  ChevronDown,
  PenSquare,
  Mail,
  RotateCcw,
  PencilLine,
} from 'lucide-react'

import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
} from 'react-icons/fa6'

const PLATFORMS = [
  {
    value: 'linkedin',
    label: 'LinkedIn Post',
    icon: FaLinkedinIn,
  },
  {
    value: 'twitter',
    label: 'Twitter / X Thread',
    icon: FaXTwitter,
  },
  {
    value: 'blog',
    label: 'Blog Article',
    icon: PenSquare,
  },
  {
    value: 'instagram',
    label: 'Instagram Caption',
    icon: FaInstagram,
  },
  {
    value: 'newsletter',
    label: 'Newsletter',
    icon: Mail,
  },
]

const TONES = [
  'Professional',
  'Casual & friendly',
  'Storytelling',
  'Motivational',
  'Educational',
  'Witty & humorous',
]

const LENGTHS = [
  {
    value: 'short' as Length,
    label: 'Short',
    desc: '50–100 words',
  },
  {
    value: 'medium' as Length,
    label: 'Medium',
    desc: '150–250 words',
  },
  {
    value: 'long' as Length,
    label: 'Long',
    desc: '400–600 words',
  },
]

export default function ContentGenerator() {
  const [platform, setPlatform] =
    useState<Platform>('linkedin')

  const [topic, setTopic] = useState('')

  const [tone, setTone] =
    useState('Professional')

  const [length, setLength] =
    useState<Length>('medium')

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    if (!topic.trim()) return

    setLoading(true)
    setError('')
    setResult('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          platform,
          length,
          tone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Something went wrong'
        )
      }

      setResult(data.result)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to generate.'
      )
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const wordCount = result
    .split(/\s+/)
    .filter(Boolean).length

  return (
    <div className="min-h-screen bg-[#0b0d11] text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161a22] border border-[#262c36] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8ff65] animate-pulse" />

            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#b8ff65]">
              AI Powered
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            <span className="text-white">
              AI
            </span>

            <span className="ml-3 bg-gradient-to-r from-[#b8ff65] via-[#dfffb9] to-white bg-clip-text text-transparent">
              Content Generator
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm md:text-base mt-3 max-w-3xl leading-relaxed">
            Generate blogs, captions, newsletters,
            and social posts with AI-powered writing
            workflows in seconds.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-5">

          {/* LEFT SIDEBAR */}
          <div className="space-y-5">

            {/* PLATFORM */}
            <div className="bg-[#13171d] border border-[#222833] rounded-3xl p-5">

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
                    Content Type
                  </p>

                  <h3 className="text-white font-semibold mt-1">
                    Select Platform
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-[#1c212b] flex items-center justify-center border border-[#2b313d]">
                  <Sparkles
                    size={18}
                    className="text-[#b8ff65]"
                  />
                </div>
              </div>

              {/* Custom Select */}
              <div className="relative">

                <select
                  value={platform}
                  onChange={(e) =>
                    setPlatform(e.target.value as Platform)
                  }
                  className="
        appearance-none
        w-full
        bg-[#0f1217]
        border border-[#252b36]
        hover:border-[#394252]
        focus:border-[#b8ff65]
        focus:ring-4 focus:ring-[#b8ff65]/10
        rounded-2xl
        px-4 py-4
        text-sm text-white
        outline-none
        transition-all
        cursor-pointer
      "
                >
                  {PLATFORMS.map((p) => (
                    <option
                      key={p.value}
                      value={p.value}
                      className="bg-[#111318]"
                    >
                      {p.label}
                    </option>
                  ))}
                </select>

                {/* Selected Platform Preview */}
                <div className="mt-4 bg-[#0f1217] border border-[#252b36] rounded-2xl p-4 flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-[#1c212b] border border-[#2b313d] flex items-center justify-center">
                    {(() => {
                      const selected = PLATFORMS.find(
                        (p) => p.value === platform
                      )

                      const Icon = selected?.icon

                      return Icon ? (
                        <Icon
                          size={18}
                          className="text-[#b8ff65]"
                        />
                      ) : null
                    })()}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
                      Selected
                    </p>

                    <p className="text-sm font-medium text-white mt-1">
                      {
                        PLATFORMS.find(
                          (p) => p.value === platform
                        )?.label
                      }
                    </p>
                  </div>

                  <div className="w-2 h-2 rounded-full bg-[#b8ff65]" />
                </div>

                {/* Dropdown Icon */}
                <ChevronDown
                  size={18}
                  className="absolute top-4 right-4 text-gray-500 pointer-events-none"
                />
              </div>
            </div>

            {/* SETTINGS */}
            <div className="bg-[#13171d] border border-[#222833] rounded-3xl p-5">

              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#1c212b] border border-[#2b313d] flex items-center justify-center">
                  <Settings2
                    size={16}
                    className="text-[#b8ff65]"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Writing Settings
                  </h3>

                  <p className="text-xs text-gray-500 mt-0.5">
                    Configure output style
                  </p>
                </div>
              </div>

              {/* TONE */}
              <div className="mb-5">
                <label className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2 block">
                  Tone
                </label>

                <select
                  value={tone}
                  onChange={(e) =>
                    setTone(e.target.value)
                  }
                  className="
                    w-full bg-[#0f1217]
                    border border-[#252b36]
                    rounded-2xl px-4 py-3
                    text-sm text-white
                    focus:outline-none
                    focus:border-[#b8ff65]
                  "
                >
                  {TONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* LENGTH */}
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2 block">
                  Content Length
                </label>

                <div className="space-y-2">
                  {LENGTHS.map((l) => {
                    const active =
                      length === l.value

                    return (
                      <button
                        key={l.value}
                        onClick={() =>
                          setLength(l.value)
                        }
                        className={`
                          w-full rounded-2xl border px-4 py-3 text-left transition-all
                          ${active
                            ? 'bg-[#1f2530] border-[#394252]'
                            : 'bg-[#0f1217] border-[#252b36] hover:border-[#394252]'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`
                              text-sm font-medium
                              ${active
                                ? 'text-white'
                                : 'text-gray-300'
                              }
                            `}
                          >
                            {l.label}
                          </span>

                          {active && (
                            <Check
                              size={15}
                              className="text-[#b8ff65]"
                            />
                          )}
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                          {l.desc}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="bg-[#13171d] border border-[#222833] rounded-3xl overflow-hidden">

            {/* TOP BAR */}
            <div className="border-b border-[#222833] px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
                <h2 className="text-white font-semibold">
                  Content Workspace
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Generate optimized AI content
                  instantly
                </p>
              </div>

            </div>

            {/* CONTENT */}
            <div className="p-6">

              {/* RESULT TOOLBAR */}
              {result && (
                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                  {/* LEFT */}
                  <div className="flex items-center gap-3 flex-wrap">

                    <div className="px-3 py-1.5 rounded-xl bg-[#0f1217] border border-[#252b36] text-xs text-gray-400">
                      Generated Successfully
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-[#0f1217] border border-[#252b36] text-xs text-gray-400">
                      {wordCount} words
                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-2 flex-wrap">

                    {/* NEW PROMPT */}
                    <button
                      onClick={() => {
                        setResult('')
                        setTopic('')
                      }}
                      className="
            px-4 py-2.5 rounded-2xl
            bg-[#0f1217]
            border border-[#252b36]
            text-sm text-gray-300
            hover:border-[#394252]
            transition-all
            flex items-center gap-2
          "
                    >
                      <PencilLine size={15} />
                      New Prompt
                    </button>

                    {/* REGENERATE */}
                    <button
                      onClick={generate}
                      disabled={loading}
                      className="
            px-4 py-2.5 rounded-2xl
            bg-[#0f1217]
            border border-[#252b36]
            text-sm text-gray-300
            hover:border-[#394252]
            transition-all
            flex items-center gap-2
          "
                    >
                      <RotateCcw size={15} />
                      Regenerate
                    </button>

                    {/* COPY */}
                    <button
                      onClick={copyToClipboard}
                      className={`
            px-4 py-2.5 rounded-2xl
            border text-sm font-medium transition-all
            flex items-center gap-2
            ${copied
                          ? 'bg-green-500/10 border-green-500/20 text-green-400'
                          : 'bg-[#b8ff65] text-black border-[#b8ff65]'
                        }
          `}
                    >
                      {copied ? (
                        <>
                          <Check size={15} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={15} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {!result ? (
                <div className="relative">

                  <textarea
                    value={topic}
                    onChange={(e) =>
                      setTopic(e.target.value)
                    }
                    placeholder="Paste your content idea, blog topic, social media draft, or prompt here..."
                    rows={16}
                    className="
          w-full bg-[#0f1217]
          border border-[#252b36]
          rounded-3xl p-6
          text-sm text-gray-200
          placeholder:text-gray-500
          resize-none
          leading-7
          focus:outline-none
          focus:border-[#b8ff65]
        "
                  />

                  <div className="absolute bottom-5 right-5 text-xs text-gray-500">
                    {topic.length}/2000
                  </div>
                </div>
              ) : (
                <div className="bg-[#0f1217] border border-[#252b36] rounded-3xl p-7 min-h-[500px]">

                  {/* GENERATED LABEL */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-[#1a1f27] border border-[#2b313d] flex items-center justify-center">
                      <Sparkles
                        size={15}
                        className="text-[#b8ff65]"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        AI Generated Content
                      </p>

                      <p className="text-xs text-gray-500">
                        Optimized for {platform}
                      </p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="whitespace-pre-wrap text-sm leading-8 text-gray-200">
                    {result}
                  </div>
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Wand2 size={14} />
                  AI-powered generation • Smart formatting
                </div>

                <div className="flex items-center gap-3">

                  {result && (
                    <button
                      onClick={copyToClipboard}
                      className={`
                        px-5 py-3 rounded-2xl border text-sm font-medium transition-all
                        flex items-center gap-2
                        ${copied
                          ? 'bg-green-500/10 border-green-500/20 text-green-400'
                          : 'bg-[#0f1217] border-[#252b36] text-gray-300 hover:border-[#394252]'
                        }
                      `}
                    >
                      {copied ? (
                        <>
                          <Check size={16} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={generate}
                    disabled={
                      loading || !topic.trim()
                    }
                    className="
                      px-6 py-3 rounded-2xl
                      bg-[#b8ff65] text-black
                      font-semibold text-sm
                      hover:brightness-110
                      transition-all
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      flex items-center gap-2
                    "
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Generate AI
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}