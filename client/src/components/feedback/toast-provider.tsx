"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type ToastContextValue = {
  notify: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children?: ReactNode }) {
  const [message, setMessage] = useState("");

  const value = useMemo<ToastContextValue>(
    () => ({
      notify: (nextMessage) => setMessage(nextMessage),
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {message ? (
        <div className="toast show position-fixed bottom-0 end-0 m-3" role="status" aria-live="polite">
          <div className="toast-body">{message}</div>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
