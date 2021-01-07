import React from 'react';
import { act } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Keyboard, { type as typeFunction } from '../src/Keyboard';

Enzyme.configure({ adapter: new Adapter() });

describe('Keyboard component', () => {
  const setState = jest.fn<void, string[]>();
  beforeEach(() => {
    jest.spyOn<any, string>(React, 'useState').mockImplementation((init) => [init, setState]);
  });
  it('renders a child with the value Test', async () => {
    let wrapper;
    const text = 'Test';

    await act(async () => {
      wrapper = mount(<Keyboard>{text}</Keyboard>);
    });

    expect(wrapper.prop('children')).toBe(text);
    wrapper.unmount();
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

    wrapper.unmount();
  });

  it('renders a child with the value Test', async () => {
    let wrapper;

    const text = 'Test';

    await act(async () => {
      wrapper = mount(<Keyboard>{({ type }) => type(text, text, text)}</Keyboard>);
    });

    await act(async () => {
      setTimeout(() => expect(setState).toHaveBeenCalledWith(text), 2000);
    });

    wrapper.unmount();
  });

  it('renders a an empty string', async () => {
    let wrapper;
    const setState = jest.fn<void, string[]>();

    const text = '';

    await act(async () => {
      wrapper = mount(<Keyboard>{text}</Keyboard>);
    });

    await act(async () => {
      setTimeout(() => expect(setState).toHaveBeenCalledWith(text), 2000);
    });

    wrapper.unmount();
  });

  it('returns an array of length 4', () => {
    const text = 'Test';

    expect(typeFunction(text, text, text, text).length).toBe(4);
  });
});
