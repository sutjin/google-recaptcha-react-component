import React from 'react';
import PropTypes from 'prop-types';
import loader from './loader.js';

const CALLBACK_NAME = 'recaptchaFunction';

let externalFunction = {};

class ReCaptcha extends React.Component {

  componentDidMount () {
    this.renderReCaptcha = this.renderReCaptcha.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    window[CALLBACK_NAME] = this.onFormSubmit;

    this.renderReCaptcha(this.recaptchaContainer);
  }


  onFormSubmit (token) {
    externalFunction.onSuccess(token, () => {
      window.grecaptcha.reset(this.recaptchaId);
      externalFunction.callback();
    });
  }

  componentWillUmount () {
    window.grecaptcha.reset(this.recaptchaId);
  }

  execute () {
    window.grecaptcha.execute(this.recaptchaId);
  }

  renderReCaptcha (element) {
    const { token } = this.props;

    loader((grecaptcha) => {
      this.recaptchaId = grecaptcha.render(element, {
        sitekey: token,
        callback: CALLBACK_NAME,
        size: 'invisible'
      });
    });
  }

  render () {
    const { onSuccess, callback, isValid } = this.props;

    externalFunction = {
      onSuccess,
      callback,
      isValid
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
  callback: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired
};

ReCaptcha.defaultProps = {
};

module.exports = ReCaptcha;
