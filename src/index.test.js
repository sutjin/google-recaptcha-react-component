/* eslint-disable react/jsx-filename-extension */

// setup file
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// test
import React from 'react';
import renderer from 'react-test-renderer';
import ReCaptcha from './index';

configure({ adapter: new Adapter() });

global.grecaptcha = {
  reset: jest.fn(),
  execute: jest.fn(),
};

it('renders ReCaptcha container correctly', () => {
  const tree = renderer
    .create(
      <ReCaptcha
        token="testToken"
        onSuccess={() => { }}
        onRef={() => { }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('should trigger onSuccess and callback when onFormSubmit is triggered', () => {
  let component;
  const mockOnSuccess = jest.fn();

  shallow(
    <ReCaptcha
      token="testToken"
      size="invisible"
      onSuccess={mockOnSuccess}
      onRef={(ref) => { component = ref; }}
    />,
  );

  component.onFormSubmit();
  expect(mockOnSuccess).toHaveBeenCalled();
});

it('should reset recaptcha when component is unmounted', () => {
  const tree = shallow(
    <ReCaptcha
      token="testToken"
      onSuccess={() => { }}
      onRef={() => { }}
    />,
  );

  tree.unmount();
  expect(global.grecaptcha.reset).toHaveBeenCalled();
});

it('should trigger recaptcha if execute is triggered', () => {
  let component;
  const mockOnSuccess = jest.fn();

  shallow(
    <ReCaptcha
      token="testToken"
      onSuccess={mockOnSuccess}
      onRef={(ref) => { component = ref; }}
    />,
  );

  component.execute();
  expect(global.grecaptcha.reset).toHaveBeenCalled();
});
