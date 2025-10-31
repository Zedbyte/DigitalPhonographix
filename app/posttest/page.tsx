// app/post-test/page.tsx
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/routes"

export default function PostTestPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 from-background via-accent/10 to-tertiary/20">
        <Card className="w-full max-w-2xl p-8 border-2">
            <h1 className="text-3xl font-bold mb-4">Post-test (Placeholder)</h1>
            <p className="text-foreground/70 mb-6">
            Another lightweight page to validate routing. Replace with your real post-test summary later.
            </p>

            <div className="space-y-3">
            <label className="block">
                <span className="text-sm font-medium">Self-assessed improvement</span>
                <select className="mt-1 w-full rounded-md border px-3 py-2 bg-background">
                <option>No change</option>
                <option>Some improvement</option>
                <option>Significant improvement</option>
                </select>
            </label>
            <label className="block">
                <span className="text-sm font-medium">Comments</span>
                <textarea className="mt-1 w-full rounded-md border px-3 py-2 bg-background" rows={3} />
            </label>
            </div>

            <div className="mt-6 flex gap-3">
            <Link href={ROUTES.HOME}>
                <Button variant="secondary">Back to Home</Button>
            </Link>
            <Link href={ROUTES.GAMES}>
                <Button>Review Games</Button>
            </Link>
            </div>
        </Card>
        </main>
    )
}
