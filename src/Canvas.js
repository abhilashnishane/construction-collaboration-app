import React from "react";

const Canvas = ({ draw, height, width, backgroundImage }) => {
  const myCanvas = React.useRef();
  

  function getPosition(event){
      console.log('clientX', event.clientX)
      var rect = myCanvas.current.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
          
      drawCoordinates(x,y);
  }

  function drawCoordinates(x,y){	
      let ctx = myCanvas.current.getContext("2d");
      const pointSize = 5;

      ctx.fillStyle = "#ff2626"; // Red color

      ctx.beginPath();
      ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
      ctx.fill();
  }

  return <canvas ref={myCanvas} className='canvas-style main-img' style={{ backgroundImage: `url(${backgroundImage})`}} onClick={(event) => getPosition(event)} />;
};

export default Canvas;
