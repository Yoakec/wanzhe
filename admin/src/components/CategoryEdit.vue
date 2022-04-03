<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}分类</h1>
    <el-form label-position="right" label-width="100px" :model="model" style="max-width: 460px">
      <el-form-item label="上级名称">
<el-select v-model="model.parent" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in options"
      :key="item._id"
      :label="item.name"
      :value="item._id"
    />
  </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name" />
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
  name:'',
  parent:''
})
/**
 * 从list过来
 */
if (props.id) {
  async function getModel() {
    const {data} = await global.$http.get(`rest/categories/${props.id}`)
    model.name = data.name
    if(data.parent){
      model.parent = data.parent
    }
  }
  getModel()
}

const save = async () => {
  if (props.id) {
    if(model.parent === ''){
    const res = await global.$http.put(`rest/categories/${props.id}`,{name:model.name})
    }else{
    const res = await global.$http.put(`rest/categories/${props.id}`, model)
    }

  } else {
    if(model.parent === ''){
    const res = await global.$http.post('rest/categories', {name:model.name})
    }else{
    const res = await global.$http.post('rest/categories', model)
    }

  }
  useRouter.push('/categories/list')
  ElMessage.success({ message: '发送成功' })
}

const options = ref([])
const getCategory = async () => {
    //查询一级分类
    let { data } = await global.$http.get('rest/categories')
    options.value = data
}
getCategory()


</script>

<style>
</style>