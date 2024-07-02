<h1 align="center" href="https://github.com/typekev/react-mk">React Mechanical Keyboard ⌨️</h1>

<p align="center""><a href="https://github.com/typekev/react-mk/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license"></a> <a href="https://www.npmjs.com/package/react-mk"><img src="https://img.shields.io/npm/v/react-mk" alt="npm"></a> <a href="https://circleci.com/gh/typekev/react-mk"><img src="https://circleci.com/gh/typekev/react-mk.svg?style=shield" alt="Build Status"></a> <a href="https://coveralls.io/github/typekev/react-mk?branch=master"><img src="https://coveralls.io/repos/github/typekev/react-mk/badge.svg?branch=master" alt="Coverage Status"></a> <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="code style: prettier"></a> <a href="https://github.com/typekev/react-mk/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a></p>

> A light weight React component for emulating typing animations.

## Install

```sh
npm i react-mk --save
```

No need to import pesky CSS files, `react-mk` works right out of the box.

## Example

Test it out on [codesandbox](https://codesandbox.io/embed/react-mk-u6851)

## Instructions

- Import `Keyboard` from `react-mk`
- `Keyboard` accepts any child with a valid `toString` method
- `Keyboard` exposes a `type` method when `children` is a type of `function`
- `Keyboard` will type out your text in an organic manner, see [example](#example)
- Besides `children`, `Keyboard` can take the following optional props

  - `sentenceDelayPerCharRange`: an array of two numbers indicating the delay in milliseconds which `react-mk` applies between words, the delay is calculated by getting a random number in your range and multiplying it by the number of characters in your sentence.
  - `keyPressDelayRange`: an array of two numbers indicating the delay in milliseconds which `react-mk` applies between characters, the delay is calculated by getting a random number in your range.

- You may also import the `Cursor` component from `react-mk`; a standard blinking cursor that accepts the following props

  - `children`: the cursor you wish to display, it will accept any `node` and is a `|` by default
  - `blink`: a bool which is `true` by default, when `false` the cursor will not blink
  - `blinkAnimationDuration`: the `animation-duration` of the `css` `animation` property of the cursor
  - All other props will be spread to the root element which is a `span`

## Usage

```tsx
import React from 'react';
import Keyboard, { Cursor } from 'react-mk';

const TypingComponent = () => (
  <>
    <Keyboard sentenceDelayPerCharRange={[0, 0]}>You can write whatever you like here</Keyboard>
    <Cursor />
    <br />
    <Keyboard keyPressDelayRange={[200, 400]}>
      {({ type }) =>
        type(
          1000,
          'You can even type super slowly using the keyPressDelayRange prop',
          300,
          'Set the blink property of Cursor to false to disable the blinking animation --> ',
        )
      }
    </Keyboard>
    <Cursor blink={false} />
    <br />
    <Keyboard sentenceDelayPerCharRange={[0, 0]} keyPressDelayRange={[50, 70]}>
      {({ type }) => type(3000, 'Multiple instances of Keyboard can easily be rendered at the same time')}
    </Keyboard>
    <Cursor>#</Cursor>
    <br />
    <Keyboard sentenceDelayPerCharRange={[300, 400]}>
      {({ type }) =>
        type(
          4000,
          "Use the sentenceDelayPerCharRange prop to adjust the amount of time that your sentences should be visible (It'll be a while before the next sentence appears)",
          'You can also pass a number to the `type` function to dictate the time between deleting the previous sentence and writing the next sentence',
        )
      }
    </Keyboard>
    <Cursor blinkAnimationDuration={200}>[]</Cursor>
  </>
);
```
