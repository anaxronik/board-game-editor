import { observer } from "mobx-react-lite";
import React from "react";

import { frameStore as frame } from "../../stores/FrameStore/FrameStore";
import { mapPositionStore as position } from "../../stores/MapPositionStore/MapPositionStore";
import styles from "./MapActors.module.scss";

const MapActors: React.FC = observer(() => {
  const gap = 1;
  const actors: { x: number; y: number }[] = [
    { x: 1, y: 2 },
    { x: 2, y: -3 },
    { x: 4, y: 6 },
    { x: 7, y: 4 },
    { x: 1, y: 7 },
  ];

  return (
    <>
      {actors.map((actor, idx) => {
        const x = -1 * position.x + actor.y * frame.frameSize + gap;
        const y = position.y + actor.x * frame.frameSize + gap;
        const width = frame.frameSize - gap;
        const height = frame.frameSize - gap;
        return (
          <div
            title={[
              `x=${x}`,
              `y=${y}`,
              `width=${width}`,
              `height=${height}`,
            ].join("\n")}
            className={styles.actor}
            key={idx}
            style={{
              left: x + "px",
              top: y + "px",
              width: width + "px",
              height: height + "px",
            }}
          ></div>
        );
      })}
    </>
  );
});

export default MapActors;
