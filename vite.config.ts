import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env: Record<string, string> = loadEnv(mode, process.cwd(), "");
  const isProd: boolean = env.REACT_APP_IS_PROD === "true";
  const parentUrl: string = isProd
    ? "https://mitkoarsov.github.io/microfrontends-parent/assets/remoteEntry.js"
    : "http://localhost:5174/assets/remoteEntry.js";

  console.log("isProd:", isProd);

  return {
    plugins: [
      federation({
        name: "app1",
        filename: "remoteEntry.js",
        exposes: { "./App": "./src/App.tsx" },
        remotes: {
          shell: parentUrl,
        },
        shared: [
          "react",
          "react-dom",
          "react-redux",
          "@reduxjs/toolkit",
          "use-sync-external-store",
          "@mui/material",
          "@emotion/react",
          "@emotion/styled",
        ],
      }),
      react(),
    ],
    server: {
      port: 5174,
      strictPort: true,
      cors: true,
    },

    resolve: {
      dedupe: ["react", "react-dom", "react-redux", "use-sync-external-store"],
    },
  };
});
