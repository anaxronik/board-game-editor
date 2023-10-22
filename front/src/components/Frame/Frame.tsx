import { observer } from "mobx-react-lite";
import React from "react";
import { frameStore } from "../../stores/FrameStore/FrameStore";

import cn from "classnames";
import styles from "./Frame.module.scss";

const Frame: React.FC = observer(() => {
  const OFFSET = 0.5;
  return (
    <>
      {frameStore.horizontalLines.map((y, idx) => (
        <div
          key={idx}
          className={cn(styles.line, styles.horizontal)}
          style={{ top: y - OFFSET + "px" }}
        ></div>
      ))}
      {frameStore.verticalLines.map((x, idx) => (
        <div
          key={idx}
          className={cn(styles.line, styles.vertical)}
          style={{ left: x - OFFSET + "px" }}
        ></div>
      ))}
    </>
  );
});

export default Frame;
