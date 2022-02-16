<template>
  <!--单个柱状图-->
  <div :id="containerId" />
</template>

<script setup>
  import { onMounted } from "vue";
  import moment from 'moment'
  import { Column } from '@antv/g2plot';
  let columnPlot = null;
  const props = defineProps({
    isGroup: { // 是否分组：true为分组柱状图， false为非分组柱状图
      type: Boolean,
      default: false,
    },
    /**
     * 单柱状图data中的对象数据格式
     * {
     *   x: '', // 横坐标数据
     *   y: 0 // 纵坐标数据
     * }
     * * 分组柱状图data中的对象数据格式
     * {
     *   x: '', // 横坐标数据
     *   y: 0 // 纵坐标数据
     *   type： // 类型， 分组的类型
     * }
     *
     * **/
    data: {
      type: Array,
      default() {
        return []
      }
    }
  })
  const containerId = Math.floor((Math.random()*100) + 1) + '' + moment().valueOf() + Math.floor((Math.random()*10000) + 1) + Math.floor((Math.random()*10) + 1) + 'columnPlotContainer'
  onMounted(() => {
    if (!props.isGroup) {
      columnPlot = new Column(containerId, {
        data: props.data,
        xField: 'x',
        yField: 'y',
        color: '#4A6CC1',
        label: {
          position: 'top',
          style: {
            fill: '#FFFFF0',
            opacity: 0.6,
          },
        },
        yAxis: {
          title: {
            text: '个数',
            position: 'end',
            // rotate: 6.3 // 个数翻转
          },
        },
        meta: {
          x: {
            alias: '时间',
          },
          y: {
            alias: '个数',
          },
        }
      })
    } else {
      columnPlot = new Column(containerId, {
        data: props.data,
        xField: 'x',
        yField: 'y',
        isGroup: true,
        seriesField: 'type',
        color:({ type }) => {
          switch (type) {
            case '执行失败':
              return '#D9555D';
            case '执行成功':
              return '#46B3BB';
            case '调度成功':
              return '#4A6CC1';
            case '调度失败':
              return '#EB6628';
          }
        },
        label: {
          position: 'top',
          style: {
            fill: '#FFFFF0',
            opacity: 0.6,
          },
        },
        yAxis: {
          title: {
            text: '个数',
            position: 'end',
            // rotate: 6.3 // 个数翻转
          },
        },
        meta: {
          x: {
            alias: '时间',
          },
          y: {
            alias: '个数',
          },
        }
      })
    }
    columnPlot.render();
  })
  const changeData = (data) => {
    console.log('changeData')
    columnPlot.changeData(data)
  }
  defineExpose({
    changeData
  })
</script>

<style lang="scss" scoped>

</style>