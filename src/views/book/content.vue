<template>
  <div class="page" ref="pageEl">
    <Sticky>
      <NavBar
        :title="chapter.title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </Sticky>
    <!-- <Cell :title="chapter.title" center /> -->
    <div class="content" :style="sty" v-html="chapter.content"></div>
    <div class="next" @click="next">下一章</div>
  </div>
</template>

<script setup name="List">
import { ref, unref, computed } from "vue";
import { Cell, Sticky, NavBar } from "vant";
import { getChapterContent } from "@/api/book/index.js";
import { useBookStore } from "@/stores/book";
import { useRoute, useRouter } from "vue-router";
const bookStore = useBookStore();
const route = useRoute(),
  chapterID = route.params.child_id;

const chapter = ref({
  title: "",
  content: "",
});
bookStore.GetContent(chapterID).then((data) => {
  chapter.value = data;
  chapter.value.content = data.content.split("\n").join("<br /><br />");
});

const stl = computed(() => {
  return {
    fontSize: "12px",
    color: "#333",
    backgroundColor: "#ecf0f3",
  };
});

const router = useRouter();
function onClickLeft() {
  router.go(-1);
}

const pageEl = ref();
function next() {
  bookStore.GetNextContent().then((data) => {
    chapter.value = data;
    chapter.value.content = data.content.split("\n").join("<br /><br />");
    unref(pageEl).scrollTop = 0;
  });
}
</script>

<style lang="scss" scope>
.page {
  height: 100%;
  background-color: #e9faff;
  overflow-y: scroll;
}
.content {
  white-space: pre-line;
  padding: 14px;

  font-family: "MicrosoftYaHei", "Lucida Grande", Helvetica, Arial, "SimSun",
    FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB",
    "Hiragino Sans GB W3", FontAwesome, sans-serif;
  font-weight: 400;
  // font-size: 12px;
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
