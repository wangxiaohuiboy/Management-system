<template>
  <div class="editbrand">
    <el-form ref="form" :model="brand" :rules="rules" label-width="80px">
      <el-form-item :required="false" label="活动名称" prop="brandName">
        <el-input v-model="brand.name"></el-input>
      </el-form-item>
      <el-form-item label="品牌图片">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          name="good_pic"
          :http-request="uploadRequest"
        >
          <img v-if="pic_url" :src="pic_url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="品牌列表图片">
        <el-upload class="avatar-uploader" action :show-file-list="false">
          <img v-if="list_pic_url" :src="list_pic_url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="app专用图片">
        <el-upload class="avatar-uploader" action :show-file-list="false">
          <img v-if="app_list_pic_url" :src="app_list_pic_url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="最低价">
        <el-input v-model="brand.floor_price"></el-input>
      </el-form-item>
      <el-form-item label="新品">
        <el-switch v-model="is_new"></el-switch>
      </el-form-item>
      <el-form-item label="显示">
        <el-switch v-model="is_show"></el-switch>
      </el-form-item>
      <el-form-item :required="false" label="排序" prop="sorting">
        <el-input v-model="brand.new_sort_order"></el-input>
      </el-form-item>
      <el-form-item :required="false" label="品牌描述" prop="describe">
        <el-input type="textarea" v-model="brand.simple_desc"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="saveBrand">保存</el-button>
        <el-button @click="cancelBrand">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import { GetBrandDetailsAPI, NewEditGoodBrandAPI,uploadNewPicAPI } from "@/request/api.js";
export default {
  data() {
    return {
      //品牌图片
      pic_url: "",
      //品牌列表图片
      list_pic_url: "",
      imageUrl: "",
      // app专用图片
      app_list_pic_url: "",
      //页面数据对象
      brand: {},
      //携带请求头
      headers: {
        "X-Nideshop-Token": localStorage.getItem("token"),
      },
      rules: {
        brandName: [
          { required: true, message: "名称不能为空", trigger: "blur" },
        ],
        sorting: [{ required: true, message: "排序不能为空", trigger: "blur" }],
        describe: [
          { required: true, message: "品牌描述不能为空", trigger: "blur" },
        ],
      },
      //新品
      is_new: false,
      //显示
      is_show: false,
    };
  },
  created() {
    GetBrandDetailsAPI({
      id: this.$route.params.bid,
    }).then((res) => {
      this.brand = res.data;
      this.pic_url = res.data.pic_url;
      this.list_pic_url = res.data.list_pic_url;
      this.app_list_pic_url = res.data.app_list_pic_url;
      this.is_new = res.data.is_new ? true : false;
      this.is_show = res.data.is_show ? true : false;
      console.log(res.data);
    });
  },
  methods: {
    //取消按钮
    cancelBrand() {
      this.$router.go(-1);
    },
    //保存按钮
    saveBrand() {
      console.log(this.brand.list_pic_url);
      NewEditGoodBrandAPI({
        id: this.$route.params.bid,
        name: this.brand.name,
        // list_pic_url:
      }).then((res) => {
        console.log(res);
      });
    },
    //上传图片请求
    uploadRequest(data) {
      let formdata = new FormData();
      formdata.append("good_pic", data.file);
      uploadNewPicAPI(formdata).then((res) => {
        if (res.errno === 0) this.list_pic_url = res.data.fileUrl;
      });
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
 
<style lang = "less" scoped>
.editbrand {
  height: 98%;
  padding: 10px;
  background: #fff;
  overflow-y: auto;
  box-sizing: border-box;
  .el-form {
    .el-form-item {
      /deep/.el-form-item__error {
        margin-left: 20px;
      }
      /deep/.el-form-item__label {
        width: 100px !important;
      }
      .el-input {
        width: 225px;
      }
      /deep/.el-textarea__inner {
        margin-left: 20px;
        margin-top: -20px;
        width: 225px;
        height: 117px;
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