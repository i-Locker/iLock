import React, { useState } from "react";
import "./Hoverable.css";

function HoverableComponent() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <>
      <div
        className="hoverableDiv"
        onMouseEnter={() => {
          setShowMessage(true);
        }}
        onMouseLeave={() => {
          setShowMessage(false);
        }}
      >
        Hover me!
      </div>
      {showMessage && <h1>Hello, World!</h1>}
    </>
  );
}

export default HoverableComponent;
