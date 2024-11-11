function createUserList() {
  return [
    {
      userId: 1,
      avatar: "",
      username: "admin",
      password: "123456",
      desc: "平台管理员",
      roles: ["平台管理员"],
      routes: ["home"],
      token: "Admin Token",
    },
    {
      userId: 2,
      avatar: "",
      username: "system",
      password: "123456",
      desc: "系统管理员",
      roles: ["系统管理员"],
      routes: ["system"],
      token: "System Token",
    },
  ];
}

export default [
  // 用户登录接口
  {
    url: "/api/user/login",
    method: "post",
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createUserList().find((item) => {
        return item.username === username && item.password === password;
      });
      if (!checkUser) {
        return { code: 201, data: { message: "账号或密码不正确" } };
      }
      let { token } = checkUser;
      return { code: 200, data: { token } };
    },
  },
  //获取用户信息
  {
    url: "/api/user/userInfo",
    method: "post",
    response: ({ body }) => {
      const { token } = body;
      const checkUser = createUserList().find((item) => {
        return item.token === token;
      });
      if (!checkUser) {
        return { code: 201, data: { message: "token失效" } };
      }
      return { code: 200, data: { checkUser } };
    },
  },
];
