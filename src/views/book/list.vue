<template>
  <List
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :offset="50"
    @load="onLoad"
  >
    <Cell
      v-for="item in list"
      :key="item.id"
      :title="item.title"
      :to="{
        name: 'content',
        params: {
          id: storyID,
          child_id: item.id,
        },
      }"
    />
  </List>
</template>

<script setup name="List">
import { ref, computed } from "vue";
import { List, Cell } from "vant";
import { getChapter } from "@/api/book/index.js";
import { useRouter, useRoute } from "vue-router";
const route = useRoute(),
  storyID = route.params.id;
console.log("你是", storyID);
const loading = ref(false),
  finished = ref(false),
  list = ref([]);

let page = 1,
  per_page = 20;
async function onLoad() {
  // 异步更新数据
  if (loading.value) return;
  loading.value = true;
  let { data } = await getChapter({
    id: storyID,
    page,
    per_page,
  });
  list.value = list.value.concat(data.list);
  page++;
  // 加载状态结束
  loading.value = false;

  // 数据全部加载完成
  if (list.value.length >= data.total) {
    finished.value = true;
  }
}
</script>

<style lang="scss" scope></style>
