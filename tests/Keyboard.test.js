import React from 'react';
import { act } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Keyboard, { type as typeFunction } from '../src/Keyboard';

Enzyme.configure({ adapter: new Adapter() });

describe('Keyboard component', () => {
  it('renders a child with the value Test', async () => {
    let wrapper;
    const text = 'Test';

    await act(async () => {
      wrapper = mount(<Keyboard>{text}</Keyboard>);
    });

    expect(wrapper.prop('children')).toBe(text);
  });

  it('renders a child with the value Test with blink disabled', async () => {
    let wrapper;
    const text = 'Test';

    await act(async () => {
      wrapper = mount(<Keyboard cursorProps={{ blink: false }}>{text}</Keyboard>);
    });

    expect(wrapper.prop('children')).toBe(text);
  });

  it('renders a child with the value Test', async () => {
    let wrapper;
    const text = 'Test';

    await act(async () => {
      wrapper = mount(<Keyboard>{({ type }) => type(text)}</Keyboard>);
    });

    await act(async () => {
      setTimeout(() => expect(wrapper.prop('children')).toBe(text), 2000);
    });
  });

  it('renders a child with the value Test', async () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);

    const text = 'Test';

    await act(async () => {
      mount(<Keyboard>{({ type }) => type(text, text, text)}</Keyboard>);
    });

    await act(async () => {
      setTimeout(() => expect(setState).toHaveBeenCalledWith(text), 2000);
    });
  });

  it('renders a an empty string', async () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);

    const text = '';

    await act(async () => {
      mount(<Keyboard>{text}</Keyboard>);
    });

    await act(async () => {
      setTimeout(() => expect(setState).toHaveBeenCalledWith(text), 2000);
    });
  });

  it('returns an array of length 4', () => {
    const text = 'Test';

    expect(typeFunction(text, text, text, text).length).toBe(4);
  });
});
