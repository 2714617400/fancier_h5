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
    <div class="control" v-show="showControl">
      <div></div>
      <div></div>
      <div></div>
    </div>
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
  content:
    "数据发刚放假啊几乎都是过分解读市房管局,上岛咖啡故事接口打工饭,都看不出保驾护航的.似懂非懂萨嘎,阿斯蒂芬斯蒂芬斯蒂芬,,是发送到发送到发送到饭发送到发斯蒂芬山丹大佛法师打发撒水电费",
});
bookStore.GetContent(chapterID).then((data) => {
  chapter.value = data;
  chapter.value.content = data.content.split("\n").join("<br /><br />");
  console.log(sty);
});

const sty = computed(() => {
  return {
    fontSize: "14px",
    color: "#333",
    backgroundColor: "",
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

const showControl = ref(false);
</script>

<style lang="scss" scope>
.page {
  height: 100%;
  box-sizing: border-box;
  background-color: #e9faff;
  overflow-y: scroll;
  padding-bottom: 40px;
  overflow: hidden;
}
.content {
  white-space: pre-line;
  text-align: justify;
  padding: 14px;

  font-family: "MicrosoftYaHei", "Lucida Grande", Helvetica, Arial, "SimSun",
    FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB",
    "Hiragino Sans GB W3", FontAwesome, sans-serif;
  font-weight: 400;
  // font-size: 12px;
  -webkit-font-smoothing: subpixel-antialiased;

  height: calc(100vh - 86px);
  -webkit-columns: 100px 2;
  columns: 100px 2;
  column-gap: 16px;
}
.next {
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  // color: #333;

  // border-radius: 50px;
  background: #ecf0f3;
  box-shadow: inset 20px 20px 60px #c9cccf, inset -20px -20px 60px #ffffff;

  position: absolute;
  bottom: 0;
}
.control {
  position: fixed;
  top: 46px;
  left: 0;
  width: 100%;
  height: calc(100% - 40px - 40px);
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  div {
    flex: 1;
    border: 1px solid blue;
  }
}
</style>
