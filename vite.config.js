/*
 * @Author: hejiaqun 17774657825@163.com
 * @Date: 2023-10-19 18:52:35
 * @LastEditors: hejiaqun 17774657825@163.com
 * @LastEditTime: 2023-10-26 18:45:08
 * @FilePath: \fancier_h5\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
              : "http://127.0.0.1:3000",
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
