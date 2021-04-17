//
// NODE SHAPE
// =========================================================================== 
class ETHDiagramController {

  constructor() {
	this.actDeviceController = undefined;
  }
  
  addEthDevice(device) {
	  device.name = `ethDev_${nextUidDevice}`;
	  device.id = nextUidDevice++;
	  this.actDeviceController = new ETHDeviceController(device);
  }
}

//
// NODE SHAPE
// =========================================================================== 
class ETHDeviceController {

  constructor(device) {
	this.id = device.id;
	this.dragType = "ethdevice";
	if(device.x == undefined || device.x < 0)
		device.x = 50;
	if(device.y == undefined || device.y < 0)
		device.y = 50;
	this.actDeviceModel = new ETHDeviceModel(device.name, device.id, device.type, device.category, device.minGateOpenTime, device.configurationPort, device.switchDelay, device.portcount, device.ports, device.x, device.y);
	this.actDeviceView = new ETHDeviceView(this.actDeviceModel);
	  
	let element = this.actDeviceView.add();
	this.createControlls(element);
	  
	deviceLookup[this.id] = this;
    devices.push(this);
  }
  
  updateName(name) {
	  this.actDeviceModel.name = name;
	  this.actDeviceView.updateCaption();
  }
  
  createControlls(element) {

    element.setAttribute("data-drag", `${this.id}:ethdevice`);

    this.element = element;
    this.dragElement = element;
	var x = this.actDeviceModel.x;
	var y = this.actDeviceModel.y;
	element.setAttribute("transform", "matrix(1, 0, 0, 1, " + x + ","+ y +" )");
//    TweenLite.set(element, { x, y });

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

const maincontroller = new ETHDiagramController();
/*
* all device controllers
*/
var devices = [];
const deviceLookup = {};