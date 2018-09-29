const callbackName = 'recaptchaOnLoad',
  RECAPTCHA_URL = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;

let loaded = false,
  scriptAttached = false;

function onRecaptchaLoad () {
  delete window[callbackName];
  loaded = true;
}

function performScriptLoad () {
  const head = document.head || document.getElementsByTagName('head')[0],
    script = document.createElement('script');
  script.src = RECAPTCHA_URL;
  script.type = 'text/javascript';
  script.async = true;
  script.defer = true;
  script.onerror = (oError) => {
    throw new URIError(`The script ${oError.target.src} is not accessible.`);
  };

  window[callbackName] = onRecaptchaLoad;

  head.appendChild(script);

  scriptAttached = true;
}

function loadRecaptcha (callback) {
  if (!scriptAttached) {
    performScriptLoad();
  }

  if (!loaded) {
    const intervalCheck = setInterval(() => {
      if (loaded) {
        clearInterval(intervalCheck);
        callback(window.grecaptcha);
      }
    }, 1000);
  } else {
    callback(window.grecaptcha);
  }
}

module.exports = loadRecaptcha;
