import { Card } from "./classes"
import { color, suit } from "./types";

export interface CardProps {
    card: Card
    index: number
    selfLength: number
    allLength: number[]
    ownerIndex: number
}

export interface SuitProps {
    suit: suit
    color: color
}

export interface ColumnProps {
    id: string
    items: Card[]
    listLength: number[]
    listIndex: number
}
