import { FunctionComponent } from "react"
import { SuitProps } from "../../../interfaces"
import styles from "../card.module.css"

const Suit: FunctionComponent<SuitProps> = ({ suit, color, rank }) => {
  return (
    <div className={styles.suit}>
      <img src={`/${rank}_${color}.png`} className={styles.icon} />
      <img src={`/${suit}.png`} className={styles.icon} />
    </div>
  )
}

export default Suit
