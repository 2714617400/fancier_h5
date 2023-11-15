<template>
  <div class="page" ref="pageEl" @scroll="getScrollTop">
    <Cell :title="chapter.title" center />
    <div class="content" v-html="chapter.content"></div>
    <div class="next" @click="next">下一章</div>
  </div>
</template>

<script setup name="List">
import { ref, computed } from "vue";
import { Cell } from "vant";
import { getChapterContent } from "@/api/book/index.js";
import { useBookStore } from "@/stores/book";
import { useRoute } from "vue-router";
const route = useRoute(),
  chapterID = route.params.child_id;

const bookStore = useBookStore();
bookStore.GetContent(chapterID).then((data) => {
  chapter.value = data;
  chapter.value.content = data.content.split("\n").join("<br /><br />");
});
let chapter = ref({
  title: "",
  content: "",
});

const pageEl = ref();
function getScrollTop(e) {
  console.log("getScrollTop", e);
}
// async function getContent() {
//   getChapterContent({
//     id: storyID,
//     child_id: chapterID,
//   }).then(({ data }) => {
//     chapter.value = data;
//     chapter.value.content = data.content.split("\n").join("<br /><br />");
//     console.log(data.content.split("\n"));
//   });
// }
// getContent();
function next() {
  bookStore.GetNextContent().then((data) => {
    chapter.value = data;
    chapter.value.content = data.content.split("\n").join("<br /><br />");
    console.log(pageEl, "pageEl");
    window.scrollTop({ top: 0 });
  });
}
</script>

<style lang="scss" scope>
.page {
  background-color: #e9faff;
}
.content {
  white-space: pre-line;
  padding: 14px;

  font-family: "MicrosoftYaHei", "Lucida Grande", Helvetica, Arial, "SimSun",
    FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB",
    "Hiragino Sans GB W3", FontAwesome, sans-serif;
  font-weight: 400;
  color: #333;
  font-size: 12px;
  -webkit-font-smoothing: subpixel-antialiased;
}
.next {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  // color: #333;

  // border-radius: 50px;
  background: #ecf0f3;
  box-shadow: inset 20px 20px 60px #c9cccf, inset -20px -20px 60px #ffffff;
}
</style>
