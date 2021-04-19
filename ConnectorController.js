// ===========================================================================
class ConnectorController {

    constructor(connectionCategory) {
  
      this.dragType = "connector";
      this.isSelected = false;
      
      this.connectionCategory = connectionCategory;
      if(connectionCategory == "cable") {
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
      if(connectionCategory == "cable") {
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
  
      if(this.connectionCategory == "cable")
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
      delete connections[this.model.name];
//        if (index > -1) connections.splice(index, 1);
    }
  
    onDrag() {
      if(this.connectionCategory == "cable")
          this.updatePath();
      else
          this.updatePathLogical();
    }
  
    onDragEnd() {
      this.placeHandle();
    }
}