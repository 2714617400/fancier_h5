import { defineStore } from "pinia";
import { getStory, getChapter, getChapterContent } from "@/api/book/index.js";
import { Toast } from "vant";

export const useBookStore = defineStore({
  id: "book",
  state: () => ({
    books: [],
    chapters: [],
    readBookId: null,
    readChapterID: null,
  }),
  getters: {
    GetSegment() {
      // 分页列表
      let total = this.chapters.length,
        seg_size = 50,
        seg_nums = Math.ceil(total / seg_size),
        seg_list = [];
      for (let i = 0; i < seg_nums; i++) {
        let tail = (i + 1) * seg_size < total,
          start = i * seg_size,
          end = tail ? (i + 1) * seg_size : total;
        if (seg_nums === 1) {
          seg_list = [
            {
              title: `第${start + 1}至${total}章`,
              start,
              end: total,
            },
          ];
        } else {
          seg_list.push({
            title: `第${start + 1}至${tail ? end - 1 : end}章`,
            start,
            end,
          });
        }
      }
      return seg_list;
    },
    GetSegmentChapters(state) {
      // 分页章节
      return (data) => state.chapters.slice(data.start, data.end);
    },
  },
  actions: {
    /**
     * 获取故事列表
     * @returns {Array} 故事列表
     */
    GetBooks: function () {
      return new Promise((resolve, reject) => {
        getStory()
          .then((res) => {
            this.books = res;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 获取章节列表,默认拉取全部章节
     * @param {string} [book_id] 故事ID,不传则默认当前故事
     * @returns {Array} 章节列表
     */
    GetChapters: function (book_id = "") {
      return new Promise((resolve, reject) => {
        if (!book_id && !this.readBookId) {
          reject();
          return Toast("请选择要阅读的故事!");
        }
        let params = {
          id: book_id || this.readBookId,
          page: 1,
          per_page: 9999,
        };
        getChapter(params)
          .then(({ data }) => {
            console.log(data, "c");
            this.chapters = data.list;
            resolve(data.list);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 获取章节内容
     * @param {string} child_id 章节ID
     * @returns {string} 章节内容
     */
    GetContent: function (child_id) {
      return new Promise((resolve, reject) => {
        if (!this.readBookId || !child_id) {
          reject();
          return Toast(!this.readBookId ? "请选择故事!" : "请选择故事章节!");
        }
        let params = {
          id: this.readBookId,
          child_id,
        };
        getChapterContent(params)
          .then(({ data }) => {
            // let content = data.content.split("\n").join("<br /><br />");
            // console.log(data, content, "sssssss");
            resolve(data);
            this.readChapterID = child_id;
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 获取下一章内容
     * @returns {string} 章节内容
     */
    GetNextContent: function () {
      if (!this.readBookId || !this.readChapterID) {
        Toast(!this.readBookId ? "请选择故事!" : "请选择故事章节!");
        return Promise.reject();
      }
      if (this.chapters.length === 0) {
        Toast("章节列表是空的!");
        return Promise.reject();
      }
      let index = this.chapters.findIndex((v) => v.id === this.readChapterID);
      if (index === -1 || index === this.chapters.length - 1) {
        Toast(index === -1 ? "未找到下一章!" : "终章!");
        return Promise.reject();
      }
      index++;
      let nextId = this.chapters[index].id;

      return this.GetContent(nextId);
    },
  },
});
