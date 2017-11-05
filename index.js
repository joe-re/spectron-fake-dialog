const path = require('path');

let _app = null;
function apply(app) {
  _app = app;
  _app.args.unshift(path.join(__dirname, 'preload.js'));
  _app.args.unshift('--require');
  return _app;
}

function mock(options) {
  return _app.electron.ipcRenderer.sendSync('SPECTRON_FAKE_DIALOG/SEND', options);
}

module.exports = { apply, mock };
