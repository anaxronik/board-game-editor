import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

import { throttle } from "lodash";
import { MAX_FRAME_RENDER_TIME } from "../../../constants/COMMON";
import { mapPositionStore } from "../../../stores/MapPositionStore/MapPositionStore";
import styles from "./MapMover.module.scss";

const MapMover: React.FC = observer(() => {
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const moveMap = throttle((newPosition: { x: number; y: number }) => {
    mapPositionStore.setPosition({
      x: Math.round(newPosition.x),
      y: Math.round(newPosition.y),
    });
  }, MAX_FRAME_RENDER_TIME);

  useEffect(() => {
    const listener = () => {};
    const eventName = "wheel";
    addEventListener(eventName, (e) => {
      const MODIFIER = 0.4;
      const newPosition = {
        x: mapPositionStore.x + e.deltaX * MODIFIER,
        y: mapPositionStore.y + e.deltaY * MODIFIER * -1,
      };
      moveMap(newPosition);
    });
    return () => {
      removeEventListener(eventName, listener);
    };
  }, [moveMap]);

  return (
    <div
      className={styles.mover}
      onMouseDown={(e) => {
        console.log("onMouseDown");

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
    ></div>
  );
});

export default MapMover;
