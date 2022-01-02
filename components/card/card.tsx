import { FunctionComponent, useEffect, useState } from "react"
import { CardProps } from "../../interfaces"
import styles from './card.module.css'
import Suit from "./suit/suit"
import { Draggable } from "react-beautiful-dnd"
import clsx from "clsx"
import { getStyle } from "../../lib/DragAndDrop.utils"

const CardElement:FunctionComponent<CardProps> = ({card, index, selfLength, allLength, ownerIndex}) => {
    const [onceSeen, setOnceSeen] = useState<boolean>(false)

    const {suit, rank, color, id} = card

    const rankText = parseInt(rank) ? rank : rank[0].toUpperCase()

    const isDraggingDisabled = selfLength-1 == index

    useEffect(() => {
        if(isDraggingDisabled){
            setOnceSeen(true)
        }
    }, [isDraggingDisabled])

    const stacks = ['deck', 'diamond', 'heart', 'spade', 'club']

    const isOwnerOrStack = stacks.indexOf(ownerIndex) != -1

    if(isDraggingDisabled || onceSeen){

        return(
            <Draggable
                draggableId={id}
                index={index}
                isDragDisabled={false}
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
                            style={snapshot.isDragging ? getStyle(provided.draggableProps.style, snapshot, allLength, index, ownerIndex) : (isOwnerOrStack ? {top: 62.5} : {top: 62.5+(index)*30})}
                        >
                            <span className={styles.text}>{rankText}<Suit suit={suit} color={color}/></span>
                        </div>
                    )
                }}
            </Draggable>
        )
    } else {
        return(
            <Draggable
                draggableId={id}
                index={index}
                isDragDisabled={true}
            >
                {(provided, snapshot) => {

                    return(
                        <div 
                            className={clsx({
                                [styles.card]: true, 
                                [styles.locked]: !snapshot.isDragging,
                                [styles.cardback]: true,
                            })}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={snapshot.isDragging ? getStyle(provided.draggableProps.style, snapshot, allLength, index, ownerIndex) : (isOwnerOrStack ? {top: 62.5} : {top: 62.5+(index)*30})}
                        />
                    )
                }}
            </Draggable>
        )
    }
}

export default CardElement