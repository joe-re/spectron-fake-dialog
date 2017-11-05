# SpectronFakeDialog

Mock dialog module in your spectron's specs.

## Installation

```
npm install --save-dev spectron-fake-dialog
```

## Example

Using mocha example.

```js
const Application = require('spectron').Application;
const electron = require('electron');
const path = require('path');
const fakeDialog = require('spectron-fake-dialog');
const assert = require('assert');

const app = new Application({ path: electron, args: [ path.join(__dirname, '.') ] });
fakeDialog.apply(app);

describe('mock showOpenDialog', function() {
  this.timeout(10000);
  beforeEach(function() {
    return app.start().then(() =>
      fakeDialog.mock([ { method: 'showOpenDialog', value: ['faked.txt'] } ])
    );;
  });

  afterEach(function() {
    return app.stop();
  });

  it('should return faked.txt', () => {
    return app.client.waitForExist('#show-open-dialog-button')
      .then(() => app.client.click('#show-open-dialog-button'))
      .then(() => app.client.getText('#return-value'))
      .then(text => assert.equal(text, JSON.stringify(['faked.txt'])));
  });
});
```

## API

### #apply(application: Application)

initialize spectronFakeDialog

### #mock(params: Array<{ method: stering, value: Object }>)

NOTE: mock must call after Electron app started.

- method: dialog module's method name. ex) showOpenDialog, showSaveDialog...
- value: mocked method return value.

## License

MIT
