<template>
  <div class="editattribute">
    <el-form :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="属性分类" prop="region">
        <el-select v-model="currentID" placeholder="请选择分类">
          <el-option
            v-for="items in classification"
            :key="items.id"
            :label="items.name"
            :value="items.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="属性名称" prop="name">
        <el-input style="width:225px" v-model="name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveEditattribute">保存</el-button>
        <el-button @click="cancelEditattribute">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import {
  GetAttributeDetailsAPI,
  getCategoryAPI,
  EditorNewAttributeAPI,
} from "@/request/api.js";
export default {
  data() {
    return {
      name: "",
      //当前的id
      currentID: 0,
      //分类的数组
      classification: [],
      //当前页面的对象
      editattribute: {},
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        region: [{ required: true, message: "分类不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    //属性名称请求
    GetAttributeDetailsAPI({
      id: this.$route.params.aid,
    }).then((res) => {
      this.editattribute = res.data;
      this.name = res.data.name;
      this.currentID = res.data.attribute_category_id;
    });
    //查询分类接口
    getCategoryAPI().then((res) => {
      this.classification = res.data;
    });
  },
  methods: {
    //保存按钮
    saveEditattribute() {
      EditorNewAttributeAPI({
        id: this.$route.params.aid,
        attribute_category_id: this.currentID,
        name: this.name,
        input_type: this.editattribute.input_type,
        values: this.editattribute.values,
        is_show: this.editattribute.is_show,
        is_new: this.editattribute.is_new,
      }).then((res) => {
        if (res.errno === 0) {
          this.$message({
            message: "属性信息修改成功",
            type: "success",
          });
          this.$router.go(-1);
        }
      });
    },
    //取消按钮
    cancelEditattribute() {
      this.$router.go(-1);
    },
  },
};
</script>
 
<style lang = "less" scoped>
.editattribute {
  padding: 10px 0;
  background: #fff;
}
</style>