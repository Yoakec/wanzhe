<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}分类</h1>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.category_name" />
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
import useRouter from '../rounter';

const internalInstance = getCurrentInstance();
//  全局变量
let global = internalInstance.appContext.config.globalProperties;

const props = defineProps({
  id: String
})

const labelPosition = ref('right')

let formLabelAlign = reactive({
  category_id: '',
  category_name: ''
})

const save = async () => {
  let res
  if (props.id) {
    res = await global.$http.put(`catrgories/${props.id}`, formLabelAlign)
  } else {
    res = await global.$http.post('catrgories', formLabelAlign)
  }

  useRouter.push('/categories/list')
  ElMessage.success({ message: '发送成功' })
}

if (props.id) {
  const res = global.$http.get(`catrgories/${props.id}`)
  res.then(data => {
    let { category_name: server_category_name } = data.data[0]
    formLabelAlign.category_name = server_category_name
  })
}
</script>

<style>
</style>