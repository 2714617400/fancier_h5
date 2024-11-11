<template>
  <div
    class="page blur-background"
    :style="{
      backgroundImage: `url(${defaultPic})`,
    }"
  >
    <img :src="defaultPic" @click="handleClick" />
  </div>
</template>
<script setup name="Picture">
import { ref, computed, onMounted } from "vue";

const pics = [
  "https://s.ccg999.cn/business/3/pushcard/2024/5/28/1716884267738813.jpg",
  "https://s.ccg999.cn/business/3/vip/2024/7/12/1720769542257549.jpg",
  "https://s.ccg999.cn/business/3/store/2023/11/21/1700532473673860.jpg",
];
console.log(
  "默认图片",
  pics[Math.floor(Math.random() * pics.length)],
  pics.length
);
const defaultPic = ref(pics[Math.floor(Math.random() * pics.length)]);

const handleClick = function () {
  const current = pics.indexOf(defaultPic.value);
  const newIndex = Math.floor(Math.random() * pics.length);
  if (current === newIndex && pics.length !== 1) {
    handleClick();
  } else {
    defaultPic.value = pics[newIndex];
  }
};

async function init() {
  let addressData = await getFetchData("https://ipapi.co/json/");

  console.log("请求返回", await getFetchData());
}
function getFetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
}
init();
</script>
<style lang="scss" scope>
.page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.9);

  display: flex;
  justify-content: center;
  align-items: center;

  background-position: center;
  background-size: cover;
  backdrop-filter: blur(10px);
  background-repeat: no-repeat;
  background-size: 150%;

  background-color: rgba(255, 255, 255, 0.5); /* 设置半透明背景 */
  backdrop-filter: blur(10px); /* 应用10像素的模糊效果 */
  img {
    width: 100vw;
    height: 100vw;
    object-fit: contain;
  }
}

.blur-background {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(0, 0, 0, 0.3);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: -1;
  }
}
</style>
