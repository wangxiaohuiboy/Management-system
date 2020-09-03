<template>
  <div class="topic">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input style="width: 177px;height: 32px;" v-model="form.name"></el-input>
        <el-button size="small" type="primary">查询</el-button>
        <el-button size="small" type="primary">添加</el-button>
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
    </el-form>
  </div>
</template>
 
<script>
import { getQueryTopicAPI } from "@/request/api.js";
export default {
  created() {
    getQueryTopicAPI().then((res) => {
      this.TopicData = res.data.data;
      console.log(res.data.data);
    });
  },
  data() {
    return {
      form: {},
      TopicData: [],
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
.topic {
  .el-input {
    margin-right: 10px;
  }
  /deep/.el-input__inner {
    width: 177px;
    height: 32px;
  }
}
</style>