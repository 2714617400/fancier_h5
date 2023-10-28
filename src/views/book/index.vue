<template>
  <div class="stack">
    <!-- <img src="@/assets/book.svg" /> -->
    <div class="book" v-for="(v, i) in books" :key="i" @click="onClick(v)">
      <div>
        <p class="van-ellipsis title">{{ v.title }}</p>
      </div>
    </div>
    <!-- <div v-for="(v, i) in books" :key="i" class="box" @click="onClick(v)"></div> -->
  </div>
</template>

<script setup name="Msg">
import { reactive, ref } from "vue";
import { Dialog, Image } from "vant";
import MsgList from "@/components/MsgList/index.vue";
import { getStory } from "@/api/book/index.js";

import { useRouter } from "vue-router";
const router = useRouter();

const books = ref([]);

getStory().then((res) => {
  console.log("数据", res);
  books.value = res;
});

function onClick(item) {
  console.log(item, "item");
  router.push({ name: "list", params: { id: item.id } });
}

function onMsgClick(item) {
  Dialog({ message: `${item.nickName}被点击！` });
}
function onMsgRemove(item) {
  Dialog({ message: `${item.nickName}被移除！` });
}
function onBarClick(item) {
  Dialog({ message: `${item.title}被点击！` });
}
</script>

<style lang="scss" scope>
.stack {
  min-height: calc(100% - 28px);
  padding: 14px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px 5px;
  margin: 0 auto;

  background-color: hsl(34, 53%, 82%);
  background-image: repeating-linear-gradient(
      45deg,
      transparent 5px,
      hsla(197, 62%, 11%, 0.5) 5px,
      hsla(197, 62%, 11%, 0.5) 10px,
      hsla(5, 53%, 63%, 0) 10px,
      hsla(5, 53%, 63%, 0) 35px,
      hsla(5, 53%, 63%, 0.5) 35px,
      hsla(5, 53%, 63%, 0.5) 40px,
      hsla(197, 62%, 11%, 0.5) 40px,
      hsla(197, 62%, 11%, 0.5) 50px,
      hsla(197, 62%, 11%, 0) 50px,
      hsla(197, 62%, 11%, 0) 60px,
      hsla(5, 53%, 63%, 0.5) 60px,
      hsla(5, 53%, 63%, 0.5) 70px,
      hsla(35, 91%, 65%, 0.5) 70px,
      hsla(35, 91%, 65%, 0.5) 80px,
      hsla(35, 91%, 65%, 0) 80px,
      hsla(35, 91%, 65%, 0) 90px,
      hsla(5, 53%, 63%, 0.5) 90px,
      hsla(5, 53%, 63%, 0.5) 110px,
      hsla(5, 53%, 63%, 0) 110px,
      hsla(5, 53%, 63%, 0) 120px,
      hsla(197, 62%, 11%, 0.5) 120px,
      hsla(197, 62%, 11%, 0.5) 140px
    ),
    repeating-linear-gradient(
      135deg,
      transparent 5px,
      hsla(197, 62%, 11%, 0.5) 5px,
      hsla(197, 62%, 11%, 0.5) 10px,
      hsla(5, 53%, 63%, 0) 10px,
      hsla(5, 53%, 63%, 0) 35px,
      hsla(5, 53%, 63%, 0.5) 35px,
      hsla(5, 53%, 63%, 0.5) 40px,
      hsla(197, 62%, 11%, 0.5) 40px,
      hsla(197, 62%, 11%, 0.5) 50px,
      hsla(197, 62%, 11%, 0) 50px,
      hsla(197, 62%, 11%, 0) 60px,
      hsla(5, 53%, 63%, 0.5) 60px,
      hsla(5, 53%, 63%, 0.5) 70px,
      hsla(35, 91%, 65%, 0.5) 70px,
      hsla(35, 91%, 65%, 0.5) 80px,
      hsla(35, 91%, 65%, 0) 80px,
      hsla(35, 91%, 65%, 0) 90px,
      hsla(5, 53%, 63%, 0.5) 90px,
      hsla(5, 53%, 63%, 0.5) 110px,
      hsla(5, 53%, 63%, 0) 110px,
      hsla(5, 53%, 63%, 0) 140px,
      hsla(197, 62%, 11%, 0.5) 140px,
      hsla(197, 62%, 11%, 0.5) 160px
    );

  .book {
    width: 100px;
    height: 150px;
    // border: 1px solid #ddd;
    padding: 5px;
    // background-color: #fff;
    writing-mode: vertical-rl; /*从左向右 从右向左是 writing-mode: vertical-rl;*/

    display: flex;
    flex-direction: column;
    font-size: 14px;
    transform: perspective(400px)
      rotate3d(var(--r, 1, -1, 0), calc(var(--i, 1) * var(--a)));
    &:hover {
      --i: -1;
    }
    // .title {
    //   font-size: 12px;
    // }

    // border-radius: 10px;
    backdrop-filter: blur(5px);
    background-color: rgba(238, 232, 170, 0.0175);
    // box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
    border: 1px rgba(255, 255, 255, 0.4) solid;
    border-bottom: 2px rgba(40, 40, 40, 0.35) solid;
    border-right: 2px rgba(40, 40, 40, 0.35) solid;

    background-image: url("~@/assets/logo.svg");
    background-size: 100px 141.967px;

    /* 加上 -webkit- 注意兼容 */
    .title {
      font-size: 12px;
      background: -webkit-linear-gradient(
        135deg,
        #0eaf6d,
        #ff6ac6 25%,
        #147b96 50%,
        #e6d205 55%,
        #2cc4e0 60%,
        #8b2ce0 80%,
        #ff6384 95%,
        #08dfb4
      );
      /* 文字颜色填充设置为透明 */
      -webkit-text-fill-color: transparent;
      /* 背景裁剪，即让文字使用背景色 */
      -webkit-background-clip: text;
      /* 背景图放大一下，看着柔和一些 */
      -webkit-background-size: 200% 100%;
      /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
      -webkit-animation: flowCss 12s infinite linear;
    }

    @-webkit-keyframes flowCss {
      0% {
        /* 移动背景位置 */
        background-position: 0 0;
      }

      100% {
        background-position: -400% 0;
      }
    }

    .title:hover {
      -webkit-animation: flowCss 4s infinite linear;
    }
  }
  .box {
    width: 50%;
    display: flex;
    justify-content: center;
    @keyframes glowing {
      0% {
        background-position: 0 0;
      }
      50% {
        background-position: 400% 0;
      }
      100% {
        background-position: 0 0;
      }
    }
  }
}
</style>
