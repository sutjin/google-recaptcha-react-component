// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// test
import React from 'react';
import ReCaptcha from './index.jsx';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

global.grecaptcha = {
    reset: jest.fn(),
    execute: jest.fn()
}

const mockCallback = jest.fn(),
  mockOnSuccess = jest.fn();

it('renders ReCaptcha container correctly', () => {
  let component;
  const tree = renderer
    .create(
      <ReCaptcha
        token="testToken"
        onSuccess={(token, callback)=>{ }}
        onRef={ref => (component = ref)} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should trigger onSuccess and callback when onFormSubmit is triggered', () => {
  let component;
  const mockOnSuccess = jest.fn(),
    tree = shallow(
        <ReCaptcha
          token="testToken"
          size="invisible"
          onSuccess={mockOnSuccess}
          onRef={ref => (component = ref)} />
      );

  component.onFormSubmit();
  expect(mockOnSuccess).toHaveBeenCalled();
});

it('should reset recaptcha when component is unmounted', () => {
  let component;
  const tree = shallow(
      <ReCaptcha
        token="testToken"
        onSuccess={(token, callback)=>{ }}
        onRef={ref => (component = ref)} />
    );

  tree.unmount();
  expect(global.grecaptcha.reset).toHaveBeenCalled();
});

it('should trigger recaptcha if execute is triggered', () => {
  let component;
  const mockOnSuccess = jest.fn(),
    tree = shallow(
        <ReCaptcha
          token="testToken"
          onSuccess={mockOnSuccess}
          onRef={ref => (component = ref)} />
      );

  component.execute();
  expect(global.grecaptcha.reset).toHaveBeenCalled();
});
