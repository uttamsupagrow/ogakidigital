"use client";

// Client boundary for styled-components' ThemeProvider.
// Keeping ThemeProvider out of the server component tree (app/layout.tsx)
// prevents styled-components from being evaluated in the RSC layer, which
// caused: "React.createContext is not a function" / "createContext only
// works in Client Components".
import { ThemeProvider } from "styled-components";
import type { DefaultTheme } from "styled-components";
import type { ReactNode } from "react";

export default function Providers({
  theme,
  children,
}: {
  theme: DefaultTheme;
  children: ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
