import request from "@/utils/request";

// 模拟登陆，实际需要调用request进行登录请求
export const getStory = (params) => request.get("/story", { params });
export const getChapter = (params) =>
  request.get(`/story/${params.id}/chapter`, { params });
export const getChapterContent = (params) =>
  request.get(`/story/${params.id}/chapter/${params.child_id}`);
