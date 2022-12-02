<template>
    <div>
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="Uid"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="UserName"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="EMail"
        label="邮箱"
        width="180">
      </el-table-column>
        <el-table-column
        prop="balance"
        label="余额"
        width="480"
        >
      </el-table-column>

        <el-table-column
        label="操作"
        width="100"
        ><template slot-scope="scope">
    <el-button type="danger" @click="open(scope.$index,scope.$row)">删除用户</el-button>
    </template>
      </el-table-column>

    </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
          tableData: []
        }
      },
      methods:{
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
                url: 'http://localhost:8096/ff14/login/delLogin?Uid='+this.$data.tableData[index].Uid,
                }).then(res=>{
                this.$axios({
                    method:'get',
                    url: "http://localhost:8096/ff14/login/getAllUsers",
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
            url: "http://localhost:8096/ff14/login/getAllUsers",
        }).then(res=>{
            console.log(res.data);
            this.tableData=res.data.data
        })
    }
}
</script>

<style scoped>

</style>