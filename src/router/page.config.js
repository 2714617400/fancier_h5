export default [
  {
    name: "profile1",
    path: "/my/profile1",
    component: () => import("@/views/my/profile/profile1.vue"),
    meta: {
      title: "个人信息",
      isNavBar: false,
    },
  },
  {
    name: "profile2",
    path: "/my/profile2",
    component: () => import("@/views/my/profile/profile2.vue"),
    meta: {
      title: "个人信息",
      isNavBar: false,
    },
  },
  {
    name: "list",
    path: "/msg/list/:id",
    component: () => import("@/views/book/list.vue"),
    meta: {
      title: "章节",
      isNavBar: true,
    },
  },
  {
    name: "content",
    path: "/msg/content/:id/:child_id",
    component: () => import("@/views/book/content.vue"),
    meta: {
      title: "",
      isNavBar: true,
    },
  },
];
