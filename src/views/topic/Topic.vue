<template>
  <div class="topic">
    <el-form label-width="80px">
      <el-form-item label="名称">
        <el-input style="width: 177px;height: 32px;" v-model="topicQuery"></el-input>
        <el-button size="small" type="primary" @click="QueryData">查询</el-button>
        <el-button size="small" type="primary" @click="handleEdit2">添加</el-button>
      </el-form-item>
      <el-table :data="TopicData" border style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="title" label="主标题"></el-table-column>
        <el-table-column prop="price_info" label="起步价格"></el-table-column>
        <el-table-column prop="is_show" label="显示">
          <div slot-scope="scope">{{scope.row.is_show?'是':'否'}}</div>
        </el-table-column>
        <el-table-column label="操作">
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
    </el-form>
  </div>
</template>
 
<script>
import { getQueryTopicAPI } from "@/request/api.js";
export default {
  created() {
    this.GetTopicData();
  },
  data() {
    return {
      //页面数据渲染
      TopicData: [],
      //当前页
      currentPage: 1,
      //专题页数据总条数
      count: 0,
      //每页多少条
      pageSize: 10,
      //专题查询输入框
      topicQuery: "",
    };
  },
  methods: {
    //添加专题
    handleEdit2(){
      this.$router.push("/edittopic/" + 0);
    },
    //编辑页面跳转
    handleEdit(index, row) {
      this.$router.push("/edittopic/" + row.id);
    },
    //每页多少条数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.GetTopicData();
    },
    //当前是第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetTopicData();
    },
    // 查询专题
    QueryData() {
      this.currentPage = 1;
      this.GetTopicData();
    },
    // 封装一个数据请求
    GetTopicData() {
      getQueryTopicAPI({
        page: this.currentPage,
        size: this.pageSize,
        name: this.topicQuery,
      }).then((res) => {
        this.TopicData = res.data.data;
        this.count = res.data.count;
        this.currentPage = res.data.currentPage;
        this.pageSize = res.data.pageSize;
      });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.topic {
  height: 98%;
  padding: 10px;
  background: #fff;
  overflow-y: auto;
  box-sizing: border-box;
  .el-form {
    .el-form-item {
      .el-input {
        margin-right: 10px;
      }
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