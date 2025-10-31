// components/tests/auditory/AuditoryProcessingTest.tsx
"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils" // if you don't have cn, inline classNames

export type AuditoryProcessingResult = {
  variant: "pretest" | "posttest"
  part: 1 | 2 | 3
  baseWord: string            // e.g., "pig"
  removed: string             // e.g., "p" (grapheme removed; case-insensitive)
  prompt: string              // full prompt shown to teacher, e.g., "say pig w/o the 'p'"
  response: string            // what the teacher typed
  expected: string            // canonical expected answer from the spec
  isExactMatch: boolean       // response === expected (trim/lower)
  timestamp: number           // ms epoch
}

type Props = {
  variant: "pretest" | "posttest"
  onSubmitOne?: (result: AuditoryProcessingResult) => void | Promise<void>
  onSubmitAll?: (results: AuditoryProcessingResult[]) => void | Promise<void>
  className?: string
}

// ---------- Data (explicit expected values from your spec) ----------
type Item = { baseWord: string; removed: string; expected: string }

const PART_ONE: Item[] = [
  { baseWord: "pig",  removed: "p", expected: "ig" },
  { baseWord: "pog",  removed: "g", expected: "po" },
  { baseWord: "sip",  removed: "s", expected: "ip" },
]

const PART_TWO: Item[] = [
  { baseWord: "stop", removed: "s", expected: "top" },
  { baseWord: "nest", removed: "t", expected: "nes" },
  { baseWord: "flag", removed: "f", expected: "lag" },
]

const PART_THREE: Item[] = [
  // Spec says "plum w/o the 'I' -> pum". We assume removing 'l' to match expected "pum".
  { baseWord: "plum", removed: "l", expected: "pum" },
  { baseWord: "best", removed: "s", expected: "bet" },
  { baseWord: "grill",removed: "r", expected: "gill" },
  { baseWord: "lost", removed: "s", expected: "lot" },
]

// ---------- Helpers ----------
const makePrompt = (base: string, removed: string) => `say ${base} w/o the '${removed}'`

const norm = (s: string) => s.trim().toLowerCase()

type RowState = { response: string; submitted?: boolean }

const buildMap = (items: Item[]) =>
  items.reduce((acc, it) => {
    acc[it.baseWord] = { response: "" }
    return acc
  }, {} as Record<string, RowState>)

export default function AuditoryProcessingTest({
  variant,
  onSubmitOne,
  onSubmitAll,
  className,
}: Props) {
  const [part1, setPart1] = React.useState<Record<string, RowState>>(() => buildMap(PART_ONE))
  const [part2, setPart2] = React.useState<Record<string, RowState>>(() => buildMap(PART_TWO))
  const [part3, setPart3] = React.useState<Record<string, RowState>>(() => buildMap(PART_THREE))

  const [saving, setSaving] = React.useState<Record<string, boolean>>({}) // key `${part}:${baseWord}`

  const makeResult = (part: 1 | 2 | 3, it: Item, response: string): AuditoryProcessingResult => ({
    variant,
    part,
    baseWord: it.baseWord,
    removed: it.removed,
    expected: it.expected,
    prompt: makePrompt(it.baseWord, it.removed),
    response,
    isExactMatch: norm(response) === norm(it.expected),
    timestamp: Date.now(),
  })

  const submitSingle = async (part: 1 | 2 | 3, it: Item) => {
    const key = `${part}:${it.baseWord}`
    const resp =
      part === 1 ? part1[it.baseWord]?.response ?? "" :
      part === 2 ? part2[it.baseWord]?.response ?? "" :
                   part3[it.baseWord]?.response ?? ""
    const result = makeResult(part, it, resp)

    setSaving((s) => ({ ...s, [key]: true }))
    try {
      await onSubmitOne?.(result)
      if (part === 1) setPart1((prev) => ({ ...prev, [it.baseWord]: { ...prev[it.baseWord], submitted: true } }))
      else if (part === 2) setPart2((prev) => ({ ...prev, [it.baseWord]: { ...prev[it.baseWord], submitted: true } }))
      else setPart3((prev) => ({ ...prev, [it.baseWord]: { ...prev[it.baseWord], submitted: true } }))
    } finally {
      setSaving((s) => ({ ...s, [key]: false }))
    }
  }

  const submitAll = async () => {
    const results: AuditoryProcessingResult[] = [
      ...PART_ONE.map((it) => makeResult(1, it, part1[it.baseWord]?.response ?? "")),
      ...PART_TWO.map((it) => makeResult(2, it, part2[it.baseWord]?.response ?? "")),
      ...PART_THREE.map((it) => makeResult(3, it, part3[it.baseWord]?.response ?? "")),
    ]
    try {
      await onSubmitAll?.(results)
      setPart1((prev) => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, { ...v, submitted: true }])) )
      setPart2((prev) => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, { ...v, submitted: true }])) )
      setPart3((prev) => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, { ...v, submitted: true }])) )
    } catch {
      // hook toast/snackbar here if needed
    }
  }

  const resetAll = () => {
    setPart1(buildMap(PART_ONE))
    setPart2(buildMap(PART_TWO))
    setPart3(buildMap(PART_THREE))
  }

  const filledCount =
    PART_ONE.filter((it) => (part1[it.baseWord]?.response ?? "").trim()).length +
    PART_TWO.filter((it) => (part2[it.baseWord]?.response ?? "").trim()).length +
    PART_THREE.filter((it) => (part3[it.baseWord]?.response ?? "").trim()).length

  const renderRow = (
    part: 1 | 2 | 3,
    it: Item,
    idx: number,
    state: RowState,
    update: (next: RowState) => void
  ) => {
    const key = `${part}:${it.baseWord}`
    const { response, submitted } = state
    const exact =
      response.trim().length > 0 ? norm(response) === norm(it.expected) : null

    return (
      <li key={it.baseWord} className="grid grid-cols-1 md:grid-cols-[1fr,auto] items-center gap-3">
        <form
          onSubmit={(e) => { e.preventDefault(); submitSingle(part, it) }}
          className="contents"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <div className="text-foreground/80">
                <span className="mr-3 text-sm font-medium text-foreground/60">#{idx + 1}</span>
                <span className="font-semibold tracking-wide">
                  {makePrompt(it.baseWord, it.removed)}
                </span>
              </div>
              {submitted && (
                <span
                  aria-live="polite"
                  className={cn("text-xs font-semibold", exact ? "text-green-600" : "text-red-600")}
                >
                  {exact ? "match" : "no match"}
                </span>
              )}
            </div>

            {/* Teacher input + light expected hint */}
            <div className="flex items-center gap-2">
              <label className="sr-only" htmlFor={`${key}-input`}>
                Student response for {it.baseWord} without {it.removed}
              </label>
              <input
                id={`${key}-input`}
                value={response}
                onChange={(e) => update({ response: e.target.value, submitted })}
                placeholder="Teacher enters the student's word"
                className="flex-1 rounded-lg border px-3 py-2 bg-background"
                autoComplete="off"
                inputMode="text"
              />
              <Button
                type="submit"
                disabled={saving[key] === true || response.trim().length === 0}
                className="min-w-28"
              >
                {saving[key] ? "Saving..." : "Submit"}
              </Button>
            </div>

            <div className="text-xs text-foreground/50 mt-1">
              expected: <span className="font-mono">{it.expected}</span>
            </div>
          </div>
        </form>
      </li>
    )
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header with shared buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">Auditory Processing Test</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={resetAll} title="Reset all">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={submitAll} title="Submit all responses" disabled={filledCount === 0}>
            Submit All{filledCount ? ` (${filledCount})` : ""}
          </Button>
        </div>
      </div>

      {/* Three-part grid (1 row on small, 3 columns on xl for parity) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* PART ONE */}
        <Card className="p-6 md:p-8 border-4 border-primary/30 bg-card shadow-xl h-full flex flex-col">
          <header className="mb-4">
            <h3 className="text-xl md:text-2xl font-semibold">Part One</h3>
          </header>
          <ol className="space-y-3 flex-1">
            {PART_ONE.map((it, idx) =>
              renderRow(
                1,
                it,
                idx,
                part1[it.baseWord],
                (next) => setPart1((prev) => ({ ...prev, [it.baseWord]: next }))
              )
            )}
          </ol>
        </Card>

        {/* PART TWO */}
        <Card className="p-6 md:p-8 border-4 border-primary/30 bg-card shadow-xl h-full flex flex-col">
          <header className="mb-4">
            <h3 className="text-xl md:text-2xl font-semibold">Part Two</h3>
          </header>
          <ol className="space-y-3 flex-1">
            {PART_TWO.map((it, idx) =>
              renderRow(
                2,
                it,
                idx,
                part2[it.baseWord],
                (next) => setPart2((prev) => ({ ...prev, [it.baseWord]: next }))
              )
            )}
          </ol>
        </Card>

        {/* PART THREE */}
        <Card className="p-6 md:p-8 border-4 border-primary/30 bg-card shadow-xl h-full flex flex-col">
          <header className="mb-4">
            <h3 className="text-xl md:text-2xl font-semibold">Part Three</h3>
          </header>
          <ol className="space-y-3 flex-1">
            {PART_THREE.map((it, idx) =>
              renderRow(
                3,
                it,
                idx,
                part3[it.baseWord],
                (next) => setPart3((prev) => ({ ...prev, [it.baseWord]: next }))
              )
            )}
          </ol>
        </Card>
      </div>
    </div>
  )
}
