<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}管理员</h1>
    <el-form label-position="right" label-width="100px" :model="model" style="max-width: 460px">
      <el-form-item label="账户名">
        <el-input v-model="model.data.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input  v-model="model.data.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { reactive, ref, getCurrentInstance, toRefs } from 'vue'
import useRouter from '../rounter'

const internalInstance = getCurrentInstance();
//  全局变量
let global = internalInstance.appContext.config.globalProperties;

const props = defineProps({
  id: String
})

let model = reactive({
  data:{
  name:'',
  password:''
}
})
/**
 * 从list过来
 */
if (props.id) {
  async function getModel() {
    const {data} = await global.$http.get(`rest/admin_user/${props.id}`)
    model.data = {...data}
  }
  getModel()
}

const save = async () => {
  if (props.id) {
    const res = await global.$http.put(`rest/admin_user/${props.id}`,model.data)
    }else{
    const res = await global.$http.post(`rest/admin_user`, model.data)
    }
  useRouter.push('/admin_user/list')
  ElMessage.success({ message: '发送成功' })
}

</script>

<style>
</style>