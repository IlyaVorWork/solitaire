import { Dispatch, SetStateAction } from "react";
import { Card } from "./classes"
import { color, Columns, suit } from "./types";

export interface CardProps {
    card: Card
    index: number
    selfLength: number
    allLength: number[]
    ownerIndex: string
}

export interface SuitProps {
    suit: suit
    color: color
}

export interface ColumnProps {
    id: string
    items: Card[]
    listLength: number[]
    listIndex: string
}

export interface StartDeckProps extends ColumnProps{
    gameField: Columns
    setGameField: Dispatch<SetStateAction<Columns>>
}
