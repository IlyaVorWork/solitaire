import { Column } from "./classes"

export type suit = "diamond" | "heart" | "club" | "spade"

export type rank =  "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "jack" | "queen" | "king" | "ace"

export type color = "red" | "black"

export type Columns = {[index: string]:Column}

export type ListLength = number[]