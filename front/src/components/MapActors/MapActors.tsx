import { observer } from "mobx-react-lite";
import React from "react";

import classNames from "classnames";
import { frameStore as frame } from "../../stores/FrameStore/FrameStore";
import { mapActorsStore } from "../../stores/MapActorsStore/MapActorsStore";
import { mapPositionStore as position } from "../../stores/MapPositionStore/MapPositionStore";
import styles from "./MapActors.module.scss";

const MapActors: React.FC = observer(() => {
  const gap = 1;

  return (
    <>
      {mapActorsStore.actors?.map((actor, idx) => {
        const x = -1 * position.x + actor.y * frame.frameSize + gap;
        const y = position.y + actor.x * frame.frameSize + gap;
        const width = frame.frameSize - gap;
        const height = frame.frameSize - gap;
        return (
          <div
            className={classNames(
              styles.actor,
              actor.isClickable ? styles.clickable : undefined,
              actor.isMoving ? styles.moving : undefined
            )}
            key={idx}
            style={{
              left: x + "px",
              top: y + "px",
              width: width + "px",
              height: height + "px",
            }}
            onMouseDown={(e) => {
              if (actor.isClickable) {
                e.stopPropagation();
              }
            }}
            onClick={() => {
              if (actor.isClickable) {
                console.log("click", actor.id);
                actor.toggleIsMoving();
              }
            }}
          ></div>
        );
      })}
    </>
  );
});

export default MapActors;
