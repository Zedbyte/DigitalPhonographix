// components/tests/code/CodeKnowledgeTest.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/lib/routes"
import { COL1, COL2, COL3, STUDENT_ORDER, META, buildMap } from "@/components/tests/code/shared"

type Props = {
    variant: "pretest" | "posttest"
    // keep onSubmitAll if you still want local highlighting saved — otherwise remove
    onSubmitAll?: (results: import("@/components/tests/code/shared").CodeKnowledgeResult[]) => void | Promise<void>
    className?: string
}

export default function CodeKnowledgeTest({ variant, onSubmitAll, className }: Props) {
    const [knownMap, setKnownMap] = React.useState<Record<string, boolean>>(() => buildMap(STUDENT_ORDER))

    const totalKnown = Object.values(knownMap).filter(Boolean).length
    const resetAll = () => setKnownMap(buildMap(STUDENT_ORDER))
    const setOne = (g: string, val: boolean) => setKnownMap((prev) => ({ ...prev, [g]: val }))

    // (optional) keep save if you’re previewing highlights on student screen
    const saveAll = async () => {
        if (!onSubmitAll) return
        const now = Date.now()
        const payload = STUDENT_ORDER.map((g) => ({
        variant,
        grapheme: g,
        known: !!knownMap[g],
        examples: META[g] ?? "",
        timestamp: now,
        }))
        await onSubmitAll(payload)
    }

    return (
        <div className={cn("space-y-8", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">Code Knowledge Test</h2>
            <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={resetAll} title="Reset local highlights">
                <RotateCcw className="w-4 h-4" />
            </Button>
            {/* ⬇️ Open teacher view in a new tab */}
            <Link href={`${ROUTES.CODE_KNOWLEDGE_TEACHER}?variant=${variant}`} target="_blank" rel="noopener noreferrer">
                <Button size="sm" title="Open teacher checklist in a new tab">
                Teacher: Record knowledge
                </Button>
            </Link>
            </div>
        </div>

        {/* Student-facing panel */}
        <Card className="p-6 md:p-8 border-4 border-primary/30 bg-card shadow-xl">
            <header className="mb-4">
            <h3 className="text-xl md:text-2xl font-semibold">Read the letters and letter groups</h3>
            <p className="text-foreground/70 text-sm md:text-base">
                The student reads; the teacher records knowledge in a separate tab.
            </p>
            </header>

            {/* 3 columns, each column is a vertical stack */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[COL1, COL2, COL3].map((col, colIdx) => (
                <div key={`col-${colIdx}`} className="flex flex-col gap-3">
                {col.map((g) => (
                    <div
                    key={`stu-${g}`}
                    className={cn(
                        "flex items-center justify-center rounded-2xl border px-3 py-4 text-2xl font-bold uppercase",
                        "tracking-widest select-none",
                        knownMap[g] ? "border-green-500 bg-green-50" : "border-border bg-background"
                    )}
                    title={META[g] ?? ""}
                    aria-label={`Grapheme ${g}`}
                    >
                    {g}
                    </div>
                ))}
                </div>
            ))}
            </div>

            <div className="mt-4 text-sm text-foreground/60">
            Marked known (local preview): <span className="font-semibold">{totalKnown}</span> / {STUDENT_ORDER.length}
            </div>
        </Card>
        </div>
    )
}
