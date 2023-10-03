import Animal from "../material/Animal";
import MoveType from "./MoveType";

type DealCards = {
  type: MoveType.DealCards;
};

export default DealCards;

export type DealCardsRandomized = DealCards & {
    shuffledDeck : Animal[]
}

export function DealCards() {
    
}

export const dealCardsMove: DealCards = { type: MoveType.DealCards };

