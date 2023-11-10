<template>
  <div class="list-box">
    <List finished-text="没有更多了">
      <Cell
        v-for="item in demo"
        :key="item.id"
        :title="item.title"
        :to="{
          name: 'content',
          params: {
            id: bookId,
            child_id: item.id,
          },
        }"
      />
    </List>
  </div>
  <div class="segment" @click="openSeg">选择分页</div>
  <Popup
    :show="showSeg"
    position="bottom"
    close-on-click-overlay
    @close="closeSeg"
    @click-overlay="closeSeg"
    class="seg-popup"
  >
    <Collapse v-model="collaActive" accordion @change="onChangeColla">
      <CollapseItem
        :title="item.title"
        :name="i"
        v-for="(item, i) in segList"
        :key="i"
      >
        <List class="chapters">
          <Cell v-for="(c, p) in demo" :key="p" :title="c.title" />
        </List>
      </CollapseItem>
    </Collapse>
  </Popup>
</template>

<script setup name="List">
import { ref, unref, computed } from "vue";
import { List, Cell, Toast, Collapse, CollapseItem, Popup } from "vant";
import { useBookStore } from "@/stores/book";

const bookStore = useBookStore(),
  list = ref([]);
console.log(bookStore);
bookStore.GetChapters().then((data) => {
  list.value = data;
  demo.value = bookStore.GetSegmentChapters(unref(segList).start, item.end);
});
const bookId = computed(() => bookStore.bookId);
const segList = computed(() => bookStore.GetSegment);

const showSeg = ref(false),
  collaActive = ref(""),
  demo = ref([]);
function openSeg() {
  showSeg.value = true;
  console.log(showSeg.value, "lalala");
}
function closeSeg() {
  showSeg.value = false;
}
function onChangeColla(index) {
  if (index !== 0 && !index) return;
  console.log(index, "index");
  let item = unref(segList)[index];
  console.log(item, "item");
  demo.value = bookStore.GetSegmentChapters(item.start, item.end);
  console.log(demo, "demo");
}
</script>

<style lang="scss" scope>
.list-box {
  height: calc(100% - 40px);
  overflow-y: scroll;
}
.segment {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #333;
}
.seg-popup {
  height: 70%;
  .chapters {
    max-height: 300px;
    overflow-y: scroll;
  }
}
</style>
