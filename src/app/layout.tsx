import "@edge-ui/react/styles.css";
import "./globals.css";
import { LayoutProvider } from "./layoutProvider";

export const metadata = {
  title: "Weather App",
  description: "Weather app in react server components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
