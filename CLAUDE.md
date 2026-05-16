# Game Park Framework - Instructions for Claude

This project uses the **Game Park framework** to create digital board games.

## Documentation

Official documentation: https://gamepark.github.io

For Claude to read the documentation, use raw GitHub URLs:
```
https://raw.githubusercontent.com/gamepark/gamepark.github.io/main/docs/[path]
```

### Key documentation files
| Topic | Path |
|-------|------|
| Core concepts | `concepts/core-concepts.md` |
| Items & Locations | `concepts/items-and-locations.md` |
| Hiding data | `concepts/hiding-data.md` |
| Item moves | `features/item-moves.md` |
| Rule moves | `features/rule-moves.md` |
| Custom moves | `features/custom-moves.md` |
| Location strategies | `features/location-strategies.md` |
| Hand of cards | `features/hand-of-cards.md` |
| Piles of items | `features/piles-of-items.md` |
| Tutorial AI | `features/tutorial-ai.md` |

### Framework upgrade guides
| Version | Path |
|---------|------|
| Migration to v7 | `troubleshooting/v7-migration-guide.md` |
| Migration to v7.3 | `troubleshooting/v7.3-migration-guide.md` |
| Migration to v7.7 | `troubleshooting/v7.7-migration-guide.md` |
| Upgrade the framework | `tips/upgrade-the-framework.md` |

### Step-by-step guide
The `step-by-step-example/` folder contains a complete tutorial:
1. `choose-a-game.md` → `set-up-your-computer.md` → `set-up-the-project.md`
2. `identify-the-players.md` → `identify-the-material.md` → `identify-the-locations.md`
3. `prepare-the-images.md` → `display-first-item.md` → `create-items.md`
4. `place-items.md` → `organize-the-table.md` → `hide-the-cards.md`
5. `identify-the-rules.md` → `player-turn.md` → `end-of-the-game.md`
6. `write-the-headers.md` → `help-dialogs.md` → `tutorial.md`

### Checklist
Full checklist: `step-by-step-example/checklist.md`

## Project Structure

```
rules/src/                    # Server-side game logic
  ├── material/
  │   ├── MaterialType.ts     # Game components enum (start at 1)
  │   └── LocationType.ts     # Possible locations enum
  ├── rules/
  │   ├── RuleId.ts           # Game phases enum
  │   └── *Rule.ts            # Rule implementations
  ├── AwimbaweRules.ts        # Main rules class
  ├── AwimbaweSetup.ts        # Initial game setup
  └── AwimbaweOptions.ts      # Game configuration

app/src/                      # Client-side React UI
  ├── material/Material.ts    # Visual descriptions (sizes, images)
  ├── locator/Locators.ts     # Positioning on screen
  ├── header/                 # In-game text display
  └── images/                 # Game assets
```

## Core Concepts

### MaterialItem
Every game element is an item with a location:
```typescript
{ id: CardId.Guard, location: { type: LocationType.PlayerHand, player: 1 } }
```

### Location properties
- `type`: LocationType (required)
- `player`: Owner player
- `id`: Location variant (e.g., which deck)
- `x`, `y`: Grid coordinates
- `parent`: Index of parent item
- `rotation`: Tile rotation

### Rules
- Extend `PlayerTurnRule` (one player acts) or `SimultaneousRule` (all players act)
- Implement `getPlayerMoves()` to define legal moves
- Use `afterItemMove()` or `onRuleStart()` for consequences
- Transition with `this.startRule(RuleId.Next)` or `this.endGame()`

## Development Workflow

1. **Define MaterialType** - List all physical components
2. **Define LocationType** - List all possible locations
3. **Implement Setup** - Create initial game state
4. **Implement Rules** - One file per game phase
5. **Configure Material.ts** - Sizes and images
6. **Create Locators** - Position items on screen
7. **Add Headers** - Display game text
8. **Test** - Use `game.new()`, `game.view`, `game.legalMoves` in browser console

## Console Commands (browser)

```javascript
game.new(playerCount)    // Start new game
game.view                // Current game state
game.legalMoves          // Available moves
game.undo()              // Undo last move
game.monkeyOpponents(true) // Auto-play opponents
```

## Patterns to Follow

### Creating items in Setup
```typescript
this.material(MaterialType.Card).createItems(
  cardIds.map(id => ({ id, location: { type: LocationType.Deck } }))
)
this.material(MaterialType.Card).shuffle()
```

### Player moves in Rule
```typescript
getPlayerMoves() {
  return this.material(MaterialType.Card)
    .location(LocationType.PlayerHand)
    .player(this.player)
    .moveItems({ type: LocationType.PlayArea })
}
```

### Consequences
```typescript
afterItemMove(move: ItemMove) {
  if (isMoveItem(move) && move.location.type === LocationType.PlayArea) {
    return [this.startRule(RuleId.ResolveCard)]
  }
  return []
}
```

## Reference Games

Similar games on GitHub (gamepark org) for inspiration:
- **Mythologies** - Complex drafting, multiple card types
- **Looot** - Hexagonal grid, tile placement
- **Along History** - Card game with effects
- **District Noir** - Simple card game

## Translations

Translation files are located in `app/public/translation/` (one JSON file per language: `en.json`, `fr.json`, `de.json`, `es.json`, `it.json`, `ru.json`). The project uses `i18next` + `react-i18next`.

Common translations (`common`, `credits` namespaces) are loaded from the main Game Park website and **must not** be duplicated in this project's translation files. If you need a key already provided by `common`, reference it with the namespace prefix (e.g. `common:Yes`) rather than redefining it.

### Translation workflow

**During development**: only write translations in the **developer's native language** file (e.g. `fr.json` for a French developer). Do not touch other language files — this saves tokens.

**Before production release**: when asked, translate all texts into every other supported language in a dedicated pass.

### Where translations are used
- `app/public/translation/*.json` — UI texts (headers, dialogs, tooltips, buttons)
- `header/*Header.tsx` — uses `useTranslation()` to display in-game messages
- `materialI18n` prop on `GameProvider` — localized material descriptions

### Translation keys convention
Follow existing key naming patterns in the JSON files. Keep keys descriptive and organized by feature/screen.

## When Helping

1. **Always read existing code first** before suggesting changes
2. **Follow established patterns** in the codebase
3. **Test incrementally** - suggest testing after each major change
4. **Reference documentation** when explaining concepts
5. **Start with MaterialType/LocationType** for new games
