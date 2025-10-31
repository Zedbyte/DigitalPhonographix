// app/pre-test/page.tsx
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/routes"

export default function PreTestPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 from-background via-accent/10 to-tertiary/20">
        <Card className="w-full max-w-2xl p-8 border-2">
            <h1 className="text-3xl font-bold mb-4">Pre-test (Placeholder)</h1>
            <p className="text-foreground/70 mb-6">
            This is a lightweight page to confirm routing works. Replace with your actual pre-test flow later.
            </p>

            <div className="space-y-3">
            <label className="block">
                <span className="text-sm font-medium">Enter your name</span>
                <input
                className="mt-1 w-full rounded-md border px-3 py-2 bg-background"
                placeholder="Jane Doe"
                />
            </label>
            <label className="block">
                <span className="text-sm font-medium">Can you read the word “cat”?</span>
                <select className="mt-1 w-full rounded-md border px-3 py-2 bg-background">
                <option>Not yet</option>
                <option>Sometimes</option>
                <option>Yes</option>
                </select>
            </label>
            </div>

            <div className="mt-6 flex gap-3">
            <Link href={ROUTES.HOME}>
                <Button variant="secondary">Back to Home</Button>
            </Link>
            <Link href={ROUTES.GAMES}>
                <Button>Go to Games</Button>
            </Link>
            </div>
        </Card>
        </main>
    )
}
