import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Card, Column } from '../classes'
import DropZone from '../components/dropZone/dropZone'
import styles from '../styles/Home.module.css'
import { Columns, ListLength, rank, suit } from '../types'

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
 
  function shuffle(deck:Card[]) {
   for (let i = deck.length - 1; i > 0; i--) {
     let j:number = Math.floor(Math.random() * (i + 1))
     let temp:Card = deck[i]
     deck[i] = deck[j]
     deck[j] = temp
   }
  }

  shuffle(tempDeck)

  const columnsList:Column[] = []
  for (let i = 1; i < 4; i++) {
    i == 1 ? columnsList.push(new Column(i.toString(), tempDeck)) : columnsList.push(new Column(i.toString(), []))
  }
  

const Home: NextPage = () => {
 
 const [columns, setColumns] = useState<Columns>({})

 useEffect(() => {

  const initialColumns:Columns = {
    ["1"]: columnsList[0],
    ["2"]: columnsList[1],
    ["3"]: columnsList[2]
  }

  setColumns(initialColumns)
  
 }, [])

 let ListLength:ListLength = Object.entries(columns).map(([columnId, column], index) => {return column.items.length})

 const onDragEnd = (result:DropResult, columns:Columns, setColumns:Function) => {
  if (!result.destination) return
  const { source, destination } = result
  console.log(source)
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.push(removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  }
 }

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => <DropZone key={column.id} id={column.id} items={column.items} listLength={ListLength} listIndex={index}/>)}
      </DragDropContext>
    </div>
  )
}

export default Home
