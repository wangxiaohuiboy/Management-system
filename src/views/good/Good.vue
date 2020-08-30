<template>
  <div class="good">
    <div class="goodContent">
      <div class="good-top">
        <el-input type="text" placeholder="商品名称" autocomplete="off" v-model="userQueryGood"></el-input>
        <el-button @click="queryGoods" size="mini" type="primary">查询</el-button>
        <el-button size="mini" type="primary">添加</el-button>
        <el-button size="mini" type="primary">重置</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" ></el-table-column>
        <el-table-column prop="name" label="商品名称" width="250"></el-table-column>
        <el-table-column prop="retail_price" label="售价" ></el-table-column>
        <el-table-column prop="goods_number" label="库存" ></el-table-column>
        <el-table-column prop="is_new" label="新品" >
          <div slot-scope="scope">{{scope.row.is_new?'是':'否'}}</div>
        </el-table-column>
        <el-table-column prop="is_hot" label="人气" >
          <div slot-scope="scope">{{scope.row.is_hot?'是':'否'}}</div>
        </el-table-column>
        <el-table-column prop="is_on_sale" label="上架" >
          <div slot-scope="scope">{{scope.row.is_on_sale?'是':'否'}}</div>
        </el-table-column>
        <el-table-column prop="sort_order" label="排序" ></el-table-column>
        <el-table-column prop="address" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>
 
<script>
import { getGoodsDataAPI, getQueryGoodsAPI } from "@/request/api.js";
export default {
  data() {
    return {
      //表格数据
      tableData: [],
      //共多少条
      count: 0,
      //当前页数
      currentPage: 1,
      //当前页面的条数
      pageSize: 10,
      // 用户查询的商品
      userQueryGood: "",
    };
  },
  created() {
    this.GetGoodList(this.pageSize, this.currentPage);
  },
  methods: {
    //每页多少条数据
    handleSizeChange(size) {
      this.GetGoodList(size, this.currentPage);
    },
    //当前是第几页
    handleCurrentChange(page) {
      this.GetGoodList(this.pageSize, page);
    },
    //封装一个请求函数
    GetGoodList(size, page) {
      getGoodsDataAPI({
        page: page,
        name: "",
        size: size,
      }).then((res) => {
        this.tableData = res.data.data;
        this.count = res.data.count;
        this.currentPage = res.data.currentPage;
        this.pageSize = res.data.pageSize;
      });
    },
    //查询商品
    queryGoods() {
      getQueryGoodsAPI({
        page: this.currentPage,
        name: this.userQueryGood,
        size: this.pageSize,
      }).then((res) => {
        this.tableData = res.data.data;
        this.count = res.data.count;
        this.currentPage = res.data.currentPage;
        this.pageSize = res.data.pageSize;
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.good {
  height: 100%;
  padding: 25px 15px;
  overflow-y: auto;
  box-sizing: border-box;
  .goodContent {
    background: #fff;
    padding: 10px;
    overflow: hidden;
    .good-top {
      margin-bottom: 15px;
      .el-input {
        width: 177px;
        height: 32px;
        margin-right: 10px;
      }
      /deep/.el-input__inner {
        width: 177px;
        height: 32px;
      }
    }
    .el-button {
      width: 56px;
      height: 32px;
    }
    .el-pagination {
      float: right;
      margin-top: 15px;
      margin-bottom: 30px;
    }
  }
}
.good::-webkit-scrollbar {
  width: 0;
}
</style>