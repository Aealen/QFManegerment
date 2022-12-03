<template>
    <div>
        <el-table
      :data="tableData"
      style="width: 100%">
         <el-table-column type="expand" >
      <template slot-scope="props">
        <el-form  inline class="demo-table-expand" >
           <el-table
      :data="props.row.orders"
      style="width: 100%">
      <el-table-column
        prop="oid"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cdk"
        label="cdk">
      </el-table-column>
            <el-table-column
        prop="wid"
        label="商品">
      </el-table-column>
    </el-table>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column
        prop="user.Uid"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="user.UserName"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="user.EMail"
        label="邮箱"
        width="180">
      </el-table-column>
        <el-table-column
        prop="user.balance"
        label="余额"
        width="480"
        >
      </el-table-column>

<el-table-column
        label="操作"
        width="100"
        >
    <template slot-scope="scope">
    <el-button  @click="change(scope.$index,scope.$row)">编辑余额</el-button>
    </template>
      </el-table-column>

        <el-table-column
        label="操作"
        width="100"
        >
    <template slot-scope="scope">
    <el-button type="danger" @click="open(scope.$index,scope.$row)">删除用户</el-button>
    </template>
      </el-table-column>

    </el-table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
          tableData: [],
          orderData:[],
          getRowKeys(row) {
          return row.Uid;
          },
           expands: [],
        }
      },
      methods:{

        // get(row){
        //   console.log(row.user.Uid)
        //   axios({
        //     method:'get',
        //     url:'/ff14/Order/GetAllOrderByUid?Uid='+row.user.Uid,
        //   }).then(res=>{
        //     console.log(res.data)
        //     this.$data.orderData=[]
        //     if(res.data.code=='1'){
        //       this.$data.orderData=[]
        //     }else{
        //       this.$data.orderData=res.data.data
        //     }
        //   })
        // },
        change(index,row){
        console.log(this.$data.tableData[index].user.Uid)  
        this.$prompt('请输入余额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(parseFloat(value)!==parseFloat(value)){
            this.$message({
            type: 'info',
            message: '数据错误'
          }); 
          }else{
          this.$message({
            type: 'success',
          });
                      this.$axios({
              method:'put',
              url: '/ff14/login/upBalance?Uid='+this.$data.tableData[index].user.Uid+'&Balance='+parseFloat(value),
            }).then(res=>{
              this.$axios({
                    method:'get',
                    url: "/ff14/login/getOrders",
                }).then(res=>{
                    console.log(res.data);
                    this.tableData=res.data.data
                })
            })

          }
        }).catch(() => {
          
        });



        },
         open(index,row) {
        console.log(index)
        console.log(this.$data.tableData[index].Uid)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
                      this.$axios({
                method:'delete',
                url: '/ff14/login/delLogin?Uid='+this.$data.tableData[index].Uid,
                }).then(res=>{
                this.$axios({
                    method:'get',
                    url: "/ff14/login/getOrders",
                }).then(res=>{
                    console.log(res.data);
                    this.tableData=res.data.data
                })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      },
    beforeCreate(){
        this.$axios({
            method:'get',
            url: "/ff14/login/getOrders",
        }).then(res=>{
            console.log(res.data);
            this.tableData=res.data.data
        })
    }
}
</script>

<style scoped>

</style>
