import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useTypewriter from 'react-typewriter-hook';
import getTimers from './getTimers';
import styles from './cursor.module.css';

export default function Keyboard({ children, cursor }) {
  const [text, setText] = useState('');

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (typeof children === 'string') {
      setText(children);
    }

    if (typeof children === 'function') {
      const type = (...actions) => [...actions];
      const actions = children({ type });
      const timers = getTimers(actions, setText);
      return () => timers.forEach(timer => clearTimeout(timer[0]));
    }
  }, [children]);

  const typing = (
    <>
      {useTypewriter(text)}
      <span className={styles.cursor}>{cursor}</span>
    </>
  );
  return typing;
}

Keyboard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
  cursor: PropTypes.node,
};

Keyboard.defaultProps = {
  cursor: '|',
};
