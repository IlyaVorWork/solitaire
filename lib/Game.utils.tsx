import { Dispatch, SetStateAction } from "react"
import { Columns } from "../types"

export const reroll = (gameField:Columns, setGameField:Dispatch<SetStateAction<Columns>>) => {
    let items = gameField['deck'].items
    let upperCard = items[items.length-1]
    items.pop()
    items.unshift(upperCard)
    setGameField({
        ...gameField,
        ['deck']: {
            ...gameField['deck'],
            items: items
        }
    })
}