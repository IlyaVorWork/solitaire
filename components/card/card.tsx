import { FunctionComponent, useState } from "react"
import { CardProps } from "../../interfaces"
import styles from './card.module.css'
import Suit from "../suit/suit"
import { Draggable } from "react-beautiful-dnd"
import clsx from "clsx"

const CardElement:FunctionComponent<CardProps> = ({card, index, selfLength, allLength, ownerIndex}) => {

    const {suit, rank, color, id} = card

    const rankText = rank[0].toUpperCase()

    const isDraggingDisabled = selfLength-1 == index ? false : true

    function getStyle(style:any, snapshot:any, provided:any) {
        if (!snapshot.isDropAnimating) {
          return style;
        }
        const { moveTo }= snapshot.dropAnimation;
        // move to the right spot

        let translate = ''

        console.log(provided)
        console.log(snapshot)
        
        console.log(ownerIndex, suit, rank)
        
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

    return(
        <Draggable
            draggableId={id}
            index={index}
            isDragDisabled={isDraggingDisabled}
        >
            {(provided, snapshot) => {

                return(
                    <div 
                        className={snapshot.isDragging ? styles.card : clsx(styles.card, styles.locked)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={snapshot.isDragging ? getStyle(provided.draggableProps.style, snapshot, provided) : (ownerIndex == 0 ? {top: 112.5} : {top: 112.5+(index)*30})}
                    >
                        <span>{rankText}</span><Suit suit={suit} color={color}/>
                    </div>
                )
            }}
        </Draggable>
    )
}

export default CardElement