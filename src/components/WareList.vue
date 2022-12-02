<template>
    <div>
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="Wareid"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="WareName"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="WarePrice"
        label="价格"
        width="180">
      </el-table-column>
        <el-table-column
        prop="WareTypeid"
        label="类型"
        width="480"
        >
      </el-table-column>

        <el-table-column
        label="操作"
        width="100"
        ><template slot-scope="scope">
    <el-button type="danger" @click="open(scope.$index,scope.$row)">删除商品</el-button>
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
        console.log(this.$data.tableData[index].Wareid)
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
                url: '/ff14/waretab/waretab?Wareid='+this.$data.tableData[index].Wareid,
                }).then(res=>{
                this.$axios({
                    method:'get',
                    url: "/ff14/waretab/getAllWare",
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
            url: "/ff14/waretab/getAllWare",
        }).then(res=>{
            console.log(res.data);
            this.tableData=res.data.data
        })
    }
}
</script>

<style scoped>

</style>
