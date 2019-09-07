# react-mk | React Mechanical Keyboard ⌨️

> A tiny react component which mimics typing

## Install

```sh
npm i react-mk --save
```

## Example

View example at [codesandbox](https://codesandbox.io/embed/react-mk-u6851)

## Instructions

- Import `Keyboard` from `react-mk`
- `Keyboard` accepts a child that is a type of `function` or has a valid `toString` method
- `Keyboard` will type out your text in an organic manner

## Usage

```js
import React from 'react';
import Keyboard from 'components/react-mk';

function TypingComponent() {
  return (
    <>
      // You may pass a string as a child to Keyboard 
      // Any child that is not a function will have
      // its `toString` method called
      <Keyboard
        // You may pass a unique cursor to `Keyboard`
        cursor="[]"
      >
        Wow! Thats great!
      </Keyboard>
      
      // Keyboard exposes a `type` function 
      // `type` expects one or more arguments
      <Keyboard>
        {({ type }) =>
          type(
            // If the argument is a number
            // it will be used as a delay in ms
            1000,
            // If the argument is a string
            // it will be typed out organically
            'Welcome, visitor',
            "I'm Kevin's autonomous assistant",
            'What can I help you with?',
          )
        }
      </Keyboard>
    </>
  );
}
```

## Todo

- Improve test coverage and quality
- Consider allowing typing of non-strings
