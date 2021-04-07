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

function saveJSON() {
	var devices_=document.getElementById("diagram");
	//alert(devices_.innerHTML);
	let content = '{\n';
	content += '"TSNNetwork": {\n';
	content += '  "base": {\n "category": "netInfo", \n';
	content += '    "hyperperiod": 1000,\n';
	content += '    "granularity": 10\n';
	content += '  },\n';
	for (let device of devices) {
	  content += '  "node": {\n';
	  content += '    "category": "switch"\n';
	  content += '    "name": ' + device.actDeviceModel.name + '"\n';
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
	let result = document.getElementById('resultArea');
	result.value = content;
	console.log(content);
	//var connections=document.getElementById("connections-layer");
	//alert(connections.innerHTML);
}

function save() {
	var devices_=document.getElementById("diagram");
	//alert(devices_.innerHTML);
	let content = '<?xml version="1.0" encoding="UTF-8"?>\n';
	content += '<TSNNetwork>\n';
	content += '  <base category="netInfo">\n';
	content += '    <hyperperiod>1000</hyperperiod>\n';
	content += '    <granularity>10</granularity>\n';
	content += '  </base>\n';
	for (let device of devices) {
	  content += '  <node category="switch"><br>\n';
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
	let result = document.getElementById('resultArea');
	result.value = content;
	console.log(content);
	//var connections=document.getElementById("connections-layer");
	//alert(connections.innerHTML);
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
	var devices_ = document.getElementById("text");
	var svg=document.getElementById("diagram");
	svg.innerHTML  = devices_.value;
	init();
}

function switch2Physical() {
	document.getElementById('main_graphics').style.display = 'block';
	//document.getElementById('main_parameter').style.display = 'none';
	document.getElementById('main_result').style.display = 'none';
	setPhysical();
	
	document.getElementById('graphics').style.backgroundColor = '#616161 ';
	document.getElementById('params').style.backgroundColor = 'black';
	document.getElementById('result').style.backgroundColor = 'black';
}

function switch2Logical() {
	setLogical();
	document.getElementById('main_graphics').style.display = 'block';
	//document.getElementById('main_parameter').style.display = 'block';
	document.getElementById('main_result').style.display = 'none';
	
	document.getElementById('graphics').style.backgroundColor = 'black';
	document.getElementById('params').style.backgroundColor = '#616161 ';
	document.getElementById('result').style.backgroundColor = 'black';
}

function switch2Result() {
	save();
	document.getElementById('main_graphics').style.display = 'none';
	document.getElementById('main_parameter').style.display = 'none';
	document.getElementById('main_result').style.display = 'block';
	
	document.getElementById('graphics').style.backgroundColor = 'black';
	document.getElementById('params').style.backgroundColor = 'black';
	document.getElementById('result').style.backgroundColor = '#616161 ';
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
		this.model = new PhysicalConnection();
		this.element = connectorElement.cloneNode(true);
		this.model.name = `Connector_${nextUid}`;
		this.model.id = nextUid++;
		connections[this.name] = this;
	}
	else {
		this.element = connectorStreamElement.cloneNode(true);
		this.model = new StreamConnection();
		this.model.name = `Stream_${streamUid}`;
		this.model.id = streamUid++;
		streams[this.model.name] = this;
	}
	selectedStream = this;
	//this.Vlan = 5;
	//this.VlanShortCut = "BK";
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
	//this.tsnProperties = new TSNProperties();
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

	var p0x = 0;
	var p0y = 0;

	var p1x = 0;
	var p1y = 0;
	
	var p2x = 0;
	var p2y = 0;
	
	var p3x = 0;
	var p3y = 0;
	
	var p4x = 0;
	var p4y = 0;
	
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
	this.path.setAttribute("id", this.id);
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
	//	this.inputHandle.setAttribute("x", port.global.x);
	//	this.inputHandle.setAttribute("y", port.global.y);
		
		this.inputHandle.setAttribute("transform", "matrix(1, 0, 0, 1, " + port.global.x + ", " + port.global.y + ")");
		this.inputHandle._gsTransform.x = port.global.x;
		this.inputHandle._gsTransform.y = port.global.y;


    } else if (port === this.inoutputPort) {
		this.inoutputHandle.setAttribute("transform", "matrix(1, 0, 0, 1, " + port.global.x + ", " + port.global.y + ")");
		this.inoutputHandle._gsTransform.x = port.global.x;
		this.inoutputHandle._gsTransform.y = port.global.y;
		
    //  TweenLite.set(this.inoutputHandle, {
    //    x: port.global.x,
    //    y: port.global.y });

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

     //   const ports = this.isInput ? device.inoutputs : device.inputs;
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
	//  properties.addConnector(this);
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

    this.id = `port_${++nextUid}`;
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
  
/*
class TSNProperties {
	constructor() {
		this.vLan = "";
		this.streamId = "";
	}
}*/


//
// DIAGRAM
// ===========================================================================
class Diagram {

  constructor() {

    this.dragElement = this.element = diagramElement;

    this.target = null;
    this.dragType = null;

    this.dragTarget = this.dragTarget.bind(this);
    this.prepareTarget = this.prepareTarget.bind(this);
    this.stopDragging = this.stopDragging.bind(this);

    this.draggable = new Draggable(dragProxy, {
      allowContextMenu: true,
      trigger: svg,
      onDrag: this.dragTarget,
      onDragEnd: this.stopDragging,
      onPress: this.prepareTarget });

  }
  
  stopDragging() {
    if(this.target != undefined) {
      this.target.onDragEnd && this.target.onDragEnd();
	}
  }

  prepareTarget(event) {

    let element = event.target;
    let drag;

    while (!(drag = element.getAttribute("data-drag")) && element !== svg) {
      element = element.parentNode;
    }

    drag = drag || "diagram:diagram";
    const split = drag.split(":");
    const id = split[0];
    const dragType = split[1];

    switch (dragType) {
      case "diagram":
        this.target = this;
		//let device = new ETHDeviceView("BTech Switch", 4, null);
		//device.add(4);
        break;

      case "ethdevice":
        this.target = deviceLookup[id];
	//	this.target.device.type = this.target.device.name;
		properties.setDeviceProperties(this.target.device);
        break;

      case "port":
        const port = portLookup[id];
		console.log("create connector!");
        port.createConnector();
        this.target = port.lastConnector;
        this.dragType = this.target.dragType;
        break;

      case "connector":
        this.target = connectorLookup[id];
        break;
	}

  }

  dragTarget() {
	  if(this.target.dragType == "ethdevice") {
		  // eth device
		this.target.actDeviceModel.x += this.draggable.deltaX;
		this.target.actDeviceModel.y += this.draggable.deltaY;
		this.target.dragElement.setAttribute("transform", "matrix(1, 0, 0, 1, " + this.target.actDeviceModel.x + ", " + this.target.actDeviceModel.y + ")");
	  }
	  else if(this.target.dragType == "connector" && this.target.dragElement._gsTransform != undefined){
		  // connection
		  this.target.dragElement._gsTransform.x += this.draggable.deltaX;
		  this.target.dragElement._gsTransform.y += this.draggable.deltaY;
		  this.target.dragElement.setAttribute("transform", "matrix(1, 0, 0, 1, " + this.target.dragElement._gsTransform.x + ", " + this.target.dragElement._gsTransform.y + ")");
	//	TweenLite.set(this.target.dragElement, {
	//		x: `+=${this.draggable.deltaX}`,
	//		y: `+=${this.draggable.deltaY}` });
	  }

    this.target.onDrag && this.target.onDrag();
  }}

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
let streamUid = 1;

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
	diagram = new Diagram();
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
