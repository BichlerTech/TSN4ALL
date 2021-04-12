//
// NODE SHAPE
// =========================================================================== 
class ETHDeviceModel {

  constructor(name, id, type, category, minGateOpenTime, configurationPort, switchDelay, portcount, ports, x, y) {
    this.name = name;
	this.id = id;
	this.type = type;
	this.category = category;
	this.minGateOpenTime = minGateOpenTime;
	this.configurationPort = configurationPort;
	this.switchDelay = switchDelay;
	this.portcount = portcount;
	this.ports = ports;
	this.x = x;
	this.y = y;
  }
}

class PhysicalConnection {
	constructor() {
		this.name = "";
		this.id = "";
		this.dragType = "connector";
		this.connectionType = "physical";
		this.linkSpeed = 1000;
		this.cableLength = 1.0;	
	}
}

class StreamConnection {
	constructor() {
		this.name = "";
		this.id = "";
		this.dragType = "connector";
		this.connectionType = "physical";
		this.vLan = 1;
		this.period = 800;
		this.deadline = 1000;
		this.dataSize = 50;
		this.vlanId = 0;
	}
}
