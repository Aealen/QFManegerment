<template>
  <div>
  <el-container>
  <el-aside width="220px">
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>

      <el-menu-item>
        当前用户:{{currUser}}
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="getCurrWorkSpace">用户列表</el-menu-item>
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
      <el-menu-item>
        <el-button type="text" @click="sessionStorage.clear();"><router-link to="/">注销</router-link></el-button>

  </el-menu-item>
    </el-menu>
  </el-aside>
  <el-main>
    <div v-if="currWorkSpace=='2-1'">
      <WareList></WareList>
    </div>
    <div v-if="currWorkSpace=='2-2'">
      <AddWare></AddWare>
    </div>
    <div v-if="currWorkSpace=='1-1'">
      <UserList></UserList>
    </div>
  </el-main>
</el-container>
</div>
</template>

<script>
import UserList from '@/components/UserList'
import AddWare from '@/components/AddWare'
import WareList from '@/components/WareList'
export default {
  components:{UserList,AddWare,WareList},
  data() {
    return {
      isCollapse: false,
      currUser:sessionStorage.getItem('uname'),
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
  },

}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /*min-height: 400px;*/
  height: 100%;
}
</style>
