<template>
  <div class="status-count-card mb-10">
    <div class="header" :style="{background: countObj.headerBackground}" />
    <div class="flex flex-1">
      <div class="left flex-1 pl-30 flex flex-directive-column justify-content-center">
        <div class="text fs-15">
          {{ countObj.topic }}
        </div>
        <div class="count text-ellipsis">
          {{ countObj.topicValue }}
        </div>
      </div>
      <div class="right flex-1 pr-30 flex-directive-column justify-content-center">
        <div class="text">
          <el-tag effect="dark" :type="countObj.type">
            {{ countObj.typeText }}
          </el-tag>
        </div>
        <div class="count text-ellipsis">
          {{ countObj.countTopic }}： {{ countObj.countTopicValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from "vue";
  const props = defineProps({
    countObj: {
      type: Object,
      default() {
        return {
          headerBackground: 'linear-gradient(315deg, #4F79DC 0%, #355EC4 100%)', // 头部的背景色
          type: 'success', // 连接状态
          typeText: '已连接', // 连接名称
          topic: '数据源', // 左侧的数据名称
          countTopic: '总数据源', // 右侧的数据名称
          topicValue: 0, // 左侧的数据值
          countTopicValue: 0, // 右侧的数据值
        }
      }
    },
  })
</script>

<style lang="scss" scoped>
.status-count-card {
  height: 140px;
  min-width: 300px;
  border-radius: 9px;
  background-color: white;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  .header {
    height: 7px;
    background: linear-gradient(315deg, #4F79DC 0%, #355EC4 100%);
    border-radius: 9px 9px 0 0;
  }
  .left {
    overflow: hidden;
    .text, .count {
      font-weight: 400;
      color: #333333;
    }
    .count {
      font-size: 43px;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow: hidden;
    .count {
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>