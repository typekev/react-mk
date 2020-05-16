import React, {PropsWithChildren, DetailedHTMLProps} from 'react';

interface Props extends DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  blink: boolean;
  blinkAnimationDuration: number,
}

export default function Cursor({ blink = true, blinkAnimationDuration = 700, children = '|', ...rest }: PropsWithChildren<Props>) {
  return (
    <>
      <span
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {children}
      </span>
      <style jsx>
        {`
          @keyframes cursor-blink {
            from {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          span {
            animation: cursor-blink ${blinkAnimationDuration}ms ${blink ? 'infinite' : 0};
          }
        `}
      </style>
    </>
  );
}

