<template>
  <List finished-text="没有更多了">
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
import { List, Cell, Toast, Row, Col } from "vant";
import { useBookStore } from "@/stores/book";

const bookStore = useBookStore(),
  list = ref([]);
bookStore.getChapter().then((data) => {
  list.value = data;
});
</script>

<style lang="scss" scope></style>
