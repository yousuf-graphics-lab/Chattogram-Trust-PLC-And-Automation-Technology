import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application rendering error", error, info.componentStack);
  }
  render() {
    if (this.state.failed)
      return (
        <main className="container-site py-24 text-center">
          <p className="eyebrow justify-center">CHATTOGRAM TRUST</p>
          <h1 className="text-3xl font-bold">Let’s reconnect.</h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted">
            The page could not load. Try reloading. For course information or
            enrollment help, call{" "}
            <a className="text-cyan-500" href="tel:+8801646241953">
              +880 1646-241953
            </a>
            .
          </p>
          <button
            className="btn btn-primary mt-7"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </main>
      );
    return this.props.children;
  }
}
