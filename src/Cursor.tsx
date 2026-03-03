import { useEffect } from 'react';
import type { CursorProps } from './types';
import { DEFAULT_BLINK_SPEED } from './constants';

const STYLE_ID = 'react-mk-cursor';
const STYLES = [
  '@keyframes react-mk-blink{0%,100%{opacity:1}50%{opacity:0}}',
  '@media(prefers-reduced-motion:reduce){[data-react-mk-cursor]{animation:none!important}}',
].join('');

export default function Cursor({
  blink = true,
  blinkSpeed = DEFAULT_BLINK_SPEED,
  children = '|',
  style,
  ...props
}: CursorProps) {
  useEffect(() => {
    if (!blink || typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) return;

    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = STYLES;
    document.head.appendChild(el);
  }, [blink]);

  return (
    <span
      {...props}
      aria-hidden
      data-react-mk-cursor=""
      style={{ ...style, ...(blink ? { animation: `react-mk-blink ${blinkSpeed}ms step-end infinite` } : undefined) }}
    >
      {children}
    </span>
  );
}
