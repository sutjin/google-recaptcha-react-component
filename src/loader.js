/* eslint-disable class-methods-use-this */
const callbackName = 'recaptchaOnLoad';
const moduleLoad = 'reCaptchaModuleLoad';
const RECAPTCHA_URL = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;
const SECONDARY_URL = `https://www.recaptcha.net/recaptcha/api.js?onload=${callbackName}&render=explicit`;

export default class reCaptchaLoader {
  constructor() {
    window[moduleLoad] = false;
    this.scriptAttached = false;
  }

  performScriptLoad(baseUrl) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.src = baseUrl;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.onerror = (oError) => {
      throw new URIError(`The script ${oError.target.src} is not accessible.`);
    };

    window[callbackName] = this.onRecaptchaLoad;

    head.appendChild(script);
    this.scriptAttached = true;
  }

  loadRecaptcha(callback, useSecondary = false) {
    if (!this.scriptAttached) {
      const baseUrl = useSecondary ? SECONDARY_URL : RECAPTCHA_URL;
      this.performScriptLoad(baseUrl);
    }

    if (!window[moduleLoad]) {
      const intervalCheck = setInterval(() => {
        if (window[moduleLoad]) {
          clearInterval(intervalCheck);
          callback(window.grecaptcha);
        }
      }, 1000); // TODO: error if interval reached.
    } else {
      callback(window.grecaptcha);
    }
  }

  onRecaptchaLoad() {
    delete window[callbackName];
    window[moduleLoad] = true;
  }
}
