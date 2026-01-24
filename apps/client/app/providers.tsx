"use client";

import { Provider } from "react-redux";
import { store } from "@repo/store";
import { SessionProvider } from "next-auth/react";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function NextSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
