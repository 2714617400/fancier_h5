<template>
  <div>
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
.content {
  white-space: pre-line;
  padding: 0 14px;
}
</style>
