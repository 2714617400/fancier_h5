<template>
  <div class="stack">
    <div v-for="(v, i) in books" :key="i" class="box" @click="onClick(v)">
      <div class="book">
        <!-- <Image src="https://img.yzcdn.cn/vant/cat.jpeg"></Image> -->
        <div>
          <p class="van-ellipsis title">{{ v.title }}</p>
          <!-- <p class="author">{{ v.author }}</p> -->
          <!-- <p class="van-multi-ellipsis--l3 description">{{ v.description }}</p> -->
        </div>
      </div>
    </div>
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
  padding: 20px 10px;
  display: flex;
  flex-wrap: wrap;
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
    .book {
      width: 100px;
      height: 150px;
      border: 1px solid #ddd;
      margin: 10px 0;
      padding: 5px;
      // background-color: #fff;
      writing-mode: vertical-rl; /*从左向右 从右向左是 writing-mode: vertical-rl;*/

      background-image: linear-gradient(45deg, #cccccc, #dddddd);
      background-size: 400% 400%;
      animation: glowing 15s linear infinite;
      animation-direction: alternate;

      display: flex;
      flex-direction: column;
      font-size: 14px;
      // .title {
      //   font-size: 12px;
      // }

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
  }
}
</style>
