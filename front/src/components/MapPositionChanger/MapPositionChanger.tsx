import { observer } from "mobx-react-lite";
import React from "react";

import { mapPositionStore as store } from "../../stores/MapPositionStore/MapPositionStore";
import s from "./MapPositionChanger.module.scss";

const MapPositionChanger: React.FC = observer(() => {
  store;
  return (
    <div className={s.block}>
      <div className={s.row}>
        <button className={s.button} onClick={store.stepUp}>
          up
        </button>
      </div>
      <div className={s.row}>
        <button className={s.button} onClick={store.stepLeft}>
          left
        </button>
        <div className={s.columns}>
          <input
            type="text"
            className={s.input}
            value={store.x}
            onChange={(e) => {
              store.setX(Number(e.target.value));
            }}
          />
          <input
            type="text"
            className={s.input}
            value={store.y}
            onChange={(e) => {
              store.setY(Number(e.target.value));
            }}
          />
        </div>
        <button className={s.button} onClick={store.stepRight}>
          right
        </button>
      </div>
      <div className={s.row}>
        <button className={s.button} onClick={store.stepDown}>
          down
        </button>
      </div>
    </div>
  );
});

export default MapPositionChanger;
