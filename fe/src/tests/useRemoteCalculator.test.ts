import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRemoteCalculator } from "../hooks";
import * as apiService from "../services/api";

describe("useCalendar hook", () => {
  const initialData = {
    keys: ["1"],
    initialState: {
      currentValue: "0",
      previousValue: 0,
      operation: null,
      lastInput: "0",
    },
  };

  it("should display 0 after load", async () => {
    vi.spyOn(apiService, "api").mockImplementation(() =>
      Promise.resolve(initialData)
    );

    const { result } = await act(() => renderHook(() => useRemoteCalculator()));

    await waitFor(() => expect(result.current.display).toBe("0"));
  });

  it("should display error if request fails", async () => {
    vi.spyOn(apiService, "api").mockImplementation(() => Promise.reject());

    const { result } = renderHook(() => useRemoteCalculator());

    await waitFor(() => expect(result.current.display).toBe("Could not init"));
  });

  it("should call api on action and display new value", async () => {
    const fn = vi
      .spyOn(apiService, "api")
      .mockImplementation(() => Promise.resolve(initialData));

    const { result } = renderHook(() => useRemoteCalculator());

    await waitFor(() => expect(result.current.display).toBe("0"));

    fn.mockImplementation(() =>
      Promise.resolve({ ...initialData.initialState, currentValue: "1" })
    );

    result.current.action("1");

    expect(fn).toHaveBeenLastCalledWith("/calculator/action", {
      method: "POST",
      json: { action: "1", state: initialData.initialState },
    });

    await waitFor(() => expect(result.current.display).toBe("1"));
  });
});
