import Loader from '../loader';

const callbackName = 'recaptchaOnLoad';
const moduleLoad = 'reCaptchaModuleLoad';
const RECAPTCHA_URL = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;
const SECONDARY_URL = `https://www.recaptcha.net/recaptcha/api.js?onload=${callbackName}&render=explicit`;

describe('Loader.constructor', () => {
  it('set default properties to false', () => {
    const loader = new Loader();

    expect(window[moduleLoad]).toBe(false);
    expect(loader.scriptAttached).toBe(false);
  });
});

describe('Loader.performScriptLoad', () => {
  it('should add callback function to window object and set header object', () => {
    const loader = new Loader();
    const baseUrl = RECAPTCHA_URL;
    let isFound = false;

    loader.performScriptLoad(baseUrl);

    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i += 1) {
      if (scripts[i].src === baseUrl) { isFound = true; }
    }

    expect(global.window[callbackName]).toBe(loader.onRecaptchaLoad);
    expect(loader.scriptAttached).toBe(true);
    expect(isFound).toBe(true);
  });
});

describe('Loader.onRecaptchaLoad', () => {
  it('should set loader to be true, and delete reference', () => {
    const loader = new Loader();

    global.window[callbackName] = {};

    loader.onRecaptchaLoad();

    expect(global.window[callbackName]).toBe(undefined);
    expect(window[moduleLoad]).toBe(true);
  });
});

describe('Loader.loadRecaptcha', () => {
  it('should trigger performScriptLoad and trigger callback', () => {
    jest.useFakeTimers();
    const loader = new Loader();
    const spyOnPerformScriptLoad = jest.spyOn(loader, 'performScriptLoad');
    const mockFunction = jest.fn();

    loader.loadRecaptcha(mockFunction);
    expect(mockFunction).not.toHaveBeenCalled();
    window[moduleLoad] = true;
    jest.advanceTimersByTime(1000);

    expect(spyOnPerformScriptLoad).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalled();
  });

  it('should not trigger performScriptLoad if script is already loaded', () => {
    jest.useFakeTimers();
    const loader = new Loader();
    const spyOnPerformScriptLoad = jest.spyOn(loader, 'performScriptLoad');
    const mockFunction = jest.fn();

    loader.scriptAttached = true;
    window[moduleLoad] = true;

    loader.loadRecaptcha(mockFunction);

    expect(spyOnPerformScriptLoad).not.toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalled();
  });

  it('should trigger performScriptLoad with primary url', () => {
    const loader = new Loader();
    const spyOnPerformScriptLoad = jest.spyOn(loader, 'performScriptLoad');
    const mockFunction = jest.fn();

    loader.loadRecaptcha(mockFunction);
    expect(spyOnPerformScriptLoad).toHaveBeenCalledWith(RECAPTCHA_URL);
  });

  it('should trigger performScriptLoad with primary url', () => {
    const loader = new Loader();
    const spyOnPerformScriptLoad = jest.spyOn(loader, 'performScriptLoad');
    const mockFunction = jest.fn();

    loader.loadRecaptcha(mockFunction, true);
    expect(spyOnPerformScriptLoad).toHaveBeenCalledWith(SECONDARY_URL);
  });
});
