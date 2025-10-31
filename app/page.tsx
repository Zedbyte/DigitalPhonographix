// app/page.tsx
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { ROUTES } from "@/lib/routes"

export default function Home() {
    return (
        <main className="min-h-screen from-background via-accent/10 to-tertiary/20 flex items-center justify-center p-6">
        <div className="max-w-5xl w-full">
            <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Literacy Toolkit</h1>
            <p className="text-foreground/70 mt-2">Choose a module to begin</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pre-test */}
            <Link href={ROUTES.PRE_TEST} className="group">
                <Card className="p-6 h-full transition-all border-2 hover:shadow-xl hover:-translate-y-1">
                <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-semibold mb-2">Pre-test</h2>
                    <p className="text-foreground/70 flex-1">
                    Quick baseline to gauge current phonics & word recognition.
                    </p>
                    <Button className="mt-4 group-hover:translate-x-0.5 transition-transform w-fit">
                    Start Pre-test
                    </Button>
                </div>
                </Card>
            </Link>

            {/* Games */}
            <Link href={ROUTES.GAMES} className="group">
                <Card className="p-6 h-full transition-all border-2 hover:shadow-xl hover:-translate-y-1">
                <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-semibold mb-2">Games</h2>
                    <p className="text-foreground/70 flex-1">
                    Word building, reading stories, auditory processing, and sound bingo.
                    </p>
                    <Button className="mt-4 group-hover:translate-x-0.5 transition-transform w-fit">
                    Play Now
                    </Button>
                </div>
                </Card>
            </Link>

            {/* Post-test */}
            <Link href={ROUTES.POST_TEST} className="group">
                <Card className="p-6 h-full transition-all border-2 hover:shadow-xl hover:-translate-y-1">
                <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-semibold mb-2">Post-test</h2>
                    <p className="text-foreground/70 flex-1">
                    Measure improvement and compare against your baseline.
                    </p>
                    <Button className="mt-4 group-hover:translate-x-0.5 transition-transform w-fit">
                    Start Post-test
                    </Button>
                </div>
                </Card>
            </Link>
            </div>

            <footer className="text-center mt-10 text-foreground/60 text-sm">
            <Sparkles className="inline w-4 h-4 mr-1" />
            Built with Next.js App Router & shadcn/ui
            </footer>
        </div>
        </main>
    )
}
