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
        width="230"
        ><template slot-scope="scope">
          <!-- Form -->
          <el-button type="primary" @click="currsel=scope.$index;dialogFormVisible = true">编辑商品</el-button>

          <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              {{currsel}}


              <el-form-item label="商品名称 ">
                <el-input v-model="form.WareName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品价格 " >
                <el-input v-model="form.WarePrice" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品类型" prop="type">
                <el-checkbox-group v-model="form.WareType"  >
                  <el-radio v-for="item in typedata" :key=item.waretypeid v-model="form.Waretypeid" :label=item.waretypeid >{{item.waretypename}}</el-radio>
                </el-checkbox-group>
              </el-form-item>
              <el-upload
                class="upload-demo"
                action="http://localhost:8096/ff14/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :on-success="(response)=>a(response)">
                <el-button size="small" type="primary">点击图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="onSubmit()">确 定</el-button>
            </div>
          </el-dialog>

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
          tableData: [],
          typedata:[],
          currsel:0,
          dialogFormVisible: false,
          form: {
            WareName:'',
            WarePrice:0,
            Picture:null,
            Waretypeid:0,
          },


        }
      },
      methods:{
        a(response){
          this.form.Picture=response
        },
        onSubmit(index,row) {
          console.log(this.$data.tableData[this.currsel].Wareid)

          if(this.$data.form.WareName==""||this.$data.form.WarePrice==0||this.$data.form.Picture==null||this.$data.form.Waretypeid==0){

            this.$alert('检查输入!!', '', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          }
          // let formDatas = new FormData()
          // formDatas.append('WareName', this.$data.form.newWareName)
          // formDatas.append('WarePrice',parseInt(this.$data.form.newWareprice))
          // formDatas.append('Picture',this.$data.form.newPicture)
          // formDatas.append('WareTypeid',this.$data.form.newWaretypeid)
          // formDatas.append('WarePre',10)
          // formDatas.append('Wareid',this.tableData[index].Wareid)
          // // formDatas.append('Sale',10)
          this.$axios({
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            method:'put',
            url: '/ff14/waretab/upWare',
            data: {
              WareName:this.$data.form.WareName,
              WarePrice:this.$data.form.WarePrice,
              Picture:this.$data.form.Picture,
              WareTypeid:this.$data.form.Waretypeid,
              Wareid:this.tableData[this.currsel].Wareid,
              WarePre:10,

            }
          }).then(res=>{
            console.log("index:"+this.currsel+"-----------")
            this.$alert('修改成功', '', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
                location.reload();

              }
            });

            this.dialogFormVisible=false

          })
        }
      },

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
      },
    beforeCreate(){
        this.$axios({
            method:'get',
            url: "/ff14/waretab/getAllWare",
        }).then(res=>{
            console.log(res.data);
            this.tableData=res.data.data
        })
      this.$axios({
        method:'get',
        url: "/ff14/waretypetab/selectAll",

      }).then(res=>{
        console.log(res.data)
        this.typedata=res.data.data
      })

    }
}
</script>

<style scoped>

</style>
