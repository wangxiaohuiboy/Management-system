<template>
  <div class="edittopic">
    <el-form ref="ProjectDetails" :model="ProjectDetails" label-width="80px">
      <el-form-item label="主标题">
        <el-input v-model="ProjectDetails.title"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input v-model="ProjectDetails.subtitle"></el-input>
      </el-form-item>
      <el-form-item label="品牌图片">
        <el-upload
          class="avatar-uploader"
          action
          :http-request="uploadRequest"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="ProjectDetailsimageUrl" :src="ProjectDetailsimageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="最低价格">
        <el-input v-model="ProjectDetails.price_info"></el-input>
      </el-form-item>
      <el-form-item label="显示">
        <el-switch v-model="is_show"></el-switch>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="ProjectDetails.sort_order"></el-input>
      </el-form-item>
      <el-form-item label="品牌描述">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
          style="width:98%;height:600px;margin-left:20px;"
        ></quill-editor>
      </el-form-item>
      <el-form-item label style="margin-top:80px;margin-left:20px">
        <el-button type="primary" :plain="true" @click="saveTopic">保存</el-button>
        <el-button @click="cancelTopic">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; //引入编辑器
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);
import {
  getProjectDetailsAPI,
  editorNewTopicAPI,
  uploadNewPicAPI,
} from "@/request/api.js";
export default {
  data() {
    return {
      //富文本内容
      content: `<p>insert text here...</p>`,
      //富文本配置项
      editorOption: {
        modules: {
          //图片拖到文本框自动添加
          imageDrop: true,
          //富文本配置项
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"],
            //引用，代码块
            [{ header: 1 }, { header: 2 }],
            // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }],
            //列表
            [{ script: "sub" }, { script: "super" }],
            // 上下标
            [{ indent: "-1" }, { indent: "+1" }],
            // 缩进
            [{ direction: "rtl" }],
            // 文本方向
            [{ size: ["small", false, "large", "huge"] }],
            // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            //几级标题
            [{ color: [] }, { background: [] }],
            // 字体颜色，字体背景颜色
            [{ font: [] }],
            //字体
            [{ align: [] }],
            //链接
            ["link"],
            //对齐方式
            ["clean"],
            //清除字体样式
            ["image", "video"],
            //上传图片、上传视频
          ],
        },
        theme: "snow",
      },
      //专题详情数据对象
      ProjectDetails: {},
      //品牌图片
      ProjectDetailsimageUrl: "",
      //是否展示
      is_show: false,
    };
  },
  created() {
    //专题详情请求
    getProjectDetailsAPI({
      id: this.$route.params.tid,
    }).then((res) => {
      this.ProjectDetails = res.data;
      this.ProjectDetailsimageUrl = res.data.scene_pic_url;
      this.content = res.data.content;
      this.is_show = res.data.is_show ? true : false;
    });
  },
  methods: {
    // 取消按钮
    cancelTopic() {
      this.$router.go(-1);
    },
    // 保存
    saveTopic() {
      editorNewTopicAPI({
        id: this.$route.params.tid,
        title: this.ProjectDetails.title,
        content: this.content,
        subtitle: this.ProjectDetails.subtitle,
        topic_category_id: this.ProjectDetails.topic_category_id,
        price_info: this.ProjectDetails.price_info,
        read_count: this.ProjectDetails.read_count,
        scene_pic_url: this.ProjectDetailsimageUrl,
        topic_template_id: this.ProjectDetails.topic_template_id,
        topic_tag_id: this.ProjectDetails.topic_tag_id,
        sort_order: this.ProjectDetails.sort_order,
        is_show: this.is_show,
      }).then((res) => {
        if (res.errno === 0) {
          this.$message({
            message: "品牌信息修改成功",
            type: "success",
          });
          this.$router.go(-1);
        }
      });
    },
    //上传图片的请求
    uploadRequest(data) {
      let formdata = new FormData();
      formdata.append("good_pic", data.file);
      uploadNewPicAPI(formdata).then((res) => {
        if (res.errno === 0) this.ProjectDetailsimageUrl = res.data.fileUrl;
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    onEditorBlur(event) {}, // 失去焦点事件
    onEditorFocus(event) {}, // 获得焦点事件
    onEditorChange(event) {}, // 内容改变事件
    saveHtml: function (event) {
      alert(this.content);
    },
  },
};
</script>
 
<style lang = "less" scoped>
.edittopic {
  height: 98%;
  padding: 10px 0;
  background: #fff;
  overflow-y: auto;
  box-sizing: border-box;
  .el-form {
    /deep/.el-form-item__label {
      width: 100px !important;
    }
    .el-form-item {
      .el-input {
        width: 225px;
      }
      .avatar-uploader .el-icon-plus {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 187px;
        height: 105px;
        line-height: 105px;
        text-align: center;
      }
      .avatar {
        width: 187px;
        height: 105px;
        display: block;
      }
    }
  }
}
</style>