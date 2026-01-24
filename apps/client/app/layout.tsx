import "./globals.css";
import { NextSessionProvider, ReduxProvider } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <NextSessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextSessionProvider>
      </body>
    </html>
  );
}
