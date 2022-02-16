<template>
  <router-view />
</template>

<script>
  import { defineComponent, onMounted } from "vue";
  export default defineComponent({
    setup() {
      onMounted(() => {
      });
      return {
      };
    },
  });
</script>

<style lang="scss">
  body {
    margin: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    //background: #f0f2f5;
    height: unset !important;
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
