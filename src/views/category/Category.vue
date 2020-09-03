<template>
  <div class="category">
    <el-button type="primary" size="mini">添加</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="ID"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="address" label="分类级别"></el-table-column>
      <el-table-column prop="address" label="图片"></el-table-column>
      <el-table-column prop="address" label="是否显示"></el-table-column>
      <el-table-column prop="address" label="排序"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import {getCategoryAPI} from "@/request/api.js"
export default {
  created() {
      getCategoryAPI().then(res=>{
          console.log(res);
      })
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
  },
};
</script>
 
<style lang = "less" scoped>
</style>