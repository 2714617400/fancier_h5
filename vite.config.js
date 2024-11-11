import { fileURLToPath, URL } from "url";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { svgBuilder } from "./src/plugins/svgBuilder";
import { viteMockServe } from "vite-plugin-mock";

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
              ? "http://127.0.0.1:3000"
              : "http://123.60.18.204:3000",
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
      viteMockServe({
        mockPath: "mock",
        localEnabled: true, // 开发打包开关 true时打开mock  false关闭mock
        prodEnabled: false, //生产环境下为false，这样就不会被打包到生产包中
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
