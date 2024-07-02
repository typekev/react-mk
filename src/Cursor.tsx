import React from 'react';
import { css, keyframes } from '@emotion/css';

const blinkAnimation = keyframes`
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  blink?: boolean;
  blinkAnimationDuration?: number;
}

export default function Cursor({ blink = true, blinkAnimationDuration = 700, children = '|', ...rest }: Props) {
  return (
    <span
      {...rest}
      className={css`
        width: 96px;
        height: 96px;
        border-radius: 50%;
        animation: ${blinkAnimation} ${blinkAnimationDuration}ms ${blink ? 'infinite' : 0};
        transform-origin: center bottom;
      `}
    >
      {children}
    </span>
  );
}
