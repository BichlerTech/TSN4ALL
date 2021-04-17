SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function (toElement) {
  return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
};

var connectionType = "physical";

function setPhysical() {
	connectionType = "physical";
}

function setLogical() {
	connectionType = "logical";
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
	let content = 'var cont = {';
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
	
	content += '  };';
	eval(content);
	jsonViewer.showJSON(cont);
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
		maincontroller.addEthDevice(defs.TSNNetwork.nodes[i]);
	}
	
	//svg.innerHTML  = defs;
	//init();
}

function switch2Physical() {
	document.getElementById('main_graphics').style.display = 'block';
	//document.getElementById('main_parameter').style.display = 'none';
	document.getElementById('main_configuration').style.display = 'none';
	setPhysical();
	
	document.getElementById('graphics').style.backgroundColor = '#616161 ';
	document.getElementById('params').style.backgroundColor = 'black';
	document.getElementById('model').style.backgroundColor = 'black ';
	document.getElementById('configuration').style.backgroundColor = 'black';
}

function switch2Logical() {
	setLogical();
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
	exportJSON();
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
}

//
// CONNECTOR
// ===========================================================================
class ConnectorController {

  constructor(connectionType) {

    this.dragType = "connector";
    this.isSelected = false;
    
	this.connectionType = connectionType;
	if(connectionType == "physical") {
		this.element = connectorElement.cloneNode(true);
		this.model = new PhysicalConnection();
		this.model.name = `Connector_${connectorUid}`;
		this.model.id = connectorUid++;
		connections[this.model.name] = this;
	}
	else {
		this.element = connectorStreamElement.cloneNode(true);
		this.model = new StreamConnection();
		this.model.name = `Connector_${connectorUid}`;
		this.model.id = connectorUid++;
		streams[this.model.name] = this;
	}
	selectedStream = this;
	if(connectionType == "physical") {
		this.path = this.element.querySelector(".connector-path");
		this.pathOutline = this.element.querySelector(".connector-path-outline");
	}
	else {
		this.path = this.element.querySelector(".connector-path-logical");
		this.pathOutline = this.element.querySelector(".connector-path-outline-logical");
	}
    
    this.inputHandle = this.element.querySelector(".input-handle");
    this.inoutputHandle = this.element.querySelector(".inoutput-handle");
	this.startelement = null;
	this.endElement = null;
  }

  init(port) {
    connectorLayer.appendChild(this.element);
    this.isInput = port.isInput;

    if (port.isInput) {
      this.inputPort = port;
      this.dragElement = this.inoutputHandle;
      this.staticElement = this.inputHandle;
    } else {
      this.inoutputPort = port;
      this.dragElement = this.inputHandle;
      this.staticElement = this.inoutputHandle;
    }

    this.staticPort = port;
    this.dragElement.setAttribute("data-drag", `${this.id}:connector`);
    this.staticElement.setAttribute("data-drag", `${port.id}:port`);

    TweenLite.set([this.inputHandle, this.inoutputHandle], {
      x: port.global.x,
      y: port.global.y });
  }

  updatePath() {

    const x1 = this.inputHandle._gsTransform.x;
    const y1 = this.inputHandle._gsTransform.y;
    const x4 = this.inoutputHandle._gsTransform.x;
    const y4 = this.inoutputHandle._gsTransform.y;

	var p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y = 0;
	
	if(x1 < x4) {
		//from right to left
		p0x = x1;
		p0y = y1;
		
		p1x = x1 + (x4 - x1)/2;
		p1y = y1;

		p2x = x4 - (x4 - x1)/2;
		p2y = y4 + 10;

		p3x = x4;
		p3y = y4 + 10;
		
		p4x = x4;
		p4y = y4;
	} else {
		//from left to right
		p0x = x1;
		p0y = y1;
		
		p1x = x1;
		p1y = y1 + 10;

		p2x = x4 - (x4 - x1)/2;
		p2y = y1 + 10;

		p3x = x4 - (x4 - x1)/2;
		p3y = y4;
		
		p4x = x4;
		p4y = y4;
	}

	const data = `${p0x} ${p0y} ${p1x} ${p1y} ${p2x} ${p2y} ${p3x} ${p3y} ${p4x} ${p4y}`;
	this.path.setAttribute("points", data);
    this.pathOutline.setAttribute("points", data);
	this.path.setAttribute("id", this.model.name);
  }
  
  updatePathLogical() {

    const x1 = this.inputHandle._gsTransform.x;
    const y1 = this.inputHandle._gsTransform.y;
    const x4 = this.inoutputHandle._gsTransform.x;
    const y4 = this.inoutputHandle._gsTransform.y;
    var dx = 50;
	
	if(dx > 70)
		dx = 70;
	
	var x = 0;
	
	// test rightmost point
	x1 > x4? x = x1 : x = x4;

    const p1x = x1;
    const p1y = y1;

	const p2x = x + dx;
    const p2y = y1;

	const p3x = x + dx;
    const p3y = y4;
	
	const p4x = x4;
    const p4y = y4;

    const data = `${p1x} ${p1y} ${p2x} ${p2y} ${p3x} ${p3y} ${p4x} ${p4y}`;
	this.path.setAttribute("points", data);
    this.pathOutline.setAttribute("points", data);
	this.path.setAttribute("id", this.model.name);
  }

  updateHandle(port) {

    if (port === this.inputPort) {
		this.inputHandle.setAttribute("transform", "matrix(1, 0, 0, 1, " + port.global.x + ", " + port.global.y + ")");
		this.inputHandle._gsTransform.x = port.global.x;
		this.inputHandle._gsTransform.y = port.global.y;
    } else if (port === this.inoutputPort) {
		this.inoutputHandle.setAttribute("transform", "matrix(1, 0, 0, 1, " + port.global.x + ", " + port.global.y + ")");
		this.inoutputHandle._gsTransform.x = port.global.x;
		this.inoutputHandle._gsTransform.y = port.global.y;
    }

	if(this.connectionType == "physical")
		this.updatePath();
	else
		this.updatePathLogical();
  }

  placeHandle() {

    const skipShape = this.staticPort.parentNode.element;

    let hitPort;

    for (let device of devices) {
      if (device.element === skipShape) {
        continue;
      }
      if (Draggable.hitTest(this.dragElement, device.element)) {
		const ports = device.inoutputs;
        for (let port of ports) {
          if (Draggable.hitTest(this.dragElement, port.portElement)) {
            hitPort = port;
            break;
          }
        }
        if (hitPort) {
          break;
        }
      }
    }

    if (hitPort) {

      if (this.isInput) {
        this.inoutputPort = hitPort;
      } else {
        this.inputPort = hitPort;
      }

      this.dragElement.setAttribute("data-drag", `${hitPort.id}:port`);
      hitPort.addConnector(this);
      this.updateHandle(hitPort);
    } else {
      this.remove();
    }
  }

  remove() {
    if (this.inputPort) {
      this.inputPort.removeConnector(this);
    }
    if (this.inoutputPort) {
      this.inoutputPort.removeConnector(this);
    }

    this.isSelected = false;
    this.path.removeAttribute("d");
    this.pathOutline.removeAttribute("d");
    this.dragElement.removeAttribute("data-drag");
    this.staticElement.removeAttribute("data-drag");

    this.staticPort = null;
    this.inputPort = null;
    this.inoutputPort = null;
    this.dragElement = null;
    this.staticElement = null;

    connectorLayer.removeChild(this.element);
    connectorPool.push(this);
  }

  onDrag() {
    if(this.connectionType == "physical")
		this.updatePath();
	else
		this.updatePathLogical();
  }

  onDragEnd() {
    this.placeHandle();
  }}


//
// NODE PORT
// =========================================================================== 
class NodePort {

  constructor(parentNode, element, isInput) {

	this.name = `port_${++nextUid}`;
    this.id = nextUid;
    this.dragType = "port";

    this.parentNode = parentNode;
    this.isInput = isInput;

    this.element = element;
    this.portElement = element.querySelector(".port");
    this.portScrim = element.querySelector(".port-scrim");

    this.portScrim.setAttribute("data-drag", `${this.id}:port`);

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

    let connector;

    if (connectorPool.length) {
      connector = connectorPool.pop();
      connectorLookup[connector.id] = connector;
    } else {
      connector = new ConnectorController(connectionType);
    }

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
const connectorPool = [];

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
