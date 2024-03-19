<template>
    <div id="contribute">

        <h3>编辑投稿内容</h3>
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="标题内容">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="作者名称">
                <el-input v-model="form.author" disabled></el-input>
            </el-form-item>
            <el-form-item label="正文内容">
                <div style="border: 1px solid #ccc;">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                        mode="simple" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="form.context"
                        :defaultConfig="editorConfig" mode="simple" @onCreated="onCreated" />
                </div>
            </el-form-item>
            <el-form-item label="封面上传">
                <el-upload ref="upload" :action="uploadUrl" list-type="picture-card" :on-success="handleSuccess"
                    :on-change="hangleChange" :before-upload="beforeUpload" :limit="1" :class="{ hide: hideUpload }">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="投稿分类">
                <el-select v-model="form.source" placeholder="请选择">
                    <el-option label="CS2" value="CS2">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button>取消</el-button>
                <el-button type="primary" @click="onSubmit">投稿</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from 'axios'
export default {
    name: "contribute",
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            toolbarConfig: {
                insertKeys: { index: 1, keys: ["fontSize", "fontFamily"] },
                excludeKeys: ["insertVideo", "insertTable", "through", "todo", "codeBlock", 'insertLink', 'header1', 'header2', 'header3', 'bulletedList', 'numberedList', "blockquote"],//需要屏蔽的菜单
            },
            editorConfig: {
                MENU_CONF: {
                    uploadImage: {
                        // server:放自己公司后端提供的图片上传接口
                        server: "http://localhost:8081/file/upload",
                        // fieldName:自己公司和后端共同约定好的接收图片接口参数名
                        fieldName: 'file',
                        // 请求头
                        // headers: { Authorization: 'Bearer ' + getToken() },
                        customInsert: (res, insertFn) => {
                            console.log('res,insertfn:', res, insertFn)
                            insertFn(res.data)
                        }
                    }
                }
            },
            form: {},
            disabled: false,
            uploadUrl: "http://localhost:8081/file/upload",
            hideUpload: false,
        }
    },
    methods: {
        // 初始化
        init() {
            this.form.author = this.$store.state.userInfo.nickName;
        },
        // 在创建wangeditor时初始化
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        // 删除图片
        handleRemove(file) {
            console.log(file);
            this.hideUpload = false;
        },
        // 上传图片成功
        handleSuccess(response, file, fileList) {
            // 上传成功后的逻辑
            // console.log('File uploaded successfully:', response);
            this.form.coverURL = response.data
        },
        beforeUpload(file) {
            console.log('file.size ', file.size)
            const isLt500K = file.size / 1024 / 1024 < 10;
            console.log('isLt500K', isLt500K)
            if (!isLt500K) {
                this.$message.error('上传的文件大小不能超过 10KB!');
            }
            return isLt500K;
        },
        hangleChange() {
            this.hideUpload = true;

        },
        // 当点击提交按钮时触发
        onSubmit() {
            // this.$refs.upload.submit();
            console.log('data：', this.form)
            axios.post("http://localhost:8081/gameInfo/addGameInfo", {
                gameInfo: this.form
            }).then(res => {
                console.log('res:', res.data)
                this.$message({
                    type: "success",
                    message: "发布成功！"
                })
                this.$router.push({
                    name: "GameInfo",
                });
            })
        },

    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
}
</script>

<style scoped lang="less">
#contribute {
    width: 80%;
    height: fit-content;
    background-color: #fff;
    margin: 0 auto;
    padding: 20px 40px;

    .hide {
        /deep/.el-upload--picture-card {
            display: none;
        }
    }
}
</style>