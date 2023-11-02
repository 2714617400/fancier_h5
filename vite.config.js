import { fileURLToPath, URL } from "url";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { svgBuilder } from "./src/plugins/svgBuilder";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    base: VITE_APP_ENV === "production" ? "/" : "/",
    server: {
      port: 3030,
      proxy: {
        "/dev-api": {
          target:
            VITE_APP_ENV === "production"
              ? "http://f.ldlv.cn:3000"
              : "http://f.ldlv.cn:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ""),
        },
      },
    },
    plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
      svgBuilder("./src/assets/icons/svg/"),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
