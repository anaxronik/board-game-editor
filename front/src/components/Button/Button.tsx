import React from "react";

interface IProps {
  children?: React.ReactNode;
}

import styles from "./Button.module.scss";

const Button: React.FC<IProps> = (props) => {
  return <button className={styles.button}>{props.children}</button>;
};

export default Button;
