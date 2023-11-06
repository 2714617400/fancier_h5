import { defineStore } from "pinia";
import { getChapter, getChapterContent } from "@/api/book/index.js";

export const useBookStore = defineStore({
  id: "book",
  state: () => ({
    bookId: null,
    bookName: null,
    chapters: [],
    currentIndex: null,
    currentChapterId: null,
  }),
  actions: {
    GetChapters: function (id) {
      return new Promise((resolve, reject) => {
        getChapter({ id })
          .then((data) => {
            this.chapters = data.list;
            resolve(data.list);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetContent: function (child_id) {
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
      this.currentIndex++;
      this.currentChapterId = this.chapters[this.currentIndex];
      return this.GetContent(this.currentChapterId);
    },
  },
});
