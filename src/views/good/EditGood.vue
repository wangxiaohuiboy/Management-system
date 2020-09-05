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
              :on-remove="handleRemove"
              :show-file-list="true"
              :file-list="ShufflingArr"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <!-- <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>-->
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
            <el-button type="primary" @click="saveEditorNewGood(form)">确认保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="$route.params.gid==0?false:true" label="商品属性">
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
      <el-tab-pane label="商品详情">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
          style="height:600px"
        ></quill-editor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; //引入编辑器
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);
import {
  getGoodsDetailsAPI,
  getQueryClassificationAPI,
  getQueryBrandAPI,
  uploadNewPicAPI,
  editorNewGoodAPI,
  getQueryAttributeAPI,
} from "@/request/api.js";
import loginVue from "../Login/login.vue";
export default {
  data() {
    return {
      content: `<p>insert text here...</p>`,
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
      //新品
      is_new: 0,
      //人气
      is_hot: 0,
      //最终上传的轮播图
      endShufflingArr: [],
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
      this.content = res[1].data.goods_desc;
      // console.log(res[1].data.goods_desc);
      let is_new = res[1].data.is_new ? "新品" : null;
      let is_hot = res[1].data.is_hot ? "人气" : null;
      this.type.push(is_new, is_hot);
      console.log(this.type);
      res[1].data.gallery.map((el) => {
        let obj = { name: "good_pic", url: el.img_url };
        this.ShufflingArr.push(obj);
      });
    });
    //查询属性列表
    getQueryAttributeAPI({
      page: 1,
      size: 110,
    }).then((res) => {
      this.attributeData = res.data.data;
    });
  },
  methods: {
    // 轮播图上传图片接口
    uploadRequest2(data) {
      console.log(data.file.uid);
      let formdata = new FormData();
      formdata.append("good_pic", data.file);
      uploadNewPicAPI(formdata).then((res) => {
        if (res.errno === 0) {
          let obj = {
            uid: data.file.uid,
            name: "good_pic",
            url: res.data.fileUrl,
          };
          this.ShufflingArr.push(obj);
        }
      });
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
      this.ShufflingArr = fileList;
    },
    // 确认保存
    saveEditorNewGood(form) {
      this.type.map((el) => {
        console.log(el);
        this.is_new = el === "新品" ? 1 : 0;
      });
      this.type.map((el) => {
        this.is_hot = el === "人气" ? 1 : 0;
      });
      console.log(this.type);
      this.ShufflingArr.map((el) => {
        this.endShufflingArr.push(el.url);
      });
      editorNewGoodAPI({
        id: form.id,
        category_id: Number(form.category_id),
        name: form.name,
        brand_id: Number(form.brand_id),
        goods_number: Number(form.goods_number),
        goods_brief: form.goods_brief,
        goods_desc: this.content,
        sort_order: form.sort_order,
        is_delete: this.is_delete ? 0 : 1,
        is_new: Number(this.is_new),
        goods_unit: form.goods_unit,
        primary_pic_url: form.primary_pic_url,
        list_pic_url: this.imageUrl,
        retail_price: Number(form.retail_price),
        is_hot: this.is_hot,
        attribute: this.currentAttributeArr,
        gallerys: this.endShufflingArr,
      }).then((res) => {
        if (res.errno === 0) {
          this.$message({
            message: "商品信息修改成功",
            type: "success",
          });
          // this.$router.go(-1);
        }
      });
    },
    // 取消
    cancel() {
      this.$router.back(-1);
    },
    //添加商品属性
    addGoodsAttribute() {
      this.currentAttributeArr.push({
        goods_id: Number(this.$route.params.gid),
        id: 0,
      });
    },
    //删除商品属性
    handleDelete(index, row) {
      this.currentAttributeArr.map((el) => {
        if (row.attribute_id === el.attribute_id) {
          this.currentAttributeArr.splice(index, 1);
        }
      });
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml: function (event) {
      alert(this.content);
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