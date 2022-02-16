<template>
  <div class="login-container flex align-items-center justify-content-center"
       v-loading="loading"
       element-loading-text="登录中..."
  >
    <el-space size="large" class="form-container flex align-items-center justify-content-center">
      <div class="form-left flex-1">
        <img class="form-left-img" src="../../assets/Login/login-imag.svg">
      </div>
      <div class="form-right flex-1 ml-30">
        <div class="fs-36 text-bold">登录</div>
        <div class="fs-18 text-bold" style="margin-bottom: 40px">xx数据中心平台</div>
        <el-form ref="From" :show-message="false" :model="loginForm" label-width="0px">
          <el-form-item label="" prop="username" required>
            <el-input class="form-item" v-model="loginForm.username" placeholder="请输入用户账号"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password" required>
            <el-input show-password type="password" autocomplete="off" class="form-item" v-model="loginForm.password" placeholder="请输入登录密码" />
          </el-form-item>
          <el-form-item v-if="!!warnMessage" label="">
            <el-alert :title="warnMessage" type="warning" :closable="false"></el-alert>
          </el-form-item>
          <el-form-item label="">
            <el-button round class="width-a-hundred-percent form-item fs-26" style="height: 50px;" type="primary" @click="onLoginSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-space>
  </div>
</template>

<script>
  import { reactive, onMounted, getCurrentInstance, ref, toRefs } from 'vue'
  import { SubProjectName } from "../../../common/constants";
  export default {
    name: "Login",
    setup() {
      const { proxy } = getCurrentInstance()
      const codeUrl = ref('')
      const warnMessage = ref(null)
      const topRoute = 'TOP_ROUTE' // 当前菜单存储
      const loginForm = reactive({
        username: '',
        password: '',
        code: '',
        key: '',
      })
      const state = reactive({
        loading: false
      })
      const onLoginSubmit = () => {
        proxy.$refs.From.validate((valid) => {
          if (valid) {
            state.loading = true
            if(loginForm.username === 'admin' && loginForm.password ==='123456') {
              // hard code 用户名和密码
              /**
               * @param pathname 路由名称
               * 通过路由名称跳转
               * */
              window.location.pathname = `/${SubProjectName.HOME_PAGE}`
              localStorage.setItem(topRoute, SubProjectName.HOME_PAGE)
              // 存储登录时间
              localStorage.setItem('userInfo', JSON.stringify({
                userName: loginForm.username,
                loginTime: new Date().getTime()
              }))
              state.loading = false
            }
          }
        })
      }
      onMounted(() => {
        warnMessage.value = null
      })
      return {
        ...toRefs(state),
        loginForm,
        codeUrl,
        warnMessage,
        onLoginSubmit,
      }
    }
  }
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url("../../assets/Login/back-img.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 20px;
  .form-container {
    width: 903px;
    height: 574px;
    background: #FFFFFF;
    border-radius: 23px;
    padding: 20px;
    .form-left-img {

    }
    .form-right {
      .code {
        width: 146px;
        height: 50px;
        background: #F4F9FF;
        border-radius: 6px;
        font-size: 18px;
      }
      .form-item {
        max-width: 380px;
      }
    }
    .text-bold {
      font-weight: bold;
    }
    .fs-36 {
      font-size: 36px;
    }
  }
}

</style>
<style>
.login-container .form-container .form-right .el-input--small .el-input__inner {
  height: 50px !important;
  line-height: 50px !important;
  background: #F4F9FF;
  font-size: 18px;
}
.login-container .form-container .form-right .el-input--small .el-input__icon {
  height: 50px !important;
  font-size: 20px;
}
</style>
