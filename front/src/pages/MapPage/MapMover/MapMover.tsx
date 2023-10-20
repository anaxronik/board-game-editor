import { observer } from "mobx-react-lite";
import React, { useState } from "react";

interface IProps {
  children?: React.ReactNode;
}

import { throttle } from "lodash";
import { MAX_FRAME_RENDER_TIME } from "../../../constants/COMMON";
import { mapPositionStore } from "../../../stores/MapPositionStore/MapPositionStore";
import styles from "./MapMover.module.scss";

const MapMover: React.FC<IProps> = observer((props) => {
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const moveMap = throttle((newPosition: { x: number; y: number }) => {
    mapPositionStore.setPosition(newPosition);
  }, MAX_FRAME_RENDER_TIME);

  return (
    <div
      className={styles.map}
      onMouseDown={(e) => {
        mapPositionStore.setIsMovable(true);
        setStartPosition({
          x: mapPositionStore.x + e.clientX,
          y: mapPositionStore.y - e.clientY,
        });
      }}
      onMouseUp={() => {
        mapPositionStore.setIsMovable(false);
      }}
      onMouseMove={async (e) => {
        if (mapPositionStore.isMovable) {
          const current = {
            x: mapPositionStore.x + e.clientX,
            y: mapPositionStore.y - e.clientY,
          };
          const delta = {
            x: startPosition.x - current.x,
            y: startPosition.y - current.y,
          };
          const newPosition = {
            x: mapPositionStore.x + delta.x,
            y: mapPositionStore.y + delta.y,
          };
          moveMap(newPosition);
        }
      }}
      onWheel={(e) => {
        const MODIFIER = 0.4;
        const newPosition = {
          x: mapPositionStore.x + e.deltaX * MODIFIER,
          y: mapPositionStore.y + e.deltaY * MODIFIER * -1,
        };
        moveMap(newPosition);
      }}
    >
      {props.children}
    </div>
  );
});

export default MapMover;
