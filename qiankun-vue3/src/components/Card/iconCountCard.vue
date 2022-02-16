<template>
  <div class="icon-count-card flex align-items-center mb-10" :style="{background: cardObj.bgColor}">
    <div class="left" style="height: 50px; width: 50px;">
      <el-avatar :src="require(`../../assets/${cardObj.iconPath}`)" :size="50" fit="contain" />
    </div>
    <div class="right ml-10">
      <div class="text">
        {{ cardObj.topic }}
      </div>
      <div class="count">
        {{ cardObj.count }}
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    cardObj: {
      type: Object,
      default() {
        return {
          topic: '贴源备份', // 名称
          count: 3200, // 数值
          bgColor: 'linear-gradient(315deg, #4F79DC 0%, #355EC4 100%)', // 背景色
          iconPath: 'card_home_icon01.svg', // 图片地址， 地址需要放到src/assets文件下
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  .icon-count-card {
    border-radius: 9px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
    /*background: linear-gradient(315deg, #4F79DC 0%, #355EC4 100%);*/
    padding: 20px;
    margin-left: 10px;
    margin-right: 10px;
    .right {
      .text {
        font-size: 15px;
        color: #FFFFFF;
      }
      .count {
        font-size: 40px;
        color: #FFFFFF;
      }
    }
  }
</style>