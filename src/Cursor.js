import React from 'react';
import PropTypes from 'prop-types';
import './cursor.module.css';

export default function Cursor({ blink, children, ...rest }) {
  return (
    <span
      styleName={blink ? 'cursor' : ''}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </span>
  );
}

Cursor.propTypes = {
  children: PropTypes.node,
  blink: PropTypes.bool,
};

Cursor.defaultProps = {
  children: '|',
  blink: true,
};
