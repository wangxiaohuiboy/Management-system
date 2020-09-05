<template>
  <div class="category">
    <el-button style="margin-bottom:20px" type="primary" size="mini" @click="categoryAdd">添加</el-button>
    <el-table :data="categoryData" border style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="address" label="分类级别">
        <div slot-scope="scope">{{scope.row.level===1?'顶级分类':'子分类'}}</div>
      </el-table-column>
      <el-table-column prop="wap_banner_url" label="图片">
        <img style="height:45px" slot-scope="scope" :src="scope.row.wap_banner_url"></img>
      </el-table-column>
      <el-table-column prop="is_show" label="是否显示">
        <div slot-scope="scope">{{scope.row.is_show?'是':'否'}}</div>
      </el-table-column>
      <el-table-column prop="sort_order" label="排序"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { getCategoryAPI } from "@/request/api.js";
export default {
  data() {
    return {
      //分类数据请求
      categoryData: [],
      //顶级分类请求
      category:[]
    };
  },
  created() {
    //查询分类接口请求
    getCategoryAPI().then((res) => {
      this.categoryData = res.data;
    });
  },
  methods: {
    //编辑按钮
    handleEdit(index, row) {
      this.$router.push("/editcategory/" + row.id)
    },
    //添加按钮
    categoryAdd(){
      this.$router.push("/editcategory/" + 0)
    }
  },
};
</script>
 
<style lang = "less" scoped>
.category{
  height: 98%;
  padding: 10px;
  background: #fff;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>