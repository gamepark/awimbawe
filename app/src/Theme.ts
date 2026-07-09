import { css } from '@emotion/react'

/**
 * Complete Awimbawe theme.
 *
 * Palette extracted from the physical material and the rules booklet:
 *  - Panther indigo #242b5d  -> primary / brand colour (cover background, Black Panther)
 *  - Victory gold   #e1ab05  -> accent / result highlight (crowned "gold" cards)
 *  - Warm sand      #f9ecd3  -> surfaces (cover background, White Tiger)
 *  - Eagle red      #a4302a  -> danger colour (Eagle card)
 *
 * Only the fields we customise are set; everything else falls back to the
 * framework's defaultTheme (merged with es-toolkit `merge`).
 */

// Brand tokens
const indigo = '#242b5d'
const indigoLight = '#2f3775'
const indigoDark = '#1a1f45'
const sand = '#f9ecd3'
const sandDeep = '#e6d3ad'
const gold = '#e1ab05'
const goldBright = '#fbd603'
const eagleRed = '#a4302a'

// Button recipe used everywhere (headers, menus, dialogs). A filled indigo
// pill with sand text stays legible both on the light dialog surface and over
// the dark savanna background.
const buttonsCss = css`
  cursor: pointer;
  padding: 0.25em 1em;
  border-radius: 2em;
  border: 0.08em solid ${indigoDark};
  color: ${sand};
  background: ${indigo};
  font-weight: 700;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus-visible {
    background: ${indigoLight};
  }

  &:active {
    background: ${indigoDark};
  }

  &:disabled {
    color: #cfc9ba;
    background: #8a8577;
    border-color: #8a8577;
    cursor: auto;
    opacity: 0.7;
  }
`

// Header-bar buttons inherit the large title font size and must fit the short
// header height, so they keep the filled indigo look from `buttons` but drop
// the vertical padding (same flat shape as the framework default).
const headerButtonsCss = css`
  padding: 0 0.9em;
`

export const awimbaweTheme = {
  root: {
    background: {
      // Indigo-tinted overlay over the cover instead of plain black.
      overlay: 'rgba(20, 24, 56, 0.55)'
    }
  },
  palette: {
    primary: indigo,
    primaryHover: indigoLight,
    primaryActive: indigoDark,
    primaryLight: '#e8e9f2',
    primaryLighter: '#f4f4fa',
    surface: sand,
    onSurface: indigo,
    onSurfaceFocus: '#efe1c0',
    onSurfaceActive: sandDeep,
    danger: eagleRed,
    dangerHover: '#f2d6d4',
    dangerActive: '#eabab6',
    disabled: '#8a8577'
  },
  dialog: {
    backgroundColor: sand,
    color: indigo,
    buttons: buttonsCss
  },
  dropArea: {
    backgroundColor: 'rgba(36, 43, 93, 0.55)'
  },
  buttons: buttonsCss,
  header: {
    buttons: headerButtonsCss
  },
  playerPanel: {
    activeRingColors: [goldBright, indigo]
  },
  result: {
    border: gold,
    icon: indigo
  }
}
