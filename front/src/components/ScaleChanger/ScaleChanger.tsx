import { observer } from "mobx-react-lite";
import React from "react";
import { scaleStore } from "../../stores/ScaleStore/ScaleStore";

const ScaleChanger: React.FC = observer(() => {
  return (
    <div data-component="ScaleChanger">
      <button onClick={scaleStore.stepDown}>-</button>
      <span>{Number(scaleStore.scale * 100).toFixed(0)}</span>
      <button onClick={scaleStore.stepUp}>+</button>
    </div>
  );
});

export default ScaleChanger;
