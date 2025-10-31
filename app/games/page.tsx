"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, RotateCcw, Sparkles } from "lucide-react"

type Letter = {
  id: string
  letter: string
  originalIndex: number
}

type WordData = {
  word: string
  letters: Letter[]
  imagePlaceholder?: string
}

type Story = {
  sentences: string[]
  imagePlaceholder: string
}

type AuditoryProcessingData = {
  letters: string[]
  correctWords: string[]
}

type BingoCard = {
  grid: string[][]
}

type SoundBingoData = {
  cards: BingoCard[]
}

type GameData = {
  name: string
  words?: WordData[]
  story?: Story
  isStory?: boolean
  auditoryProcessing?: AuditoryProcessingData
  soundBingo?: SoundBingoData
  gameType?: "wordBuilding" | "story" | "auditoryProcessing" | "soundBingo"
}

type GameCategory = {
  name: string
  games: GameData[]
}

const GAME_CATEGORIES: GameCategory[] = [
    {
        name: "Word Building",
        games: [
        {
            name: "The Fat Cat Sat",
            gameType: "wordBuilding",
            words: [
            {
                word: "cat",
                // TODO: Replace this placeholder with actual image for CAT word
                imagePlaceholder: "",
                letters: [
                { id: "c-0", letter: "c", originalIndex: 0 },
                { id: "a-0", letter: "a", originalIndex: 1 },
                { id: "t-0", letter: "t", originalIndex: 2 },
                ],
            },
            {
                word: "fat",
                // TODO: Replace this placeholder with actual image for FAT word
                imagePlaceholder: "",
                letters: [
                { id: "f-0", letter: "f", originalIndex: 0 },
                { id: "a-1", letter: "a", originalIndex: 1 },
                { id: "t-1", letter: "t", originalIndex: 2 },
                ],
            },
            {
                word: "sat",
                // TODO: Replace this placeholder with actual image for SAT word
                imagePlaceholder: "",
                letters: [
                { id: "s-0", letter: "s", originalIndex: 0 },
                { id: "a-2", letter: "a", originalIndex: 1 },
                { id: "t-2", letter: "t", originalIndex: 2 },
                ],
            },
            {
                word: "mop",
                // TODO: Replace this placeholder with actual image for MOP word
                imagePlaceholder: "",
                letters: [
                { id: "m-0", letter: "m", originalIndex: 0 },
                { id: "o-0", letter: "o", originalIndex: 1 },
                { id: "p-0", letter: "p", originalIndex: 2 },
                ],
            },
            {
                word: "top",
                // TODO: Replace this placeholder with actual image for TOP word
                imagePlaceholder: "",
                letters: [
                { id: "t-3", letter: "t", originalIndex: 0 },
                { id: "o-1", letter: "o", originalIndex: 1 },
                { id: "p-1", letter: "p", originalIndex: 2 },
                ],
            },
            {
                word: "cop",
                // TODO: Replace this placeholder with actual image for COP word
                imagePlaceholder: "",
                letters: [
                { id: "c-1", letter: "c", originalIndex: 0 },
                { id: "o-2", letter: "o", originalIndex: 1 },
                { id: "p-2", letter: "p", originalIndex: 2 },
                ],
            },
            {
                word: "map",
                // TODO: Replace this placeholder with actual image for MAP word
                imagePlaceholder: "",
                letters: [
                { id: "m-1", letter: "m", originalIndex: 0 },
                { id: "a-3", letter: "a", originalIndex: 1 },
                { id: "p-3", letter: "p", originalIndex: 2 },
                ],
            },
            {
                word: "tap",
                // TODO: Replace this placeholder with actual image for TAP word
                imagePlaceholder: "",
                letters: [
                { id: "t-4", letter: "t", originalIndex: 0 },
                { id: "a-4", letter: "a", originalIndex: 1 },
                { id: "p-4", letter: "p", originalIndex: 2 },
                ],
            },
            {
                word: "pop",
                // TODO: Replace this placeholder with actual image for POP word
                imagePlaceholder: "",
                letters: [
                { id: "p-5", letter: "p", originalIndex: 0 },
                { id: "o-3", letter: "o", originalIndex: 1 },
                { id: "p-6", letter: "p", originalIndex: 2 },
                ],
            },
            ],
        },
        {
            name: "The Bug on Jug",
            gameType: "wordBuilding",
            words: [
            {
                word: "BUG",
                // TODO: Replace this placeholder with actual image for BUG word
                imagePlaceholder: "",
                letters: [
                { id: "b-0", letter: "b", originalIndex: 0 },
                { id: "u-0", letter: "u", originalIndex: 1 },
                { id: "g-0", letter: "g", originalIndex: 2 },
                ],
            },
            {
                word: "JUG",
                // TODO: Replace this placeholder with actual image for JUG word
                imagePlaceholder: "",
                letters: [
                { id: "j-0", letter: "j", originalIndex: 0 },
                { id: "u-1", letter: "u", originalIndex: 1 },
                { id: "g-1", letter: "g", originalIndex: 2 },
                ],
            },
            {
                word: "DIG",
                // TODO: Replace this placeholder with actual image for DIG word
                imagePlaceholder: "",
                letters: [
                { id: "d-0", letter: "d", originalIndex: 0 },
                { id: "i-0", letter: "i", originalIndex: 1 },
                { id: "g-2", letter: "g", originalIndex: 2 },
                ],
            },
            {
                word: "BIG",
                // TODO: Replace this placeholder with actual image for BIG word
                imagePlaceholder: "",
                letters: [
                { id: "b-1", letter: "b", originalIndex: 0 },
                { id: "i-1", letter: "i", originalIndex: 1 },
                { id: "g-3", letter: "g", originalIndex: 2 },
                ],
            },
            {
                word: "RIG",
                // TODO: Replace this placeholder with actual image for RIG word
                imagePlaceholder: "",
                letters: [
                { id: "r-0", letter: "r", originalIndex: 0 },
                { id: "i-2", letter: "i", originalIndex: 1 },
                { id: "g-4", letter: "g", originalIndex: 2 },
                ],
            },
            {
                word: "RUG",
                // TODO: Replace this placeholder with actual image for RUG word
                imagePlaceholder: "",
                letters: [
                { id: "r-1", letter: "r", originalIndex: 0 },
                { id: "u-2", letter: "u", originalIndex: 1 },
                { id: "g-5", letter: "g", originalIndex: 2 },
                ],
            },
            {
                word: "HUG",
                // TODO: Replace this placeholder with actual image for HUG word
                imagePlaceholder: "",
                letters: [
                { id: "h-0", letter: "h", originalIndex: 0 },
                { id: "u-3", letter: "u", originalIndex: 1 },
                { id: "g-6", letter: "g", originalIndex: 2 },
                ],
            },
            {
                word: "JIG",
                // TODO: Replace this placeholder with actual image for JIG word
                imagePlaceholder: "",
                letters: [
                { id: "j-1", letter: "j", originalIndex: 0 },
                { id: "i-3", letter: "i", originalIndex: 1 },
                { id: "g-7", letter: "g", originalIndex: 2 },
                ],
            },
            {
                word: "DUG",
                // TODO: Replace this placeholder with actual image for DUG word
                imagePlaceholder: "",
                letters: [
                { id: "d-1", letter: "d", originalIndex: 0 },
                { id: "u-4", letter: "u", originalIndex: 1 },
                { id: "g-8", letter: "g", originalIndex: 2 },
                ],
            },
            ],
        },
        {
            name: "The Ben Bun",
            gameType: "wordBuilding",
            words: [
            {
                word: "WET",
                // TODO: Replace this placeholder with actual image for WET word
                imagePlaceholder: "",
                letters: [
                { id: "w-0", letter: "w", originalIndex: 0 },
                { id: "e-0", letter: "e", originalIndex: 1 },
                { id: "t-5", letter: "t", originalIndex: 2 },
                ],
            },
            {
                word: "ZIP",
                // TODO: Replace this placeholder with actual image for ZIP word
                imagePlaceholder: "",
                letters: [
                { id: "z-0", letter: "z", originalIndex: 0 },
                { id: "i-4", letter: "i", originalIndex: 1 },
                { id: "p-7", letter: "p", originalIndex: 2 },
                ],
            },
            {
                word: "WEB",
                // TODO: Replace this placeholder with actual image for WEB word
                imagePlaceholder: "",
                letters: [
                { id: "w-1", letter: "w", originalIndex: 0 },
                { id: "e-1", letter: "e", originalIndex: 1 },
                { id: "b-2", letter: "b", originalIndex: 2 },
                ],
            },
            {
                word: "MUTT",
                // TODO: Replace this placeholder with actual image for MUTT word
                imagePlaceholder: "",
                letters: [
                { id: "m-2", letter: "m", originalIndex: 0 },
                { id: "u-5", letter: "u", originalIndex: 1 },
                { id: "t-6", letter: "t", originalIndex: 2 },
                { id: "t-7", letter: "t", originalIndex: 3 },
                ],
            },
            {
                word: "BUN",
                // TODO: Replace this placeholder with actual image for BUN word
                imagePlaceholder: "",
                letters: [
                { id: "b-3", letter: "b", originalIndex: 0 },
                { id: "u-6", letter: "u", originalIndex: 1 },
                { id: "n-0", letter: "n", originalIndex: 2 },
                ],
            },
            {
                word: "BUZZ",
                // TODO: Replace this placeholder with actual image for BUZZ word
                imagePlaceholder: "",
                letters: [
                { id: "b-4", letter: "b", originalIndex: 0 },
                { id: "u-7", letter: "u", originalIndex: 1 },
                { id: "z-1", letter: "z", originalIndex: 2 },
                { id: "z-2", letter: "z", originalIndex: 3 },
                ],
            },
            {
                word: "NET",
                // TODO: Replace this placeholder with actual image for NET word
                imagePlaceholder: "",
                letters: [
                { id: "n-1", letter: "n", originalIndex: 0 },
                { id: "e-2", letter: "e", originalIndex: 1 },
                { id: "t-8", letter: "t", originalIndex: 2 },
                ],
            },
            {
                word: "VET",
                // TODO: Replace this placeholder with actual image for VET word
                imagePlaceholder: "",
                letters: [
                { id: "v-0", letter: "v", originalIndex: 0 },
                { id: "e-3", letter: "e", originalIndex: 1 },
                { id: "t-9", letter: "t", originalIndex: 2 },
                ],
            },
            {
                word: "BELL",
                // TODO: Replace this placeholder with actual image for BELL word
                imagePlaceholder: "",
                letters: [
                { id: "b-5", letter: "b", originalIndex: 0 },
                { id: "e-4", letter: "e", originalIndex: 1 },
                { id: "l-0", letter: "l", originalIndex: 2 },
                { id: "l-1", letter: "l", originalIndex: 3 },
                ],
            },
            ],
        },
        ],
    },
    {
        name: "Reading Stories",
        games: [
        {
            name: "Fat Cat Story",
            gameType: "story",
            story: {
            sentences: [
                "Fat cat sat on mat.",
                "Fat cat sat on map.",
                "Fat cat sat on mop.",
                "Fat cat sat on cop.",
                "Fat cat sat on Pat.",
            ],
            // TODO: Replace this with actual story image for Fat Cat Story
            imagePlaceholder: "",
            },
        },
        {
            name: "Bug on Jug Story",
            gameType: "story",
            story: {
            sentences: [
                "Big bug dug",
                "Big bug dug jug",
                "Big bug did hug jug",
                "Big bug did jig jug",
                "Big bug sat on jug.",
            ],
            // TODO: Replace this with actual story image for Bug on Jug Story
            imagePlaceholder: "",
            },
        },
        {
            name: "Ben Bun Story",
            gameType: "story",
            story: {
            sentences: ["Ben Bun is wet.", "Buzz... Ben Bun got bit.", "Ben Bun is in net.", "Ben Bun at vet."],
            // TODO: Replace this with actual story image for Ben Bun Story
            imagePlaceholder: "",
            },
        },
        ],
    },
    {
        name: "Final Activity",
        games: [
        {
            name: "Mad Cat",
            gameType: "story",
            story: {
            sentences: [
                "A cat is mad. A dog but him. It is bad to nip at a cat.",
                "A dog ran. A cat ran. Get a dog! Get a bad dog!",
                'It is not a bad dog. It is a pet. It is Dan\'s pet. It is Sal. "Get on Sal!"',
                "Sal got on. It is a hill. It is a big hill.",
                "Dan and Sal got up a hill.",
                "On top is Mom.",
                "Mom is mad at a cat. It is bad to hiss at Sal.",
                "The End.",
            ],
            // TODO: Replace this with actual story image for Mad Cat
            imagePlaceholder: "",
            },
        },
        {
            name: "Missing Cat",
            gameType: "story",
            story: {
            sentences: [
                "Jan had a nap on a bed. Jan is up.",
                "Jan is sad. Tom cat is not on his mat. Tom cat is not on his cot.",
                "It is a bad cat. It did not get a nap. It got off his cot.",
                "Jan got on. Jan got up a hill.",
                '"Tom! Tom cat!" It is a hiss. It is a cat. It is Tom. "Bad cat did not get a nap."',
                "Jan got Tom cat in a box.",
                "Tom cat is sad in a box.",
                'Jan got Tom on his cot. "Get a nap Tom. Get a nap on a cot."',
            ],
            // TODO: Replace this with actual story image for Missing Cat
            imagePlaceholder: "",
            },
        },
        {
            name: "Fun in the Sun",
            gameType: "story",
            story: {
            sentences: [
                'Jan is in bed. It is Mom. "Get up Jan!"',
                '"Sun is up! It is fun."',
                "Jan sat up. Sun is up.",
                'Tom sat up. Tom got off his cot. Get a sip Jan. Get a sip Tom. "Yum!"',
                '"Tom, it is a bad dog and his kid. It is a dog that bit Tom."',
                "Jan hid Tom in a bag. Tom is sad. It is bad in a bag.",
                "Sal did kiss Tom. It is not a bad dog, it is a bad bag.",
                "Dan and Jan and Tom and Sal did run in sun. It is fun!",
            ],
            // TODO: Replace this with actual story image for Fun in the Sun
            imagePlaceholder: "",
            },
        },
        ],
    },
    {
        name: "Auditory Processing",
        games: [
        {
            name: "Fat Cat Sat",
            gameType: "auditoryProcessing",
            auditoryProcessing: {
            letters: ["o", "t", "p", "c", "a", "f", "m", "s", "p"],
            correctWords: [
                "cot",
                "pot",
                "pat",
                "fat",
                "mat",
                "cat",
                "sat",
                "sap",
                "tap",
                "cap",
                "map",
                "mop",
                "sop",
                "cop",
                "top",
                "pop",
            ],
            },
        },
        {
            name: "Bug on Jug",
            gameType: "auditoryProcessing",
            auditoryProcessing: {
            letters: ["b", "u", "r", "g", "h", "j", "i", "d"],
            correctWords: ["rug", "bug", "dug", "dig", "rig", "big", "jig", "jug", "hug"],
            },
        },
        {
            name: "Ben Bun",
            gameType: "auditoryProcessing",
            auditoryProcessing: {
            letters: ["e", "e", "t", "w", "u", "b", "n", "v", "zz", "ll"],
            correctWords: ["let", "wet", "vet", "net", "nut", "but", "buzz", "bun", "Ben", "bell"],
            },
        },
        ],
    },
    {
        name: "Sound Bingo",
        games: [
        {
            name: "Fat Cat",
            gameType: "soundBingo",
            soundBingo: {
            cards: [
                {
                grid: [
                    ["f", "f", "p", "m"],
                    ["p", "p", "m", "c"],
                    ["a", "s", "a", "s"],
                    ["m", "f", "s", "a"],
                    ["s", "a", "c", "f"],
                ],
                },
                {
                grid: [
                    ["a", "f", "o", "t"],
                    ["f", "a", "f", "m"],
                    ["f", "a", "t", "m"],
                    ["c", "c", "m", "a"],
                    ["p", "p", "c", "m"],
                ],
                },
            ],
            },
        },
        {
            name: "Bug on Jug",
            gameType: "soundBingo",
            soundBingo: {
            cards: [
                {
                grid: [
                    ["u", "p", "a", "t"],
                    ["g", "u", "o", "s"],
                    ["p", "s", "j", "c"],
                    ["r", "h", "b", "d"],
                    ["b", "p", "u", "m"],
                ],
                },
                {
                grid: [
                    ["f", "r", "s", "m"],
                    ["a", "b", "t", "o"],
                    ["g", "f", "j", "i"],
                    ["p", "b", "m", "s"],
                    ["j", "d", "u", "p"],
                ],
                },
            ],
            },
        },
        {
            name: "Ben Bun",
            gameType: "soundBingo",
            soundBingo: {
            cards: [
                {
                grid: [
                    ["u", "p", "e", "t"],
                    ["g", "n", "w", "i"],
                    ["l", "z", "j", "c"],
                    ["r", "h", "b", "d"],
                    ["b", "p", "n", "v"],
                ],
                },
                {
                grid: [
                    ["f", "r", "w", "m"],
                    ["e", "l", "t", "o"],
                    ["g", "f", "j", "i"],
                    ["p", "b", "v", "s"],
                    ["j", "d", "u", "z"],
                ],
                },
            ],
            },
        },
        ],
    },
]

export default function GamesPage() {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
    const [selectedGameIndex, setSelectedGameIndex] = useState(0)
    const [selectedWordIndex, setSelectedWordIndex] = useState(0)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [expandedCategories, setExpandedCategories] = useState<number[]>([0])

    const [auditoryLetters, setAuditoryLetters] = useState<Letter[]>([])
    const [auditoryDropped, setAuditoryDropped] = useState<(Letter | null)[]>([null, null, null])
    const [auditoryDragged, setAuditoryDragged] = useState<Letter | null>(null)
    const [auditoryCorrect, setAuditoryCorrect] = useState<boolean | null>(null)
    const [auditoryShaking, setAuditoryShaking] = useState(false)
    const [currentAuditoryWordIndex, setCurrentAuditoryWordIndex] = useState(0)

    const [selectedBingoCard, setSelectedBingoCard] = useState(0)
    const [bingoCellColors, setBingoCellColors] = useState<string[][]>([])
    const [lastClickTime, setLastClickTime] = useState<{ [key: string]: number }>({})

    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

    const currentCategory = GAME_CATEGORIES[selectedCategoryIndex]
    const currentGame = currentCategory.games[selectedGameIndex]
    const gameType = currentGame.gameType || (currentGame.isStory ? "story" : "wordBuilding")

    // Word building game state
    const currentWordData = gameType === "wordBuilding" && currentGame.words ? currentGame.words[selectedWordIndex] : null
    const correctWord = currentWordData?.word || ""

    const [availableLetters, setAvailableLetters] = useState<Letter[]>([])
    const [droppedLetters, setDroppedLetters] = useState<(Letter | null)[]>([])
    const [lockedSlots, setLockedSlots] = useState<boolean[]>([])
    const [draggedLetter, setDraggedLetter] = useState<Letter | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [isShaking, setIsShaking] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)

    const shuffleArray = <T,>(array: T[]): T[] => {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }

    useEffect(() => {
        if (gameType === "auditoryProcessing" && currentGame.auditoryProcessing) {
        const letters = currentGame.auditoryProcessing.letters.map((letter, index) => ({
            id: `${letter}-${index}`,
            letter: letter.toLowerCase(),
            originalIndex: index,
        }))
        setAuditoryLetters(letters)
        setAuditoryDropped([null, null, null])
        setAuditoryCorrect(null)
        setAuditoryShaking(false)
        setCurrentAuditoryWordIndex(0)
        }
    }, [selectedCategoryIndex, selectedGameIndex, gameType, currentGame])

    useEffect(() => {
        if (gameType === "soundBingo" && currentGame.soundBingo) {
        const card = currentGame.soundBingo.cards[selectedBingoCard]
        const colors = card.grid.map((row) => row.map(() => "bg-white"))
        setBingoCellColors(colors)
        setLastClickTime({})
        }
    }, [selectedCategoryIndex, selectedGameIndex, selectedBingoCard, gameType, currentGame])

    useEffect(() => {
        if (gameType === "wordBuilding" && currentGame.words) {
        const wordData = currentGame.words[selectedWordIndex]
        setAvailableLetters(shuffleArray([...wordData.letters]))
        setDroppedLetters(Array(wordData.word.length).fill(null))
        setLockedSlots(Array(wordData.word.length).fill(false))
        setIsCorrect(null)
        setIsShaking(false)
        setShowSuccessPopup(false)
        setDraggedLetter(null)
        }
    }, [selectedCategoryIndex, selectedGameIndex, selectedWordIndex, gameType, currentGame])

    useEffect(() => {
        if (gameType === "story") {
        setCurrentSentenceIndex(0)
        setShowSuccessAnimation(false)
        }
    }, [selectedCategoryIndex, selectedGameIndex, gameType])

    const checkPartialWord = (letters: (Letter | null)[]) => {
        for (let i = 0; i < letters.length; i++) {
        if (letters[i] !== null) {
            if (letters[i]!.letter !== correctWord[i]) {
            return false
            }
        }
        }
        return true
    }

    const handleDragStart = (letter: Letter) => {
        setDraggedLetter(letter)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDropOnSlot = (slotIndex: number) => {
        if (!draggedLetter) return

        // Don't allow dropping on locked slots
        if (lockedSlots[slotIndex]) return

        // Check if this letter is correct for this specific slot
        const isCorrectForSlot = draggedLetter.letter === correctWord[slotIndex]

        if (isCorrectForSlot) {
        // Correct letter - place it and lock it
        setAvailableLetters((prev) => prev.filter((l) => l.id !== draggedLetter.id))

        const newDroppedLetters = [...droppedLetters]
        newDroppedLetters[slotIndex] = draggedLetter
        setDroppedLetters(newDroppedLetters)

        const newLockedSlots = [...lockedSlots]
        newLockedSlots[slotIndex] = true
        setLockedSlots(newLockedSlots)

        setDraggedLetter(null)

        // Check if all slots are filled correctly
        if (newDroppedLetters.every((l, i) => l !== null && l.letter === correctWord[i])) {
            setIsCorrect(true)
            setTimeout(() => {
            setShowSuccessPopup(true)
            }, 300)
        }
        } else {
        // Wrong letter - show error and don't place it
        setIsCorrect(false)
        setIsShaking(true)

        setTimeout(() => {
            setIsCorrect(null)
            setIsShaking(false)
            setDraggedLetter(null)
        }, 600)
        }
    }

    const handleTouchStart = (letter: Letter) => {
        setDraggedLetter(letter)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        e.preventDefault()
    }

    const handleTouchEnd = (e: React.TouchEvent, slotIndex: number) => {
        if (!draggedLetter) return
        handleDropOnSlot(slotIndex)
    }

    const handleAuditoryDragStart = (letter: Letter) => {
        setAuditoryDragged(letter)
    }

    const handleAuditoryDropOnSlot = (slotIndex: number) => {
        if (!auditoryDragged || !currentGame.auditoryProcessing) return

        const newDropped = [...auditoryDropped]

        // If slot already has a letter, return it to available letters
        if (newDropped[slotIndex]) {
        setAuditoryLetters((prev) => [...prev, newDropped[slotIndex]!])
        }

        // Remove dragged letter from available and place in slot
        setAuditoryLetters((prev) => prev.filter((l) => l.id !== auditoryDragged.id))
        newDropped[slotIndex] = auditoryDragged
        setAuditoryDropped(newDropped)
        setAuditoryDragged(null)

        if (newDropped.every((l) => l !== null)) {
        const formedWord = newDropped.map((l) => l!.letter.toLowerCase()).join("")
        const isCorrectWord = currentGame.auditoryProcessing.correctWords.includes(formedWord)

        if (isCorrectWord) {
            setAuditoryCorrect(true)
            setTimeout(() => {
            // Reset for next word
            const letters = currentGame.auditoryProcessing!.letters.map((letter, index) => ({
                id: `${letter}-${index}-${Date.now()}`,
                letter: letter.toLowerCase(),
                originalIndex: index,
            }))
            setAuditoryLetters(letters)
            setAuditoryDropped([null, null, null])
            setAuditoryCorrect(null)
            setCurrentAuditoryWordIndex((prev) => prev + 1)
            }, 1500)
        } else {
            setAuditoryCorrect(false)
            setAuditoryShaking(true)
            setTimeout(() => {
            // Return letters to available
            const letters = currentGame.auditoryProcessing!.letters.map((letter, index) => ({
                id: `${letter}-${index}-${Date.now()}`,
                letter: letter.toLowerCase(),
                originalIndex: index,
            }))
            setAuditoryLetters(letters)
            setAuditoryDropped([null, null, null])
            setAuditoryCorrect(null)
            setAuditoryShaking(false)
            }, 600)
        }
        }
    }

    const handleBingoCellClick = (rowIndex: number, colIndex: number) => {
        const cellKey = `${rowIndex}-${colIndex}`
        const now = Date.now()
        const lastClick = lastClickTime[cellKey] || 0
        const isDoubleClick = now - lastClick < 300

        setBingoCellColors((prev) => {
        const newColors = prev.map((row) => [...row])
        const currentColor = newColors[rowIndex][colIndex]

        if (isDoubleClick) {
            // Double click - turn green
            newColors[rowIndex][colIndex] = "bg-green-400"
        } else {
            // Single click - toggle blue on/off
            if (currentColor === "bg-blue-400") {
            newColors[rowIndex][colIndex] = "bg-white"
            } else {
            newColors[rowIndex][colIndex] = "bg-blue-400"
            }
        }
        return newColors
        })

        setLastClickTime((prev) => ({ ...prev, [cellKey]: now }))
    }

    const handleBingoCellRightClick = (e: React.MouseEvent, rowIndex: number, colIndex: number) => {
        e.preventDefault()
        setBingoCellColors((prev) => {
        const newColors = prev.map((row) => [...row])
        newColors[rowIndex][colIndex] = "bg-red-400"
        return newColors
        })
    }

    const handleResetBingoCard = () => {
        if (currentGame.soundBingo) {
        const card = currentGame.soundBingo.cards[selectedBingoCard]
        const colors = card.grid.map((row) => row.map(() => "bg-white"))
        setBingoCellColors(colors)
        setLastClickTime({})
        }
    }

    const getBorderColor = () => {
        if (isCorrect === true) return "border-success"
        if (isCorrect === false) return "border-error"

        const hasLetters = droppedLetters.some((l) => l !== null)
        if (hasLetters && !checkPartialWord(droppedLetters)) {
        return "border-error"
        }

        return "border-primary/30"
    }

    const resetGame = () => {
        setShowSuccessPopup(false)
    }

    const handleGameChange = (categoryIndex: number, gameIndex: number) => {
        setSelectedCategoryIndex(categoryIndex)
        setSelectedGameIndex(gameIndex)
        setSelectedWordIndex(0)
        setSelectedBingoCard(0)
    }

    const handlePreviousWord = () => {
        if (selectedWordIndex > 0) {
        setSelectedWordIndex(selectedWordIndex - 1)
        }
    }

    const handleNextWord = () => {
        if (currentGame.words && selectedWordIndex < currentGame.words.length - 1) {
        setSelectedWordIndex(selectedWordIndex + 1)
        }
    }

    const toggleCategory = (categoryIndex: number) => {
        setExpandedCategories((prev) =>
        prev.includes(categoryIndex) ? prev.filter((i) => i !== categoryIndex) : [...prev, categoryIndex],
        )
    }

    const getLetterColors = () => {
        const colorSets = [
        [
            "bg-secondary text-secondary-foreground",
            "bg-accent text-accent-foreground",
            "bg-tertiary text-tertiary-foreground",
        ],
        [
            "bg-tertiary text-tertiary-foreground",
            "bg-secondary text-secondary-foreground",
            "bg-accent text-accent-foreground",
        ],
        [
            "bg-accent text-accent-foreground",
            "bg-tertiary text-tertiary-foreground",
            "bg-secondary text-secondary-foreground",
        ],
        ]

        const baseColors = colorSets[selectedWordIndex % 3]

        if (correctWord.length === 4) {
        return [...baseColors, "bg-primary text-primary-foreground"]
        }

        return baseColors
    }

    const handlePreviousSentence = () => {
        if (currentSentenceIndex > 0) {
        setCurrentSentenceIndex(currentSentenceIndex - 1)
        setShowSuccessAnimation(false)
        }
    }

    const handleNextSentence = () => {
        if (!currentGame.story) return

        if (currentSentenceIndex < currentGame.story.sentences.length - 1) {
        setCurrentSentenceIndex(currentSentenceIndex + 1)
        setShowSuccessAnimation(false)
        } else {
        setShowSuccessAnimation(true)
        setTimeout(() => {
            setShowSuccessAnimation(false)
        }, 2000)
        }
    }

    const handleResetStory = () => {
        setCurrentSentenceIndex(0)
        setShowSuccessAnimation(false)
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-background via-accent/20 to-tertiary/30">
        <aside
            className={`${
            sidebarOpen ? "w-64" : "w-0"
            } bg-card border-r border-border transition-all duration-300 overflow-hidden flex-shrink-0`}
        >
            <div className="p-6 overflow-y-auto h-full">
            <h2 className="text-2xl font-bold text-foreground mb-6">Learning Games</h2>
            <nav className="space-y-4">
                {GAME_CATEGORIES.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                    <button
                    onClick={() => toggleCategory(categoryIndex)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-all font-semibold text-foreground"
                    >
                    <span>{category.name}</span>
                    {expandedCategories.includes(categoryIndex) ? (
                        <ChevronUp className="w-5 h-5" />
                    ) : (
                        <ChevronDown className="w-5 h-5" />
                    )}
                    </button>
                    {expandedCategories.includes(categoryIndex) && (
                    <div className="mt-2 space-y-2 pl-2">
                        {category.games.map((game, gameIndex) => (
                        <button
                            key={gameIndex}
                            onClick={() => handleGameChange(categoryIndex, gameIndex)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                            selectedCategoryIndex === categoryIndex && selectedGameIndex === gameIndex
                                ? "bg-primary text-primary-foreground font-semibold"
                                : "hover:bg-muted text-foreground/80"
                            }`}
                        >
                            {game.name}
                        </button>
                        ))}
                    </div>
                    )}
                </div>
                ))}
            </nav>
            </div>
        </aside>

        <main className="flex-1 flex items-center justify-center p-4">
            <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-4 left-4 z-10 bg-card border border-border rounded-lg p-2 hover:bg-muted transition-colors"
            >
            {sidebarOpen ? "←" : "→"}
            </button>

            {gameType === "auditoryProcessing" && currentGame.auditoryProcessing && (
            <div className="w-full max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-foreground text-balance">
                {currentGame.name}
                </h1>
                <p className="text-center mb-6 text-xl md:text-2xl text-foreground/80 font-medium">Build a 3-letter word</p>

                <Card
                className={`p-8 md:p-12 mb-12 transition-all duration-300 border-4 ${
                    auditoryCorrect === true
                    ? "bg-success/20 border-success shadow-2xl shadow-success/30 scale-105"
                    : auditoryCorrect === false && auditoryShaking
                        ? "bg-error/20 border-error"
                        : "bg-card shadow-xl border-primary/30"
                } ${auditoryShaking ? "animate-shake" : ""}`}
                >
                <div className="flex justify-center gap-3 md:gap-6 mb-8">
                    {auditoryDropped.map((letter, index) => (
                    <div
                        key={index}
                        onDragOver={handleDragOver}
                        onDrop={() => handleAuditoryDropOnSlot(index)}
                        className={`w-20 h-24 md:w-28 md:h-32 rounded-3xl border-4 border-dashed flex items-center justify-center text-5xl md:text-7xl font-bold transition-all ${
                        letter
                            ? auditoryCorrect === true
                            ? "bg-success/30 border-success text-success-foreground scale-110"
                            : auditoryCorrect === false && auditoryShaking
                                ? "bg-error/30 border-error text-error-foreground"
                                : "bg-primary/20 border-primary text-primary"
                            : "border-muted-foreground/40 bg-muted/20 hover:bg-muted/40 hover:border-primary/50"
                        }`}
                    >
                        {letter?.letter}
                    </div>
                    ))}
                </div>

                {auditoryCorrect === true && (
                    <div className="text-center animate-bounce">
                    <p className="text-3xl md:text-4xl font-bold text-success mb-2">Correct!</p>
                    </div>
                )}

                {auditoryCorrect === false && (
                    <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-error mb-2">Try again!</p>
                    </div>
                )}
                </Card>

                <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-md mx-auto">
                {auditoryLetters.map((letter) => (
                    <div
                    key={letter.id}
                    draggable
                    onDragStart={() => handleAuditoryDragStart(letter)}
                    className="w-full aspect-square bg-secondary text-secondary-foreground rounded-3xl shadow-xl flex items-center justify-center text-4xl md:text-6xl font-bold cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-all duration-200 touch-none select-none"
                    style={{
                        boxShadow: "0 10px 0 0 rgba(0,0,0,0.15)",
                    }}
                    >
                    {letter.letter}
                    </div>
                ))}
                </div>

                <p className="text-center mt-8 text-lg md:text-xl text-foreground/70 font-medium">
                Words completed: {currentAuditoryWordIndex}
                </p>
            </div>
            )}

            {gameType === "soundBingo" && currentGame.soundBingo && (
            <div className="w-full max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-foreground text-balance">
                {currentGame.name} Sound Bingo
                </h1>

                <div className="flex justify-center gap-4 mb-6">
                {currentGame.soundBingo.cards.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => setSelectedBingoCard(index)}
                    className={`px-6 py-3 rounded-xl text-xl font-bold transition-all ${
                        selectedBingoCard === index
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                    >
                    Card {index + 1}
                    </button>
                ))}
                </div>

                <Card className="p-8 bg-card shadow-xl border-4 border-primary/30 mb-6">
                <div className="grid grid-rows-5 gap-2">
                    {currentGame.soundBingo.cards[selectedBingoCard].grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-4 gap-2">
                        {row.map((letter, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleBingoCellClick(rowIndex, colIndex)}
                            onContextMenu={(e) => handleBingoCellRightClick(e, rowIndex, colIndex)}
                            className={`aspect-square ${
                            bingoCellColors[rowIndex]?.[colIndex] || "bg-white"
                            } border-4 border-gray-800 rounded-xl flex items-center justify-center text-8xl md:text-8xl font-bold cursor-pointer hover:scale-120 active:scale-95 transition-all shadow-lg select-none`}
                        >
                            {letter.toLowerCase()}
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
                </Card>

                <div className="flex justify-center gap-4">
                <button
                    onClick={handleResetBingoCard}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-2xl text-xl md:text-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                >
                    <RotateCcw className="w-6 h-6" />
                    Reset Card
                </button>
                </div>

                <div className="mt-6 text-center space-y-2">
                <p className="text-lg text-foreground/70">
                    <strong>Single click:</strong> Blue | <strong>Double click:</strong> Green |{" "}
                    <strong>Right click:</strong> Red
                </p>
                </div>
            </div>
            )}

            {gameType === "story" && (
            <div className="w-full max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-foreground text-balance">
                {currentGame.name}
                </h1>

                <div className="flex flex-col gap-8 items-center">
                {/* Story Image - Now on top */}
                <div className="w-full max-w-2xl">
                    {currentGame.story?.imagePlaceholder ? (
                    <img
                        src={currentGame.story.imagePlaceholder || "/placeholder.svg"}
                        alt={currentGame.name}
                        className="w-full h-auto rounded-3xl shadow-2xl border-4 border-primary"
                    />
                    ) : (
                    <div className="w-full aspect-[4/3] rounded-3xl shadow-2xl border-4 border-primary bg-muted flex items-center justify-center">
                        <p className="text-muted-foreground text-xl">Image Placeholder</p>
                    </div>
                    )}
                </div>

                {/* Story Text Area - Now below image */}
                <div className="w-full max-w-2xl">
                    <Card className="p-8 md:p-12 bg-card shadow-xl border-4 border-primary/30 min-h-[200px] flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                        <p className="text-3xl md:text-5xl font-bold text-foreground leading-relaxed">
                            {currentGame.story?.sentences[currentSentenceIndex]}
                        </p>
                        </div>
                    </div>

                    {/* Success Animation */}
                    {showSuccessAnimation && (
                        <div className="text-center mt-6 animate-bounce">
                        <Sparkles className="w-16 h-16 mx-auto text-success mb-2" />
                        <p className="text-3xl font-bold text-success">Great Reading!</p>
                        </div>
                    )}
                    </Card>

                    {/* Story Controls */}
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <button
                        onClick={handlePreviousSentence}
                        disabled={currentSentenceIndex === 0}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-2xl text-xl md:text-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                    >
                        <ChevronLeft className="w-6 h-6" />
                        Previous
                    </button>

                    <button
                        onClick={handleResetStory}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-2xl text-xl md:text-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                    >
                        <RotateCcw className="w-6 h-6" />
                        Reset
                    </button>

                    <button
                        onClick={handleNextSentence}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-2xl text-xl md:text-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                    >
                        Next
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    </div>

                    {/* Sentence Progress */}
                    {currentGame.story && (
                    <p className="text-center mt-6 text-xl font-semibold text-foreground/70">
                        Sentence {currentSentenceIndex + 1} of {currentGame.story.sentences.length}
                    </p>
                    )}
                </div>
                </div>
            </div>
            )}

            {gameType === "wordBuilding" && (
            <div className="w-full max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-foreground text-balance">
                {currentGame.name}
                </h1>

                <p className="text-center mb-6 text-xl md:text-2xl text-foreground/80 font-medium">
                Drag the letters to make {correctWord}
                </p>

                <div className="flex items-center justify-center gap-4 mb-6">
                <button
                    onClick={handlePreviousWord}
                    disabled={selectedWordIndex === 0}
                    className="p-2 rounded-lg bg-card border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-lg font-semibold text-foreground">
                    Word {selectedWordIndex + 1} of {currentGame.words?.length || 0}
                </span>
                <button
                    onClick={handleNextWord}
                    disabled={!currentGame.words || selectedWordIndex === currentGame.words.length - 1}
                    className="p-2 rounded-lg bg-card border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
                </div>

                <Card
                className={`p-8 md:p-12 mb-12 transition-all duration-300 border-4 ${
                    isCorrect === true
                    ? "bg-success/20 border-success shadow-2xl shadow-success/30 scale-105"
                    : isCorrect === false && isShaking
                        ? "bg-error/20 border-error"
                        : "bg-card shadow-xl"
                } ${getBorderColor()} ${isShaking ? "animate-shake" : ""}`}
                >
                <div className="flex justify-center gap-3 md:gap-6">
                    {droppedLetters.map((letter, index) => {
                    const isSlotWrong = letter !== null && letter.letter !== correctWord[index]
                    const isLocked = lockedSlots[index]

                    return (
                        <div
                        key={index}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDropOnSlot(index)}
                        onTouchEnd={(e) => handleTouchEnd(e, index)}
                        className={`w-20 h-24 md:w-28 md:h-32 rounded-3xl border-4 border-dashed flex items-center justify-center text-5xl md:text-7xl font-bold transition-all ${
                            letter
                            ? isCorrect === true
                                ? "bg-success/30 border-success text-success-foreground scale-110"
                                : isLocked
                                ? "bg-primary/30 border-primary text-primary ring-4 ring-primary/50"
                                : isSlotWrong || (isCorrect === false && isShaking)
                                    ? "bg-error/30 border-error text-error-foreground"
                                    : "bg-primary/20 border-primary text-primary"
                            : "border-muted-foreground/40 bg-muted/20 hover:bg-muted/40 hover:border-primary/50"
                        } ${isLocked ? "cursor-not-allowed" : ""}`}
                        >
                        {letter?.letter}
                        </div>
                    )
                    })}
                </div>

                {isCorrect === true && (
                    <div className="text-center mt-8 animate-bounce">
                    <p className="text-3xl md:text-4xl font-bold text-success mb-2">Amazing!</p>
                    <p className="text-xl md:text-2xl text-success-foreground/80">You spelled {correctWord}!</p>
                    </div>
                )}
                </Card>

                <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                {availableLetters.map((letter) => {
                    const colors = getLetterColors()

                    return (
                    <div
                        key={letter.id}
                        draggable
                        onDragStart={() => handleDragStart(letter)}
                        onTouchStart={() => handleTouchStart(letter)}
                        onTouchMove={handleTouchMove}
                        className={`w-20 h-24 md:w-28 md:h-32 ${colors[letter.originalIndex]} rounded-3xl shadow-xl flex items-center justify-center text-5xl md:text-7xl font-bold cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-all duration-200 touch-none select-none`}
                        style={{
                        boxShadow: "0 10px 0 0 rgba(0,0,0,0.15)",
                        }}
                    >
                        {letter.letter}
                    </div>
                    )
                })}
                </div>

                <p className="text-center mt-12 text-lg md:text-xl text-foreground/70 font-medium">
                Pick a letter and drop it in a box!
                </p>
            </div>
            )}
        </main>

        {showSuccessPopup && currentWordData && (
            <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
            onClick={resetGame}
            >
            <div
                className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-md mx-4 animate-popIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Great Job!</h2>
                {currentWordData.imagePlaceholder ? (
                    <img
                    src={currentWordData.imagePlaceholder || "/placeholder.svg"}
                    alt={`Happy ${correctWord}`}
                    className="w-full h-64 object-cover rounded-2xl mb-6"
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-2xl mb-6 flex items-center justify-center">
                    <p className="text-gray-500">Image Placeholder</p>
                    </div>
                )}
                <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">You spelled {correctWord}!</p>
                <div className="flex gap-4 justify-center">
                    <button
                    onClick={resetGame}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-2xl text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
                    >
                    Try Again
                    </button>
                    {currentGame.words && selectedWordIndex < currentGame.words.length - 1 && (
                    <button
                        onClick={() => {
                        setShowSuccessPopup(false)
                        handleNextWord()
                        }}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-2xl text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
                    >
                        Next Word
                    </button>
                    )}
                </div>
                </div>
            </div>
            </div>
        )}

        <style jsx>{`
            @keyframes shake {
            0%,
            100% {
                transform: translateX(0);
            }
            10%,
            30%,
            50%,
            70%,
            90% {
                transform: translateX(-10px);
            }
            20%,
            40%,
            60%,
            80% {
                transform: translateX(10px);
            }
            }
            .animate-shake {
            animation: shake 0.6s ease-in-out;
            }
            @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
            }
            @keyframes popIn {
            0% {
                transform: scale(0.5);
                opacity: 0;
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
            }
            .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
            }
            .animate-popIn {
            animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
        `}</style>
        </div>
    )
}
