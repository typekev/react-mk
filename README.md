# [React Mechanical Keyboard ⌨️](https://github.com/typekev/react-mk) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/typekev/react-mk/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react-mk) [![Build Status](https://travis-ci.org/typekev/react-mk.svg?branch=master)](https://travis-ci.org/typekev/react-mk) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/typekev/react-mk/pulls)


> A tiny (4KB!) react component which mimics typing

## Install

```sh
npm i react-mk --save
```

## Example

View example at [codesandbox](https://codesandbox.io/embed/react-mk-u6851)

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

```js
import React from 'react';
import Keyboard, { Cursor } from 'components/react-mk';

function TypingComponent() {
  return (
    <>
      // You may pass a string as a child to Keyboard 
      // Any child that is not a function will have it's `toString` method called
      <Keyboard>Wow! Thats great!</Keyboard>
      
      // You may render a blinking `Cursor`
      <Cursor />
      
      <br />
      
      // Keyboard exposes a `type` function, which expects one or more arguments
      <Keyboard>
        {({ type }) =>
          type(
            // If the argument is a number
            // it will be used as a delay in ms
            1000,
            // If the argument is a string
            // it will be typed out organically
            'This works too!',
            300,
            'And this!',
          )
        }
      </Keyboard>
      // You may disable the blinking animation
      // And you may render any `Cursor` that you like by passing a `node` as `children`
      <Cursor blink={false}>#</Cursor>
    </>
  );
}
```

## Todo

- Improve test coverage and quality
- Consider allowing typing of non-strings
