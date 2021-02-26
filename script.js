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

function save() {
	var devices_=document.getElementById("diagram");
	alert(devices_.innerHTML);
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
	//document.getElementById('main_graphics').style.display = 'block';
	//document.getElementById('main_parameter').style.display = 'none';
	document.getElementById('main_result').style.display = 'none';
	setPhysical();
	
	document.getElementById('graphics').style.backgroundColor = '#616161 ';
	document.getElementById('params').style.backgroundColor = 'black';
	document.getElementById('result').style.backgroundColor = 'black';
}

function switch2Logical() {
	setLogical();
	//document.getElementById('main_graphics').style.display = 'none';
	//document.getElementById('main_parameter').style.display = 'block';
	document.getElementById('main_result').style.display = 'none';
	
	document.getElementById('graphics').style.backgroundColor = 'black';
	document.getElementById('params').style.backgroundColor = '#616161 ';
	document.getElementById('result').style.backgroundColor = 'black';
}

function switch2Result() {
	//document.getElementById('main_graphics').style.display = 'none';
	//document.getElementById('main_parameter').style.display = 'none';
	//document.getElementById('main_result').style.display = 'block';
	
	//document.getElementById('graphics').style.backgroundColor = 'black';
	//document.getElementById('params').style.backgroundColor = 'black';
	//document.getElementById('result').style.backgroundColor = '#616161 ';
}

// add a new EthDevice
class ETHDeviceView {
	/*
	constructor(name, ports, args) {
		this.id = `ethdevview_${++nextUid}`;
		this.name = name;
		this.ports = ports;
		this.arguments = args;
	}*/
	
	constructor(device) {
		this.id = `ethdevview_${++nextUid}`;
		this.name = device.name;
		this.portcount = device.portcount;
		this.ports = device.ports;
		this.device = device;
	}
	
	addShape(element) {
	  const device_ = new ETHDevice(element, 50, 50, this.device);
	  shapeLookup[device_.id] = device_;
      devices.push(device_);
	}
  
	add() {
		var rootg = document.createElementNS("http://www.w3.org/2000/svg", "g");
        rootg.setAttribute('class','node-container');
		var root=document.getElementById("node-layer");
		root.appendChild(rootg);
		
		shapeElements.push(rootg);
		
		// create node header
		var header = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		header.setAttribute('class','node-background');
		header.setAttribute('width','124');
		header.setAttribute('height', (this.portcount - 1)*25 + 78);
		header.setAttribute('rx','6');
		header.setAttribute('ry','6');
		rootg.appendChild(header);
		
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		g.setAttribute('class','node-header');
		rootg.appendChild(g);
		
		var irect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		irect.setAttribute('class','header-round-rect');
		irect.setAttribute('width','120');
		irect.setAttribute('height','40');
		irect.setAttribute('x','2');
		irect.setAttribute('y','2');
		irect.setAttribute('rx','4');
		irect.setAttribute('ry','4');
		g.appendChild(irect);
		
		irect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		irect.setAttribute('class','header-rect');
		irect.setAttribute('width','120');
		irect.setAttribute('height','36');
		irect.setAttribute('x','2');
		irect.setAttribute('y','6');
		g.appendChild(irect);
		
		var itext = document.createElementNS("http://www.w3.org/2000/svg", "text");
		itext.setAttribute('class','header-title');
		itext.setAttribute('x','62');
		itext.setAttribute('y','30');
		itext.innerHTML = this.name;
		g.appendChild(itext);
		
		g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		g.setAttribute('class','node-content');
		rootg.appendChild(g);
		
		irect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		irect.setAttribute('class','content-round-rect');
		irect.setAttribute('width','120');
		irect.setAttribute('height', (this.portcount - 1)*25 + 32);
		irect.setAttribute('x','2');
		irect.setAttribute('y','44');
		irect.setAttribute('rx','4');
		irect.setAttribute('ry','4');
		g.appendChild(irect);
		
		irect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		irect.setAttribute('class','content-rect');
		irect.setAttribute('width','120');
		irect.setAttribute('height',(this.portcount - 1)*25 + 27);
		irect.setAttribute('x','2');
		irect.setAttribute('y','44');
		g.appendChild(irect);
		
		this.addIOputs(g);
		
		this.addShape(rootg);
	}
	
	addIOputs(root) {
		var inputs = document.createElementNS("http://www.w3.org/2000/svg", "g");
		inputs.setAttribute('class', 'inoutputs');
		root.appendChild(inputs);
		var i;
		
		for (i = 1; i <= this.portcount; i++) { 
			this.addIO(inputs, this.ports[i-1], i);
		}
	}
	
	addIO(ios, port, index) {
		var input = document.createElementNS("http://www.w3.org/2000/svg", "g");
		input.setAttribute('class', 'inoutput-field');
		input.setAttribute('transform', 'translate(0, ' + (25 + 25*index) + ')');
		ios.appendChild(input);
		var innerinput = document.createElementNS("http://www.w3.org/2000/svg", "g");
		innerinput.setAttribute('class', 'port');
		innerinput.setAttribute('data-clickable', 'false');
		input.appendChild(innerinput);
		
		var oport = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		oport.setAttribute('class', 'port-outer');
		oport.setAttribute('cx', '109');
		oport.setAttribute('cy', '10');
		oport.setAttribute('r', '7.5');	
		innerinput.appendChild(oport);
		
		oport = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		oport.setAttribute('class', 'port-inner');
		oport.setAttribute('cx', '109');
		oport.setAttribute('cy', '10');
		oport.setAttribute('r', '5');	
		innerinput.appendChild(oport);
		
		oport = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		oport.setAttribute('class', 'port-scrim');
		oport.setAttribute('cx', '109');
		oport.setAttribute('cy', '10');
		oport.setAttribute('r', '7.5');
		oport.setAttribute('data-clickable', 'false');
		oport.setAttribute('data-drag', 'port_5:port');
		innerinput.appendChild(oport);
		
		var innertext = document.createElementNS("http://www.w3.org/2000/svg", "text");
		innertext.setAttribute('class', 'port-label');
		innertext.setAttribute('x', '96');
		innertext.setAttribute('y', '14');
		innertext.innerHTML = port.name;
		input.appendChild(innertext);
	}
}

//
// CONNECTOR
// ===========================================================================
class Connector {

  constructor(connectionType) {

    this.id = `connector_${++nextUid}`;
    this.dragType = "connector";
    this.isSelected = false;
    this.element = connectorElement.cloneNode(true);
	this.connectionType = connectionType;
	if(connectionType == "physical")
	{
		this.connectonName = `connector_${nextUid}`;
		connections[this.id] = this;
	}
	else {
		this.connectonName = `Stream_${++streamUid}`;
		streams[this.id] = this;
	}
	selectedStream = this;
	this.Vlan = 5;
	this.VlanShortCut = "BK";
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
	this.tsnProperties = new TSNProperties();
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
	
//	const data = `M${p0x} ${p0y} ${p1x} ${p1y} ${p2x} ${p2y} ${p3x} ${p3y} ${p4x} ${p4y}`;
	const data = `${p0x} ${p0y} ${p1x} ${p1y} ${p2x} ${p2y} ${p3x} ${p3y} ${p4x} ${p4y}`;

 //   this.path.setAttribute("d", data);
 //   this.pathOutline.setAttribute("d", data);
	this.path.setAttribute("points", data);
    this.pathOutline.setAttribute("points", data);
  }
  
  updatePathLogical() {

    const x1 = this.inputHandle._gsTransform.x;
    const y1 = this.inputHandle._gsTransform.y;

    const x4 = this.inoutputHandle._gsTransform.x;
    const y4 = this.inoutputHandle._gsTransform.y;

    var dx = 50;//Math.abs(x1 - x4) * bezierWeight;
	
	if(dx > 70)
		dx = 70;
	
	var x = 0;
	
	// test rightmost point
	x1 > x4? x = x1 : x = x4;

    const p1x = x1;
    const p1y = y1;

	const p2x = x + dx;
    const p2y = y1;

 //	const p3x = x1 - dx;
	const p3x = x + dx;
 //   const p3x = x4 + dx;
    const p3y = y4;
	
	const p4x = x4;// + 50;
    const p4y = y4;

    const data = `${p1x} ${p1y} ${p2x} ${p2y} ${p3x} ${p3y} ${p4x} ${p4y}`;

  //  this.path.setAttribute("d", data);
  //  this.pathOutline.setAttribute("d", data);
	this.path.setAttribute("points", data);
    this.pathOutline.setAttribute("points", data);
	this.path.setAttribute("id", this.id);
  }

  updateHandle(port) {

    if (port === this.inputPort) {

      TweenLite.set(this.inputHandle, {
        x: port.global.x,
        y: port.global.y });


    } else if (port === this.inoutputPort) {

      TweenLite.set(this.inoutputHandle, {
        x: port.global.x,
        y: port.global.y });

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
	  properties.addConnector(this);
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
      connector = new Connector(connectionType);
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
  }}

class TSNProperties {
	constructor() {
		this.vLan = "";
		this.streamId = "";
	}
}

//
// NODE SHAPE
// =========================================================================== 
class ETHDevice {

  constructor(element, x, y, device) {

    this.id = `shape_${++nextUid}`;
    this.dragType = "shape";
	this.device = device;

    element.setAttribute("data-drag", `${this.id}:shape`);

    this.element = element;
    this.dragElement = element;

    TweenLite.set(element, { x, y });

    const inputElements = Array.from(element.querySelectorAll(".input-field"));
    const inoutputElements = Array.from(element.querySelectorAll(".inoutput-field"));

    this.inputs = inputElements.map(element => {
      const port = new NodePort(this, element, true);
      portLookup[port.id] = port;
      ports.push(port);
      return port;
    });

    this.inoutputs = inoutputElements.map(element => {
      const port = new NodePort(this, element, false);
      portLookup[port.id] = port;
      ports.push(port);
      return port;
    });
  }

  onDrag() {

    for (let input of this.inputs) {
      input.update();
    }

    for (let inoutput of this.inoutputs) {
      inoutput.update();
    }
  }
}


//
// DIAGRAM
// ===========================================================================
class Diagram {

  constructor() {

    this.dragElement = this.element = diagramElement;

    shapeElements.forEach((element, i) => {
      const device = new ETHDevice(element, 50 + i * 250, 50);
      shapeLookup[device.id] = device;
      devices.push(device);
    });

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

      case "shape":
        this.target = shapeLookup[id];
		this.target.device.type = this.target.device.name;
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

    TweenLite.set(this.target.dragElement, {
      x: `+=${this.draggable.deltaX}`,
      y: `+=${this.draggable.deltaY}` });


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
* all device models
*/
var devices = [];

/*
* actual selected device
*/
var selectedDevice;

//
// APP
// ===========================================================================
let nextUid = 0;
let streamUid = 0;

const bezierWeight = 1.0;

const shapeLookup = {};
const portLookup = {};
const connectorLookup = {};

const ports = []; 
const connectorPool = [];

var svg;
var diagramElement;
var dragProxy;
var frag;
var connectorElement;
var connectorLayer;
var diagram;

frag = document.createDocumentFragment();
frag.appendChild(document.querySelector(".connector"));
connectorElement = frag.querySelector(".connector");
	
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
