/*
 * @Author: hejiaqun 17774657825@163.com
 * @Date: 2023-10-19 18:54:07
 * @LastEditors: hejiaqun 17774657825@163.com
 * @LastEditTime: 2023-10-26 18:45:25
 * @FilePath: \fancier_h5\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from "vue-router";

import navbarConfig from "./navbar.config";
import pageConfig from "./page.config";

import MainLayout from "@/layout/main.vue";
import PageLayout from "@/layout/page.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      component: MainLayout,
      redirect: navbarConfig[0] || "/404",
      children: navbarConfig,
    },
    {
      path: "",
      component: PageLayout,
      children: pageConfig,
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/Login.vue"),
    },
  ],
});

export default router;
