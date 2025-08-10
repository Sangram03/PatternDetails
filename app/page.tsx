"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  Heart,
  Copy,
  Download,
  Palette,
  Code,
  Grid,
  Sparkles,
  Github,
  Twitter,
  Moon,
  Sun,
  Shuffle,
  Zap,
  TrendingUp,
  Users,
  Share2,
  RotateCcw,
  Wand2,
  Flame,
  MessageCircle,
  X,
  Send,
  Bot,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

interface Pattern {
  id: string
  name: string
  category: string
  css: string
  tailwind: string
  colors: string[]
  preview: string
  isFavorite?: boolean
  isAnimated?: boolean
  cssOnly?: boolean
  difficulty: "easy" | "medium" | "hard"
  popularity: number
  tags: string[]
  description?: string
}

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  patterns?: Pattern[]
}

const patterns: Pattern[] = [
  {
    id: "1",
    name: "Cosmic Waves",
    category: "gradients",
    css: "background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);",
    tailwind: "bg-gradient-to-br from-blue-500 to-purple-600",
    colors: ["#667eea", "#764ba2"],
    preview: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
    cssOnly: true,
    difficulty: "easy",
    popularity: 95,
    tags: ["cosmic", "wave", "gradient", "simple"],
    description: "A beautiful cosmic gradient that transitions from blue to purple",
  },
  {
    id: "2",
    name: "Neural Network",
    category: "geometric",
    css: "background-color: #0a0a0a; background-image: radial-gradient(circle, #00ff88 1px, transparent 1px); background-size: 25px 25px; animation: neural-pulse 2s ease-in-out infinite;",
    tailwind:
      "bg-gray-900 bg-[radial-gradient(circle,#00ff88_1px,transparent_1px)] bg-[length:25px_25px] animate-pulse",
    colors: ["#0a0a0a", "#00ff88"],
    preview: "radial-gradient(circle, #00ff88 1px, transparent 1px), #0a0a0a",
    isAnimated: true,
    cssOnly: false,
    difficulty: "hard",
    popularity: 88,
    tags: ["neural", "tech", "dots", "futuristic", "animated"],
    description: "Animated neural network pattern with glowing green dots",
  },
  {
    id: "3",
    name: "Simple Dots",
    category: "geometric",
    css: "background-color: #f8f9fa; background-image: radial-gradient(circle, #dee2e6 2px, transparent 2px); background-size: 30px 30px;",
    tailwind: "bg-gray-50 bg-[radial-gradient(circle,#dee2e6_2px,transparent_2px)] bg-[length:30px_30px]",
    colors: ["#f8f9fa", "#dee2e6"],
    preview: "radial-gradient(circle, #dee2e6 2px, transparent 2px), #f8f9fa",
    cssOnly: true,
    difficulty: "easy",
    popularity: 92,
    tags: ["dots", "simple", "clean", "minimal"],
    description: "Clean and minimal dot pattern perfect for backgrounds",
  },
  {
    id: "4",
    name: "Striped Lines",
    category: "geometric",
    css: "background: repeating-linear-gradient(45deg, #f1f3f4, #f1f3f4 10px, #e8eaed 10px, #e8eaed 20px);",
    tailwind: "bg-[repeating-linear-gradient(45deg,#f1f3f4,#f1f3f4_10px,#e8eaed_10px,#e8eaed_20px)]",
    colors: ["#f1f3f4", "#e8eaed"],
    preview: "repeating-linear-gradient(45deg, #f1f3f4, #f1f3f4 10px, #e8eaed 10px, #e8eaed 20px)",
    cssOnly: true,
    difficulty: "easy",
    popularity: 78,
    tags: ["stripes", "lines", "diagonal", "simple"],
    description: "Diagonal striped pattern with subtle gray tones",
  },
  {
    id: "5",
    name: "Liquid Metal",
    category: "effects",
    css: "background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%); background-size: 400% 400%; animation: liquid-flow 4s ease-in-out infinite;",
    tailwind:
      "bg-gradient-to-br from-blue-500 via-purple-600 via-pink-400 via-red-400 to-blue-400 bg-[length:400%_400%] animate-pulse",
    colors: ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe"],
    preview: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
    isAnimated: true,
    cssOnly: false,
    difficulty: "hard",
    popularity: 92,
    tags: ["liquid", "metal", "flow", "premium", "animated"],
    description: "Animated liquid metal effect with flowing colors",
  },
  {
    id: "6",
    name: "Grid Pattern",
    category: "geometric",
    css: "background-color: #ffffff; background-image: linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px); background-size: 20px 20px;",
    tailwind:
      "bg-white bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px]",
    colors: ["#ffffff", "#e5e7eb"],
    preview:
      "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px), #ffffff",
    cssOnly: true,
    difficulty: "medium",
    popularity: 85,
    tags: ["grid", "lines", "clean", "professional"],
    description: "Clean grid pattern perfect for professional layouts",
  },
  {
    id: "7",
    name: "Holographic Grid",
    category: "decorative",
    css: "background: linear-gradient(90deg, transparent 24%, rgba(255,119,198,0.05) 25%, rgba(255,119,198,0.05) 26%, transparent 27%, transparent 74%, rgba(255,119,198,0.05) 75%, rgba(255,119,198,0.05) 76%, transparent 77%), linear-gradient(transparent 24%, rgba(255,119,198,0.05) 25%, rgba(255,119,198,0.05) 26%, transparent 27%, transparent 74%, rgba(255,119,198,0.05) 75%, rgba(255,119,198,0.05) 76%, transparent 77%); background-size: 50px 50px;",
    tailwind:
      "bg-[linear-gradient(90deg,transparent_24%,rgba(255,119,198,0.05)_25%,rgba(255,119,198,0.05)_26%,transparent_27%,transparent_74%,rgba(255,119,198,0.05)_75%,rgba(255,119,198,0.05)_76%,transparent_77%),linear-gradient(transparent_24%,rgba(255,119,198,0.05)_25%,rgba(255,119,198,0.05)_26%,transparent_27%,transparent_74%,rgba(255,119,198,0.05)_75%,rgba(255,119,198,0.05)_76%,transparent_77%)] bg-[length:50px_50px]",
    colors: ["#ff77c6", "#transparent"],
    preview: "repeating-linear-gradient(90deg, transparent 0px, rgba(255,119,198,0.1) 25px, transparent 50px)",
    cssOnly: true,
    difficulty: "medium",
    popularity: 76,
    tags: ["holographic", "grid", "futuristic", "subtle"],
    description: "Subtle holographic grid effect with pink accents",
  },
  {
    id: "8",
    name: "Plasma Storm",
    category: "effects",
    css: "background: radial-gradient(circle at 20% 50%, #ff006e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8338ec 0%, transparent 50%), radial-gradient(circle at 40% 80%, #3a86ff 0%, transparent 50%); animation: plasma-storm 6s ease-in-out infinite;",
    tailwind:
      "bg-[radial-gradient(circle_at_20%_50%,#ff006e_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#8338ec_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#3a86ff_0%,transparent_50%)]",
    colors: ["#ff006e", "#8338ec", "#3a86ff"],
    preview: "radial-gradient(circle, #ff006e, #8338ec, #3a86ff)",
    isAnimated: true,
    cssOnly: false,
    difficulty: "hard",
    popularity: 89,
    tags: ["plasma", "storm", "energy", "dynamic", "animated"],
    description: "Dynamic plasma storm effect with animated energy fields",
  },
  {
    id: "9",
    name: "Checkerboard",
    category: "geometric",
    css: "background-image: linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f4f6 75%), linear-gradient(-45deg, transparent 75%, #f3f4f6 75%); background-size: 30px 30px; background-position: 0 0, 0 15px, 15px -15px, -15px 0px;",
    tailwind:
      "bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%),linear-gradient(-45deg,#f3f4f6_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f3f4f6_75%),linear-gradient(-45deg,transparent_75%,#f3f4f6_75%)] bg-[length:30px_30px] bg-[position:0_0,0_15px,15px_-15px,-15px_0px]",
    colors: ["#f3f4f6", "#ffffff"],
    preview: "repeating-conic-gradient(#f3f4f6 0% 25%, transparent 0% 50%) 50% / 30px 30px",
    cssOnly: true,
    difficulty: "medium",
    popularity: 73,
    tags: ["checkerboard", "chess", "pattern", "classic"],
    description: "Classic checkerboard pattern with subtle gray squares",
  },
  {
    id: "10",
    name: "Sunset Gradient",
    category: "gradients",
    css: "background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);",
    tailwind: "bg-gradient-to-br from-pink-300 via-pink-200 to-pink-200",
    colors: ["#ff9a9e", "#fecfef"],
    preview: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    cssOnly: true,
    difficulty: "easy",
    popularity: 91,
    tags: ["sunset", "gradient", "pink", "soft"],
    description: "Soft sunset gradient with pink and peach tones",
  },
]

export default function PixelForge() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null)
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true)
  const [cssOnlyFilter, setCssOnlyFilter] = useState(false)
  const [sortBy, setSortBy] = useState("popularity")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content:
        "👋 Hi! I'm your pattern assistant. I can help you find the perfect patterns, explain CSS code, or answer any questions about PixelForge. What are you looking for today?",
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const categories = [
    { id: "all", name: "All Patterns", icon: Grid, count: patterns.length },
    {
      id: "gradients",
      name: "Gradients",
      icon: Palette,
      count: patterns.filter((p) => p.category === "gradients").length,
    },
    {
      id: "geometric",
      name: "Geometric",
      icon: Grid,
      count: patterns.filter((p) => p.category === "geometric").length,
    },
    {
      id: "decorative",
      name: "Decorative",
      icon: Sparkles,
      count: patterns.filter((p) => p.category === "decorative").length,
    },
    { id: "effects", name: "Effects", icon: Zap, count: patterns.filter((p) => p.category === "effects").length },
    { id: "favorites", name: "Favorites", icon: Heart, count: favorites.length },
  ]

  const filteredPatterns = patterns
    .filter((pattern) => {
      const matchesSearch =
        pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pattern.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (pattern.description && pattern.description.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory =
        selectedCategory === "all" ||
        pattern.category === selectedCategory ||
        (selectedCategory === "favorites" && favorites.includes(pattern.id))
      const matchesCssOnly = !cssOnlyFilter || pattern.cssOnly
      return matchesSearch && matchesCategory && matchesCssOnly
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity
        case "name":
          return a.name.localeCompare(b.name)
        case "difficulty":
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        default:
          return 0
      }
    })

  const toggleFavorite = (patternId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(patternId) ? prev.filter((id) => id !== patternId) : [...prev, patternId]

      toast({
        title: prev.includes(patternId) ? "Removed from favorites" : "Added to favorites",
        description: "Your favorites have been updated",
      })

      return newFavorites
    })
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied! ✨",
      description: `${type} code copied to clipboard`,
    })
  }

  const generateRandomPattern = () => {
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)]
    setSelectedPattern(randomPattern)
    toast({
      title: "Random pattern generated! 🎲",
      description: `Showing ${randomPattern.name}`,
    })
  }

  const sharePattern = (pattern: Pattern) => {
    const shareUrl = `${window.location.origin}?pattern=${pattern.id}`
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Share link copied! 🔗",
      description: "Share this awesome pattern with others",
    })
  }

  const exportPattern = (pattern: Pattern, format: string) => {
    let content = ""
    let filename = ""

    switch (format) {
      case "css":
        content = `.${pattern.name.toLowerCase().replace(/\s+/g, "-")} {\n  ${pattern.css}\n}`
        if (pattern.isAnimated) {
          content += `\n\n/* Add keyframes for animations */\n@keyframes cosmic-wave {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}`
        }
        filename = `${pattern.name.toLowerCase().replace(/\s+/g, "-")}.css`
        break
      case "tailwind":
        content = ` ${pattern.name} \n<div class="${pattern.tailwind}"></div>`
        filename = `${pattern.name.toLowerCase().replace(/\s+/g, "-")}.html`
        break
      case "svg":
        content = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">\n  <defs>\n    <linearGradient id="pattern-${pattern.id}">\n      ${pattern.colors.map((color, i) => `<stop offset="${(i / (pattern.colors.length - 1)) * 100}%" stopColor="${color}"/>`).join("\n      ")}\n    </linearGradient>\n  </defs>\n  <rect width="100%" height="100%" fill="url(#pattern-${pattern.id})"/>\n</svg>`
        filename = `${pattern.name.toLowerCase().replace(/\s+/g, "-")}.svg`
        break
    }

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Pattern exported! 📁",
      description: `Downloaded as ${filename}`,
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(chatInput)
      setChatMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const generateBotResponse = (input: string): ChatMessage => {
    const lowerInput = input.toLowerCase()
    let response = ""
    let suggestedPatterns: Pattern[] = []

    // Pattern search responses
    if (lowerInput.includes("gradient") || lowerInput.includes("color")) {
      response = "🎨 I found some beautiful gradient patterns for you! These are perfect for modern backgrounds:"
      suggestedPatterns = patterns.filter((p) => p.category === "gradients").slice(0, 3)
    } else if (lowerInput.includes("simple") || lowerInput.includes("minimal") || lowerInput.includes("clean")) {
      response = "✨ Here are some clean and minimal patterns that would work great for professional designs:"
      suggestedPatterns = patterns.filter((p) => p.tags.includes("simple") || p.tags.includes("clean")).slice(0, 3)
    } else if (
      lowerInput.includes("css only") ||
      lowerInput.includes("no animation") ||
      lowerInput.includes("static")
    ) {
      response = "🎯 Perfect! Here are CSS-only patterns that don't require any JavaScript or animations:"
      suggestedPatterns = patterns.filter((p) => p.cssOnly).slice(0, 3)
    } else if (lowerInput.includes("animated") || lowerInput.includes("moving") || lowerInput.includes("dynamic")) {
      response = "⚡ Here are some dynamic animated patterns that will bring your design to life:"
      suggestedPatterns = patterns.filter((p) => p.isAnimated).slice(0, 3)
    } else if (lowerInput.includes("dots") || lowerInput.includes("circles")) {
      response = "⚪ I found some great dot patterns for you:"
      suggestedPatterns = patterns.filter((p) => p.tags.includes("dots")).slice(0, 3)
    } else if (lowerInput.includes("grid") || lowerInput.includes("lines")) {
      response = "📐 Here are some structured grid and line patterns:"
      suggestedPatterns = patterns.filter((p) => p.tags.includes("grid") || p.tags.includes("lines")).slice(0, 3)
    } else if (lowerInput.includes("help") || lowerInput.includes("how")) {
      response = `🤖 I'm here to help! Here's what I can do:

• **Find Patterns**: Ask me for "gradients", "simple patterns", "CSS-only", etc.
• **Explain Code**: Ask "how does this CSS work?" or "explain this pattern"
• **Recommendations**: Tell me your project type and I'll suggest patterns
• **Troubleshooting**: Having issues? I can help debug CSS problems

What would you like to know more about?`
    } else if (lowerInput.includes("explain") || lowerInput.includes("how does") || lowerInput.includes("what is")) {
      response = `📚 Great question! Here's how CSS patterns work:

**CSS Background Patterns** use properties like:
• \`background-image\`: Creates the pattern using gradients
• \`background-size\`: Controls pattern repetition
• \`background-position\`: Adjusts pattern alignment

**Gradients** create smooth color transitions:
• \`linear-gradient()\`: Straight line transitions
• \`radial-gradient()\`: Circular transitions
• \`repeating-linear-gradient()\`: Repeating patterns

Would you like me to explain a specific pattern?`
    } else if (lowerInput.includes("project") || lowerInput.includes("website") || lowerInput.includes("app")) {
      response = `🚀 Tell me more about your project! I can recommend patterns based on:

• **Corporate/Business**: Clean grids, subtle gradients
• **Creative/Portfolio**: Bold gradients, artistic patterns  
• **Tech/SaaS**: Geometric patterns, neural networks
• **E-commerce**: Minimal dots, soft gradients
• **Gaming**: Plasma effects, animated patterns

What type of project are you working on?`
    } else {
      // Default response with random helpful patterns
      response =
        "🤔 I'm not sure exactly what you're looking for, but here are some popular patterns that might inspire you:"
      suggestedPatterns = patterns.sort((a, b) => b.popularity - a.popularity).slice(0, 3)
    }

    return {
      id: Date.now().toString(),
      type: "bot",
      content: response,
      timestamp: new Date(),
      patterns: suggestedPatterns,
    }
  }

  const insertPatternFromChat = (pattern: Pattern) => {
    setSelectedPattern(pattern)
    setIsChatOpen(false)
    toast({
      title: "Pattern selected! ✨",
      description: `Now viewing ${pattern.name}`,
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  PixelForge
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Pattern Studio</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={generateRandomPattern} className="hidden sm:flex">
                <Shuffle className="w-4 h-4 mr-2" />
                Random
              </Button>

              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <Button variant="ghost" size="sm">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white/70 to-gray-100/50 dark:from-gray-900/70 dark:to-gray-950/50 backdrop-blur-sm py-20">
  <div className="max-w-6xl mx-auto text-center px-4">
    {/* Feature Badges */}
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md">
        🎨 Live Pattern Preview
      </Badge>
      <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md">
        ⚡ Instant Export
      </Badge>
      <Badge className="bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md">
        💬 Guided Help
      </Badge>
    </div>

    {/* Heading */}
    <h1 className="text-5xl md:text-7xl font-extrabold mb-3">
      <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 dark:from-indigo-400 dark:via-purple-400 dark:to-rose-400 bg-clip-text text-transparent">
        Design Beyond Limits
      </span>
    </h1>
    <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
      Build Dynamic Visual Patterns
    </h2>

    {/* Description */}
    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
      Our pattern studio lets you generate, customize, and download stunning backgrounds in seconds. 
      Choose from CSS-only builds, AI-enhanced designs, and fully responsive layouts—ready to drop into your project.
    </p>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
      {[
        {
          icon: <CheckCircle className="w-6 h-6 text-white" />,
          title: "Pure CSS Patterns",
          desc: "No JS required—lightweight and performance-friendly."
        },
        {
          icon: <Bot className="w-6 h-6 text-white" />,
          title: "AI Pattern Finder",
          desc: "Get AI suggestions for color palettes and layouts."
        },
        {
          icon: <Sparkles className="w-6 h-6 text-white" />,
          title: "Custom Export",
          desc: "Export to CSS, SVG, or PNG with one click."
        }
      ].map((card, idx) => (
        <div
          key={idx}
          className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
            {card.icon}
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{card.desc}</p>
        </div>
      ))}
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Button
        size="lg"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Flame className="w-5 h-5 mr-2" />
        Start Designing
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Chat with Expert
      </Button>
    </div>
  </div>
</section>


      {/* Stats Section */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {patterns.length}+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Patterns</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {patterns.filter((p) => p.cssOnly).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">CSS-Only</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Free</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Studio */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pattern Studio</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover, customize, and export beautiful patterns
            </p>
          </div>

          {/* Advanced Controls */}
          <div className="mb-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search patterns or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 dark:bg-gray-900/80"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/80 dark:bg-gray-900/80">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/80 dark:bg-gray-900/80">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Popularity
                    </div>
                  </SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Switch checked={isAnimationEnabled} onCheckedChange={setIsAnimationEnabled} />
                <Label className="text-sm">Animations</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch checked={cssOnlyFilter} onCheckedChange={setCssOnlyFilter} />
                <Label className="text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  CSS Only
                </Label>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                )
              })}
            </div>

            {cssOnlyFilter && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2 text-green-800 dark:text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Showing CSS-only patterns ({patterns.filter((p) => p.cssOnly).length} patterns)
                  </span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  These patterns work with pure CSS and don't require JavaScript or animations.
                </p>
              </div>
            )}
          </div>

          {/* Pattern Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPatterns.map((pattern) => (
              <Card
                key={pattern.id}
                className="group hover:shadow-2xl transition-all duration-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div
                      className={`h-48 relative overflow-hidden cursor-pointer ${
                        isAnimationEnabled && pattern.isAnimated ? "animate-pulse" : ""
                      }`}
                      style={{ background: pattern.preview }}
                      onClick={() => setSelectedPattern(pattern)}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                          <Button
                            size="sm"
                            className="bg-white/90 text-gray-900 hover:bg-white shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation()
                              copyToClipboard(pattern.css, "CSS")
                            }}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-white/90 text-gray-900 hover:bg-white shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(pattern.id)
                            }}
                          >
                            <Heart
                              className={`w-4 h-4 ${favorites.includes(pattern.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-white/90 text-gray-900 hover:bg-white shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation()
                              sharePattern(pattern)
                            }}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Pattern Info Overlay */}
                    <div className="absolute top-3 left-3 flex space-x-2">
                      {pattern.cssOnly && (
                        <Badge className="bg-green-500 text-white text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          CSS Only
                        </Badge>
                      )}
                      {pattern.isAnimated && (
                        <Badge className="bg-purple-500 text-white text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          Animated
                        </Badge>
                      )}
                      <Badge className={`text-xs ${getDifficultyColor(pattern.difficulty)}`}>
                        {pattern.difficulty}
                      </Badge>
                    </div>

                    <div className="absolute top-3 right-3">
                      <div className="flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                        <TrendingUp className="w-3 h-3" />
                        {pattern.popularity}%
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{pattern.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {pattern.category}
                      </Badge>
                    </div>

                    {pattern.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{pattern.description}</p>
                    )}

                    <div className="flex items-center space-x-2 mb-4">
                      {pattern.colors.slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-5 h-5 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      {pattern.colors.length > 4 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">+{pattern.colors.length - 4}</span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {pattern.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-blue-200 dark:border-blue-700 hover:from-blue-100 hover:to-blue-200"
                        onClick={() => copyToClipboard(pattern.css, "CSS")}
                      >
                        <Code className="w-4 h-4 mr-1" />
                        CSS
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-purple-200 dark:border-purple-700 hover:from-purple-100 hover:to-purple-200"
                        onClick={() => copyToClipboard(pattern.tailwind, "Tailwind")}
                      >
                        <Palette className="w-4 h-4 mr-1" />
                        Tailwind
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPatterns.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 dark:text-gray-600 mb-6">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No patterns found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setCssOnlyFilter(false)
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Filters
                </Button>
                <Button variant="outline" onClick={() => setIsChatOpen(true)}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask for Help
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Pattern Detail Modal */}
      <Dialog open={!!selectedPattern} onOpenChange={() => setSelectedPattern(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          {selectedPattern && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between text-2xl">
                  <div className="flex items-center space-x-3">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {selectedPattern.name}
                    </span>
                    <Badge className={getDifficultyColor(selectedPattern.difficulty)}>
                      {selectedPattern.difficulty}
                    </Badge>
                    {selectedPattern.cssOnly && (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        CSS Only
                      </Badge>
                    )}
                    {selectedPattern.isAnimated && (
                      <Badge className="bg-purple-500 text-white">
                        <Zap className="w-3 h-3 mr-1" />
                        Animated
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => toggleFavorite(selectedPattern.id)}>
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(selectedPattern.id) ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => sharePattern(selectedPattern)}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => exportPattern(selectedPattern, "css")}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Preview and Controls */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-lg font-semibold mb-3 block">Live Preview</Label>
                    <div
                      className={`h-64 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-lg ${
                        isAnimationEnabled && selectedPattern.isAnimated ? "animate-pulse" : ""
                      }`}
                      style={{ background: selectedPattern.preview }}
                    />
                  </div>

                  {selectedPattern.description && (
                    <div>
                      <Label className="text-lg font-semibold mb-3 block">Description</Label>
                      <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        {selectedPattern.description}
                      </p>
                    </div>
                  )}

                  <div>
                    <Label className="text-lg font-semibold mb-3 block">Pattern Stats</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">Popularity</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{selectedPattern.popularity}%</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">Type</span>
                        </div>
                        <div className="text-lg font-semibold">{selectedPattern.cssOnly ? "CSS Only" : "Enhanced"}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-semibold mb-3 block">Color Palette</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {selectedPattern.colors.map((color, index) => (
                        <div key={index} className="text-center">
                          <div
                            className="w-full h-16 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm mb-2 cursor-pointer hover:scale-105 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => copyToClipboard(color, "Color")}
                          />
                          <code className="text-xs text-gray-600 dark:text-gray-400 font-mono">{color}</code>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-semibold mb-3 block">Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedPattern.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Code and Export */}
                <div className="space-y-6">
                  <Tabs defaultValue="css">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="css">CSS</TabsTrigger>
                      <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                      <TabsTrigger value="export">Export</TabsTrigger>
                    </TabsList>

                    <TabsContent value="css" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-base font-semibold">CSS Code</Label>
                        <Button size="sm" onClick={() => copyToClipboard(selectedPattern.css, "CSS")}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy CSS
                        </Button>
                      </div>
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto border">
                        <code className="language-css">{selectedPattern.css}</code>
                      </pre>
                      {selectedPattern.cssOnly && (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <div className="flex items-center space-x-2 text-green-800 dark:text-green-300">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Pure CSS Pattern</span>
                          </div>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            This pattern works with CSS only and doesn't require JavaScript.
                          </p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="tailwind" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-base font-semibold">Tailwind Classes</Label>
                        <Button size="sm" onClick={() => copyToClipboard(selectedPattern.tailwind, "Tailwind")}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Classes
                        </Button>
                      </div>
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto border">
                        <code className="language-html">{`<div class="${selectedPattern.tailwind}"></div>`}</code>
                      </pre>
                    </TabsContent>

                    <TabsContent value="export" className="space-y-4">
                      <Label className="text-base font-semibold">Export Options</Label>
                      <div className="grid grid-cols-1 gap-3">
                        <Button
                          variant="outline"
                          className="justify-start h-12 bg-transparent"
                          onClick={() => exportPattern(selectedPattern, "css")}
                        >
                          <Code className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">CSS File</div>
                            <div className="text-xs text-gray-500">
                              {selectedPattern.cssOnly ? "Pure CSS pattern" : "CSS with animations"}
                            </div>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start h-12 bg-transparent"
                          onClick={() => exportPattern(selectedPattern, "tailwind")}
                        >
                          <Palette className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">HTML + Tailwind</div>
                            <div className="text-xs text-gray-500">Ready-to-use HTML snippet</div>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start h-12 bg-transparent"
                          onClick={() => exportPattern(selectedPattern, "svg")}
                        >
                          <Download className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <div className="font-medium">SVG Vector</div>
                            <div className="text-xs text-gray-500">Scalable vector format</div>
                          </div>
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Support Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <Button
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}

        {isChatOpen && (
          <Card className="w-96 h-[500px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Pattern Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Always here to help</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4 h-[350px]">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.patterns && message.patterns.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.patterns.map((pattern) => (
                            <div
                              key={pattern.id}
                              className="bg-white/10 dark:bg-gray-700/50 p-2 rounded cursor-pointer hover:bg-white/20 dark:hover:bg-gray-600/50 transition-colors"
                              onClick={() => insertPatternFromChat(pattern)}
                            >
                              <div className="flex items-center space-x-2">
                                <div
                                  className="w-8 h-8 rounded border border-white/20"
                                  style={{ background: pattern.preview }}
                                />
                                <div className="flex-1">
                                  <p className="text-xs font-medium">{pattern.name}</p>
                                  <div className="flex items-center space-x-1">
                                    {pattern.cssOnly && (
                                      <Badge className="bg-green-500 text-white text-xs px-1 py-0">CSS</Badge>
                                    )}
                                    <Badge className="bg-gray-500 text-white text-xs px-1 py-0">
                                      {pattern.difficulty}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>

            <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about patterns, CSS, or get help..."
                  className="flex-1 bg-white/80 dark:bg-gray-900/80"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={!chatInput.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => setChatInput("Show me CSS-only patterns")}
                  >
                    CSS Only
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => setChatInput("I need simple gradients")}
                  >
                    Gradients
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => setChatInput("Help me understand CSS patterns")}
                  >
                    Help
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        )}
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}
