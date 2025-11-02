// components/tests/Tests.tsx
"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import BlendingTest, { BlendingResult } from "@/components/tests/blending-test"
import PhonemeSegmentationTest, { PhonemeSegmentationResult } from "@/components/tests/phoneme-segmentation-test"
import AuditoryProcessingTest, { AuditoryProcessingResult } from "@/components/tests/auditory-processing-test"
import CodeKnowledgeTest from "@/components/tests/code-knowledge-test"
import { CodeKnowledgeResult } from "@/components/tests/code/shared"
import { Link } from "@inertiajs/react"
import { ROUTES } from "@/lib/routes"

type TestsVariant = "pretest" | "posttest"

type TestItem = {
    name: string
    description: string
}

const TEST_ITEMS: TestItem[] = [
    { name: "Blending Test", description: "Blend phonemes into words (e.g., c-a-t → cat)." },
    { name: "Phoneme Segmentation Test", description: "Segment words into phonemes (e.g., map → /m/ /a/ /p/)." },
    { name: "Auditory Processing Test", description: "Judge whether a 3-letter sequence is a real word sound." },
    { name: "Code Knowledge Test", description: "Match letters to sounds and basic graphemes." },
]

export default function Tests({ variant }: { variant: TestsVariant }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(true)
    const [expanded, setExpanded] = React.useState(true)
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    // placeholder demo states for the remaining tests (can be replaced with real components later)
    const [segmentInput, setSegmentInput] = React.useState("")
    const [segmentFeedback, setSegmentFeedback] = React.useState<null | "ok" | "no">(null)
    const [auditoryChoice, setAuditoryChoice] = React.useState<string | null>(null)
    const [auditoryFeedback, setAuditoryFeedback] = React.useState<null | "ok" | "no">(null)
    const [codePair, setCodePair] = React.useState({ letter: "", sound: "" })
    const [codeFeedback, setCodeFeedback] = React.useState<null | "ok" | "no">(null)

    React.useEffect(() => {
        setSegmentInput("")
        setSegmentFeedback(null)
        setAuditoryChoice(null)
        setAuditoryFeedback(null)
        setCodePair({ letter: "", sound: "" })
        setCodeFeedback(null)
    }, [selectedIndex])

    const title = variant === "pretest" ? "Pre-test" : "Post-test"

    // --- Placeholder handlers for remaining tabs ---
    const handleSegmentCheck = () => {
        const normalized = segmentInput.toLowerCase().replace(/[\/]/g, "").trim()
        const noSpaces = normalized.replace(/\s|-/g, "")
        setSegmentFeedback(noSpaces === "map" ? "ok" : "no")
    }
    const handleAuditoryCheck = () => {
        const real = new Set(["cat", "map", "sun", "dog", "tap"])
        if (!auditoryChoice) return
        setAuditoryFeedback(real.has(auditoryChoice.toLowerCase()) ? "ok" : "no")
    }
    const handleCodeCheck = () => {
        const l = codePair.letter.trim().toLowerCase()
        const s = codePair.sound.trim().toLowerCase()
        setCodeFeedback(l === "a" && (s === "a" || s === "/a/") ? "ok" : "no")
    }

    // --- DB wire-in points for Blending Test ---
    const saveBlendingOne = async (result: BlendingResult) => {
        // TODO: swap with your API call
        // await fetch("/api/blending", { method: "POST", body: JSON.stringify(result) })
        console.log("saveOne()", result)
    }
    const saveBlendingAll = async (results: BlendingResult[]) => {
        // TODO: swap with your API call
        // await fetch("/api/blending/bulk", { method: "POST", body: JSON.stringify(results) })
        console.log("saveAll()", results)
    }

    // --- DB wire-in points for Phoneme Segmentation ---
    const saveSegOne = async (result: PhonemeSegmentationResult) => {
        // TODO: replace with your API call
        // await fetch("/api/segmentation", { method: "POST", body: JSON.stringify(result) })
        console.log("segmentation saveOne()", result)
    }

    const saveSegAll = async (results: PhonemeSegmentationResult[]) => {
        // TODO: replace with your API call
        // await fetch("/api/segmentation/bulk", { method: "POST", body: JSON.stringify(results) })
        console.log("segmentation saveAll()", results)
    }

    const saveAuditoryOne = async (r: AuditoryProcessingResult) => {
        // await fetch("/api/auditory", { method: "POST", body: JSON.stringify(r) })
        console.log("auditory saveOne()", r)
    }
    
    const saveAuditoryAll = async (rs: AuditoryProcessingResult[]) => {
        // await fetch("/api/auditory/bulk", { method: "POST", body: JSON.stringify(rs) })
        console.log("auditory saveAll()", rs)
    }

    const saveCodeAll = async (results: CodeKnowledgeResult[]) => {
        // await fetch("/api/code-knowledge/bulk", { method: "POST", body: JSON.stringify(results) })
        console.log("code-knowledge saveAll()", results)
    }

    return (
        <div className="min-h-screen flex from-background via-accent/20 to-tertiary/30">
        <aside
            className={`${sidebarOpen ? "w-64" : "w-0"} bg-card border-r border-border transition-all duration-300 overflow-hidden shrink-0`}
        >
            <div className="p-6 overflow-y-auto h-full">
            <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
            <nav className="space-y-4">
                <div>
                <button
                    onClick={() => setExpanded((e) => !e)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-all font-semibold text-foreground"
                >
                    <span>Assessments</span>
                    {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expanded && (
                    <div className="mt-2 space-y-2 pl-2">
                    {TEST_ITEMS.map((t, idx) => (
                        <button
                        key={t.name}
                        onClick={() => setSelectedIndex(idx)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                            selectedIndex === idx
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "hover:bg-muted text-foreground/80"
                        }`}
                        >
                        {t.name}
                        </button>
                    ))}
                    </div>
                )}
                </div>
            </nav>
            </div>
        </aside>

        <main className="flex-1 flex items-center justify-center p-4">
            <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="fixed top-4 left-4 z-10 bg-card border border-border rounded-lg p-2 hover:bg-muted transition-colors"
            >
            {sidebarOpen ? "←" : "→"}
            </button>

            <div className="w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-foreground text-balance">
                {title}
            </h1>
            <p className="text-center mb-6 text-lg md:text-xl text-foreground/80">
                {TEST_ITEMS[selectedIndex].description}
            </p>

            {/* Body */}
            {(() => {
                switch (selectedIndex) {
                case 0:
                    return (
                    <BlendingTest
                        variant={variant}
                        onSubmitOne={saveBlendingOne}
                        onSubmitAll={saveBlendingAll}
                    />
                    )

                case 1:
                    return (
                    <PhonemeSegmentationTest
                        variant={variant}
                        onSubmitOne={saveSegOne}
                        onSubmitAll={saveSegAll}
                    />
                    )

                case 2:
                    return (
                    <AuditoryProcessingTest
                        variant={variant}
                        onSubmitOne={saveAuditoryOne}
                        onSubmitAll={saveAuditoryAll}
                    />
                )

                case 3:
                    return (
                    <CodeKnowledgeTest
                        variant={variant}
                        onSubmitAll={saveCodeAll}
                    />
                )

                default:
                    return null
                }
            })()}

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link href={ROUTES.HOME}>
                <Button variant="secondary"><ChevronLeft className="w-4 h-4 mr-1" /> Home</Button>
                </Link>
                <Link href={ROUTES.GAMES}>
                <Button>Go to Games <ChevronRight className="w-4 h-4 ml-1" /></Button>
                </Link>
            </div>

            <p className="text-center mt-6 text-foreground/60 text-sm">
                {variant === "pretest" ? "Baseline assessment" : "Follow-up assessment"}
            </p>
            </div>
        </main>
        </div>
    )
}
