<template>
  <!--折线图-->
  <div :id="containerId" />
</template>

<script setup>
  import { onMounted } from "vue";
  import moment from 'moment'
  import { Line } from '@antv/g2plot';
  let linePlot = null;
  const props = defineProps({
    /**
     * data 中的对象为：
      {
          x: '', // 横坐标数据
          y: 0, // 纵坐标数据
          type: '', // 类型
      }
     **/
    data: {
      type: Array,
      data() {
        return []
      }
    }
  })
  const containerId = Math.floor((Math.random()*100) + 1) + '' + moment().valueOf() + Math.floor((Math.random()*10000) + 1) + Math.floor((Math.random()*10) + 1) + 'linePlotContainer'
  onMounted(() => {
    linePlot = new Line(containerId, {
        data: props.data,
        xField: 'x',
        yField: 'y',
        seriesField: 'type',
        yAxis: {
          title: {
            text: '个数',
            position: 'end',
            // rotate: 6.3 // 个数翻转
          },
        },
      })
    linePlot.render();
  })
  const changeData = (data) => {
    console.log('changeData')
    linePlot.changeData(data)
  }
  defineExpose({
    changeData
  })
</script>

<style lang="scss" scoped>

</style>