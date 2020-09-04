<template>
  <div class="order">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="formInline.order_sn" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="orderData" border style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="order_sn" label="订单号"></el-table-column>
      <el-table-column prop="add_time" label="下单时间"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="goods_price" label="订单金额"></el-table-column>
      <el-table-column prop="order_status_text" label="订单状态"></el-table-column>
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
</template>
 
<script>
import { QueryOrderListAPI } from "@/request/api.js";
export default {
  data() {
    return {
      // 订单列表渲染数组
      orderData: [],
      formInline: {
        order_sn: "",
        consignee: "",
      },
      //当前页数
      currentPage: 1,
      // 数据总条数
      count: 0,
      //一页显示条数
      pageSize: 10,
    };
  },
  created() {
    this.GetQueryOrderList();
  },
  methods: {
    //每页显示多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.GetQueryOrderList();
    },
    //当前第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetQueryOrderList();
    },
    //封装数据请求
    GetQueryOrderList() {
      QueryOrderListAPI({
        page: this.currentPage,
        size: this.pageSize,
        orderSn: this.formInline.order_sn,
        consignee: this.formInline.consignee,
      }).then((res) => {
        this.orderData = res.data.data;
        this.currentPage = res.data.currentPage;
        this.count = res.data.count;
        this.pageSize = res.data.pageSize;
      });
    },
    onSubmit() {
      this.currentPage = 1;
      this.GetQueryOrderList();
    },
  },
};
</script>
 
<style lang = "less" scoped>
.order {
  height: 98%;
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
    float: right;
  }
}
</style>