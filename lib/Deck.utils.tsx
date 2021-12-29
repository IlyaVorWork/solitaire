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

export const createField = (deck:Card[]) => {

    let columnsList:Column[] = []

    for (let i = 1; i < 4; i++) {
        i == 1 ? columnsList.push(new Column(i.toString(), deck)) : columnsList.push(new Column(i.toString(), []))
    }

    return columnsList
}