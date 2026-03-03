<h1 align="center">React Mechanical Keyboard ⌨️</h1>

<p align="center"><a href="https://github.com/typekev/react-mk/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license"></a> <a href="https://www.npmjs.com/package/react-mk"><img src="https://img.shields.io/npm/v/react-mk" alt="npm"></a> <a href="https://circleci.com/gh/typekev/react-mk"><img src="https://circleci.com/gh/typekev/react-mk.svg?style=shield" alt="Build Status"></a> <a href="https://coveralls.io/github/typekev/react-mk?branch=master"><img src="https://coveralls.io/repos/github/typekev/react-mk/badge.svg?branch=master" alt="Coverage Status"></a> <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="code style: prettier"></a> <a href="https://github.com/typekev/react-mk/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a></p>

> A lightweight, zero-dependency React typewriter component with realistic typing animations.

## Features

- **Zero dependencies** — no CSS-in-JS library required, works right out of the box
- **Modern React 19+** — built with hooks and the `react-jsx` transform
- **`useTypewriter` hook** — extract the core engine for fully custom UIs
- **Declarative actions** — composable `type()`, `pause()`, `deleteAll()`, `deleteChars()` builders
- **`sentences` prop** — cycle through an array of strings with one prop
- **Looping** — infinite or N iterations via the `loop` prop
- **Realistic typo simulation** — set `mistakeChance` for QWERTY-aware "mistake → correct" animations
- **Live speed changes** — dynamically update `typeSpeed` / `deleteSpeed` mid-animation
- **Callbacks** — `onType`, `onDelete`, `onFinish`, `onLoop`
- **Accessible** — `aria-hidden` cursor, automatic `prefers-reduced-motion` support
- **Tree-shakeable ESM** — modern `exports` field with `sideEffects: false`
- **Fully typed** — comprehensive TypeScript definitions with JSDoc

## Install

```sh
npm i react-mk
```

## Quick Start

```tsx
import Typewriter, { Cursor } from 'react-mk';

function App() {
  return (
    <p>
      <Typewriter>Hello World</Typewriter>
      <Cursor />
    </p>
  );
}
```

## Usage

### Simple Text

```tsx
<Typewriter>Any string or number works here</Typewriter>
```

### Action Sequences

Use the render-prop pattern to compose typing, pausing, and deleting:

```tsx
<Typewriter>
  {({ type, pause, deleteAll }) => [
    type('Hello World'),
    pause(2000),
    deleteAll(),
    type('React MK v2'),
  ]}
</Typewriter>
```

### Sentence Cycling

The `sentences` prop makes it trivial to cycle through an array of strings:

```tsx
<Typewriter
  sentences={['First sentence', 'Second sentence', 'Third sentence']}
  sentenceDelay={2000}
  loop
/>
```

### `useTypewriter` Hook

For full control, use the hook directly:

```tsx
import { useTypewriter, type, pause, deleteAll, Cursor } from 'react-mk';

function CustomTypewriter() {
  const { text, phase } = useTypewriter(
    [type('Hello'), pause(1000), deleteAll(), type('World')],
    { loop: true, typeSpeed: [40, 80] },
  );

  return (
    <h1>
      {text}
      {phase !== 'complete' && <Cursor />}
    </h1>
  );
}
```

### Realistic Typos

Add `mistakeChance` for humanized typing that makes QWERTY-adjacent mistakes and self-corrects:

```tsx
<Typewriter mistakeChance={0.06} typeSpeed={[60, 120]}>
  This text will have occasional realistic typos that get corrected
</Typewriter>
```

### Custom Cursors

```tsx
<Cursor />                          {/* Default: blinking | */}
<Cursor blink={false}>_</Cursor>    {/* Static underscore */}
<Cursor blinkSpeed={300}>█</Cursor> {/* Fast-blinking block */}
```

## API Reference

### `<Typewriter>` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| number \| ((builders) => Action[])` | — | Content to type or render-prop returning actions |
| `sentences` | `string[]` | — | Array of sentences to cycle through (takes priority over children) |
| `sentenceDelay` | `number` | `2000` | Ms each sentence is shown before deletion |
| `typeSpeed` | `[min, max]` | `[50, 90]` | Delay range between keystrokes (ms) |
| `deleteSpeed` | `[min, max]` | `[30, 60]` | Delay range between deletions (ms) |
| `loop` | `boolean \| number` | `false` | `true` for infinite, or a number for N iterations |
| `loopDelay` | `number` | `1000` | Ms before restarting the loop |
| `startDelay` | `number` | `0` | Ms before the animation begins |
| `mistakeChance` | `number` | `0` | Probability (0–1) of a typo per character |
| `onType` | `(char, text) => void` | — | Called after each character is typed |
| `onDelete` | `(char, text) => void` | — | Called after each character is deleted |
| `onFinish` | `() => void` | — | Called when all actions complete |
| `onLoop` | `(count) => void` | — | Called when the animation loops |

### `useTypewriter(actions, options)`

Returns `{ text, phase, loopCount }`.

- **`text`** — The currently displayed string
- **`phase`** — One of `'idle' | 'typing' | 'deleting' | 'pausing' | 'complete'`
- **`loopCount`** — Current loop iteration (0-indexed)

### `<Cursor>` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blink` | `boolean` | `true` | Enable/disable blink animation |
| `blinkSpeed` | `number` | `530` | Blink cycle duration (ms) |
| `children` | `ReactNode` | `\|` | Cursor character(s) |
| `...rest` | `HTMLSpanElement` props | — | Spread to the root `<span>` |

### Action Builders

| Builder | Description |
|---------|-------------|
| `type(text)` | Type a string character by character |
| `pause(ms)` | Pause for a duration in milliseconds |
| `deleteAll()` | Delete all currently displayed text |
| `deleteChars(n)` | Delete `n` characters from the end |

## Migration from v1

- **`Keyboard`** → **`Typewriter`** (default export renamed)
- **`@emotion/css`** removed — Cursor now uses pure CSS, no imports needed
- **`keyPressDelayRange`** → **`typeSpeed`**
- **`sentenceDelayPerCharRange`** → Use `sentences` + `sentenceDelay` props
- **`blinkAnimationDuration`** → **`blinkSpeed`**
- **`type()` render-prop** now returns explicit action objects instead of mixed arrays
- New: `useTypewriter` hook, `deleteChars`, `loop`, `mistakeChance`, callbacks

