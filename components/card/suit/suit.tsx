import { FunctionComponent } from "react"
import { SuitProps } from "../../../interfaces"
import styles from '../card.module.css'
import { mdiCardsSpade, mdiCardsClub, mdiCardsDiamond, mdiCardsHeart } from '@mdi/js'
import { suit } from "../../../types"

const Suit:FunctionComponent<SuitProps> = ({suit, color}) => {

    function suitIconPath(suit:suit) {
        switch(suit){
            case 'heart': return mdiCardsHeart;
            case 'diamond': return mdiCardsDiamond;
            case 'club': return mdiCardsClub;
            case 'spade': return mdiCardsSpade;
        }
    }

    return(
        <svg className={styles.suit} viewBox="0 0 24 24">
            <path fill={color} d={suitIconPath(suit)} />
        </svg>
    )
}

export default Suit