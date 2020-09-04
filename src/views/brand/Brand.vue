<template>
  <div class="brand">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="attributeUsername" placeholder="属性名称"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-button type="primary" size="small" @click="onQuery">查询</el-button>
        <el-button type="primary" size="small" @click="onAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="BrandData" border style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="品牌名称"></el-table-column>
      <el-table-column prop="floor_price" label="最低价"></el-table-column>
      <el-table-column prop="is_new" label="新品">
        <div slot-scope="scope">{{scope.row.is_new?'是':'否'}}</div>
      </el-table-column>
      <el-table-column prop="is_show" label="显示">
        <div slot-scope="scope">{{scope.row.is_show?'是':'否'}}</div>
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
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
  </div>
</template>
 
<script>
import { getQueryBrandAPI } from "@/request/api.js";
export default {
  data() {
    return {
      //品牌管理页面数据
      BrandData: [],
      //属性名称
      attributeUsername: "",
      //当前第几页
      currentPage: 1,
      //品牌管理总数
      count: 0,
      //每页条数
      pageSize: 10,
    };
  },
  created() {
    this.GetQueryBrand();
  },
  methods: {
    //封装数据请求
    GetQueryBrand() {
      getQueryBrandAPI({
        page: this.currentPage,
        size: this.pageSize,
        name: this.attributeUsername,
      }).then((res) => {
        this.BrandData = res.data.data;
        this.count = res.data.count;
        this.pageSize = res.data.pageSize;
        this.currentPage = res.data.currentPage;
      });
    },
    //分页器-每页几条
    handleSizeChange(val) {
      this.pageSize = val;
      this.GetQueryBrand();
    },
    //分页器-当前第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetQueryBrand();
    },
    //查询
    onQuery() {
      this.currentPage = 1;
      this.GetQueryBrand();
    },
    //编辑
    handleEdit(index, row) {
      this.$router.push("/editbrand/" + row.id);
    },
    //添加
    onAdd(){
        this.$router.push('/editbrand/' + 0)
    }
  },
};
</script>
 
<style lang = "less" scoped>
.brand {
  padding: 10px;
  background: #fff;
  overflow-y: auto;
  box-sizing: border-box;
  .el-form {
    .el-form-item {
      /deep/.el-input__inner {
        width: 177px;
        height: 32px;
      }
    }
  }
  .el-pagination {
    margin-top: 10px;
    float: right;
  }
}
</style>