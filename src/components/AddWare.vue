<template>
  <el-form ref="form" :model="form" label-width="80px">
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

    <el-form-item label="商品图片">
        <el-input v-model="form.Picture" type="file"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
    </el-form-item>
</el-form>
</template>

<script>
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
      onSubmit() {
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
            // data: {
            //     WareName:this.$data.form.WareName,
            //     WarePrice:parseInt(this.$data.form.Wareprice),
            //     Picture:this.$data.form.Picture,
            //     WareTypeid:this.$data.form.Waretype,
            //     WarePre:10,
            //     Sale:10
            // }
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
