// dragging functions

const Drag = (() => {
  
  function updatePosition(element, x, offsetX, y, offsetY) {
    const menuWidth = document.querySelector('.w3-bar-block').getBoundingClientRect().width;
    if (element !== null) {
      element.setAttribute('x', x - offsetX - menuWidth - 40);
      element.setAttribute('y', y - offsetY);
    }
  };

  function getOffset(measurement, offset, clientPosition) {
    return measurement - (measurement + offset - clientPosition);
  };

  return {
    dragNode(e) {
      let nodeContainer = null;
      // find node container
      nodeContainer = e.target.parentElement.parentElement;
      if (nodeContainer.classList.contains('node-container')) {

        const rect = nodeContainer.getBoundingClientRect();

        const offsetX = getOffset(rect.width, rect.x, e.clientX);
        const offsetY = getOffset(rect.height, rect.y, e.clientY);

        document.addEventListener('mousemove', function (e) {
          updatePosition(nodeContainer, e.clientX, offsetX, e.clientY, offsetY)
        });

        document.addEventListener('mouseup', function () {
          nodeContainer = null;
        });
      };
    }
  }


})();

