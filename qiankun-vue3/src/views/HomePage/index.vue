<template>
  <div class="pt-10">
    <div class="flex flex-wrap">
      <icon-count-card :card-obj="state.backObj" />
      <icon-count-card :card-obj="state.detailObj" />
      <icon-count-card :card-obj="state.modelObj" />
      <icon-count-card :card-obj="state.topicObj" />
      <icon-count-card :card-obj="state.dataObj" />
      <icon-count-card :card-obj="state.dictCountObj" />
    </div>
    <div class="flex flex-wrap">
      <status-count-card :count-obj="state.dbObj" class="status-count-card-style" />
      <status-count-card :count-obj="state.taskObj" class="status-count-card-style" />
      <status-count-card :count-obj="state.dictObj" class="status-count-card-style" />
      <status-count-card :count-obj="state.nodeObj" class="status-count-card-style" />
    </div>
    <div class="flex flex-wrap">
      <column-chart ref="columnRef1" :data="state.groupColumnChartData" class="card-style flex-2" is-group />
      <column-chart ref="columnRef2" :data="state.groupColumnChartData2" class="card-style flex-2" is-group />
      <el-card class="flex-1 mr-10 min-width mb-10 ml-10">
        <el-table :data="state.tableData">
          <el-table-column align="center" label="类型" prop="name" />
          <el-table-column align="center" label="大小" prop="value" />
        </el-table>
      </el-card>
    </div>
    <div class="flex flex-wrap">
      <column-chart :data="state.singleColumnChartData" class="card-style flex-1" />
      <line-chart :data="state.lineChartList" class="card-style flex-2" />
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted, ref } from "vue";
  import ColumnChart from '@/components/Charts/histogram.vue'
  import LineChart from '@/components/Charts/lineChart.vue'
  import IconCountCard from '@/components/Card/iconCountCard.vue'
  import StatusCountCard from '@/components/Card/statusCountCard.vue'
  const state = reactive({
    tableData: [
      {
        name: '总表数',
        value: '122.1'
      },
      {
        name: '总表数',
        value: '122.1'
      },
      {
        name: '总表数',
        value: '122.1'
      },
      {
        name: '总表数',
        value: '122.1'
      },
      {
        name: '总表数',
        value: '122.1'
      },
      {
        name: '总表数',
        value: '122.1'
      },
    ],
    dbObj: {
      headerBackground: 'linear-gradient(315deg, #4F79DC 0%, #355EC4 100%)', // 头部的背景色
      type: 'success', // 连接状态
      typeText: '已连接', // 连接名称
      topic: '数据源', // 左侧的数据名称
      countTopic: '总数据源', // 右侧的数据名称
      topicValue: 320, // 左侧的数据值
      countTopicValue: 320, // 右侧的数据值
    },
    taskObj: {
      topicValue: 3200,
      countTopicValue: 3200,
      type: "warning",
      typeText: '已启用',
      topic: "事实任务",
      countTopic: "总任务数",
      headerBackground: "linear-gradient(180deg, #6546BB 0%, #825ACE 100%)"
    },
    dictObj: {
      topicValue: 3200,
      countTopicValue: 3200,
      type: "",
      typeText: '运行中',
      topic: "字典映射",
      countTopic: "总字典数",
      headerBackground: "linear-gradient(320deg, #EE9A56 0%, #E06D38 100%)"
    },
    nodeObj: {
      topicValue: 3200,
      countTopicValue: 3200,
      type: "",
      typeText: '运行中',
      topic: "集群节点",
      countTopic: "总节点数",
      headerBackground: "linear-gradient(360deg, #56C0C8 0%, #46B3BB 100%)"
    },
    backObj: {
      topic: '贴源备份',
      count: 3200,
      bgColor: 'linear-gradient(315deg, #4F79DC 0%, #355EC4 100%)',
      iconPath: 'card_home_icon01.svg'
    },
    detailObj: {
      topic: '贴源备份',
      count: 320,
      bgColor: 'linear-gradient(360deg, #56C0C8 0%, #46B3BB 100%)',
      iconPath: 'card_home_icon02.svg'
    },
    modelObj: {
      topic: '贴源备份',
      count: 3220,
      bgColor: 'linear-gradient(180deg, #6546BB 0%, #825ACE 100%)',
      iconPath: 'card_home_icon03.svg'
    },
    topicObj: {
      topic: '贴源备份',
      count: 3230,
      bgColor: 'linear-gradient(320deg, #EE9A56 0%, #E06D38 100%)',
      iconPath: 'card_home_icon04.svg'
    },
    dataObj: {
      topic: '贴源备份',
      count: 3240,
      bgColor: 'linear-gradient(360deg, #F8C555 0%, #F5B426 97%)',
      iconPath: 'card_home_icon05.svg'
    },
    dictCountObj: {
      topic: '贴源备份',
      count: 3250,
      bgColor: 'linear-gradient(360deg, #63C372 0%, #4ABC5C 100%)',
      iconPath: 'card_home_icon06.svg'
    },
    lineChartList: [],
    singleColumnChartData: [],
    groupColumnChartData: [],
    groupColumnChartData2: [],
  })
  // 折线图
  for(let i = 1; i < 9; i++) {
    for(let y = 0; y < 4; y++) {
      state.lineChartList.push({
        x: '10-'+ i.toString().padStart(2, '0'), // 横坐标数据
        y: Math.floor((Math.random()*1000) + 1), // 纵坐标数据
        type: ['调度成功', '调度失败', '执行成功', '执行失败'][y], // 类型
      })
    }
  }
  // 单柱状图
  for(let i = 1; i < 10; i++) {
    state.singleColumnChartData.push({
      x: '10-'+ i.toString().padStart(2, '0'), // 横坐标数据
      y: Math.floor((Math.random()*10) + 1) // 纵坐标数据
    })
  }
  // 分组柱状图1
  for(let i = 1; i < 5; i++) {
    for(let y = 0; y < 4; y++) {
      state.groupColumnChartData.push({
        x: '10-'+ i.toString().padStart(2, '0'), // 横坐标数据
        y: Math.floor((Math.random()*10) + 1), // 纵坐标数据
        type: ['调度成功', '调度失败', '执行成功', '执行失败'][y], // 类型
      })
    }
  }
  // 分组柱状图2
  for(let i = 1; i < 5; i++) {
    for(let y = 0; y < 4; y++) {
      state.groupColumnChartData2.push({
        x: '10-'+ i.toString().padStart(2, '0'), // 横坐标数据
        y: Math.floor((Math.random()*10) + 1), // 纵坐标数据
        type: ['调度成功', '调度失败', '执行成功', '执行失败'][y], // 类型
      })
    }
  }
  const columnRef1 = ref(null)
  const columnRef2 = ref(null)
  onMounted(() => {
    setInterval(() => {
      const groupColumnChartDataTemp = []
      for(let i = 1; i < 5; i++) {
        for(let y = 0; y < 4; y++) {
          groupColumnChartDataTemp.push({
            x: '10-'+ i.toString().padStart(2, '0'), // 横坐标数据
            y: Math.floor((Math.random()*10) + 1), // 纵坐标数据
            type: ['调度成功', '调度失败', '执行成功', '执行失败'][y], // 类型
          })
        }
      }
      columnRef1.value && columnRef1.value.changeData(groupColumnChartDataTemp)
    }, 3000)
    setInterval(() => {
      const groupColumnChartDataTemp = []
      for(let i = 1; i < 5; i++) {
        for(let y = 0; y < 4; y++) {
          groupColumnChartDataTemp.push({
            x: '10-'+ i.toString().padStart(2, '0'), // 横坐标数据
            y: Math.floor((Math.random()*10) + 1), // 纵坐标数据
            type: ['调度成功', '调度失败', '执行成功', '执行失败'][y], // 类型
          })
        }
      }
      columnRef2.value && columnRef2.value.changeData(groupColumnChartDataTemp)
    }, 5000)
  })
</script>

<style lang="scss" scoped>
  .card-style {
    border-radius: 4px;
    border: 1px solid #e4e7ed;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 0 6px 1px #f2f2f2;
    margin-left: 10px;
    margin-right: 10px;
    height: 300px;
    min-width: 200px;
    margin-bottom: 10px;
  }
  .status-count-card-style {
    margin-left: 10px;
    margin-right: 10px;
    flex: 1;
  }
  .icon-count-card {
    flex: 1;
  }
  .min-width {
    min-width: 200px;
  }
</style>