<template>
  <div class="editgood">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属分类">
        <el-select v-model="form.category_id" placeholder="请选择活动分类">
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
        <el-select v-model="form.category_id" placeholder="请选择活动分类">
          <el-option
            v-for="category in categroyLists"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>-->
      <!-- <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>-->

      <!-- <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>
 
<script>
import {
  getGoodsDetailsAPI,
  getQueryClassificationAPI,
  getQueryBrandAPI,
} from "@/request/api.js";
export default {
  data() {
    return {
      //商品分类数组
      categroyLists: [],
      //商品详情
      form: {},
      //品牌分类
      brand: [],
    };
  },
  created() {
    // // 获取商品分类
    // getQueryClassificationAPI().then((res) => {
    //   if (res.errno == 0) this.categroyLists = res.data;
    // });
    // //获取商品详情
    // getGoodsDetailsAPI({
    //   id: this.$route.params.gid,
    // }).then((res) => {
    //   if (res.errno == 0) this.form = res.data;
    // });
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
    });
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
 
<style lang = "less" scoped>
</style>