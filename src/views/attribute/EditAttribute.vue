<template>
  <div class="editattribute">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="属性分类" prop="region">
        <el-select v-model="ruleForm.currentID" placeholder="请选择分类">
          <el-option  label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="属性名称" prop="name">
        <el-input style="width:225px" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import { GetAttributeDetailsAPI, getCategoryAPI } from "@/request/api.js";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        //当前的id
        currentID: 0,
        //分类的数组
        classification: [],
      },
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        region: [
          { required: true, message: "分类不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    //属性名称请求
    GetAttributeDetailsAPI({
      id: this.$route.params.aid,
    }).then((res) => {
      this.ruleForm.name = res.data.name;
      this.currentID = res.data.attribute_category_id;
    });
    //查询分类接口
    getCategoryAPI().then((res) => {
        console.log(res);
    //   this.ruleForm.classification = res.data;
        
    });
  },
};
</script>
 
<style lang = "less" scoped>
.editattribute {
  padding: 10px 0;
  background: #fff;
}
</style>