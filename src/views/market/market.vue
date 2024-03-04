<template>
  <div id="market">
    <div class="center">
      <div class="market-header">
        <div class="category">
          <div class="cate-item" v-for="k in Kind" :key="k.kid">
            <img class="icon" alt="" />
            <p>{{ k.name }}</p>
            <ul>
              <li v-for="kItem in k.kindItem" :key="kItem.kiID">
                {{ kItem.name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="criteria">
          <div class="criteria-item">
            <h5>{{ qualityName }}</h5>
            <ul @click="selectQuality">
              <li>不限品质</li>
              <li v-for="q in quality" :key="q.qid">{{ q.name }}</li>
            </ul>
          </div>

          <div class="criteria-item">
            <h5>{{ wearName }}</h5>
            <ul>
              <li>不限外观</li>
              <li v-for="w in wear" :key="w.wid">{{ w.name }}</li>
            </ul>
          </div>

          <div class="criteria-search">
            <el-input placeholder="请输入物品名称" v-model="searchName" clearable>
              <el-button slot="append" icon="el-icon-search">搜索</el-button>
            </el-input>
          </div>

          <div class="criteria-item right">
            <h5>排序</h5>
            <ul>
              <li>默认</li>
              <li>价格↑</li>
              <li>价格↓</li>
              <li>受限</li>
            </ul>
          </div>

          <div class="right">
            <div class="counter">
              ￥
              <el-input v-model.number="minPrice" placeholder="最低价" v-limit-input-number
                @blur="selectByPrice"></el-input>
              -￥
              <el-input v-model.number="maxPrice" placeholder="最高价" v-limit-input-number
                @blur="selectByPrice"></el-input>
            </div>
            <div class="counter-submit"></div>
          </div>
        </div>
      </div>

      <div class="list">
        <Item :item="item" v-for="item in marketInfo" :key="item.Id" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Item from "./marketItem.vue";

export default {
  name: "",
  components: { Item },
  data() {
    return {
      searchName: "",
      minPrice: "",
      maxPrice: "",
      marketInfo: [],

      qualityName: "品质",
      wearName: "外观",
      Kind: [],
      quality: [],
      wear: [],
    };
  },
  methods: {
    // 初始化
    init() {
      // 获取种类、品质、外观的值
      axios.get("http://localhost:8081/tool/getKind").then((res) => {
        this.Kind = res.data.data;
      });
      axios.get("http://localhost:8081/tool/getQuality").then((res) => {
        this.quality = res.data.data;
      });
      axios.get("http://localhost:8081/tool/getWear").then((res) => {
        this.wear = res.data.data;
      });
      // 获取含有当前磨损在售总量的结构数据
      axios.get("http://localhost:8081/sell/getUniqueGoods", {
        params: {
          sort: "sellingTime"
        }
      }).then(res => {
        this.marketInfo = res.data.data
      })
    },
    // 切换品质
    selectQuality({ target }) {

    },
    selectByPrice() {
      if (this.maxPrice === '' && this.minPrice !== '') {
        this.marketInfo = this.marketInfo.filter(item => {
          return item.price > this.minPrice
        })
      } else if (this.maxPrice !== '' && this.minPrice === '') {
        this.marketInfo = this.marketInfo.filter(item => {
          return item.price < this.maxPrice
        })
      } else if (this.maxPrice !== '' && this.minPrice !== '') {
        this.marketInfo = this.marketInfo.filter(item => {
          return item.price < this.maxPrice && item.price > this.minPrice
        })
      } else {
        axios.get("http://localhost:8081/sell/getUniqueGoods", {
          params: {
            sort: "sellingTime"
          }
        }).then(res => {
          this.marketInfo = res.data.data;
        })
      }

    },
  },
  directives: {
    LimitInputNumber: {
      //指令与元素成功绑定时（一上来）用
      bind(el) {
        el.oninput = () => {
          el.children[0].value = el.children[0].value.replace(/[^\d.\d]/g, '')
        }
      }
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped lang='less'>
#market {
  height: 100%;
  width: 100%;

  .center {
    height: 100%;
    width: 80%;
    margin: 0 auto;

    .market-header {
      height: 180px;
      width: 100%;
      margin-bottom: 25px;
      background-color: #11151c;

      .category {
        height: 65%;
        width: 95%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .cate-item {
          width: 7%;
          height: 100%;

          .icon {
            background-image: url("../../../public/img/serch/dao.png");
            height: 40px;
            width: 40px;
            background-position: center;
            background-size: cover;
            margin: 30px 20px 0;
          }

          p {
            height: 52px;
            text-align: center;
            font-size: 16px;
            line-height: 45px;
            color: #666;
          }

          ul {
            width: 200px;
            position: relative;
            overflow: auto;
            background-color: #2d2f3e;
            padding: 5px;
            display: none;

            li {
              height: 32px;
              width: 90px;
              line-height: 32px;
              list-style-type: none;
              float: left;
              background-color: #353748;
              color: #8e9593;
              text-align: center;
              margin: 5px;
              font-size: 14px;
            }
          }
        }

        .cate-item:hover {
          background-color: #2d2f3e;

          ul {
            display: inherit;
            z-index: 1000;
          }
        }
      }

      .criteria {
        height: 35%;
        width: 95%;
        margin: 0 auto;
        border-top: solid #2c2f38 1px;

        .criteria-item {
          height: 35px;
          width: 90px;
          float: left;
          margin: 13px 20px 13px 0;
          background-color: #2d2f3e;

          h5 {
            color: #8e9593;
            height: 100%;
            line-height: 35px;
            font-size: 16px;
            padding-left: 10px;
          }

          h5:hover {
            background-color: #3a455a;
            color: #d7dcdb;
          }

          ul {
            display: none;
            position: relative;
            z-index: 10;

            li {
              height: 30px;
              width: 90px;
              font-size: 16px;
              line-height: 30px;
              background-color: #2d2f3e;
              padding: 0 10px;
              border-top: solid #36394b 1px;
              color: #fff;
            }
          }
        }

        .criteria-item:hover {
          ul {
            display: inherit;
          }
        }

        .right {
          float: right;
          margin-right: 20px;
        }

        .criteria-search {
          height: 35px;
          width: 280px;
          float: right;
          margin: 13px 8px 13px 0;

          /deep/ .el-input__inner {
            background-color: rgba(72, 134, 255, 0.16);
            border-color: #3f5d97;
            width: 200px;
            height: 35px;
            font-size: 15px;
          }

          /deep/ .el-input-group__append:hover {
            background-color: #4773c8;
          }

          /deep/ .el-input-group__append {
            background-color: #3f5d97;
            color: #fff;
            width: 50px;
            height: 35px;
            border: none;
          }
        }

        .counter {
          width: 215px;
          color: #888d94;
          margin: 13px 0 13px 0;

          /deep/ .el-input,
          /deep/ .el-input__inner {
            width: 80px;
            height: 35px;
            background-color: #2d2f3e;
          }
        }
      }
    }

    .list {
      box-sizing: border-box;
      width: 100%;
      height: fit-content;
      background-color: #fff;
      padding: 20px 30px;
      display: inline-grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      column-gap: 20px;
      row-gap: 20px;
    }
  }
}
</style>
