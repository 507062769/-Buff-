<template>
  <div class="bg">
    <div id="banner">
      <ul>
        <li>
          <div class="bnDesc">
            <h1>{{ bannerInfo[pageIndex].Title }}</h1>
            <p>{{ bannerInfo[pageIndex].Desc }}</p>
          </div>
          <div class="bn">
            <img :src="bannerInfo[pageIndex].Img" alt="" />
          </div>
        </li>
      </ul>
      <div class="slider-nav">
        <span
          v-for="(item, index) in bannerInfo"
          :key="index"
          @click="clickNav(index)"
          :class="{ bnActive: pageIndex == index }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      pageIndex: 0,
      bannerInfo: [
        {
          id: 0,
          Title: "巴黎Major印花",
          Desc: "现已开放交易",
          Img: "img/banner/banner1.png",
        },
        {
          id: 1,
          Title: "阿努比斯收藏品",
          Desc: "现已开放交易",
          Img: "img/banner/banner2.png",
        },
        {
          id: 2,
          Title: "热门CSGO饰品",
          Desc: "好货推荐跟着买就对了",
          Img: "img/banner/banner3.png",
        },
        {
          id: 3,
          Title: "BUFF移动端APP",
          Desc: "随时随地便捷交易快人一步",
          Img: "img/banner/banner4.png",
        },
        {
          id: 4,
          Title: "交易防骗指南",
          Desc: "务必阅读",
          Img: "img/banner/banner5.png",
        },
        {
          id: 5,
          Title: "UU加速器 IOS/安卓",
          Desc: "免费加速 交易访问问题",
          Img: "img/banner/banner6.png",
        },
      ],
      bnTimer: null,
    };
  },
  create() {},
  mounted() {
    this.runInv();
  },
  watch: {},
  computed: {},
  methods: {
    clickNav(index) {
      this.pageIndex = index;
    },
    runInv() {
      this.bnTimer = setInterval(() => {
        this.pageIndex == 5 ? (this.pageIndex = 0) : (this.pageIndex += 1);
      }, 4000);
    },
  },
};
</script>

<style scoped lang="less">
.bg {
  width: 100%;
  height: 440px;
  background-image: url("../../public/img/bg/bj.jpg");
  background-position: 0 -70px;
}
#banner {
  height: 440px;
  width: 100%;
  position: relative;
  overflow: hidden;

  ul {
    height: 100%;
    width: 100%;

    li {
      list-style: none;
      height: 100%;
      width: 100%;
      position: relative;
      color: white;

      div {
        position: absolute;
      }

      .bn {
        height: 400px;
        width: 960px;
        right: -200px;
        top: 15px;
      }

      .bnDesc {
        height: 280px;
        width: 600px;
        top: 85px;
        left: 240px;

        h1 {
          font-size: 60px;
          font-weight: 700;
          height: 72px;
          line-height: 72px;
          padding-bottom: 30px;
        }

        p {
          font-size: 28px;
          line-height: 28px;
        }
      }
    }
  }

  .slider-nav {
    height: 15px;
    width: 200px;
    display: flex;
    justify-content: space-around;
    position: absolute;
    top: 350px;
    left: 235px;

    span {
      display: inline-block;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background-color: #434c5b;
      cursor: pointer;
    }

    .bnActive {
      background-color: #4782f5;
    }
  }
}
</style>