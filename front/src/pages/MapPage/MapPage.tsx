import { observer } from "mobx-react-lite";

import { useState } from "react";
import AddMapBlock from "../../components/AddMapBlock/AddMapBlock";
import Frame from "../../components/Frame/Frame";
import MapActors from "../../components/MapActors/MapActors";
import MapModeSelector from "../../components/MapModeSelector/MapModeSelector";
import MapPositionChanger from "../../components/MapPositionChanger/MapPositionChanger";
import ScaleChanger from "../../components/ScaleChanger/ScaleChanger";
import MapLayout from "../../components/layouts/MapLayout/MapLayout";
import { mapPositionStore } from "../../stores/MapPositionStore/MapPositionStore";
import styles from "./MapPage.module.scss";

const MapPage = observer(() => {
  const [isMovable, setIsMovable] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  return (
    <MapLayout
      widgets={{
        left: <ScaleChanger />,
        right: <div>sdqwd qwd123 123r123 </div>,
        bottomRight: <MapPositionChanger />,
        topCenter: <MapModeSelector />,
      }}
    >
      <div
        className={styles.map}
        onMouseDown={(e) => {
          setIsMovable(true);
          setStartPosition({
            x: e.clientX,
            y: e.clientY,
          });
        }}
        onTouchStart={(e) => {
          console.log(
            "onTouchStart",
            e.touches[0].clientX,
            e.touches[0].clientY
          );
        }}
        onMouseUp={() => {
          setIsMovable(false);
        }}
        onMouseMove={async (e) => {
          if (isMovable) {
            mapPositionStore.movePosition({
              x: -1 * (e.clientX - startPosition.x),
              y: -1 * (e.clientY - startPosition.y),
            });
            setStartPosition({
              x: e.clientX,
              y: e.clientY,
            });
          }
        }}
        onTouchMove={(e) => {
          console.log("onTouchMove", e);
        }}
      >
        <Frame />
        <MapActors />
        <AddMapBlock />
      </div>
    </MapLayout>
  );
});

export default MapPage;
