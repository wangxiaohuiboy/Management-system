<template>
  <div class="editgood">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="所属分类">
            <el-select v-model="form.category_id" placeholder="请选择所属分类">
              <el-option
                v-for="category in categroyLists"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="所属品牌">
            <el-select v-model="form.brand_id" placeholder="请选择所属品牌">
              <el-option v-for="item in brand" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input style="width:225px;height:54px" type="textarea" v-model="form.goods_brief"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              class="avatar-uploader"
              action
              name="good_pic"
              :http-request="uploadRequest"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="headers"
            >
              <img style="width:187px;height:105px" v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span>推荐图片尺寸：750*420</span>
          </el-form-item>
          <el-form-item label="轮播图图片">
            <el-upload
              action
              name="good_pic"
              :http-request="uploadRequest2"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :show-file-list="true"
              :file-list="ShufflingArr"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-input v-model="form.goods_unit"></el-input>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品售价">
            <el-input v-model="form.retail_price"></el-input>
          </el-form-item>
          <el-form-item label="推荐类型">
            <el-checkbox-group v-model="type">
              <el-checkbox label="新品" name="type"></el-checkbox>
              <el-checkbox label="人气" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="上架">
            <el-switch v-model="is_delete"></el-switch>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="form.sort_order"></el-input>
          </el-form-item>
          <div class="botton" style="margin-left:120px">
            <el-button type="primary" @click="saveEditorNewGood">确认保存</el-button>
            <el-button>取消</el-button>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <el-button style="margin-bottom:10px" type="primary" @click="addGoodsAttribute">添加商品属性</el-button>
        <el-table border :data="currentAttributeArr" style="width: 100%">
          <el-table-column label="参数名称">
            <template slot-scope="scope">
              <el-select v-model="scope.row.attribute_id" placeholder="请选择参数名称" style="width: 198">
                <el-option
                  v-for="att in attributeData"
                  :key="att.id"
                  :label="att.name"
                  :value="att.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="参数值">
            <template slot-scope="scope">
              <el-input style="width: 354" v-model="scope.row.value"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="medium"
                style="height:40px"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="商品详情">商品详情</el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
import {
  getGoodsDetailsAPI,
  getQueryClassificationAPI,
  getQueryBrandAPI,
  uploadNewPicAPI,
  editorNewGoodAPI,
  getQueryAttributeAPI,
} from "@/request/api.js";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      // 当前页面的属性分组
      currentAttributeArr: [],
      //全部属性数组
      attributeData: [],
      //商品分类数组
      categroyLists: [],
      //商品详情
      form: {},
      //品牌分类
      brand: [],
      //上传的图片路径
      imageUrl: "",
      //携带请求头
      headers: {
        "X-Nideshop-Token": localStorage.getItem("token"),
      },
      //轮播图图片
      dialogImageUrl: "",
      // 轮播图数组
      ShufflingArr: [],
      dialogVisible: false,
      //是否上架
      is_delete: true,
      //推荐类型
      type: [],
    };
  },
  created() {
    // 查询品牌
    getQueryBrandAPI({
      page: 1,
      size: 100,
      name: "",
    }).then((res) => {
      if (res.errno == 0) this.brand = res.data.data;
    });
    Promise.all([
      // 获取商品分类
      getQueryClassificationAPI(),
      //获取商品详情
      getGoodsDetailsAPI({
        id: this.$route.params.gid,
      }),
    ]).then((res) => {
      this.categroyLists = res[0].data;
      this.form = res[1].data;
      this.imageUrl = res[1].data.list_pic_url;
      this.is_delete = res[1].data.is_delete == 1 ? false : true;
      this.currentAttributeArr = res[1].data.attribute;
      console.log(res[1].data.attribute);
      let is_new = res[1].data.is_new ? "新品" : "";
      let is_hot = res[1].data.is_hot ? "人气" : "";
      this.type.push(is_new, is_hot);
      res[1].data.gallery.map((el) => {
        let obj = { name: "", url: el.img_url };
        this.ShufflingArr.push(obj);
      });
    });
    //查询属性列表
    getQueryAttributeAPI({
      page: 1,
      size: 110,
    }).then((res) => {
      this.attributeData = res.data.data;
      console.log(res);
    });
  },
  methods: {
    // 轮播图上传图片接口
    uploadRequest2(data) {
      let formdata = new FormData();
      formdata.append("good_pic", data.file);
      uploadNewPicAPI(formdata).then((res) => {});
    },
    //上传图片请求
    uploadRequest(data) {
      let formdata = new FormData();
      formdata.append("good_pic", data.file);
      uploadNewPicAPI(formdata).then((res) => {
        if (res.errno === 0) this.imageUrl = res.data.fileUrl;
      });
    },
    //商品图片上传成功后的钩子
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //商品图片上传文件之前的钩子
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isLt50K = file.size / 1024 / 1024 < 1;

      if (!isPNG) {
        this.$message.error("上传头像图片只能是 PNG 格式!");
      }
      if (!isLt50K) {
        this.$message.error("上传头像图片大小不能超过 50K!");
      }
      return isPNG && isLt50K;
    },
    //轮播图文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //轮播图点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 编辑新增商品
    saveEditorNewGood() {
      editorNewGoodAPI({}).then((res) => {
        console.log(res);
      });
    },
    //添加商品属性
    addGoodsAttribute() {
      this.currentAttributeArr.push({});
    },
    handleDelete(index, row) {
      this.currentAttributeArr.forEach((el) => {
        if (el.id == row.id) this.currentAttributeArr.splice(1, 1, el);
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.editgood {
  height: 97%;
  background: #fff;
  overflow-y: auto;
  box-sizing: border-box;
  .el-tab-pane {
    padding-bottom: 30px;
    padding-top: 15px;
  }
  .el-form-item {
    .el-input {
      width: 225px;
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
  span {
    display: block;
    font-size: 12px;
    color: #999;
    line-height: 10px;
    text-align: left;
  }
}
.editgood::-webkit-scrollbar {
  width: 0;
}
</style>