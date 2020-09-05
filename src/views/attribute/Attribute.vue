<template>
  <div class="attribute">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="attName" placeholder="属性名称"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="attribute_category.id" placeholder="请选择">
          <el-option
            v-for="item in attribute_category"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onQueryAttribute">查询</el-button>
        <el-button type="primary" size="small" @click="onAddAttribute">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="attributeData" border style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="属性名称"></el-table-column>
      <el-table-column prop="attribute_category_id" label="属性分类">
        <div slot-scope="scope">{{attribute_category[scope.row.attribute_category_id]?attribute_category[scope.row.attribute_category_id].name:''}}</div>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
  </div>
</template>
 
<script>
import { getQueryAttributeAPI, getCategoryAPI } from "@/request/api.js";
export default {
  data() {
    return {
      //属性名称
      attName: "",
      //属性列表
      attributeData: [],
      //属性分类
      attribute_category: [],
      //当前页
      currentPage: 1,
      //属性总个数
      count: 0,
      //每页多少个
      pageSize: 10,
    };
  },
  created() {
    this.GetAttribute();
    //分类请求
    getCategoryAPI().then((res) => {
      this.attribute_category = res.data;
      let obj = {};
      res.data.map((el) => {
        if (!obj[el.id]) {
          obj[el.id] = el;
        }
      });
      this.attribute_category = obj;
      console.log(this.attribute_category);
    });
  },
  methods: {
    //添加按钮
    onAddAttribute() {
      this.$router.push("/editattribute/" + 0);
    },
    //查询
    onQueryAttribute() {
      this.currentPage = 1;
      this.GetAttribute();
    },
    //编辑按钮
    handleEdit(index, row) {
      this.$router.push("/editattribute/" + row.id);
    },
    //每页的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.GetAttribute();
    },
    //当前第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetAttribute();
    },
    //封装属性请求
    GetAttribute() {
      //属性列表请求
      getQueryAttributeAPI({
        page: this.currentPage,
        size: this.pageSize,
        name: this.attName,
      }).then((res) => {
        this.attributeData = res.data.data;
        this.count = res.data.count;
        this.pageSize = res.data.pageSize;
        this.currentPage = res.data.currentPage;
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.attribute {
  height: 98%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 10px;
  background: #fff;
  .el-form {
    .el-form-item {
      /deep/.el-input__inner {
        width: 197px;
        height: 32px;
      }
    }
  }
  .el-pagination {
    float: right;
    margin-top: 10px;
  }
}
</style>