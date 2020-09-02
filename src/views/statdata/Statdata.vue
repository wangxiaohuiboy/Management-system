<template>
  <div class="statdata">
    <div class="statdata-top">
      <el-radio-group v-model="radio" @change="salesVolume(radio)">
        <el-radio-button label="sale_">销量</el-radio-button>
        <el-radio-button label="_money">销售额</el-radio-button>
      </el-radio-group>
      <el-select v-model="data" placeholder="请选择" @change="salesVolume(data)">
        <el-option
          v-for="item in dataArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span>{{ item.label }}</span>
        </el-option>
      </el-select>
    </div>
    <ve-pie :data="chartData" :extend="pieExtend"></ve-pie>
    <p>全国销量分布图</p>
    <ve-map :data="mapData" :extend="mapExtend"></ve-map>
  </div>
</template>
 
<script>
import { getStatDataAPI } from "@/request/api.js";
export default {
  data() {
    return {
      //销量和销售额的v-model
      radio: "sale_",
      //选择天数的v-model
      data: "today",
      //图标渲染的数组
      chartData: {
        // columns: ["日期", "访问用户"],
        // rows: [
        //   { 日期: "1/1", 访问用户: 1393 },
        //   { 日期: "1/2", 访问用户: 3530 },
        //   { 日期: "1/3", 访问用户: 2923 },
        //   { 日期: "1/4", 访问用户: 1723 },
        //   { 日期: "1/5", 访问用户: 3792 },
        //   { 日期: "1/6", 访问用户: 4593 },
        // ],
      },
      //天数渲染的数组
      dataArr: [
        {
          value: "yesterday",
          label: "昨天",
        },
        {
          value: "today",
          label: "今天",
        },
        {
          value: "three_days",
          label: "前三天",
        },
        {
          value: "seven_days",
          label: "前七天  ",
        },
        {
          value: "fourteen_days",
          label: "前十四天",
        },
      ],
      pieExtend: {
        legend: {
          top: 20,
          right: 20,
          width: 300,
          height: 100,
          orient: "vertical",
        },
        series: {
          center: ["30%", "40%"],
          radius: ["30%", "55%"],
        },
      },
      mapData: [],
      mapExtend: {
        legend: {
          show: false,
        },
        series: {
          type: "map",
          aspectScale: 0.85,
          zoom: 1.2,
          tooltip: {
            formatter: "{b}<br/>销量:{c}",
          },
          showLegendSymbol: false,
          itemStyle: {
            borderColor: "#ffffff",
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
            itemStyle: {
              areaColor: "rgb(136,132,216)",
            },
          },
        },
        visualMap: {
          show: true,
          min: 0,
          calculable: true,
          max: 1000000,
          inRange: {
            color: ["#ffffff", "#fa8072", "#ff4500", "#a52a2a"],
          },
        },
      },
    };
  },
  methods: {
    //对数据更改的之后进行拼接请求
    salesVolume() {
      this.chartData.columns.splice(
        1,
        1,
        this.radio == "sale_" ? this.radio + this.data : this.data + this.radio
      );
    },
  },
  created() {
    //运营数据数据请求
    getStatDataAPI().then((res) => {
      if (res.errno == 0) {
        var obj = {
          columns: ["name", "sale_today"],
          rows: res.data.salePie,
        };
      }
      this.chartData = obj;
      var obj1 = {
        columns: ["areaName", "saleNum"],
        rows: res.data.saleMap,
      };
      this.mapData = obj1;
      console.log(res);
    });
  },
};
</script>
 
<style lang = "less" scoped>
.statdata {
  height:98%;
  background: #fff;
  padding: 15px 15px 8px;
  overflow-y: auto;
  box-sizing: border-box;
  .statdata-top {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  p{
    font-size: 16px;
    color: #000;
    padding: 15px;
    border-top: 2px solid #ddd;
    text-align: center;
  }
}
</style>