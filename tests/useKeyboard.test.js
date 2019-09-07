import React from 'react';
import { act } from 'react-dom/test-utils';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import useKeyboard, { backspace, type } from '../src/useKeyboard';

Enzyme.configure({ adapter: new Adapter() });

const HookWrapper = ({ hook }) => <div hook={hook()} />;

HookWrapper.propTypes = {
  hook: PropTypes.func.isRequired,
};

const getProps = wrapper => wrapper.find('div').props();
describe('useKeyboard hook', () => {
  it('should return an empty string by default', () => {
    const wrapper = shallow(<HookWrapper hook={useKeyboard} />);

    const {
      hook: [text],
    } = getProps(wrapper);

    expect(text).toBe('');
  });

  it('should set text to Test then clear it', async () => {
    const wrapper = shallow(<HookWrapper hook={useKeyboard} />);

    const textTest = 'Test';
    const {
      hook: [, setText],
    } = getProps(wrapper);

    setText(textTest);

    const {
      hook: [text],
    } = getProps(wrapper);

    await act(async () => {
      setTimeout(() => expect(text).toBe(textTest), 2000);
    });

    const {
      hook: [, , clearText],
    } = getProps(wrapper);

    clearText();

    await act(async () => {
      const {
        hook: [delayedText],
      } = getProps(wrapper);

      setTimeout(() => expect(delayedText).toBe(''), 2000);
    });
  });

  it('returns undefined and does not throw when chars is greater than 1', () => {
    const chars = ['a', 'b', 'c'];
    expect(typeof backspace(chars, () => {})).toBe('undefined');
    expect(() => backspace(chars, () => {})).not.toThrow();
  });

  it('returns undefined and does not throw when chars is empty', () => {
    const chars = [];
    expect(typeof backspace(chars, () => {})).toBe('undefined');
    expect(() => backspace(chars, () => {})).not.toThrow();
  });

  it('returns undefined and does not throw', () => {
    const chars = ['a', 'b', 'c'];
    const char = 'd';
    expect(typeof type(chars, char, () => {})).toBe('undefined');
    expect(() => type(chars, char, () => {})).not.toThrow();
  });
});
