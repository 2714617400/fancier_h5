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
            child_id: item.id,
          },
        }"
      />
    </List>
  </div>
  <div class="segment" @click="open">章节目录</div>
  <Popup
    :show="show"
    position="bottom"
    close-on-click-overlay
    @close="close"
    @click-overlay="close"
  >
    <Picker
      :columns="segList"
      value-key="title"
      @cancel="close"
      @confirm="onConfirm"
    />
  </Popup>
</template>

<script setup name="List">
import { ref, unref, computed } from "vue";
import { List, Cell, Toast, Popup, Picker } from "vant";
import { useBookStore } from "@/stores/book";

const bookStore = useBookStore(),
  list = ref([]);
bookStore.GetChapters().then((data) => {
  list.value = data;
  data.length &&
    (demo.value = bookStore.GetSegmentChapters(bookStore.GetSegment[0]));
});
const segList = computed(() => bookStore.GetSegment);

const show = ref(false),
  demo = ref([]);
function open() {
  show.value = true;
}
function close() {
  show.value = false;
}
function onConfirm(e) {
  demo.value = bookStore.GetSegmentChapters(e);
  close();
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
  // color: #333;

  // border-radius: 50px;
  background: #ecf0f3;
  box-shadow: inset 20px 20px 60px #c9cccf, inset -20px -20px 60px #ffffff;
}
</style>
