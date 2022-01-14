import clsx from "clsx"
import { FunctionComponent } from "react"
import { Droppable } from "react-beautiful-dnd"
import { ColumnProps } from "../../interfaces"
import CardElement from "../card/card"
import styles from "../dropZone/dropZone.module.css"

const DropZone: FunctionComponent<ColumnProps> = ({
  id,
  items,
  listLength,
  listIndex,
}) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={clsx({
              [styles.column]: true,
            })}
          >
            {items.map((card, index) => (
              <CardElement
                card={card}
                index={index}
                selfLength={items.length}
                allLength={listLength}
                key={card.id}
                ownerIndex={listIndex}
              />
            ))}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  )
}

export default DropZone
