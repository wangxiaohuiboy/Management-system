<template>
  <div class="good">
    <div class="goodContent">
      <div class="good-top">
        <el-input type="text" placeholder="商品名称" autocomplete="off" v-model="userQueryGood"></el-input>
        <el-button @click="queryGoods" size="small" type="primary">查询</el-button>
        <el-button size="small" type="primary" @click="addGoods">添加</el-button>
        <el-button size="small" type="primary" @click="resetGoods">重置</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="250"></el-table-column>
        <el-table-column prop="retail_price" label="售价"></el-table-column>
        <el-table-column prop="goods_number" label="库存"></el-table-column>
        <el-table-column prop="is_new" label="新品">
          <div slot-scope="scope">{{scope.row.is_new?'是':'否'}}</div>
        </el-table-column>
        <el-table-column prop="is_hot" label="人气">
          <div slot-scope="scope">{{scope.row.is_hot?'是':'否'}}</div>
        </el-table-column>
        <el-table-column prop="is_on_sale" label="上架">
          <div slot-scope="scope">{{scope.row.is_delete?'否':'是'}}</div>
        </el-table-column>
        <el-table-column prop="sort_order" label="排序"></el-table-column>
        <el-table-column prop="address" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    this.GetGoodList();
  },
  methods: {
    //每页多少条数据
    handleSizeChange(size) {
      this.pageSize = size;
      this.GetGoodList();
    },
    //当前是第几页
    handleCurrentChange(page) {
      this.currentPage = page;
      this.GetGoodList();
    },
    //封装一个请求函数
    GetGoodList() {
      getGoodsDataAPI({
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
    //查询商品
    queryGoods() {
      this.currentPage = 1;
      this.GetGoodList();
    },
    //编辑按钮
    handleEdit(a, row) {
      this.$router.push("/editgood/" + row.id);
    },
    //添加按钮
    addGoods() {
      this.$router.push("/editgood/" + 0);
    },
    //重置
    resetGoods() {
      this.userQueryGood = null;
    },
  },
};
</script>
 
<style lang = "less" scoped>
.good {
  height: 97%;
  /* padding: 10px; */
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