const React = require('react'),
  PropTypes = require('prop-types'),
  styles = require('./index.scss'),
  recaptchaLoader = require('./loader.js'),
  CALLBACK_NAME = 'captchaFunction';

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

    recaptchaLoader((grecaptcha) => {
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
      <div className={styles['recaptcha-wrapper']}>
        <div className={styles.captchaContainer} >
          <div
            className="g-recaptcha"
            ref={(recaptchaContainer) => { this.recaptchaContainer = recaptchaContainer; }}
          />
        </div>
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
