import clsx from "clsx"
import { FunctionComponent } from "react"
import { Droppable } from "react-beautiful-dnd"
import { StartDeckProps } from "../../interfaces"
import { reroll } from "../../lib/Game.utils"
import CardElement from "../card/card"
import styles from "../startDeck/startDeck.module.css"

const StartDeck: FunctionComponent<StartDeckProps> = ({
  id,
  items,
  listLength,
  listIndex,
  gameField,
  setGameField,
}) => {
  return (
    <Droppable droppableId={id} isDropDisabled={true}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={clsx({
              [styles.column]: true,
            })}
            onClick={() => {
              reroll(gameField, setGameField)
              console.log(items)
            }}
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

export default StartDeck
