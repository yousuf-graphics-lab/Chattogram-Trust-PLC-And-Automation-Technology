import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { App } from "../App";
import { DatabaseProvider } from "../context/DatabaseContext";
import { STORAGE_KEYS } from "../lib/storage";
import { loginAdmin } from "../lib/auth";

function appAt(path: string) {
  window.history.pushState({}, "", path);
  return render(
    <BrowserRouter>
      <DatabaseProvider>
        <App />
      </DatabaseProvider>
    </BrowserRouter>,
  );
}
const routes = [
  "/",
  "/courses",
  "/courses/industrial-automation-plc",
  "/skills",
  "/services",
  "/products",
  "/gallery",
  "/about",
  "/contact",
  "/blog",
  "/blog/plc-shikha-shuru-korar-age",
  "/notices",
  "/checkout",
  "/admin/login",
];

describe("public and admin routes", () => {
  it.each(routes)("renders %s with a main heading", async (path) => {
    appAt(path);
    expect(
      await screen.findByRole("heading", { level: 1 }, { timeout: 5000 }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Let’s reconnect.")).not.toBeInTheDocument();
  });
  it("shows a helpful not-found route", async () => {
    appAt("/missing-page");
    expect(
      await screen.findByRole("heading", {
        name: "Let’s get you back on track.",
      }),
    ).toBeInTheDocument();
  });
  it("protects the dashboard from an unauthenticated visit", async () => {
    appAt("/admin/dashboard");
    expect(
      await screen.findByRole("heading", { name: "Welcome back." }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/admin/login");
  });
  it("uses noindex metadata for administrative routes", async () => {
    appAt("/admin/login");
    await screen.findByRole("heading", { name: "Welcome back." });
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  });
});

describe("complete enrollment flow", () => {
  it("validates, records a pending enrollment, and provides a WhatsApp fallback", async () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    const user = userEvent.setup();
    appAt("/checkout?course=industrial-automation-plc");
    await screen.findByRole("heading", { level: 1 });
    await user.click(
      screen.getByRole("button", { name: "Confirm bKash Payment" }),
    );
    expect(
      await screen.findByText("Enter your full name (2–80 characters)."),
    ).toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEYS.enrollments)).toBeNull();
    await user.type(screen.getByLabelText("Student name *"), "Test Student");
    await user.type(screen.getByLabelText("Mobile number *"), "01712345678");
    await user.type(
      screen.getByLabelText("bKash sender number *"),
      "01612345678",
    );
    await user.type(
      screen.getByLabelText("Transaction ID (TrxID) *"),
      "ab12cd34ef",
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(
      screen.getByRole("button", { name: "Confirm bKash Payment" }),
    );
    expect(
      await screen.findByRole("heading", {
        name: "Enrollment details recorded.",
      }),
    ).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.enrollments)!);
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({
      courseId: "plc-foundation",
      fee: 8000,
      status: "pending",
      transactionId: "AB12CD34EF",
    });
    expect(open).toHaveBeenCalledOnce();
    expect(open.mock.calls[0][0]).toContain(
      "https://wa.me/8801646241953?text=",
    );
    expect(
      screen.getByRole("link", { name: /Send WhatsApp confirmation/ }),
    ).toHaveAttribute("href", expect.stringContaining("wa.me/8801646241953"));
    open.mockRestore();
  });
});

describe("admin access and editing", () => {
  it("signs in with the supplied credentials and creates a persistent notice", async () => {
    const user = userEvent.setup();
    appAt("/admin/login");
    await screen.findByRole("heading", { name: "Welcome back." });
    await user.type(screen.getByLabelText("Admin username"), "TrustPlc12");
    await user.type(
      screen.getByLabelText("Password", { exact: true }),
      "TrustPlc01",
    );
    await user.click(
      screen.getByRole("button", { name: "Sign in to workspace" }),
    );
    expect(
      await screen.findByRole("heading", {
        name: "Your institute, at a glance.",
      }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Notices" }));
    await user.click(screen.getByRole("button", { name: "New notice" }));
    await user.type(
      screen.getByLabelText("Notice title *"),
      "Test admission notice",
    );
    await user.type(
      screen.getByLabelText("Notice text *"),
      "Please contact the institute for the latest batch schedule.",
    );
    await user.click(screen.getByRole("button", { name: "Publish notice" }));
    await waitFor(() =>
      expect(
        JSON.parse(localStorage.getItem(STORAGE_KEYS.notices)!)[0].title,
      ).toBe("Test admission notice"),
    );
    expect(
      screen.getByRole("heading", { name: "Test admission notice" }),
    ).toBeInTheDocument();
  });
  it("allows signing out of an existing local session", async () => {
    loginAdmin("TrustPlc12", "TrustPlc01");
    const user = userEvent.setup();
    appAt("/admin/dashboard");
    await screen.findByRole("heading", {
      name: "Your institute, at a glance.",
    });
    await user.click(screen.getByRole("button", { name: "Sign out" }));
    expect(
      await screen.findByRole("heading", { name: "Welcome back." }),
    ).toBeInTheDocument();
    expect(sessionStorage.getItem(STORAGE_KEYS.session)).toBeNull();
  });
});
