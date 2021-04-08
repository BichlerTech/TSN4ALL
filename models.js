//
// NODE SHAPE
// =========================================================================== 
class ETHDeviceModel {

  constructor(name, id, type, category, portcount, ports, x, y) {
    this.name = name;
	this.id = id;
	this.type = type;
	this.category = category;
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
		this.length   = 0;								// cable length
		this.quality  = 0;								// unused
		this.connectionType = "physical";
	}
}

class StreamConnection {
	constructor() {
		this.name = "";
		this.id = "";
		this.dragType = "connector";
		this.connectionType = "physical";
		this.vLan = 1;
		this.vLanId = 0;
		this.period = 800;
		this.deadline = 1000;
		this.dataSize = 50;
	}
}
