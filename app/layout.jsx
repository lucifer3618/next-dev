import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";
import { ThemeProvider } from "./provider";


export const metadata = {
  title: "NextDev",
  description: "NextDev is a project focused on building AI-powered web applications, leveraging modern frameworks to enhance automation and user experience.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html >
  );
}
