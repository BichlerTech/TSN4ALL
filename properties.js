const VlanShorcuts = ["BK", "BE", "EE", "CA", "VI", "VO", "IC", "NC"];
const VlanLongText = [
"Background",
"Best Effort ",
"Excellent Effort",
"Critical Applications",
"Video",
"Voice",
"Internetwork Control",
"Network Control "];

class Properties {
	constructor() {
	}
	
	setStreamProperties() {
		var props = document.getElementById("properties");
	}
	
	setDeviceProperties(device) {
		if(device == undefined)
			return;
	//	selectedDevice = device[
		var props = document.getElementById("properties");
		props.innerHTML="";
		var propTable = document.createElement("table");
		propTable.classList.add("table-style-three");
		props.appendChild(propTable);
		var propTbody = document.createElement("tody");
		propTable.appendChild(propTbody);
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set device name
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "name";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var devNameInput = document.createElement("input");
		devNameInput.value = device.name;
		propTd2.appendChild(devNameInput);
		
		devNameInput.addEventListener ("change", function () {
			device.name = this.value;
			alert(device.name);
		//	shortcut.innerHTML = VlanShorcuts[selectedStream.Vlan];
		//	longText.innerHTML = VlanLongText[selectedStream.Vlan];
		});
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set device type
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "type";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = device.type;
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set port count
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "ports";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = device.portcount;
	}
	
	setStreamProperties(stream) {
		if(stream == undefined)
			return;
		selectedStream = streams[stream.id];
		var props = document.getElementById("properties");
		props.innerHTML="";
		var propTable = document.createElement("table");
		propTable.classList.add("table-style-three");
		props.appendChild(propTable);
		var propTbody = document.createElement("tody");
		propTable.appendChild(propTbody);
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		
		
		// set stream name
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "name";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var devNameInput = document.createElement("input");
		devNameInput.value = selectedStream.connectonName;
		propTd2.appendChild(devNameInput);
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set device type
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "Vlan";
		
		propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var select_ = document.createElement("select");
		propTd2.appendChild(select_);
		select_.addEventListener ("change", function () {
			selectedStream.Vlan = this.value;
			
			shortcut.innerHTML = VlanShorcuts[selectedStream.Vlan];
			longText.innerHTML = VlanLongText[selectedStream.Vlan];
		});

		for(var i = 0; i < 8; i++) {
			var option_ = document.createElement("option");
			option_.innerHTML = "" + i;
			if(i == selectedStream.Vlan)
				option_.selected = true;
			select_.appendChild(option_);
		}
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		// set port count
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "Vlan Shortcut";
		
		var shortcut = document.createElement("td");
		propTr.appendChild(shortcut);
		shortcut.innerHTML = VlanShorcuts[selectedStream.Vlan];
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		// set port count
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "Vlan description";
		
		var longText = document.createElement("td");
		propTr.appendChild(longText);
		longText.innerHTML = VlanLongText[selectedStream.Vlan];
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		// set port count
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		
		propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set port count
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "source device";		
		
		propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set port count
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "target device";
		
		propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
	}
}


const properties = new Properties();
properties.setDeviceProperties();