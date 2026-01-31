import { Appbar } from "./components/Appbar";
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
          <ReduxProvider>
            <div className="flex flex-col min-h-svh">
              <Appbar />
              <div className="flex-1 p-4">{children}</div>
            </div>
          </ReduxProvider>
        </NextSessionProvider>
      </body>
    </html>
  );
}
