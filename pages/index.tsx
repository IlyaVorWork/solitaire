import clsx from 'clsx'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Card, Column } from '../classes'
import DropZone from '../components/dropZone/dropZone'
import StartDeck from '../components/startDeck/startDeck'
import { createDeck, createDeckAndStacks, shuffle, createColumns } from '../lib/Deck.utils'
import { onDragEnd } from '../lib/DragAndDrop.utils'
import styles from '../styles/Home.module.css'
import { Columns, ListLength } from '../types'

const Home: NextPage = () => {
 
 const [gameField, setGameField] = useState<Columns>({})

 useEffect(() => {

  const deck:Card[] = createDeck()
  shuffle(deck)

  const partDeck = deck.splice(24,52)

  const deckAndStacksList:Column[] = createDeckAndStacks(deck)
  const columnsList:Column[] = createColumns(partDeck)

  const deckAndStacks:Columns = {
    ["deck"]: deckAndStacksList[0],
    ["diamond"]: deckAndStacksList[1],
    ["heart"]: deckAndStacksList[2],
    ["club"]: deckAndStacksList[3],
    ["spade"]: deckAndStacksList[4],
  }

  const columns:Columns = {
    ['1']: columnsList[0],
    ['2']: columnsList[1],
    ['3']: columnsList[2],
    ['4']: columnsList[3],
    ['5']: columnsList[4],
    ['6']: columnsList[5],
    ['7']: columnsList[6],
  }

  setGameField(Object.assign({}, deckAndStacks, columns))
  
 }, [])

 let ListLength:ListLength = Object.entries(gameField).map(([columnId, column], index) => {return column.items.length})

 console.log(gameField)

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, gameField, setGameField)}>
        <div className={clsx(styles.box, styles.upperBox)}>
          {Object.entries(gameField).slice(7,8).map(([columnId, column], index) => <StartDeck key={column.id} id={column.id} items={column.items} listLength={ListLength} listIndex={columnId} gameField={gameField} setGameField={setGameField}/>)}
          {Object.entries(gameField).slice(8,12).map(([columnId, column], index) => <DropZone key={column.id} id={column.id} items={column.items} listLength={ListLength} listIndex={columnId}/>)}
        </div>
        <div className={styles.box}>
          {Object.entries(gameField).slice(0,7).map(([columnId, column], index) => <DropZone key={column.id} id={column.id} items={column.items} listLength={ListLength} listIndex={columnId}/>)}
        </div>
      </DragDropContext>
    </div>
  )
}

export default Home
