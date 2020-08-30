<template>
  <div class="good">
    <div class="good-top">
        
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="retail_price" label="售价"></el-table-column>
      <el-table-column prop="goods_number" label="库存"></el-table-column>
      <el-table-column prop="is_new" label="新品">
        <div slot-scope="scope">{{scope.row.is_new?'是':'否'}}</div>
      </el-table-column>
      <el-table-column prop="is_hot" label="人气">
        <div slot-scope="scope">{{scope.row.is_hot?'是':'否'}}</div>
      </el-table-column>
      <el-table-column prop="is_on_sale" label="上架">
        <div slot-scope="scope">{{scope.row.is_on_sale?'是':'否'}}</div>
      </el-table-column>
      <el-table-column prop="sort_order" label="排序"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { getGoodsDataAPI } from "@/request/api.js";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    getGoodsDataAPI({
      page: 1,
      name: "",
      size: 20,
    }).then((res) => {
      this.tableData = res.data.data;
      console.log(res.data.data);
    });
  },
};
</script>
 
<style lang = "less" scoped>
.good {
  height: 100%;
  padding: 25px 15px;
  overflow-y: auto;
  box-sizing: border-box;
}
.good::-webkit-scrollbar {
  width: 0;
}
</style>