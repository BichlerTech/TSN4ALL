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
	
	setGeneralProperties(diagram) {
		if(diagram == undefined)
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
		propTd1.innerHTML = "category";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var devNameInput = document.createElement("input");
		devNameInput.value = diagram.model.category;
		propTd2.appendChild(devNameInput);
		
		devNameInput.addEventListener ("change", function () {
			//device.name = this.value;
			//alert(device.name);
		//	shortcut.innerHTML = VlanShorcuts[selectedStream.Vlan];
		//	longText.innerHTML = VlanLongText[selectedStream.Vlan];
		});
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set device type
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "hyperperiod";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var hyperperiodInput = document.createElement("input");
		hyperperiodInput.value = diagram.model.hyperperiod;
		propTd2.appendChild(hyperperiodInput);
		
		hyperperiodInput.addEventListener ("change", function () {
			diagram.model.hyperperiod = this.value;
		});
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set port count
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "granularity";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var granularityInput = document.createElement("input");
		granularityInput.value = diagram.model.granularity;
		propTd2.appendChild(granularityInput);
		granularityInput.addEventListener ("change", function () {
			diagram.model.granularity = this.value;
		});
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
		devNameInput.value = device.actDeviceModel.name;
		propTd2.appendChild(devNameInput);
		
		devNameInput.addEventListener ("change", function () {
			device.actDeviceModel.name = this.value;
			device.updateName(this.value);
		});
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set device type
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "type";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = device.actDeviceModel.type;
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set device category
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "category";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var categoryInput = document.createElement("input");
		categoryInput.value = device.actDeviceModel.category;
		var select_ = document.createElement("select");
		propTd2.appendChild(select_);
		select_.addEventListener ("change", function () {
			device.actDeviceModel.category= this.value;
		});
			
		var option1 = document.createElement("option");
		option1.innerHTML = "switch";
		select_.appendChild(option1);
		var option2 = document.createElement("option");
		option2.innerHTML = "endpoint";
		select_.appendChild(option2);
			
		if(option1.innerHTML == device.actDeviceModel.category)
			option1.selected = true;
		else
			option2.selected = true;
			
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set device minGateOpenTime
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "minGateOpenTime";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var minGateOpenTimeInput = document.createElement("input");
		minGateOpenTimeInput.value = device.actDeviceModel.minGateOpenTime;
		propTd2.appendChild(minGateOpenTimeInput);
		minGateOpenTimeInput.addEventListener ("change", function () {
			device.actDeviceModel.minGateOpenTime = this.value;
		});
		
		if(option1.innerHTML == device.actDeviceModel.category) {
			var propTr = document.createElement("tr");
			propTbody.appendChild(propTr);
			
			// set device configurationPort
			propTd1 = document.createElement("td");
			propTr.appendChild(propTd1);
			propTd1.innerHTML = "configurationPort";
			
			var propTd2 = document.createElement("td");
			propTr.appendChild(propTd2);
			var configurationPortInput = document.createElement("input");
			configurationPortInput.value = device.actDeviceModel.configurationPort;
			propTd2.appendChild(configurationPortInput);
			configurationPortInput.addEventListener ("change", function () {
				device.actDeviceModel.configurationPort = this.value;
			});
		
			var propTr = document.createElement("tr");
			propTbody.appendChild(propTr);
			
			// set device switchDelay
			propTd1 = document.createElement("td");
			propTr.appendChild(propTd1);
			propTd1.innerHTML = "switchDelay";
			
			var propTd2 = document.createElement("td");
			propTr.appendChild(propTd2);
			var switchDelayInput = document.createElement("input");
			switchDelayInput.value = device.actDeviceModel.switchDelay;
			propTd2.appendChild(switchDelayInput);
			switchDelayInput.addEventListener ("change", function () {
				device.actDeviceModel.switchDelay = this.value;
			});
		}
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set port count
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "ports";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = device.actDeviceModel.portcount;
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
		propTd2.innerHTML = selectedStream.model.name;
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set stream name
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "id";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = selectedStream.model.id;
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set stream name
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "category";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = "flow";
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);

		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "period";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var periodInput = document.createElement("input");
		periodInput.value = selectedStream.model.period;
		propTd2.appendChild(periodInput);
		periodInput.addEventListener ("change", function () {
			selectedStream.model.period = this.value;
		});
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);

		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "deadline";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var deadlineInput = document.createElement("input");
		deadlineInput.value = selectedStream.model.deadline;
		propTd2.appendChild(deadlineInput);
		deadlineInput.addEventListener ("change", function () {
			selectedStream.model.deadline = this.value;
		});
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);

		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "datasize";
		
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var dataSizeInput = document.createElement("input");
		dataSizeInput.value = selectedStream.model.dataSize;
		propTd2.appendChild(dataSizeInput);
		
		dataSizeInput.addEventListener ("change", function () {
			selectedStream.model.dataSize = this.value;
		});
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);

		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "vlanId";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var vlanIdInput = document.createElement("input");
		vlanIdInput.value = selectedStream.model.vlanId;
		propTd2.appendChild(vlanIdInput);
		
		vlanIdInput.addEventListener ("change", function () {
			selectedStream.model.vlanId = this.value;
		});
	}
	
	setNetProperties(stream) {
		if(stream == undefined)
			return;
		selectedConnection = connections[stream.id];
		var props = document.getElementById("properties");
		props.innerHTML="";
		var propTable = document.createElement("table");
		propTable.classList.add("table-style-three");
		props.appendChild(propTable);
		var propTbody = document.createElement("tody");
		propTable.appendChild(propTbody);
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set connection name
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "name";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = selectedConnection.model.name;
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set connection name
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "id";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = selectedConnection.model.id;
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set connection name
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "category";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = "cable";
		
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set connection name
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "sourceNodeId";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = selectedConnection.inoutputPort.parentNode.actDeviceModel.id;
		
		var propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set connection name
		var propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "destNodeId";
		
		var propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = selectedConnection.inputPort.parentNode.actDeviceModel.id;
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set device type
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "linkSpeed";
		
		propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var linkSpeedInput = document.createElement("input");
		linkSpeedInput.value = selectedConnection.model.linkSpeed;
		propTd2.appendChild(linkSpeedInput);
		
		linkSpeedInput.addEventListener ("change", function () {
			selectedConnection.model.linkSpeed = this.value;
		});
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);

		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "cableLength";
		
		propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		var cableLengthInput = document.createElement("input");
		cableLengthInput.value = selectedConnection.model.cableLength;
		propTd2.appendChild(cableLengthInput);
		
		cableLengthInput.addEventListener ("change", function () {
			selectedConnection.model.cableLength = this.value;
		});
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set connection name
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "sourcePortId";
		
		propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = selectedConnection.inoutputPort.id;
		
		propTr = document.createElement("tr");
		propTbody.appendChild(propTr);
		
		// set connection name
		propTd1 = document.createElement("td");
		propTr.appendChild(propTd1);
		propTd1.innerHTML = "destPortId";
		
		propTd2 = document.createElement("td");
		propTr.appendChild(propTd2);
		propTd2.innerHTML = selectedConnection.inputPort.id;  
	}
}


const properties = new Properties();
properties.setDeviceProperties();