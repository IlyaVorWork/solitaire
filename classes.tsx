import { color, rank, suit } from "./types"

export class Card {
    suit: suit
    rank: rank
    color: color
    id: string
    constructor(suit: suit, rank: rank, id: string){
        this.suit = suit
        this.rank = rank
        this.id = id
        if (this.suit == "diamond" || this.suit == "heart") {
            this.color = "red"
        } else {
            this.color = "black"
        }
    }
}

export class Column {
    id: string
    items: Card[]
    constructor(id: string, items: Card[]){
        this.id = id
        this.items = items
    }
}