<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <template v-for="item in functionList">
        <template v-if="item.subs">
          <el-submenu :key="item.index" :index="item.index">
            <template slot="title">
              <i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>

        </template>
        <template v-else>
          <el-menu-item :key="item.index" :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <div>点击</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false
      }
    },
    mounted() {
      var that = this;
      let tt = localStorage.getItem('FunctionUrl')
      if (tt) {
        this.items = JSON.parse(localStorage.getItem('FunctionUrl'))
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      },
      functionList() {
        return this.$store.state.functionList
      }
    },
  }
</script>

<style>
  .sidebar {
    display: block;
    position: absolute;
    width: 350px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
  }

  /* .el-submenu,.el-menu-item{
        display: none;
    } */

  /* .Close{
        position: absolute;
        right: 11px;
        top: -18px;


    } */

  /* .sidebar:hover {
            transition: 1s;
            width: 50px;
            border-radius: 50%;

        } */

  .sidebar>ul {
    height: 100%;
    background-color: #324157;
    color: #bfcbd9;
  }

  .el-dropdown-menu__item--divided:before,
  .el-menu,
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
  .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background-color: #1f2d3d;
  }

  .el-submenu .el-menu {
    background-color: #1f2d3d;

  }

  .el-submenu__title {
    color: #bfcbd9;
  }

  .el-submenu__title:hover {
    background: #48576a;
  }

  .el-menu-item {
    color: #bfcbd9;
  }

  .el-menu-item:focus,
  .el-menu-item:hover {
    background: #48576a;
  }
</style>
