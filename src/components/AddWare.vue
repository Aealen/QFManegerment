<template>
<div>
  <el-form :model="form" label-width="80px">
    <el-form-item label="商品名称">
        <el-input v-model="form.WareName"></el-input>
    </el-form-item>
    <el-form-item label="商品价格">
        <el-input v-model="form.Wareprice" type="number"></el-input>
    </el-form-item>

<el-form-item label="商品类型" prop="type">
    <el-checkbox-group v-model="form.WareType"  >
        <el-radio v-for="item in formdata" :key=item.waretypeid v-model="form.Waretype" :label=item.waretypeid >{{item.waretypename}}</el-radio>
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
    <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
    </el-form-item>
</el-form>


</div>

</template>

<script>
import {uploadFile} from '../js/upload'
export default {
 data() {
      return {
        form: {
            WareName:"",
            Wareprice:0,
            Picture: null,
            Waretype:0,
        },
        formdata:[],
      }
    },
    methods: {
        a(response, file, fileList){
            this.form.Picture=response
        },
      onSubmit() {


        if(this.$data.form.WareName==""||this.$data.form.Wareprice==0||this.$data.form.Picture==null||this.$data.form.Waretype==0){
            console.log("aaaaaaa")
            this.$alert('请填写完整内容', '', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        }
        let formDatas = new FormData()
        formDatas.append('WareName', this.$data.form.WareName)
        formDatas.append('WarePrice',parseInt(this.$data.form.Wareprice))
        formDatas.append('Picture',this.$data.form.Picture)
        formDatas.append('WareTypeid',this.$data.form.Waretype)
        formDatas.append('WarePre',10)
        formDatas.append('Sale',10)
        this.$axios({
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method:'post',
            url: '/ff14/waretab/waretab',
            data: formDatas
        }).then(res=>{
            this.$alert('添加成功', '', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
        this.$data.form.WareName=""
        this.$data.form.Wareprice=0
        this.$data.form.Picture=null
        this.$data.form.Waretype=0
        })
      }
    },
    beforeCreate() {
      this.$axios({
        method:'get',
        url: "/ff14/waretypetab/selectAll",

      }).then(res=>{
        console.log(res.data)
        this.$data.formdata=res.data.data
      })
    },
}
</script>

<style>

</style>
