import { useEffect, useState } from "react";
import { api } from "../services/api";

interface CalculatorState {
  status: "LOADING" | "LOADED" | "ERROR";
  keys: string[];
  state: {
    currentValue: string;
    previousValue: number;
    operation: null | string;
    lastInput: string;
  } | null;
}

interface RemoteCalculator {
  display: string;
  isLoaded: boolean;
  isLoading: boolean;
  keys: string[];
  action: (action: string) => void;
}

const useRemoteCalculator = (): RemoteCalculator => {
  const [{ keys, state, status }, setState] = useState<CalculatorState>({
    status: "LOADING",
    keys: [],
    state: null,
  });

  useEffect(() => {
    api("/calculator")
      .then((data) => {
        setState((oldState) => ({
          ...oldState,
          status: "LOADED",
          state: data.initialState,
          keys: data.keys,
        }));
      })
      .catch((err) => {
        setState((oldState) => ({ ...oldState, status: "ERROR" }));
      });
  }, []);

  const handleAction = (action: string) => {
    api("/calculator/action", { method: "POST", json: { state, action } })
      .then((data) => {
        setState((oldState) => ({
          ...oldState,
          state: data,
        }));
      })
      .catch(() => {
        setState((oldState) => ({ ...oldState, status: "ERROR" }));
      });
  };

  if (!state) {
    return {
      display: status === "ERROR" ? "Could not init" : "Loading...",
      isLoaded: status === "LOADED",
      isLoading: status === "LOADING",
      keys: [],
      action: () => {},
    };
  }

  return {
    display: state.currentValue,
    isLoaded: status === "LOADED",
    isLoading: status === "LOADING",
    keys: keys,
    action: handleAction,
  };
};

export default useRemoteCalculator;
