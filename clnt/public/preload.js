// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const customTitlebar = require('custom-electron-titlebar');
const path = require('path');
//const { remote } = require('electron')
const { Menu, MenuItem, dialog } = require('electron').remote


window.addEventListener('DOMContentLoaded', () => {

  let titlebar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#25aaa9'),
    icon: './hotel-icon.png',
	});

  const options = {
    type: 'info',
    buttons: [],
    defaultId: 1,
    title: 'Hotelitary',
    message: '\u00a9 MApN - U.M. 01616\nHotelitary v1.0.0-alpha.1\nAplicația este în faza de testare alpha!',
  };

	const menu = new Menu();
	menu.append(new MenuItem({
		label: 'Ajutor',
		submenu: [
			{
				label: 'Despre',
				click: () => dialog.showMessageBox(null, options)
			},
			{
				label: 'Instrumente pentru dezvoltatori',
				role: 'toggleDevTools'
			}
		]
	}));

	titlebar.updateMenu(menu);

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
