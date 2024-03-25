<template>
    <div class="market" @click="handleChecked(item.iid)" :class="{ iconChecked: isChecked }">
        <a href="javascript:void(0)">
            <div class="item_bg">
                <img class="marketImg" :src="item.img" alt="" />
            </div>
        </a>
        <h3>
            <a href="javascript:void(0)">{{ item.name }}</a>
        </h3>
        <p>
            <b>￥{{ item.price }}</b>
            <span class="selling" :class="{ isShow: item.isSell === '1' }">出售中</span>
        </p>
        <span class="tag w1" v-show="item.wid === 1">崭新出厂</span>
        <span class="tag w2" v-show="item.wid === 2">略有磨损</span>
        <span class="tag w3" v-show="item.wid === 3">久经沙场</span>
        <span class="tag w4" v-show="item.wid === 4">破损不堪</span>
        <span class="tag w5" v-show="item.wid === 5">战痕累累</span>

        <i class="icon"></i>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "inventoryItem",
    components: {},
    props: ["item",],
    data() {
        return {
        };
    },
    methods: {
        // 判断是否选中
        handleChecked(iid) {
            this.$store.dispatch("toggleSellCheckedItem", iid);
        },
    },
    computed: {
        // 使用计算属性来根据 item.Id 判断是否被选中
        isChecked() {
            return this.$store.getters.isChecked(this.item.iid);
        },
    },
    mounted() {

    },

};
</script>

<style scoped lang="less">
.market {
    height: 230px;
    background-color: white;
    border: 1px solid #e4e4e4;
    position: relative;

    .item_bg {
        height: 70%;
        width: 100%;
        background-image: url("../../../public/img/bg/item_bg.png");
    }

    .marketImg {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    h3 {
        margin: 6px 10px 0;
        height: 26px;
        overflow: hidden;
    }

    p {
        margin: 6px 10px 0;
        font-size: 16px;
        color: #eea20e;
    }

    .selling {
        font-size: 12px;
        line-height: 20px;
        display: none;
    }

    .isShow {
        display: inline-block;
    }

    span {
        color: #959595;
        float: right;
        font-size: 14px;
    }

    h3 a:hover {
        color: #f5b50e;
    }

    a {
        color: #111;
        text-decoration: none;
    }

    .tag {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 12px;
        display: inline-block;
        height: 18px;
        border-radius: 2px;
        line-height: 18px;
        padding: 0 6px;
        color: white;
    }

    .w1 {
        background-color: #397439;
    }

    .w2 {
        background-color: #488b48;
    }

    .w3 {
        background-color: #f1ad4d;
    }

    .w4 {
        background-color: #b7625f;
    }

    .w5 {
        background-color: #993a38;
    }

    .icon {
        display: none;
        width: 40px;
        height: 40px;
        background-image: url(~@img/icon.png);
        background-position: -144px -334px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
}

.iconChecked {
    .icon {
        display: inline-block;
        background-position: -242px -272px;
    }

    border: 1px solid #eea20e;
}

.market:hover {
    background-color: #fefcf7;
    border: 1px solid #eea20e;

    .icon {
        display: inline-block;
    }
}
</style>
