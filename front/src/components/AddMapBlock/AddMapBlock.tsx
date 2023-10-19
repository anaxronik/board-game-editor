import { throttle } from "lodash";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { MAX_FRAME_RENDER_TIME } from "../../constants/COMMON";
import { frameStore } from "../../stores/FrameStore/FrameStore";

import { mapActorsStore } from "../../stores/MapActorsStore/MapActorsStore";
import { mapModeStore } from "../../stores/MapModeStore/MapModeStore";
import styles from "./AddMapBlock.module.scss";

const AddMapBlock: React.FC = observer(() => {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const isEditorMode = mapModeStore.activeMode?.mode === "editor";

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

  if (!isEditorMode) return null;

  return (
    <button
      className={styles.block}
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        width: frameStore.frameSize + "px",
        height: frameStore.frameSize + "px",
      }}
      title={JSON.stringify(position)}
      onClick={(e) => {
        e.stopPropagation();

        const cell = frameStore.getCellByMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
        console.log("click", cell.cell);
        mapActorsStore.addActor({
          cellX: cell.cell.x,
          cellY: cell.cell.y,
        });
      }}
    >
      {mapModeStore.activeMode?.mode}
    </button>
  );
});

export default AddMapBlock;
