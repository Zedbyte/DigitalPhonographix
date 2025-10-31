"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function GlobalBackButton() {
  const router = useRouter()
  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        onClick={() => router.back()}
        variant="secondary"
        size="sm"
        className="shadow-md rounded-lg flex items-center gap-1"
        aria-label="Go back"
        title="Go back"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>
    </div>
  )
}
