<template>
  <div class="page">
    <Cell :title="chapter.title" center />
    <div class="content" v-html="chapter.content"></div>
  </div>
</template>

<script setup name="List">
import { ref, computed } from "vue";
import { Cell } from "vant";
import { getChapterContent } from "@/api/book/index.js";
import { useRoute } from "vue-router";
const route = useRoute(),
  storyID = route.params.id,
  chapterID = route.params.child_id;

let chapter = ref({
  title: "",
  content: "",
});
async function getContent() {
  getChapterContent({
    id: storyID,
    child_id: chapterID,
  }).then(({ data }) => {
    chapter.value = data;
    chapter.value.content = data.content.split("\n").join("<br /><br />");
    console.log(data.content.split("\n"));
  });
}

getContent();
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
</style>
