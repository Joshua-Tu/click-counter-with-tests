import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

Enzyme.configure({ adapter: new Adapter() });

/**
 *  Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders without crashing', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders a button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);  
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('0');
});

test('clicking on button increments counter display', () => {
  const wrapper = setup();

  // find the button
  const button = findByTestAttr(wrapper, 'increment-button');

  // click the button
  button.simulate('click');

  // find the display, and test that the number has been incremented
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('1');
});

describe('decrement button', () => {
  test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  });

  test('clicking decrement button decrements counter display when state is greater than 0', () => {
    const wrapper = setup();

    // click the increment button so that the counter is greater than 0
    const incButton = findByTestAttr(wrapper, 'increment-button');
    incButton.simulate('click');

    // find the decrement button and click
    const decButton = findByTestAttr(wrapper, 'decrement-button');
    decButton.simulate('click');

    // find display and test value;
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe('0');
  });

  describe('error when counter goes below 0', () => {
    let wrapper = setup();

    describe('error message does not show when not needed', () => {
      test('error does not show when count is at initial 0', () => {
        const errDiv = findByTestAttr(wrapper, 'error-message');
        expect(errDiv.length).toBe(0);
      });

      test('error message does show when increment button clicked at the beginning', () => {
        const errDiv = findByTestAttr(wrapper, 'error-message');

        const incButton = findByTestAttr(wrapper, 'increment-button')
        incButton.simulate('click');
        console.log(wrapper.debug());
        expect(errDiv.length).toBe(0);
      });
    });

    describe('counter is 0 and decrement is clicked', () => {
      const wrapper = setup();
      
      beforeEach(() => {
        const button = findByTestAttr(wrapper, 'decrement-button');
        button.simulate('click');
      });

      test('error shows', () => {
        console.log(wrapper.debug());
        const errDiv = findByTestAttr(wrapper, 'error-message');
        expect(errDiv.length).toBe(1);
      });

      test('counter still displays 0', () => {
        const count = findByTestAttr(wrapper, 'count').text();
        expect(count).toBe('0');
      });

      test('clicking increment clears the error', () => {
        const incButton = findByTestAttr(wrapper, 'increment-button');
        incButton.simulate('click');

        const errDiv = findByTestAttr(wrapper, 'error-message');
        expect(errDiv.length).toBe(0);
      });
    });
  });
});