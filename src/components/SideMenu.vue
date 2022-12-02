<template>
  <div>

    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="getCurrWorkSpace">用户列表</el-menu-item>
          <el-menu-item index="1-2" @click="getCurrWorkSpace">添加用户</el-menu-item>
          <el-menu-item index="1-3" @click="getCurrWorkSpace">注销</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="getCurrWorkSpace">商品列表</el-menu-item>
          <el-menu-item index="2-2" @click="getCurrWorkSpace">添加商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
<!--      <el-menu-item index="3" disabled>-->
<!--        <i class="el-icon-document"></i>-->
<!--        <span slot="title">导航三</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="4">-->
<!--        <i class="el-icon-setting"></i>-->
<!--        <span slot="title">导航四</span>-->
<!--      </el-menu-item>-->
    </el-menu>
</div>

</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      currWorkSpace:0,//1-1 用户列表  1-2添加用户  2-1商品列表 2-2添加商品

    };
  },
  methods: {
    getCurrWorkSpace(key, keyPath){
      this.currWorkSpace=key.index;
      console.log(this.currWorkSpace);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /*min-height: 400px;*/
  height: 100%;
}
</style>
