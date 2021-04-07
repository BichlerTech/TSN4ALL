// add a new EthDevice
class ETHDeviceView {
	
	constructor(device) {
		//this.id = `ethdevview_${++nextUid}`;
		this.name = device.name;
		this.portcount = device.portcount;
		this.ports = device.ports;
		this.device = device;
		this.itext = undefined;
	}
	
	updateName(name) {
		this.device.name = name;
		this.name = name;
		this.itext.innerHTML = this.name;
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
		
		this.itext = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.itext.setAttribute('class','header-title');
		this.itext.setAttribute('x','62');
		this.itext.setAttribute('y','30');
		this.itext.innerHTML = this.name;
		g.appendChild(this.itext);
		
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
		return rootg;
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

class ConnectorView {
	constructor() {
	}
}