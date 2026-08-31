import { MaterialGame, MaterialItem, MaterialMove, MaterialMoveBuilder, MoveKind } from '@gamepark/rules-api'
import { describe, expect, it } from 'vitest'
import { AwimbaweRules } from '../AwimbaweRules'
import Animal from '../material/Animal'
import Heir from '../material/Heir'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { EagleChoice } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

const T = Heir.WhiteTiger
const P = Heir.BlackPanther

const buildGame = (cards: MaterialItem[], memory: Record<number, any> = {}): MaterialGame => ({
  players: [T, P],
  items: {
    [MaterialType.AnimalCard]: cards,
    [MaterialType.HeirCard]: [
      { id: T, location: { type: LocationType.HeirCard, player: T } },
      { id: P, location: { type: LocationType.HeirCard, player: P } }
    ]
  },
  rule: { id: RuleId.ChooseCard, player: T },
  memory: { [Memory.Lead]: T, ...memory }
})

/** Plays a move and all its consequences, stopping when a new round starts (the deck is not filled in these tests) */
const playAll = (rules: AwimbaweRules, move: MaterialMove) => {
  if (move.kind === MoveKind.RulesMove && (move as any).id === RuleId.PrepareNewRound) return
  for (const consequence of rules.play(move)) playAll(rules, consequence)
}

const solveTrick = (cards: MaterialItem[], memory: Record<number, any> = {}) => {
  const rules = new AwimbaweRules(buildGame(cards, memory))
  playAll(rules, MaterialMoveBuilder.startRule(RuleId.SolveTrick))
  return rules
}

const hyenasAside = (rules: AwimbaweRules, player: Heir) =>
  rules.material(MaterialType.AnimalCard).location(LocationType.PlayerHyena).player(player).length

const runawayMemory = { [Memory.Eagle]: EagleChoice.Runaway, [Memory.EaglePlayer]: P }

const remainingCards: MaterialItem[] = [
  { id: Animal.PlainSnake, location: { type: LocationType.Hand, player: T, x: 0 } },
  { id: Animal.PlainElephant, location: { type: LocationType.Hand, player: P, x: 0 } }
]

describe('SolveTrickRule: hyenas set aside', () => {
  it('puts every hyena set aside back in the trick stacks when the opponent wins a hyena', () => {
    const rules = solveTrick([
      { id: Animal.DesertHyena, location: { type: LocationType.PlayerHyena, player: P, x: 0 } },
      { id: Animal.MountainHyena, location: { type: LocationType.PlayerHyena, player: P, x: 1 } },
      { id: Animal.GrasslandHyena, location: { type: LocationType.PlayArea, player: T, x: 0 } },
      { id: Animal.GrasslandMouse, location: { type: LocationType.PlayArea, player: P, x: 1 } },
      ...remainingCards
    ])

    expect(hyenasAside(rules, P)).toBe(0)
    expect(hyenasAside(rules, T)).toBe(0)
  })

  it('keeps the hyenas set aside when the same player wins one more', () => {
    const rules = solveTrick([
      { id: Animal.DesertHyena, location: { type: LocationType.PlayerHyena, player: T, x: 0 } },
      { id: Animal.MountainHyena, location: { type: LocationType.PlayerHyena, player: T, x: 1 } },
      { id: Animal.GrasslandHyena, location: { type: LocationType.PlayArea, player: T, x: 0 } },
      { id: Animal.GrasslandMouse, location: { type: LocationType.PlayArea, player: P, x: 1 } },
      ...remainingCards
    ])

    expect(hyenasAside(rules, T)).toBe(3)
  })

  it('puts the hyenas set aside back in the trick stacks when the opponent wins a hyena after an eagle ran away', () => {
    const rules = solveTrick(
      [
        { id: Animal.DesertHyena, location: { type: LocationType.PlayerHyena, player: P, x: 0 } },
        { id: Animal.MountainHyena, location: { type: LocationType.PlayerHyena, player: P, x: 1 } },
        { id: Animal.GrasslandHyena, location: { type: LocationType.PlayArea, player: T, x: 0 } },
        { id: Animal.Eagle10, location: { type: LocationType.PlayArea, player: P, x: 1 } },
        ...remainingCards
      ],
      runawayMemory
    )

    expect(hyenasAside(rules, P)).toBe(0)
  })

  it('keeps the hyenas set aside when the lead wins one more after an eagle ran away', () => {
    const rules = solveTrick(
      [
        { id: Animal.DesertHyena, location: { type: LocationType.PlayerHyena, player: T, x: 0 } },
        { id: Animal.MountainHyena, location: { type: LocationType.PlayerHyena, player: T, x: 1 } },
        { id: Animal.GrasslandHyena, location: { type: LocationType.PlayArea, player: T, x: 0 } },
        { id: Animal.Eagle10, location: { type: LocationType.PlayArea, player: P, x: 1 } },
        ...remainingCards
      ],
      runawayMemory
    )

    expect(hyenasAside(rules, T)).toBe(3)
  })

  it('sets the 4th hyena aside so that the player loses the round', () => {
    const rules = solveTrick([
      { id: Animal.DesertHyena, location: { type: LocationType.PlayerHyena, player: T, x: 0 } },
      { id: Animal.MountainHyena, location: { type: LocationType.PlayerHyena, player: T, x: 1 } },
      { id: Animal.PlainHyena, location: { type: LocationType.PlayerHyena, player: T, x: 2 } },
      { id: Animal.GrasslandHyena, location: { type: LocationType.PlayArea, player: T, x: 0 } },
      { id: Animal.GrasslandMouse, location: { type: LocationType.PlayArea, player: P, x: 1 } },
      ...remainingCards
    ])

    expect(hyenasAside(rules, T)).toBe(4)
    expect(rules.rankPlayers(T, P)).toBe(1)
  })
})
