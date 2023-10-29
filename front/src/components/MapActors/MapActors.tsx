import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import classNames from "classnames";
import img from "../../assets/images/flor.jpg";
import { frameStore as frame } from "../../stores/FrameStore/FrameStore";
import { mapActorsStore } from "../../stores/MapActorsStore/MapActorsStore";
import { mapPositionStore } from "../../stores/MapPositionStore/MapPositionStore";
import styles from "./MapActors.module.scss";

const MapActors: React.FC = observer(() => {
  useEffect(() => {
    mapActorsStore.recalculateVisibleActor();
  }, [mapPositionStore.x, mapPositionStore.y]);

  return (
    <>
      {mapActorsStore.visibleActor?.map((actor, idx) => {
        const pos = frame.getCellByCellCoords({
          x: actor.cellX,
          y: actor.cellY,
        });
        const width = frame.frameSize;
        const height = frame.frameSize;
        return (
          <div
            className={classNames(
              styles.actor,
              actor.isClickable ? styles.clickable : undefined,
              actor.isMoving ? styles.moving : undefined
            )}
            key={idx}
            style={{
              position: "absolute",
              overflow: "hidden",
              left: pos.left + "px",
              top: pos.top + "px",
              width: width + "px",
              height: height + "px",
              backgroundImage: `url(${img})`,
              objectFit: "cover",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
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
