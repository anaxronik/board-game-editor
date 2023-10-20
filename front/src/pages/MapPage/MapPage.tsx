import { observer } from "mobx-react-lite";

import { useEffect } from "react";
import AddMapBlock from "../../components/AddMapBlock/AddMapBlock";
import Frame from "../../components/Frame/Frame";
import MapActors from "../../components/MapActors/MapActors";
import MapModeSelector from "../../components/MapModeSelector/MapModeSelector";
import MapPositionChanger from "../../components/MapPositionChanger/MapPositionChanger";
import ScaleChanger from "../../components/ScaleChanger/ScaleChanger";
import MapLayout from "../../components/layouts/MapLayout/MapLayout";
import { mapPageStore as store } from "../../stores/MapPageStore/MapPageStore";
import MapMover from "./MapMover/MapMover";

const MapPage = observer(() => {
  useEffect(() => {
    store.init();
    return store.destroy;
  }, []);

  return (
    <MapLayout
      widgets={{
        left: <ScaleChanger />,
        bottomRight: <MapPositionChanger />,
        topCenter: <MapModeSelector />,
      }}
    >
      <MapMover>
        <Frame />
        <MapActors />
        <AddMapBlock />
      </MapMover>
    </MapLayout>
  );
});

export default MapPage;
