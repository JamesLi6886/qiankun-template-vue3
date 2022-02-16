<template>
  <el-container class="data-analysis-main-container sub-main-container" v-loading="state.loading">
    <el-header class="flex header justify-content-between align-items-center">
      <div class="left flex justify-content-center align-items-center">
        <div class="logo-container mr-15 fs-17" style="color: white">
          xx数据工程平台
        </div>
        <!--顶部菜单-->
        <div style="min-width: 900px">
          <el-menu
            :default-active="state.mainMenuActive"
            class="top-menu-container ml-10"
            mode="horizontal"
            text-color="#a6adb4"
            active-text-color="#FFFFFF"
            @select="handleMainMenuSelect">
            <template v-for="(item, index) in state.topMenuList">
              <el-sub-menu v-if="item.children && item.children.length" :index="item.index" :key="index">
                <template #title>
                  <span class="fs-14 sub-menu-header">
                    <i style="color: #a6adb4" class="mr-10 fs-16" :class="item.icon"></i>{{item.name}}
                  </span>
                </template>
                <el-menu-item v-for="(subItem, subIndex) in item.children" :index="subItem.index" :key="'subItem' + subIndex">{{subItem.name}}</el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="item.index" :key="index + 'menu'">
                <i style="color: #a6adb4" class="mr-10 fs-16" :class="item.icon"></i>
                <template #title>
                  <span class="fs-14">{{item.name}}</span>
                </template>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>
      <div class="right">
        <div class="flex justify-content-center align-items-center">
          <el-dropdown @command="handelLogOut">
            <span>
              <el-avatar :size="35" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <div id="subContainer"></div>
  </el-container>
  <router-view/>
</template>
<script>
  import { defineComponent, onMounted, reactive, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { SubProjectName } from '@/../common/constants'
  export default defineComponent({
    setup() {
      const topRoute = 'TOP_ROUTE' // 当前菜单存储
      const route = useRoute();
      const router = useRouter();
      const state = reactive({
        isCollapse: false,
        loading: false,
        mainMenuActive: '',
        activeIndex: "",
        topMenuList: [ // 顶部菜单列表
          {name: '首页', index: SubProjectName.HOME_PAGE, icon: 'el-icon-s-home'},
          {name: '全局调度', index: SubProjectName.SCHEDULER, icon: 'el-icon-s-operation'},
        ]
      });
      const handleMainMenuSelect = (key) => { // 顶部菜单主菜单点击
        router.push({path: '/'+ key})
        localStorage.setItem(topRoute, key)
      }
      const handelLogOut = () => {
        localStorage.removeItem('userInfo')
        router.push({name: 'login'})
      }

      watch(
        () => {
          return route.name;
        },
        (newVal) => {
          // undo
        }
      );
      onMounted(() => {
        console.log('欢迎来到 %cxx%cxx%c数据%c工程%c平台', 'font-size: 36px;color:#1890ff;', 'font-size: 36px;color:#673ab7;',
          'font-size: 36px;color:#eadb23;', 'font-size: 36px;color:#f78989;', 'font-size: 36px;color:#2550e2;')
        const topRouteTemp = localStorage.getItem(topRoute);
        if(topRouteTemp) {
          state.mainMenuActive = topRouteTemp
        }
      });
      return {
        state,
        handleMainMenuSelect,
        handelLogOut
      };
    },
  });
</script>

<style lang="scss">
  body {
    margin: 0;
  }
  #app-main {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //text-align: center;
    color: #2c3e50;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .data-analysis-main-container {
    height: 100%;
    .header {
      height: 48px !important;
      background-color: #19274B;
      /*background-image: url("./assets/Main/main-header-background.svg");*/
      /*background-size: 100%;*/
      /*background-repeat: no-repeat;*/
      .el-menu--horizontal>.el-menu-item.is-active {
        background: linear-gradient(270deg, #5371BD 0%, #264EAD 100%);
        border-bottom: none;
      }
      .top-menu-container {
        background: none;
      }
      .el-sub-menu__title {
        display: flex;
        align-items: center;
      }
      .logo-name-cn {
        width: 229px;
        height: 30px;
        font-size: 22px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 30px;
        letter-spacing: 5px;
      }
      .logo-name-us {
        width: 207px;
        height: 17px;
        font-size: 12px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 17px;
        letter-spacing: 1px;
      }
      .right {
        .el-icon-user {
          color: white;
        }
        .count-set {
          color: white;
        }
        .count-set :hover {
          color: #e4ce29;
        }
      }
      .el-menu--horizontal>.el-menu-item, .el-menu--horizontal>.el-sub-menu, {
        height: 48px;
      }
      :deep(.el-menu--horizontal>.el-sub-menu.is-active .el-sub-menu__title) {
        border-bottom: none !important;
      }
      :deep(.el-sub-menu__title) {
        height: 48px;
        line-height: 45px;
      }
      .el-menu--horizontal {
        border-bottom: none;
      }

    }
    .el-aside {
      width: 220px !important;
      .el-menu-item.is-active, .el-sub-menu>.is-active {
        color: white !important;
        background: linear-gradient(270deg, #09BCE5 2%, #377BFC 100%);
        i {
          color: white !important;
        }
      }
    }
    #subContainer {
      height: calc(100% - 48px);
    }
  }
  .el-popper {
    .el-menu {
      .el-sub-menu {
        :deep(.el-sub-menu__title) {
          background-color: #19274B
        }
      }
    }
  }
</style>
<style>
  .data-analysis-main-container .header .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .data-analysis-main-container .header .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover {
    background: linear-gradient(270deg, #5371BD 0%, #264EAD 100%) !important;
  }
  .data-analysis-main-container .header .el-menu--horizontal>.el-sub-menu:not(.is-disabled):focus, .data-analysis-main-container .header .el-menu--horizontal>.el-sub-menu:not(.is-disabled):hover {
    background: linear-gradient(270deg, #5371BD 0%, #264EAD 100%) !important;
  }
  .top-menu-container .el-sub-menu.is-active, .top-menu-container .el-sub-menu.is-opened, .el-menu--horizontal>.el-sub-menu .el-sub-menu__title:hover {
    background: linear-gradient(270deg, #5371BD 0%, #264EAD 100%) !important;
  }
  .el-popper .el-menu--popup {
    padding: 0 !important;
  }
  .el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-sub-menu.is-active>.el-sub-menu__title {
    background: linear-gradient(270deg, #6b7dab 0%, #5c6b8e 100%) !important;
  }
</style>

