import { FC, useReducer } from "react";
import Button from "../Button";

type MathSymbols = "*" | "/" | "+" | "-";
type Keys = (typeof keys)[number];
const mathSymbols: Keys[] = ["*", "/", "-", "+"];

interface ReducerState {
  currentValue: string;
  previousValue: number;
  operation: null | MathSymbols;
  lastInput: null | Keys;
}

const keys = [
  "c",
  "ce",
  "+/-",
  "%",
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "+",
  "=",
] as const;

const initialState: ReducerState = {
  currentValue: "0",
  previousValue: 0,
  operation: null,
  lastInput: null,
};

const doMath = (valueA: number, valueB: number, symbol: MathSymbols) => {
  switch (symbol) {
    case "*":
      return `${valueA * valueB}`;
    case "/":
      return `${valueA / valueB}`;
    case "+":
      return `${valueA + valueB}`;
    case "-":
      return `${valueA - valueB}`;
  }
};

const Calculator: FC = () => {
  const [{ currentValue }, handleClick] = useReducer(
    (state: ReducerState, action: Keys): ReducerState => {
      const newState: ReducerState = { ...state, lastInput: action };
      switch (action) {
        case "*":
        case "/":
        case "+":
        case "-": {
          newState.operation = action;
          newState.previousValue = Number(state.currentValue);
          break;
        }
        case "+/-":
          state.currentValue =
            state.currentValue.at(0) === "-"
              ? state.currentValue.substring(1)
              : `-${state.currentValue}`;
          break;
        case "ce":
          newState.currentValue = state.currentValue.substring(
            0,
            state.currentValue.length - 1
          );
          break;
        case "c":
          newState.currentValue = "0";
          break;
        case "%":
          newState.currentValue = (Number(state.currentValue) / 100).toString();
          break;
        case "=": {
          if (state.operation) {
            // repeating previous operation
            if (state.lastInput === "=") {
              newState.previousValue = state.previousValue;
              newState.currentValue = doMath(
                Number(state.currentValue),
                state.previousValue,
                state.operation
              );
              break;
            }

            newState.previousValue = Number(state.currentValue);
            newState.currentValue = doMath(
              state.previousValue,
              Number(state.currentValue),
              state.operation
            );
            newState.operation = state.operation;
            break;
          }
        }
        default: {
          newState.currentValue =
            state.currentValue === "0" ||
            (state.lastInput && mathSymbols.includes(state.lastInput))
              ? action
              : `${state.currentValue}${action}`;
        }
      }

      return newState;
    },
    initialState
  );

  return (
    <div style={{ width: 500, fontSize: 25, border: "2px solid #000" }}>
      <div
        style={{
          textAlign: "right",
          background: "#333",
          color: "#fff",
          padding: 15,
        }}
      >
        {currentValue}
      </div>
      <div style={{}}>
        {keys.map((k) => (
          <Button key={k} onClick={handleClick}>
            {k}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
