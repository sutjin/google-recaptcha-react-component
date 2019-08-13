/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import loader from './loader';

const CALLBACK_NAME = 'recaptchaFunction';

let externalFunction = {};

class ReCaptcha extends React.Component {
  componentDidMount() {
    this.renderReCaptcha = this.renderReCaptcha.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.execute = this.execute.bind(this);

    window[CALLBACK_NAME] = this.onFormSubmit;

    this.renderReCaptcha(this.recaptchaContainer);
    this.props.onRef(this);
  }


  onFormSubmit(token) {
    externalFunction.onSuccess(token);
    if (this.props.size === 'invisible') {
      window.grecaptcha.reset(this.recaptchaId);
    }
  }

  componentWillUmount() {
    window.grecaptcha.reset(this.recaptchaId);
  }

  execute() {
    window.grecaptcha.execute(this.recaptchaId);
  }

  renderReCaptcha(element) {
    const { token, size } = this.props;

    loader((grecaptcha) => {
      this.recaptchaId = grecaptcha.render(element, {
        sitekey: token,
        callback: CALLBACK_NAME,
        size,
      });
    });
  }

  render() {
    const { onSuccess } = this.props;

    externalFunction = {
      onSuccess,
    };

    return (
      <div>
        <div
          className="g-recaptcha"
          ref={(recaptchaContainer) => { this.recaptchaContainer = recaptchaContainer; }}
        />
      </div>
    );
  }
}

ReCaptcha.propTypes = {
  token: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  size: PropTypes.string,
  onRef: PropTypes.func,
};

ReCaptcha.defaultProps = {
  size: '',
  onRef: () => {},
};

export default ReCaptcha;
