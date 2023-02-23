import { FC } from "react";
import { useCalculator } from "../../hooks";
import Button from "../Button";
import styles from "./Calculator.module.scss";

const Calculator: FC = () => {
  const { keys, action, display } = useCalculator();

  const getButtonVariant = (buttonNumber: number) => {
    const buttonsInRow = 4;

    switch (true) {
      case buttonNumber < buttonsInRow:
        return "dark";
      case buttonNumber % buttonsInRow === 0:
        return "orange";
      default:
        return "regular";
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.display}>{display}</div>
      <div className={styles.buttons}>
        {keys.map((k, i) => (
          <Button key={k} variant={getButtonVariant(i + 1)} onClick={action}>
            {k}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
