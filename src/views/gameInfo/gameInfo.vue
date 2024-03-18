<template>
  <div id="gameInfo">
    <div class="head">
      <span @click="goContribute">文章投稿</span>
    </div>
    <div class="list">
      <div class="item" v-for="g in gameInfoList" :key="g.id">
        <div class="left">
          <img :src="g.coverURL" alt="">
        </div>
        <div class="right">
          <p class="title">{{ g.title }}</p>
          <p class="source">{{ g.source }}</p>
          <p class="info">
            <span>作者：{{ g.author }}</span>
            <span>来源：buff</span>
            <span> <i class="el-icon-time"></i> {{ g.time }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "gameInfo",
  components: {},
  data() {
    return {
      gameInfoList: [],
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      axios.get("http://localhost:8081/gameInfo/getAllGameInfo").then(res => {
        this.gameInfoList = res.data.data
      })
    },
    goContribute() {
      this.$router.push({
        name: "Contribute",
      });
    }
  },
};
</script>

<style scoped lang="less">
#gameInfo {
  width: 80%;
  height: fit-content;
  background-color: #fff;
  margin: 0 auto;

  .head {
    height: 50px;
    width: 100%;
    background-color: #1c202b;
    position: relative;

    span {
      display: inline-block;
      height: 30px;
      width: 90px;
      background-color: #4773c8;
      color: #fff;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 10px;
    }
  }

  .list {
    width: 100%;
    height: 500px;
    background-color: #fff;
    padding: 20px;

    .item {
      height: 200px;
      width: 100%;
      background-color: #f0f0f0;
      display: flex;

      .left {
        width: 20%;
        height: 100%;
        padding: 20px;

        img {
          width: 100%;
          height: 100%;
          background-size: cover;
          cursor: pointer;
        }
      }

      .right {
        width: 80%;
        height: 100%;
        margin-left: 20px;
        padding: 20px 0;
        position: relative;

        .title {
          font-weight: 700;
          font-size: 20px;
          color: black;
          cursor: pointer;
        }

        .source {
          background-color: #eea20e;
          color: #fff;
          height: 20px;
          width: 34px;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          position: absolute;
          top: 55px;
          cursor: pointer;
        }

        .info {
          font-size: 14px;
          color: #959595;
          position: absolute;
          bottom: 25px;

          span {
            margin-right: 20px;
          }
        }

        .title:hover {
          color: #eea20e
        }


      }
    }
  }
}
</style>