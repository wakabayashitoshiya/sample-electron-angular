import { app, BrowserWindow, ipcMain, dialog , session } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import log from 'electron-log';

log.info(`${app.name} ${app.getVersion()}`);

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  // const windowSession = mainWindow.webContents.session;
  // console.log(windowSession);

  const ses = session.fromPartition('persist:name')
  console.log(ses.getUserAgent())
  
  mainWindow.webContents.openDevTools();
  const src = path.join(process.cwd(), 'dist');
  console.log(path.join(src, 'index.html'));
  mainWindow.loadFile(path.join(src, 'index.html'));
  // mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});

// Electron -> Angular
ipcMain.handle('getPirates', () => {
  const result = fs.readFileSync(__dirname + '/assets/pirates.json');
  return JSON.parse(result.toString());
});

// Angular -> Electron
ipcMain.on('selectPirate', async (event: Electron.IpcMainEvent, name: string) => {
    await dialog.showMessageBox({ message: 'You selected: ' + name });
    event.returnValue = true;
});

// test_ipc
ipcMain.on('testIpc', (event, arg) => {
  console.log('IPC のテスト');
  let message = "";
  
  let mysql      = require('mysql');
  let connection = mysql.createConnection({
      host     : '172.31.224.1',
      user     : 'kogaku',
      password : 'kogaku',
      database : 'sample'
  });
  connection.connect();

  connection.query('SELECT * FROM users where id = ? and password = ?;',[arg['id'],arg['pass']], function(err:any, rows:any, fields:any) {
    if (err) throw err;
    if(rows.length > 0){
      message = "ログイン可能";
    } else {
      message = "ログイン不可";
    }
  });

  connection.end();

  return message;

})