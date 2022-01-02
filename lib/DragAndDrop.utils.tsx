import { DraggableStateSnapshot, DropResult } from "react-beautiful-dnd"
import { Card } from "../classes"
import { AnimationStyles, Columns, rank, suit } from "../types"

const suits:string[] = ["diamond", "heart", "club", "spade"]
const ranks:string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"]

export const onDragEnd = (result:DropResult, columns:Columns, setColumns:Function) => {
    if (!result.destination) return
    const { source, destination } = result
    console.log(source)
    console.log(destination)
    console.log(columns)
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]
      console.log(sourceColumn)
      const destColumn = columns[destination.droppableId]
      console.log(destColumn)
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      console.log(destItems)
      const [removed] = sourceItems.splice(source.index, 1)
      if(suits.indexOf(destination.droppableId) != -1){
        console.log('Стопка')
        if(destItems[0] != undefined){
            if(destItems[0].rank != 'ace')
                if(removed.suit == destination.droppableId && (ranks.indexOf(removed.rank) - ranks.indexOf(destItems[destItems.length-1].rank) == -1)){
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
                }else{
                    sourceItems.push(removed)
                }
            else{
                if(removed.suit == destination.droppableId && (ranks.indexOf(removed.rank) - ranks.indexOf(destItems[destItems.length-1].rank) == -12)){
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
                }else{
                    sourceItems.push(removed)
                }
            }
        } else {
            if(removed.suit == destination.droppableId && removed.rank == "ace"){
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
            else {
                sourceItems.push(removed)
            }
        }
      } else {
          console.log('Не стопка')
          console.log(destItems)
          console.log(removed)
          if(removed.color != destItems[destItems.length-1].color && (ranks.indexOf(removed.rank) - ranks.indexOf(destItems[destItems.length-1].rank) == -1)){
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
          }else{
              sourceItems.push(removed)
          }
      }
    }
   }

export const getStyle = (style:AnimationStyles, snapshot:DraggableStateSnapshot, allLength:number[], index:number, ownerIndex:string) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    const moveTo = snapshot.dropAnimation?.moveTo
    // move to the right spot

    let translate = ''
    /*
    if(parseInt(snapshot.draggingOver)-1 == 0 && ownerIndex != 0) {
        console.log()
        if (moveTo.x % 275 == 0){
            console.log((allLength[parseInt(snapshot.draggingOver)-1])*30)
            translate = `translate(${moveTo.x}px, ${(-index)*30}px)`
        } else {
            console.log((allLength[parseInt(snapshot.draggingOver)-1])*30)
            translate = `translate(${moveTo.x+50}px, ${(-index)*30}px)`
        }
    } else if (!snapshot.draggingOver || ownerIndex == parseInt(snapshot.draggingOver)-1 || parseInt(snapshot.draggingOver)-1 == 0) {
        console.log('Цель - 0 столбец')
        if (moveTo.x % 275 == 0){
            translate = `translate(${moveTo.x}px, 0px)`
        } else {
            translate = `translate(${moveTo.x+50}px, 0px)`
        }
    } else {
        if (ownerIndex == 0 ) {
            if (moveTo.x % 275 == 0){
                console.log((allLength[parseInt(snapshot.draggingOver)-1])*30)
                translate = `translate(${moveTo.x}px, ${(allLength[parseInt(snapshot.draggingOver)-1])*30}px)`
            } else {
                console.log((allLength[parseInt(snapshot.draggingOver)-1])*30)
                translate = `translate(${moveTo.x+50}px, ${(allLength[parseInt(snapshot.draggingOver)-1])*30}px)`
            }
        } else {
            if (moveTo.x % 275 == 0){
                console.log((allLength[parseInt(snapshot.draggingOver)-1])*30)
                translate = `translate(${moveTo.x}px, ${(allLength[parseInt(snapshot.draggingOver)-1]-index)*30}px)`
            } else {
                console.log((allLength[parseInt(snapshot.draggingOver)-1])*30)
                translate = `translate(${moveTo.x+50}px, ${(allLength[parseInt(snapshot.draggingOver)-1]-index)*30}px)`
            }
        }
    }*/

    // patching the existing style
    return {
      ...style,
      transform: `${translate}`,
    };
}