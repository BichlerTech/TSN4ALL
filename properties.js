class Properties {
	constructor() {
	}
	
	setStreamProperties() {
		var props = document.getElementById("properties");
	}
	
	setDeviceProperties(device) {
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
		propTd2.innerHTML = device.name;
		
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
		var props = document.getElementById("properties");
		var propTable = document.createElement("table");
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
		propTd1.innerHTML = stream.name;
		
		// set device type
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "type";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = stream.type;
		
		// set port count
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "ports";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = stream.ports;
	}
}


const properties = new Properties();
properties.setDeviceProperties();