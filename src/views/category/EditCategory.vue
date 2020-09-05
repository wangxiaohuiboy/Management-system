<template>
  <div class="editcategory">
    <el-form
      :model="editcategory"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="上级分类" prop="region">
        <el-select v-model="editcategory.parent_id" placeholder="上级分类">
          <el-option v-for="item in topArray" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="editcategory.name"></el-input>
      </el-form-item>
      <el-form-item label="分类图片">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          name="good_pic"
          :http-request="uploadRequest"
          :headers="headers"
        >
          <img v-if="editcategoryimageUrl" :src="editcategoryimageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="显示">
        <el-switch v-model="is_show"></el-switch>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="editcategory.sort_order"></el-input>
      </el-form-item>
      <el-form-item label="分类描述" prop="desc">
        <el-input type="textarea" v-model="editcategory.front_desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveEditcategory">保存</el-button>
        <el-button @click="cancelEditcategory">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import {
  GetClassificationDetailsAPI,
  QueryTopClassificationAPI,
  uploadNewPicAPI,
  EditorNewClassificationAPI,
} from "@/request/api.js";
export default {
  data() {
    return {
      //图片
      editcategoryimageUrl: "",
      //页面数据渲染
      editcategory: {},
      //显示
      is_show: false,
      //顶级分类数组
      topArray: [],
      //携带请求头
      headers: {
        "X-Nideshop-Token": localStorage.getItem("token"),
      },
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        region: [
          { required: true, message: "请选择上级分类", trigger: "blur" },
        ],
        desc: [
          { required: true, message: "品牌描述不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    //分类详情请求
    GetClassificationDetailsAPI({
      id: this.$route.params.cid,
    }).then((res) => {
      this.editcategory = res.data;
      this.editcategoryimageUrl = res.data.wap_banner_url;
      this.is_show = res.data.is_show ? true : false;
    });
    //顶级分类请求
    QueryTopClassificationAPI().then((res) => {
      this.topArray = res.data;
    });
  },
  methods: {
    //图片上传图片请求
    uploadRequest(data) {
      let formdata = new FormData();
      formdata.append("good_pic", data.file);
      uploadNewPicAPI(formdata).then((res) => {
        if (res.errno === 0) this.editcategoryimageUrl = res.data.fileUrl;
      });
    },
    //保存
    saveEditcategory() {
      console.log(this.editcategory);
      EditorNewClassificationAPI({
        id: this.$route.params.cid,
        name: this.editcategory.name,
        front_desc: this.editcategory.front_desc,
        parent_id: this.editcategory.parent_id,
        sort_order: this.editcategory.sort_order,
        show_index: this.editcategory.show_index,
        is_show: this.is_show,
        banner_url: this.editcategory.banner_url,
        icon_url: this.editcategory.icon_url,
        img_url: this.editcategory.img_url,
        wap_banner_url: this.editcategoryimageUrl,
        type: this.editcategory.type,
        front_name: this.editcategory.front_name,
        is_new: this.editcategory.is_new,
      }).then((res) => {
        if (res.errno === 0) {
          this.$message({
            message: "分类信息修改成功",
            type: "success",
          });
          this.$router.go(-1);
        }
      });
    },
    //取消
    cancelEditcategory() {
      this.$router.go(-1);
    },
  },
};
</script>
 
<style lang = "less" scoped>
.editcategory {
  /* height: 98%; */
  padding: 10px;
  background: #fff;
  overflow-y: auto;
  box-sizing: border-box;
  .el-form {
    .el-form-item {
      .el-input {
        width: 225px;
      }
      /deep/.el-textarea__inner {
        width: 225px;
        height: 117px;
      }
    }
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
    width: 105px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }
  .avatar {
    width: 105px;
    height: 105px;
    display: block;
  }
}
</style>