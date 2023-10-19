import { throttle } from "lodash";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { MAX_FRAME_RENDER_TIME } from "../../constants/COMMON";
import { frameStore } from "../../stores/FrameStore/FrameStore";

const AddMapBlock: React.FC = observer(() => {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const handler = throttle((coords) => {
    const cell = frameStore.getCellByMousePosition(coords);
    setPosition(cell.position);
  }, MAX_FRAME_RENDER_TIME);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const coords = { x: e.clientX, y: e.clientY };
      handler(coords);
    };
    const eventType = "mousemove";
    window.addEventListener(eventType, listener);
    return () => removeEventListener(eventType, listener);
  }, [handler]);

  return (
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        width: frameStore.frameSize + "px",
        height: frameStore.frameSize + "px",
        background: "blue",
      }}
      title={JSON.stringify(position)}
    ></div>
  );
});

export default AddMapBlock;
