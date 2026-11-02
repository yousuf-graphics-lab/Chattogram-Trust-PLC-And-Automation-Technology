import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { DatabaseProvider, useDatabase } from "../context/DatabaseContext";
import { readSlice, STORAGE_KEYS, writeSlice } from "../lib/storage";
import { SEED_NOTICES } from "../data/seed";
import { isAdminAuthenticated, loginAdmin, logoutAdmin } from "../lib/auth";

const wrapper = ({ children }: { children: ReactNode }) => (
  <DatabaseProvider>{children}</DatabaseProvider>
);
const input = {
  studentName: "Test Student",
  mobile: "+8801712345678",
  courseId: "plc-foundation",
  senderNumber: "01612345678",
  transactionId: "AB12CD34EF",
};

describe("local enrollment persistence", () => {
  it("stores normalized data with the exact course fee and prepares the requested WhatsApp message", () => {
    const { result } = renderHook(() => useDatabase(), { wrapper });
    let saved: ReturnType<typeof result.current.addEnrollment> | undefined;
    act(() => {
      saved = result.current.addEnrollment(input);
    });
    expect(saved?.enrollment?.status).toBe("pending");
    expect(saved?.enrollment?.fee).toBe(8000);
    expect(saved?.enrollment?.mobile).toBe("01712345678");
    expect(result.current.enrollments).toHaveLength(1);
    expect(readSlice("enrollments")).toHaveLength(1);
    const url = new URL(saved!.whatsappUrl!);
    expect(url.origin + url.pathname).toBe("https://wa.me/8801646241953");
    expect(url.searchParams.get("text")).toContain("Test Student");
    expect(url.searchParams.get("text")).toContain("TrxID: AB12CD34EF");
    expect(url.searchParams.get("text")).toContain("অনুগ্রহ করে কনফার্ম করুন।");
  });
  it("rejects duplicate transactions and invalid input without writing", () => {
    const { result } = renderHook(() => useDatabase(), { wrapper });
    act(() => {
      result.current.addEnrollment(input);
    });
    act(() => {
      expect(
        result.current.addEnrollment({ ...input, transactionId: "ab12cd34ef" })
          .errors?.transactionId,
      ).toContain("already recorded");
    });
    act(() => {
      expect(
        result.current.addEnrollment({ ...input, mobile: "123" }).errors
          ?.mobile,
      ).toBeTruthy();
    });
    expect(result.current.enrollments).toHaveLength(1);
  });
  it("does not report a save when browser storage fails", () => {
    const { result } = renderHook(() => useDatabase(), { wrapper });
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      });
    act(() => {
      expect(result.current.addEnrollment(input).message).toContain(
        "not saved",
      );
    });
    expect(result.current.enrollments).toHaveLength(0);
    spy.mockRestore();
  });
  it("updates admin status without losing the payment record", () => {
    const { result } = renderHook(() => useDatabase(), { wrapper });
    act(() => {
      result.current.addEnrollment(input);
    });
    act(() => {
      result.current.update("enrollments", (current) =>
        current.map((entry) => ({ ...entry, status: "confirmed" })),
      );
    });
    expect(readSlice("enrollments")[0].status).toBe("confirmed");
    expect(readSlice("enrollments")[0].transactionId).toBe("AB12CD34EF");
  });
  it("recovers safely from corrupt stored JSON", () => {
    localStorage.setItem(STORAGE_KEYS.notices, "{invalid");
    expect(readSlice("notices")).toEqual(SEED_NOTICES);
  });
  it("rejects malformed records instead of rendering untrusted content", () => {
    localStorage.setItem(
      STORAGE_KEYS.notices,
      JSON.stringify([{ id: "bad", title: "Missing fields" }]),
    );
    expect(readSlice("notices")).toEqual(SEED_NOTICES);
    expect(() =>
      writeSlice("notices", [
        { ...SEED_NOTICES[0], category: "unknown" } as never,
      ]),
    ).toThrow();
  });
  it("publishes content changes and supports clearing a collection", () => {
    const { result } = renderHook(() => useDatabase(), { wrapper });
    act(() =>
      result.current.update("content", {
        ...result.current.content,
        announcement: "New admission update",
      }),
    );
    expect(readSlice("content").announcement).toBe("New admission update");
    act(() => result.current.update("notices", []));
    expect(result.current.notices).toEqual([]);
  });
});

describe("local admin session", () => {
  it("accepts the requested credentials and expires after two hours", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-02T12:00:00Z"));
    expect(loginAdmin("TrustPlc12", "wrong")).toBe(false);
    expect(loginAdmin("TrustPlc12", "TrustPlc01")).toBe(true);
    expect(isAdminAuthenticated()).toBe(true);
    vi.advanceTimersByTime(2 * 60 * 60 * 1000 + 1);
    expect(isAdminAuthenticated()).toBe(false);
  });
  it("signs out and rejects forged expiry values", () => {
    expect(loginAdmin("TrustPlc12", "TrustPlc01")).toBe(true);
    logoutAdmin();
    expect(isAdminAuthenticated()).toBe(false);
    sessionStorage.setItem(
      STORAGE_KEYS.session,
      JSON.stringify({ expiresAt: Date.now() + 1e10 }),
    );
    expect(isAdminAuthenticated()).toBe(false);
  });
});
