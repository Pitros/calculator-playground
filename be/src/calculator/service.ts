// prettier-ignore
export const CalculatorKeys = [
  "c", "ce", "+/-", "%",
  "7", "8", "9", "/",
  "4", "5", "6", "x",
  "1", "2", "3", "-",
  "0", ".", "+", "=",
] as const;

const actionSymbols: Keys[] = ["x", "/", "-", "+", "%", "=", "+/-"];

type Keys = typeof CalculatorKeys[number];
export type MathSymbols = Extract<Keys, "x" | "/" | "+" | "-">;

export const OperationKeys = ["+", "-", "/", "x"] as const;

interface ReducerState {
  currentValue: string;
  previousValue: number;
  operation: null | MathSymbols;
  lastInput: Keys;
}

interface MathType {
  valueA: number;
  valueB: number;
  operation: MathSymbols;
}

export const initialState: ReducerState = {
  currentValue: "0",
  previousValue: 0,
  operation: null,
  lastInput: "0" as Keys,
};

const reverseCalculate = ({ valueA, valueB, operation }: MathType) =>
  calculate({ valueA: valueB, valueB: valueA, operation });

const calculate = ({ valueA, valueB, operation }: MathType) => {
  switch (operation) {
    case "x":
      return `${valueA * valueB}`;
    case "/":
      return `${valueA / valueB}`;
    case "+":
      return `${valueA + valueB}`;
    case "-":
      return `${valueA - valueB}`;
  }
};

export const calculatorAction = ({
  action,
  state,
}: {
  state: ReducerState;
  action: Keys;
}) => {
  const newState: ReducerState = { ...state, lastInput: action };

  switch (action) {
    case "x":
    case "/":
    case "+":
    case "-": {
      newState.operation = action;
      newState.previousValue = Number(state.currentValue);
      break;
    }
    case "+/-":
      if (state.currentValue !== "0") {
        newState.currentValue =
          state.currentValue.at(0) === "-"
            ? state.currentValue.substring(1)
            : `-${state.currentValue}`;
      }
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
        const operationArguments = {
          valueA: state.previousValue,
          valueB: Number(state.currentValue),
          operation: state.operation,
        };

        // repeating previous operation
        if (state.lastInput === "=") {
          newState.currentValue = reverseCalculate(operationArguments);
          break;
        }

        newState.previousValue = Number(state.currentValue);
        newState.currentValue = calculate(operationArguments);
        newState.operation = state.operation;
      }

      break;
    }
    default: {
      if (
        (state.currentValue === "0" && action !== ".") ||
        actionSymbols.includes(state.lastInput)
      ) {
        newState.currentValue = action;
        break;
      }

      if (action === "." && state.currentValue.includes(".")) {
        break;
      }

      newState.currentValue = `${state.currentValue}${action}`;
    }
  }

  return newState;
};
