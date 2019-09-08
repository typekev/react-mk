import React from 'react';
import PropTypes from 'prop-types';

export default function Cursor({ blink, blinkAnimationDuration, children, ...rest }) {
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
            animation: cursor-blink ${blinkAnimationDuration}ms infinite;
          }
        `}
      </style>
    </>
  );
}

Cursor.propTypes = {
  children: PropTypes.node,
  blink: PropTypes.bool,
  blinkAnimationDuration: PropTypes.number,
};

Cursor.defaultProps = {
  children: '|',
  blink: true,
  blinkAnimationDuration: 700,
};
