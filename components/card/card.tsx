import { FunctionComponent } from "react"
import { CardProps } from "../../interfaces"
import styles from './card.module.css'
import Suit from "./suit/suit"
import { Draggable } from "react-beautiful-dnd"
import clsx from "clsx"
import { getStyle } from "../../lib/DragAndDrop.utils"

const CardElement:FunctionComponent<CardProps> = ({card, index, selfLength, allLength, ownerIndex}) => {

    const {suit, rank, color, id} = card

    const rankText = rank[0].toUpperCase()

    const isDraggingDisabled = selfLength-1 == index

    return(
        <Draggable
            draggableId={id}
            index={index}
            isDragDisabled={!isDraggingDisabled}
        >
            {(provided, snapshot) => {

                return(
                    <div 
                        className={clsx({
                            [styles.card]: true, 
                            [styles.locked]: !snapshot.isDragging,
                        })}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={snapshot.isDragging ? getStyle(provided.draggableProps.style, snapshot, allLength, index, ownerIndex) : (ownerIndex == 0 ? {top: 112.5} : {top: 112.5+(index)*30})}
                    >
                        <span>{rankText}</span><Suit suit={suit} color={color}/>
                    </div>
                )
            }}
        </Draggable>
    )
}

export default CardElement