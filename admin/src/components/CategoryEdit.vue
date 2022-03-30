<template>
<div class="about">
    <h1>创建分类</h1>
    <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="名称">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="save()">提交</el-button>
    </el-form-item>

  </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { reactive,ref,getCurrentInstance } from 'vue'
import  useRouter from '../rounter';

const internalInstance  = getCurrentInstance();
//  全局变量
let global=internalInstance.appContext.config.globalProperties;

const labelPosition = ref('right')

const formLabelAlign = reactive({
  name: ''
})

const save = async ()=>{
  console.log(formLabelAlign);
  const res = await global.$http.post('catrgories',formLabelAlign)
  useRouter.push('/categories/list')
  ElMessage.success({message:'发送成功'})
}
</script>

<style>

</style>