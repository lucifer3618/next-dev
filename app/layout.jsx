import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { EnvScript } from "./env-script";
import { TestEnv } from "./test-env";


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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ENV_GOOGLE_AUTH_KEY = "${process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY || '615788238668-itemrc5tekosnnheknkd9h5qdgdbebpf.apps.googleusercontent.com'}";
              window.ENV_CONVEX_URL = "${process.env.NEXT_PUBLIC_CONVEX_URL || ''}";
              window.ENV_GEMINI_API_KEY = "${process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''}";
              console.log('Injected environment variables in head');
            `,
          }}
        />
      </head>
      <body>
        <EnvScript />
        <TestEnv />
        <ConvexClientProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html >
  );
}
