import { calculatorAction, initialState } from "../calculator/service";

describe("calculator service", () => {
  it("should start with 0", () => {
    expect(initialState.currentValue).toBe("0");
  });

  it("should do the basic 2+2", () => {
    const commands = ["2", "+", "2", "="] as const;

    let state = initialState;

    commands.forEach((action) => {
      state = calculatorAction({ action, state });
    });

    expect(state.currentValue).toBe("4");
  });

  it("should allow repeating with = sign", () => {
    // prettier-ignore
    const commands = ["2", "+", "2", "=", "=", "=", "/", "2", "=", "="] as const;

    let state = initialState;

    commands.forEach((action) => {
      state = calculatorAction({ action, state });
    });

    expect(state.currentValue).toBe("2");
  });

  it("should allow doing math with current input with = sign", () => {
    const commands = ["2", "+", "=", "="] as const;

    let state = initialState;

    commands.forEach((action) => {
      state = calculatorAction({ action, state });
    });

    expect(state.currentValue).toBe("6");
  });

  it("should allow doing math with current input with = sign", () => {
    const commands = ["9", "8", "+", "2", "/", "="] as const;

    let state = initialState;

    commands.forEach((action) => {
      state = calculatorAction({ action, state });
    });

    expect(state.currentValue).toBe("1");
  });

  it("when divided by 0 should return infinity", () => {
    const commands = ["2", "/", "0", "="] as const;

    let state = initialState;

    commands.forEach((action) => {
      state = calculatorAction({ action, state });
    });

    expect(state.currentValue).toBe("Infinity");
  });

  it("ce should clear single sign", () => {
    const commands = ["2", ".", "0", "5", "5", "ce"] as const;

    let state = initialState;

    commands.forEach((action) => {
      state = calculatorAction({ action, state });
    });

    expect(state.currentValue).toBe("2.05");
  });

  it("c should clear whole current input", () => {
    const commands = ["2", "+", "1", "5", "c", "4", "="] as const;

    let state = initialState;

    commands.forEach((action) => {
      state = calculatorAction({ action, state });
    });

    expect(state.currentValue).toBe("6");
  });

  it("should not allow multiple dots", () => {
    const commands = [".", ".", "2", ".", ".", "."] as const;

    let state = initialState;

    commands.forEach((action) => {
      state = calculatorAction({ action, state });
    });

    expect(state.currentValue).toBe("0.2");
  });
});
