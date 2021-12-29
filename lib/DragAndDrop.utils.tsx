import { DropResult } from "react-beautiful-dnd"
import { Columns } from "../types"

export const onDragEnd = (result:DropResult, columns:Columns, setColumns:Function) => {
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

export const getStyle = (style:any, snapshot:any, allLength:number[], index:number, ownerIndex:number) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    const { moveTo }= snapshot.dropAnimation;
    // move to the right spot

    let translate = ''
    
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
    }

    // patching the existing style
    return {
      ...style,
      transform: `${translate}`,
    };
}