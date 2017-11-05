const Application = require('spectron').Application;
const electron = require('electron');
const path = require('path');
const fakeDialog = require('../index');
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
