import Heir from '../material/Heir'

export enum Memory {
  Lead = 1,
  Winner,
  StartPlayer,
  Eagle,
  HyenaInTricks,
  EaglePlayer,
  CheetahPlayer,
  RoundSummary,
  Round
}

export enum WinType {
  Crowns = 1,
  Hyena
}

export type RoundSummary = {
  winner: Heir,
  type: WinType
  crowns?: Record<Heir, number>
}
