// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

const webapp = require('./srv/webapp');
const debug = require('debug')('srv:*');
const http = require('http');
const db = require('./srv/db');


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort('3001');
webapp.set('port', port);
/**
 * Create HTTP server.
 */

var server = http.createServer(webapp);

function createWindow () {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1388,
    height: 768,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'srv/public/hotel-icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  })

  // maximize the window
  mainWindow.maximize();
  // set the user agent of the window (browser)
  mainWindow.webContents.userAgent = 'Hotelitary/v1.0.0-alpha.1';
  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://localhost:3001')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
  // Close the menu bar
  //mainWindow.removeMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  createWindow();

  process.stderr.write('\x07'); //?? play a sound on launch
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('before-quit', function() {

});

app.on('render-process-gone', function() {

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// From express -> bin/www
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


/**
 * An attempt to gracefully close the database
 */
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType, closeDatabase.bind(null, eventType));
})

function closeDatabase(thisArg, e) {
  console.log(e);

  if (db.open) {
    console.log('Database will close.')
    db.close();
  }
}