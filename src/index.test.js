import React from 'react';
import ReCaptcha from './index.jsx';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';

global = {
  grecaptcha: {
    reset: jest.fn(),
    execute: jest.fn()
  }
}

const mockCallback = jest.fn(),
  mockOnSuccess = jest.fn();

it('renders ReCaptcha container correctly', () => {
  let component;
  const tree = renderer
    .create(
      <ReCaptcha
        token="testToken"
        callback={()=>{ }}
        onSuccess={(token, callback)=>{ }}
        onRef={ref => (component = ref)} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should trigger onSuccess and callback when onFormSubmit is triggered', () => {
  let component;
  const mockCallback = jest.fn(),
    mockOnSuccess = jest.fn(),
    tree = shallow(
        <ReCaptcha
          token="testToken"
          callback={mockCallback}
          onSuccess={mockOnSuccess}
          onRef={ref => (component = ref)} />
      );

  component.onFormSubmit();
  expect(mockCallback).toHaveBeenCalled();
  expect(mockOnSuccess).toHaveBeenCalled();
});

it('should reset recaptcha when component is unmounted', () => {
  let component;
  const tree = shallow(
      <ReCaptcha
        token="testToken"
        callback={()=>{ }}
        onSuccess={(token, callback)=>{ }}
        onRef={ref => (component = ref)} />
    );

  tree.unmount();
  expect(global.grecaptcha.reset).toHaveBeenCalled();
});

it('should trigger recaptcha if execute is triggered', () => {
  let component;
  const mockCallback = jest.fn(),
    mockOnSuccess = jest.fn(),
    tree = shallow(
        <ReCaptcha
          token="testToken"
          callback={mockCallback}
          onSuccess={mockOnSuccess}
          onRef={ref => (component = ref)} />
      );

  component.execute();
  expect(global.grecaptcha.reset).toHaveBeenCalled();
});
