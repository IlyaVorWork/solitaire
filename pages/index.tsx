import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Card, Column } from '../classes'
import DropZone from '../components/dropZone/dropZone'
import { createDeck, createField, shuffle } from '../lib/Deck.utils'
import { onDragEnd } from '../lib/DragAndDrop.utils'
import styles from '../styles/Home.module.css'
import { Columns, ListLength } from '../types'

const Home: NextPage = () => {
 
 const [columns, setColumns] = useState<Columns>({})

 useEffect(() => {

  const deck:Card[] = createDeck()
  shuffle(deck)
  const columnsList:Column[] = createField(deck)

  const initialColumns:Columns = {
    ["1"]: columnsList[0],
    ["2"]: columnsList[1],
    ["3"]: columnsList[2],
  }

  setColumns(initialColumns)
  
 }, [])

 let ListLength:ListLength = Object.entries(columns).map(([columnId, column], index) => {return column.items.length})

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => <DropZone key={column.id} id={column.id} items={column.items} listLength={ListLength} listIndex={index}/>)}
      </DragDropContext>
    </div>
  )
}

export default Home
