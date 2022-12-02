<template>
<div class="maindiv">
  <h1>登陆</h1>
  <el-input v-if="loginType==0" class="inputSty" v-model="username" placeholder="请输入用户名"></el-input><br>
  <el-input v-if="loginType==1" class="inputSty" v-model="email" placeholder="请输入邮箱"></el-input>
  <el-input class="inputSty" v-model="password" placeholder="请输入密码" show-password></el-input><br>

<!--  <div>-->
<!--    <el-switch-->
<!--      style="display: block"-->
<!--      v-model="loginType"-->
<!--      active-color="#13ce66"-->
<!--      inactive-color="#ff4949"-->
<!--      active-text="邮箱登陆"-->
<!--      inactive-text="用户名登陆">-->
<!--    </el-switch>-->
<!--  </div>-->
  <el-button @click="login" type="primary">登陆</el-button>

</div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      loginType:0,//用户名登陆 0   邮箱登陆1
      username:'',
      email:'',
      password:'',
    };
  },
  methods:{
    login(){


      this.$axios({
        method:'post',
        url:'/ff14/login/doUserNameLogin',
        data:{
          UserName:this.username,
          UPassWord:this.password,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response=> {
        if(response.data.code==0){
          this.$message(response.data.msg);
          sessionStorage.setItem('username',this.username);
          sessionStorage.setItem('uid',response.data.data[0].Uid);
          sessionStorage.setItem('ustate',response.data.data[0].State);
          sessionStorage.setItem('uname',response.data.data[0].UserName);
          sessionStorage.setItem('upassword',response.data.data[0].UPassWord);
          sessionStorage.setItem('uemail',response.data.data[0].EMail);
          sessionStorage.setItem('uicon',response.data.data[0].Image);
          sessionStorage.setItem('ubalance',response.data.data[0].balance);

           this.$router.push('/workspace');

        }else{
          this.$message(response.data.msg);

        }
      })

    }
  }
}
</script>

<style scoped>
.inputSty{
  width: 300px;


}
.maindiv{
  width: 100%;
  display: table;/*父元素设置表格属性*/
  text-align: center;
}
</style>
