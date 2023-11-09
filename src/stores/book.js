import { defineStore } from "pinia";
import { getChapter, getChapterContent } from "@/api/book/index.js";
import { Toast } from "vant";

export const useBookStore = defineStore({
  id: "book",
  state: () => ({
    bookId: null,
    bookName: null,
    chapters: [],
    current: {
      id: null,
      index: null,
      title: null,
    },
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
      return (start, end) => state.chapters.slice(start, end);
    },
  },
  actions: {
    GetChapters: function (id) {
      if (!id && !this.bookId) return Toast("请选择故事!");
      return new Promise((resolve, reject) => {
        getChapter({ id: id || this.bookId, page: 1, per_page: 9999 })
          .then(({ data }) => {
            console.log("???0", data);
            this.chapters = data.list;
            resolve(data.list);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetContent: function (child_id) {
      if (!this.bookId) return Toast("请选择故事!");
      else if (!child_id) return Toast("请选择故事章节!");
      return new Promise((resolve, reject) => {
        getChapterContent({ id: this.bookId, child_id })
          .then(({ data }) => {
            let content = data.content.split("\n").join("<br /><br />");
            resolve(content);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetNextContent: function () {
      if (this.current.index >= this.chapters.length)
        return Toast("当前是最终章!");
      this.current.index++;
      this.current.id = this.chapters[this.current.index].id;
      this.current.title = this.chapters[this.current.index].title;
      return this.GetContent(this.current.id);
    },
  },
});
