import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCalculator } from "../hooks";

describe("useCalendar hook", () => {
  it("should start with 0", () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.display).toBe("0");
  });

  it("should do the basic 2+2", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      const commands = ["2", "+", "2", "="] as const;

      commands.forEach((command) => result.current.action(command));
    });

    expect(result.current.display).toBe("4");
  });

  it("should allow repeating with = sign", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      // prettier-ignore
      const commands = ["2", "+", "2", "=", "=", "=", "/", "2", "=", "="] as const;

      commands.forEach((command) => result.current.action(command));
    });

    expect(result.current.display).toBe("2");
  });

  it("when divided by 0 should return infinity", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      const commands = ["2", "/", "0", "="] as const;

      commands.forEach((command) => result.current.action(command));
    });

    expect(result.current.display).toBe("Infinity");
  });

  it("ce should clear single sign", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      const commands = ["2", ".", "0", "5", "5", "ce"] as const;

      commands.forEach((command) => result.current.action(command));
    });

    expect(result.current.display).toBe("2.05");
  });

  it("c should clear whole current input", () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      const commands = ["2", "+", "1", "5", "c", "4", "="] as const;

      commands.forEach((command) => result.current.action(command));
    });

    expect(result.current.display).toBe("6");
  });
});
