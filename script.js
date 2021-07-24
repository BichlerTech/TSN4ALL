SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function (toElement) {
	return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
  };

document.onkeydown = my_onkeydown_handler;
function my_onkeydown_handler(event) {
	alert("F5");
    switch (event.keyCode) {
        case 116 : // 'F5'
            event.returnValue = false;
            event.keyCode = 0;
            window.status = "We have disabled F5";
            break;
    }
}
  
  function zoomOut(evt) {
	   evt.parentNode.previousElementSibling.remove();
	  evt.parentNode.classList.add('animation-zoom-out');
  }
  
  var connectionCategory = "cable";
  
  function setCable() {
	  connectionCategory = "cable";
  }
  
  function setFlow() {
	  connectionCategory = "flow";
  }
  
  function exportPersistJSON() {
	  var devices_=document.getElementById("diagram");
	  let content = '{';
	  content += '"TSNNetwork": {';
	  content += '  "base": ';
	  content += JSON.stringify(diagram.model);
	  content += '  ,';
	  content += '  "nodes": [';
	  let delimiter = "";
	  for (let device of devices) {
		  content += delimiter + JSON.stringify(device.actDeviceModel);
		  delimiter = ",";
	  }
	  content += '  ]';
	  content += ',"edge": [';
	  
	  delimiter = "";
	  for (var key in connections) {
		  let tmp = JSON.parse(JSON.stringify(connections[key].model));
		  tmp.sourceNodeId = connections[key].inoutputPort.parentNode.actDeviceModel.id;
		  tmp.destNodeId = connections[key].inputPort.parentNode.actDeviceModel.id;
		  tmp.sourcePortId = connections[key].inoutputPort.id;
		  tmp.destPortId = connections[key].inputPort.id;
		  content += delimiter + JSON.stringify(tmp);
		  delimiter = ",";
	  }
	  
	  for (var key in streams) {
		  let tmp = JSON.parse(JSON.stringify(streams[key].model));
		  tmp.sourceNodeId = streams[key].inoutputPort.parentNode.actDeviceModel.id;
		  tmp.destNodeId = streams[key].inputPort.parentNode.actDeviceModel.id;
		  tmp.sourcePortId = streams[key].inoutputPort.id;
		  tmp.destPortId = streams[key].inputPort.id;
		  content += delimiter + JSON.stringify(tmp);
		  delimiter = ",";
	  }
	  content += ']}';
	  content += '  }';
	  return content;
  }
  
  function exportJSON() {
	  var devices_ = document.getElementById("diagram");
  //	let content = 'var cont = {';
	  let content = '{';
	  content += '"TSNNetwork": {';
	  content += '  "base": ';
	  content += JSON.stringify(diagram.model);
	  content += '  ,';
	  content += '  "nodes": [';
	  let delimiter = "";
	  for (let device of devices) {
		content += delimiter +'{';
		content += '    "category": "' + device.actDeviceModel.category + '",';
		content += '    "name": "' + device.actDeviceModel.name + '",';
		content += '    "id": ' + device.actDeviceModel.id + ',';
		content += '    "tsnPorts": [';
		delimiter = ",";
		let portsDel = "";
		for(let port of device.actDeviceModel.ports) {
			content += portsDel + '        {';
			content += '          "name": "' + port.name + '",';
			content += '          "id": ' + port.id + '';
			content += '        }';
			portsDel = ",";
		}
		content += '      ],'
		content += ' "minGateOpenTime": ' + device.actDeviceModel.minGateOpenTime;
		if(device.actDeviceModel.category == "switch") {
			content += ', "configurationPort": "' + device.actDeviceModel.configurationPort + '",';
			content += ' "switchDelay": ' + device.actDeviceModel.switchDelay;
		}
		content += ' }';
	  }
	  content += '  ],';
	  content += '"edge": [';
	  
	  delimiter = "";
	  for (var key in connections) {
		  let devs = connections[key].inoutputPort.parentNode;
		  let devd = connections[key].inputPort.parentNode;
		  content += delimiter + '  { "category": "cable",';
		  content += '  "sourceNodeId": ' + devs.actDeviceModel.id + ','; //					<!-- int: node id from source node where the flow is connected to -->
		  content += '  "destNodeId": ' + devd.actDeviceModel.id + ',';
		  content += '  "id": ' + connections[key].model.id + ',';
		  content += '  "linkSpeed": ' + connections[key].model.linkSpeed + ',';
		  content += '  "cableLength": ' + connections[key].model.cableLength + ',';
		  content += '  "sourcePortId": ' + connections[key].inoutputPort.id + ',';
		  content += '  "destPortId": ' + connections[key].inputPort.id;	
		  content += '  }';
		  delimiter = ",";
	  }
	  
	  for (var key in streams) {
		  let devs = streams[key].inoutputPort.parentNode;
		  let devd = streams[key].inputPort.parentNode;
		  content += delimiter + '  {';
		  content += '  "category":  "flow",';
		  content += '   "sourceNodeId": ' + devs.actDeviceModel.id + ','; //					<!-- int: node id from source node where the flow is connected to -->
		  content += '   "destNodeId": ' + devd.actDeviceModel.id + ',';
		  content += '   "id": ' + streams[key].model.id + ',';
		  content += '   "deadline": ' + streams[key].model.deadline + ',';
		  content += '   "period": ' + streams[key].model.period + ',';
		  content += '   "dataSize": ' + streams[key].model.dataSize + ',';
		  content += '   "vlanId": ' + streams[key].model.vlanId;
		  content += '  }';
		  delimiter = ",";
	  }
  
	  content += ']}';
	  
  //	content += '  };';
	  content += '  }';
	  return content;
  }
  
  function save() {
	  var devices_=document.getElementById("diagram");
	  //alert(devices_.innerHTML);
	  let content = '<?xml version="1.0" encoding="UTF-8"?>\n';
	  content += '<TSNNetwork>\n';
	  content += '  <base category="' + diagram.category + '">\n';
	  content += '    <hyperperiod>' + diagram.hyperperiod + '</hyperperiod>\n';
	  content += '    <granularity>' + diagram.granularity + '</granularity>\n';
	  content += '  </base>\n';
	  for (let device of devices) {
		content += '  <node category="switch">\n';
		content += '    <name>' + device.actDeviceModel.name + '</name>\n';
		content += '    <id>' + device.actDeviceModel.id + '</id>\n';
		content += '      <tsnPorts>\n';
		for(let port of device.actDeviceModel.ports) {
			content += '        <port>\n';
			content += '          <name>' + port.name + '</name>\n';
			content += '          <id>' + port.id + '</id>\n';
			content += '        </port>\n';
		}
		content += '      </tsnPorts>\n';
		content += '  </node>\n';
	  }
	  for (var key in streams) {
		  let devs = streams[key].inoutputPort.parentNode;
		  let devd = streams[key].inputPort.parentNode;
		  content += '  <edge category="flow">\n';
		  content += '    <sourceNodeId>' + devs.actDeviceModel.id + '</sourceNodeId>\n'; //					<!-- int: node id from source node where the flow is connected to -->
		  content += '    <destNodeId>' + devd.actDeviceModel.id + '</destNodeId>\n';
		  content += '    <id>' + streams[key].model.id + '</id>\n';
		  content += '    <deadline>850</deadline>\n';
		  content += '    <period>1000</period>\n';
		  content += '    <dataSize>50</dataSize>\n';
		  content += '    <vlanId>10</vlanId>\n';
	  //	alert("input: " + streams[key].inputPort.element.textContent + " id: " + streams[key].inputPort.parentNode.device.name);
	  //	alert("output: " + streams[key].inoutputPort.element.textContent + " id: " + streams[key].inoutputPort.parentNode.device.name);
		  content += '  </edge>\n';
	  }
	  
	  content += '</TSNNetwork>';
	  let result = document.getElementById('resultXML');
	  result.value = content;
  }
  
  /*
  * not used 
  * invert direction of a stream connection
  */
  function invert(me) {
	  /*
	  if(me.getAttribute("marker-start") != "") {
		  me.setAttribute("marker-start", "");
		  me.setAttribute("marker-end", "url(#arrow)");
	  } else {
		  me.setAttribute("marker-start", "url(#arrow)");
		  me.setAttribute("marker-end", "");
	  }*/
  }
  
  function load() {
	  let devices_ = 'var defs =';
	  devices_	+= document.getElementById('model2saveText').value;
	  devices_	+= ';';
	  eval(devices_);
	  var svg=document.getElementById("diagram");
	  
	  for(i = 0; i < defs.TSNNetwork.nodes.length; i++) {
		  diagram.addEthDevice(defs.TSNNetwork.nodes[i]);
	  }
	  for(i = 0; i < defs.TSNNetwork.edge.length; i++) {
		  let edge = defs.TSNNetwork.edge[i];
		  addConnection(edge);
	  }
  }
  
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }

  function loadScheduling() {
	let text = document.getElementById("schedule2showText").value;
	let rowheight = 100;
	let queues = 8;
	let parser = new DOMParser();
	xmlDoc = parser.parseFromString(text,"text/xml");
	let controllist = xmlDoc.getElementsByTagName("admin-control-list");
	rowheight /= controllist.length;
	let scheduleDiv = document.getElementById("schedTable");
	removeAllChildNodes(scheduleDiv);
	let scheduleTable = document.createElement("table");
	//scheduleTable.setAttribute("height", "100%");
	//scheduleTable.setAttribute("width", "100%");
	scheduleDiv.appendChild(scheduleTable);
	let scheduleTBody = document.createElement("tbody");
	scheduleTable.appendChild(scheduleTBody);
	// add table header
	let scheduleRow = document.createElement("tr");
		scheduleRow.setAttribute("height", "30px");
		scheduleTBody.appendChild(scheduleRow);
	for(var queue = 0; queue < queues + 2; queue++) {
		let scheduleCol = document.createElement("td");
		scheduleRow.appendChild(scheduleCol);
		scheduleCol.setAttribute("width", "30px");
		if(queue > 0 && queue < queues + 1) {
			scheduleCol.style.textAlign = "center";
			scheduleCol.innerText = queue - 1;
		}
	}
	let time = 0;
	for(var i = 0; i < controllist.length; i++) {
		let scheduleRow = document.createElement("tr");
		scheduleRow.setAttribute("height", "30px");
		//scheduleRow.setAttribute("width", "100%");
		scheduleTBody.appendChild(scheduleRow);
		let gsv = controllist[i].getElementsByTagName("gate-states-value");
		let tiv = controllist[i].getElementsByTagName("time-interval-value");
		let gs = gsv[0].textContent;

		let bit = 1;
		for(var queue = 0; queue < queues + 2; queue++) {
			if(queue == 0) {
				// first column
				let scheduleCol = document.createElement("td");
				scheduleRow.appendChild(scheduleCol);
				scheduleCol.style.textAlign = "right";
				scheduleCol.style.verticalAlign = "top";
				scheduleCol.innerText = time;
				time = time + parseInt(tiv[0].textContent);
			} else if(queue == queues + 1) {
				// last column
				let scheduleCol = document.createElement("td");
				scheduleRow.appendChild(scheduleCol);
				scheduleCol.innerText = tiv[0].textContent;
			}	else {
				let scheduleCol = document.createElement("td");
				scheduleRow.appendChild(scheduleCol);
				scheduleCol.setAttribute("width", "30px");
				if((gs & bit) == 0) {
					scheduleCol.style.backgroundColor = "lightgray";
				} else {
					scheduleCol.style.backgroundColor = "green";
				}
				// shift bit
				bit = bit << 1;
			}
		}
	}
	// print unrequired footer
	 scheduleRow = document.createElement("tr");
		scheduleRow.setAttribute("height", "30px");
		scheduleTBody.appendChild(scheduleRow);
	for(var queue = 0; queue < queues + 2; queue++) {
		let scheduleCol = document.createElement("td");
		scheduleRow.appendChild(scheduleCol);
		scheduleCol.setAttribute("width", "30px");
		scheduleCol.setAttribute("heigth", "30px");
		if(queue == 0) {
			scheduleCol.style.textAlign = "right";
			scheduleCol.style.verticalAlign = "top";
			scheduleCol.innerText = time;
		}
	}
  }

  function addConnection(edge) {
	  connectionCategory = edge.category;
	  const sport = portLookup[edge.sourcePortId];
	  const dport = portLookup[edge.destPortId];
	  sport.createConnector();
	  
	  // get connector from port
	  let connector = sport.lastConnector;
	  connector.inputPort = sport;
	  connector.inoutputPort = dport;
	  dport.addConnector(connector);
	  //connector.placeHandle();
	  connector.updateHandle(dport);
	 // this.target = port.lastConnector;
	 // this.dragType = this.target.dragType;
  }
  
  function switch2Physical() {
	  setCable();
	  document.getElementById('main_graphics').style.display = 'block';
	  //document.getElementById('main_parameter').style.display = 'none';
	  document.getElementById('main_configuration').style.display = 'none';
	  
	  document.getElementById('graphics').style.backgroundColor = '#616161 ';
	  document.getElementById('params').style.backgroundColor = 'black';
	  document.getElementById('model').style.backgroundColor = 'black ';
	  document.getElementById('configuration').style.backgroundColor = 'black';
  }
  
  function switch2Logical() {
	  setFlow();
	  document.getElementById('main_graphics').style.display = 'block';
	  //document.getElementById('main_parameter').style.display = 'block';
	  document.getElementById('main_configuration').style.display = 'none';
	  
	  document.getElementById('graphics').style.backgroundColor = 'black';
	  document.getElementById('params').style.backgroundColor = '#616161 ';
	  document.getElementById('model').style.backgroundColor = 'black ';
	  document.getElementById('configuration').style.backgroundColor = 'black';
  }
  
  function switch2Model() {
	  let content = 'var cont =';
	  content += exportPersistJSON();
	  content += ';';
	  console.log(content);
	  eval(content);
	  modelViewer.showJSON(cont);
	  document.getElementById('main_graphics').style.display = 'none';
	  document.getElementById('main_parameter').style.display = 'none';
	  document.getElementById('main_model').style.display = 'block';
	  document.getElementById('main_configuration').style.display = 'none';
	  
	  document.getElementById('graphics').style.backgroundColor = 'black';
	  document.getElementById('params').style.backgroundColor = 'black';
	  document.getElementById('model').style.backgroundColor = '#616161 ';
	  document.getElementById('configuration').style.backgroundColor = 'black ';
  }
  
  function switch2Configuration() {
	  //save();
	  let content = 'var cont = ';
	  content += exportJSON();
	  content += ';';
	  eval(content);
	  jsonViewer.showJSON(cont);
	  document.getElementById('main_graphics').style.display = 'none';
	  document.getElementById('main_parameter').style.display = 'none';
	  document.getElementById('main_model').style.display = 'none';
	  document.getElementById('main_configuration').style.display = 'block';
	  
	  document.getElementById('graphics').style.backgroundColor = 'black';
	  document.getElementById('params').style.backgroundColor = 'black';
	  document.getElementById('model').style.backgroundColor = 'black ';
	  document.getElementById('configuration').style.backgroundColor = '#616161 ';
  }
  
  function switch2Model2Save() {
	  let content = exportPersistJSON();
	  console.log(content);
	  document.getElementById('model2saveText').value = content;
	  
	  document.getElementById('main_graphics').style.display = 'none';
	  document.getElementById('main_parameter').style.display = 'none';
	  document.getElementById('main_model').style.display = 'none';
	  document.getElementById('main_configuration').style.display = 'none';
	  document.getElementById('main_model2save').style.display = 'block';
	  
	  document.getElementById('graphics').style.backgroundColor = 'black';
	  document.getElementById('params').style.backgroundColor = 'black';
	  document.getElementById('model').style.backgroundColor = 'black ';
	  document.getElementById('configuration').style.backgroundColor = 'black ';
	  document.getElementById('model2save').style.backgroundColor = '#616161';
	  persistModelAjax(content);
  }

  function persistModelAjax(str) {
    if (str.length == 0) {
      //document.getElementById("txtHint").innerHTML = "";
      return;
    } else {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
	   alert("test: " + this.responseText);
         }
      };
	    alert(str);
      xmlhttp.open("GET", "https://www.bichler.tech/snapshot/tsn4all/php/index.php?req=model&q=" + str, true);
      xmlhttp.send();
    }
  }
  
  function switch2Config2Save() {
	  let content = exportJSON();
	  console.log(content);
	  document.getElementById('config2saveText').value = content;
	  
	  document.getElementById('main_graphics').style.display = 'none';
	  document.getElementById('main_parameter').style.display = 'none';
	  document.getElementById('main_model').style.display = 'none';
	  document.getElementById('main_configuration').style.display = 'none';
	  document.getElementById('main_model2save').style.display = 'none';
	  document.getElementById('main_config2save').style.display = 'block';
	  
	  document.getElementById('graphics').style.backgroundColor = 'black';
	  document.getElementById('params').style.backgroundColor = 'black';
	  document.getElementById('model').style.backgroundColor = 'black ';
	  document.getElementById('configuration').style.backgroundColor = 'black ';
	  document.getElementById('model2save').style.backgroundColor = 'black';
	  document.getElementById('config2save').style.backgroundColor = '#616161';
	  persistConfigAjax(content);
  }

function persistConfigAjax(str) {
    if (str.length == 0) {
      //document.getElementById("txtHint").innerHTML = "";
      return;
    } else {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
	   document.getElementById("schedule2showText").value = this.responseText;
	   loadScheduling();
            //document.getElementById().
	   // alert("test: " + this.responseText);
         }
      };
	//    alert(str);
      xmlhttp.open("GET", "https://www.bichler.tech/snapshot/tsn4all/php/index.php?req=config&q=" + str, true);
      xmlhttp.send();
    }
  }

  function switch2Schedule2Show() {
	//loadScheduling();
	
	document.getElementById('main_graphics').style.display = 'none';
	document.getElementById('main_parameter').style.display = 'none';
	document.getElementById('main_model').style.display = 'none';
	document.getElementById('main_configuration').style.display = 'none';
	document.getElementById('main_model2save').style.display = 'none';
	document.getElementById('main_config2save').style.display = 'none';
	document.getElementById('main_schedule2show').style.display = 'block';
	
	document.getElementById('graphics').style.backgroundColor = 'black';
	document.getElementById('params').style.backgroundColor = 'black';
	document.getElementById('model').style.backgroundColor = 'black ';
	document.getElementById('configuration').style.backgroundColor = 'black ';
	document.getElementById('model2save').style.backgroundColor = 'black';
	document.getElementById('config2save').style.backgroundColor = 'black';
	document.getElementById('schedule2show').style.backgroundColor = '#616161';
}
  
  //
  // NODE PORT
  // =========================================================================== 
  class NodePort {
  
	constructor(parentNode, element, isInput, port) {
  
	  this.name = port.name;
	  this.id = port.id;
	  this.identifier = port.identifier;
	  this.dragType = "port";
  
	  this.parentNode = parentNode;
	  this.isInput = isInput;
  
	  this.element = element;
	  this.portElement = element.querySelector(".port");
	  this.portScrim = element.querySelector(".port-scrim");
  
	  this.portScrim.setAttribute("data-drag", `${this.identifier}:port`);
  
	  this.connectors = [];
	  this.lastConnector;
  
	  const bbox = this.portElement.getBBox();
  
	  this.global = svg.createSVGPoint();
	  this.center = svg.createSVGPoint();
	  this.center.x = bbox.x + bbox.width / 2;
	  this.center.y = bbox.y + bbox.height / 2;
  
	  this.update();
	}
  
	createConnector() {
  
	  let connector = new ConnectorController(connectionCategory);
  /*
	  if (connectorPool.length) {
		connector = connectorPool.pop();
		connectorLookup[connector.id] = connector;
	  } else {
		connector = new ConnectorController(connectionCategory);
	  }
  */
	  connector.init(this);
	  this.lastConnector = connector;
	  this.connectors.push(connector);
	}
  
	removeConnector(connection) {
	  const index = this.connectors.indexOf(connection);
  
	  if (index > -1) {
		this.connectors.splice(index, 1);
	  }
	}
  
	addConnector(connection) {
	  this.connectors.push(connection);
	}
  
	update() {
	  const transform = this.portElement.getTransformToElement(diagramElement);
	  this.global = this.center.matrixTransform(transform);
  
	  for (let connector of this.connectors) {
		connector.updateHandle(this);
	  }
	}
  }
  
  // models
  // ===========================================================================
  /* 
  * virtual/logical flows from one device to an other
  */
  var streams = {};
  
  /*
  * physical connections
  */
  var connections = {};
  
  /*
  * actual selected logical flow
  */
  var selectedStream;
  
  /*
  * actual selected physical connection
  */
  var selectedConnection;
  
  /*
  * actual selected device
  */
  var selectedDevice;
  
  //
  // APP
  // ===========================================================================
  let nextUid = 1;
  let nextUidDevice = 1;
  let connectorUid = 1;
  //let streamUid = 1;
  
  const bezierWeight = 1.0;
  
  const portLookup = {};
  const connectorLookup = {};
  
  const ports = []; 
  //const connectorPool = [];
  
  var svg;
  var diagramElement;
  var dragProxy;
  var frag;
  var fragStream;
  var connectorElement;
  var connectorStreamElement;
  var connectorLayer;
  var diagram;
  
  frag = document.createDocumentFragment();
  frag.appendChild(document.querySelector(".connector"));
  connectorElement = frag.querySelector(".connector");
  
  fragStream = document.createDocumentFragment();
  fragStream.appendChild(document.querySelector(".connector-logical"));
  connectorStreamElement = fragStream.querySelector(".connector-logical");
	  
  function init() {
	  svg = document.querySelector("#svg");
	  diagramElement = document.querySelector("#diagram");
	  dragProxy = document.querySelector("#drag-proxy");
	  shapeElements = Array.from(document.querySelectorAll(".node-container"));
  
	  
	  connectorLayer = document.querySelector("#connections-layer");
	  diagram = new DiagramController();
  }
  
  init();
  
  //const properties = new Properties();
  
  function w3_open() {
	document.getElementById("main").style.marginLeft = "190px";
	document.getElementById("mySidebar").style.width = "190px";
	document.getElementById("mySidebar").style.display = "block";
	document.getElementById("openNav").style.display = "none";
  }
  function w3_close() {
	document.getElementById("main").style.marginLeft = "0";
	document.getElementById("mySidebar").style.display = "none";
	document.getElementById("openNav").style.display = "inline-block";
  }
  
  function w3_closeProperties() {
   // document.getElementById("main").style.marginLeft = "0";
	document.getElementById("myProperties").style.display = "none";
	document.getElementById("openProps").style.display = "block";
  }
  
  function w3_openProperties() {
   // document.getElementById("main").style.marginLeft = "0";
	document.getElementById("myProperties").style.display = "block";
	document.getElementById("openProps").style.display = "none";
  }
  
