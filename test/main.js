const { app, Menu, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let win;
let count = 0;

function showOpenDialog() {
  const files = dialog.showOpenDialog(
    {
      title: 'open',
      properties: ['openFile'],
      filters: [{
        name: 'text file',
        extensions: ['txt']
      }]
    },
  );
  return files;
}

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () => {
    win = null;
  });
  ipcMain.on('show-open-dialog', (e) => {
    e.returnValue = showOpenDialog();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
