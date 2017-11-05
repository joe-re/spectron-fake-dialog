const { dialog, ipcMain, BrowserWindow } = require('electron');

const parseArgs = function (window, options, callback, ...args) {
  if (window != null && window.constructor !== BrowserWindow) {
    [callback, options, window] = [options, window, null]
  }
  if ((callback == null) && typeof options === 'function') {
    [callback, options] = [options, null]
  }
  const lastArgument = args[args.length - 1]
  if ((callback == null) && typeof lastArgument === 'function') {
    callback = lastArgument
  }
  return [window, options, callback]
}

function mockFunction(value, ...args) {
  const [ window, options, callback ] = parseArgs(...args);
  if (callback) {
    setTimeout(() => callback(value), 0);
    return;
  }
  return value;
}

function fake(options) {
  options.forEach(v => {
    if (dialog[v.method]) {
      dialog[v.method] = mockFunction.bind(null, v.value);
    } else {
      throw new Error(`can't find ${v.method} on dialog module.`);
    }
  });
}

ipcMain.on('SPECTRON_FAKE_DIALOG/SEND', (e, options) => {
  fake(options);
  e.returnValue = true;
});
