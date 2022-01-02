import { Card, Column } from "../classes"
import { rank, suit } from "../types"

export const shuffle = (deck:Card[]) => {
    for (let i = deck.length - 1; i > 0; i--) {
      let j:number = Math.floor(Math.random() * (i + 1))
      let temp:Card = deck[i]
      deck[i] = deck[j]
      deck[j] = temp
    }
  }

export const createDeck = () => {

    const suits:suit[] = ["diamond", "heart", "club", "spade"]
    const ranks:rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"]

    let tempDeck:Card[] = []

    let id = 0

    for(let i = 0; i<4; i++){
        for(let j = 0; j<13; j++){
            id++
            tempDeck.push(new Card(suits[i], ranks[j], id.toString()))
        }
    }

    return tempDeck
}

export const createColumns = (partDeck:Card[]) => {

    let columnsList:Column[] = [
        {
            id: '1',
            items: [partDeck[27]],
        },
        {
            id: '2',
            items: partDeck.slice(25,27),
        }, 
        {
            id: '3',
            items: partDeck.slice(22,25),
        }, 
        {
            id: '4',
            items: partDeck.slice(18,22),
        }, 
        {
            id: '5',
            items: partDeck.slice(13,18),
        }, 
        {
            id: '6',
            items: partDeck.slice(7,13),
        }, 
        {
            id: '7',
            items: partDeck.slice(0,7),
        }, 
    ]

    return columnsList

}

export const createDeckAndStacks = (deck:Card[]) => {

    let columnsList:Column[] = [
        {
            id: 'deck',
            items: deck,
        },
        {
            id: 'diamond',
            items: [],
        }, 
        {
            id: 'heart',
            items: [],
        }, 
        {
            id: 'club',
            items: [],
        }, 
        {
            id: 'spade',
            items: [],
        }, 
    ]

    return columnsList
}