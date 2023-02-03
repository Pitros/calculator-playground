import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";

interface Props<T> {
  children: T;
  onClick: (value: T) => void;
}

const Button = <T extends string>({ children, onClick }: Props<T>) => {
  const handleClick = () => {
    onClick(children);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
