<template>
    <div class="content">
        <div class="market" v-for="item in marketInfo" :key="item.Id" @click="isSelect(item.Id)"
            :class="{ iconChecked: isChecked(item.Id) }">
            <a href="javascript:void(0)">
                <div class="item_bg">
                    <img class="marketImg" :src="item.Img" alt="" />
                </div>
            </a>
            <h3>
                <a href="javascript:void(0)">{{ item.Title }}</a>
            </h3>
            <p>
                <b>￥{{ item.Price }}</b>
            </p>
            <span class="tag">崭新出厂</span>
            <i class="icon"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "inventoryItem",
    components: {},
    props: ["marketInfo", "checkedItem"],
    data() {
        return {

        }
    },
    methods: {
        isSelect(id) {
            if (this.checkedItem.includes(id)) {
                this.checkedItem = this.checkedItem.filter(itemId => itemId !== id);
            } else {
                this.checkedItem.push(id);
            }
        },
        isChecked(id) {
            return this.checkedItem.includes(id);
        }
    },
    mounted() {

    },
}
</script>

<style scoped lang="less">
.content {
    height: fit-content;
    width: 100%;
    margin-top: 20px;
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-column-gap: 20px;

    .market {
        height: 230px;
        margin-bottom: 16px;
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
            background-color: #397439;
            font-size: 12px;
            display: inline-block;
            height: 18px;
            border-radius: 2px;
            line-height: 18px;
            padding: 0 6px;
            color: white;

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



}
</style>