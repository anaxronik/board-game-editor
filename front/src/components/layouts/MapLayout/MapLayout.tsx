import { observer } from "mobx-react-lite";
import React from "react";

interface IProps {
  children?: React.ReactNode;

  widgets?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
    bottomRight?: React.ReactNode;
    topCenter?: React.ReactNode;
  };
}

import classNames from "classnames";
import styles from "./MapLayout.module.scss";

const MapLayout: React.FC<IProps> = observer((props) => {
  const widgets = props.widgets ? Object.entries(props.widgets) : [];

  return (
    <div className={styles.layout}>
      {props.children}

      {widgets?.map(([key, component]) => (
        <div className={classNames(styles.widget, styles[key])} key={key}>
          {component}
        </div>
      ))}
    </div>
  );
});

export default MapLayout;
