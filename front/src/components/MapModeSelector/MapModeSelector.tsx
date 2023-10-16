import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";
import { mapModeStore as store } from "../../stores/MapModeStore/MapModeStore";
import styles from "./MapModeSelector.module.scss";

const MapModeSelector: React.FC = observer(() => {
  return (
    <div className={styles.block}>
      {store.modes.map((m) => (
        <button
          className={classNames(
            styles.button,
            store.activeMode === m ? styles.active : undefined
          )}
          onClick={() => {
            store.setActive(m);
          }}
          key={m.mode}
        >
          {m.mode}
        </button>
      ))}
    </div>
  );
});

export default MapModeSelector;
