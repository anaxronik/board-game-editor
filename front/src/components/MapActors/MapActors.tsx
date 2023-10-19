import { observer } from "mobx-react-lite";
import React from "react";

import classNames from "classnames";
import img from "../../assets/images/flor.jpg";
import { frameStore as frame } from "../../stores/FrameStore/FrameStore";
import { mapActorsStore } from "../../stores/MapActorsStore/MapActorsStore";
import styles from "./MapActors.module.scss";

const MapActors: React.FC = observer(() => {
  return (
    <>
      {mapActorsStore.actors?.map((actor, idx) => {
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
              left: pos.left + "px",
              top: pos.top + "px",
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
          >
            <img src={img} alt="" />
          </div>
        );
      })}
    </>
  );
});

export default MapActors;
