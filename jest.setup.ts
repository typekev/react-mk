import { JSDOM } from 'jsdom';

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}

const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
});

global.window = window;
global.document = window.document;
global.navigator = {
  ...window.navigator,
  userAgent: 'node.js',
};
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

const copyProps = (src, target) =>
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });

copyProps(window, global);
