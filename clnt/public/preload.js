// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const customTitlebar = require('custom-electron-titlebar');
//const path = require('path');
//const { remote } = require('electron')
const { Menu, MenuItem, dialog } = require('electron').remote

let titlebar;

window.addEventListener('DOMContentLoaded', () => {

  titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#25aaa9'),
    icon: './hotel-icon.png',
	});

  const options = {
    type: 'info',
    buttons: ['OK'],
    defaultId: 1,
    title: 'Hotelitary',
    message: '\u00a9 MApN - U.M. 01616\n\u2714 Hotelitary v1.0.0-alpha.1\n\u2762 Aplicația este în faza de testare alpha. \u2762\n\u260E 0769 388 493 - lt. Moldoveanu Dan',
  };

	const menu = new Menu();
	menu.append(new MenuItem({
		label: 'Ajutor',
		submenu: [
			{
				label: 'Despre',
        click: () => dialog.showMessageBox(null, options),
        role: 'about'
			},
			{
				label: 'Instrumente pentru dezvoltatori',
				role: 'toggleDevTools'
			}
		]
	}));

	titlebar.updateMenu(menu);
})
