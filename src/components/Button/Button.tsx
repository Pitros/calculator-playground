import styles from "./Button.module.scss";

interface Props<T> {
  children: T;
  onClick: (value: T) => void;
  variant?: "regular" | "dark" | "orange";
}

const Button = <T extends string>({
  children,
  onClick,
  variant = "regular",
}: Props<T>) => {
  const handleClick = () => {
    onClick(children);
  };

  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
