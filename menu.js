class Menu {
	constructor() {
	}
	
	createMenu(items) {
		// get main menu element
		var menu = document.getElementById("menu");
		items.forEach((device, i) => {
			this.createMenuItem(device, i);
		});
	}
	
	addMenuItems(devs) {
		let devcount = items.length;
		devs.forEach((device, i) => {
			items.push(device);
			this.createMenuItem(device, devcount + i);
		});
	}
	
	createMenuItem(device, i) {
		// get main menu element
		var menu = document.getElementById("menu");
			
		var a = document.createElement("a");
		a.setAttribute("href", "javascript:diagram.addEthDevice(items[" + i + "]);");
		a.classList.add("w3-bar-item");
		a.classList.add("w3-button");
		menu.appendChild(a);
		var div1 = document.createElement("div");
		div1.classList.add("menuItem_div1");
		a.appendChild(div1);
			
		var div2 = document.createElement("div");
		div2.classList.add("menuItem_div2");
		div1.appendChild(div2);
			
		var img = document.createElement("img");
		img.setAttribute("src", device.image);
		img.classList.add("menuItem_img");
		div2.appendChild(img);
			
		div2.innerHTML = div2.innerHTML + device.name;
	}
}

function onFileLoad(elementId, event) {
	devs = eval(event.target.result);
	// add a new menu item
	menu.addMenuItems(devs);
 //   document.getElementById(elementId).innerText = event.target.result;
}

function onChooseFile(event, onLoadFileHandler) {
    if (typeof window.FileReader !== 'function')
        throw ("The file API isn't supported on this browser.");
    let input = event.target;
    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    let file = input.files[0];
    let fr = new FileReader();
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
}

const menu = new Menu();
menu.createMenu(items);