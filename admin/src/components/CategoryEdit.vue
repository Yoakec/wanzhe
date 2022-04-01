<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}分类</h1>
    <el-form
      label-position="right"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="上级名称">
        <el-select v-model="temp_parentid" class="m-2" placeholder size="large">
          <el-option
            v-for="(parent, index) in parents_name"
            :key="index"
            :label="parent.category_name"
            :value="parent.category_id"
          />
        </el-select>
      </el-form-item>
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

let temp_parentid = ref()
/**
 * 仅仅是做渲染用
 */
let parents_name = ref([{ "category_name": "无", "category_id": "0" }])

const getParentNode = async () => {
  let res = await global.$http.get(`/catrgories`)
  parents_name.value = parents_name.value.concat(res.data)
  ElMessage.success({ message: '获取参数成功' })
}

getParentNode()

let formLabelAlign = reactive({
  category_id: '',
  category_name: '',
  category_part_id: '',
  category_child_id:''
})


/**
 * 首先判断还是几级分类
 * if一级分类，改值直接传
 * if二级分类，添加parentid，再传值
 */
const save = async () => {
  let res
  if (temp_parentid.value != "0") {
    if (props.id) {
      res = await global.$http.put(`catrgorieschild/${props.id}`, formLabelAlign)
    } else {
      formLabelAlign.category_part_id = temp_parentid.value
      res = await global.$http.post('catrgorieschild', formLabelAlign)
    }
  } else {
    if (props.id) {
      res = await global.$http.put(`catrgories/${props.id}`, formLabelAlign)
    } else {
      res = await global.$http.post('catrgories', formLabelAlign)
    }
  }
  useRouter.push('/categories/list')
  ElMessage.success({ message: '发送成功' })
}
/**
 * 如果存在组件传过来的id，那么就需要先id查询
 * if 查询的结果是一级分类，就需要对select组件设置为0
 * 如果是二级分类，就需要对select组件进行赋值
 */
if (props.id) {
  let res = props.id.split(' ')
   const getnode = async (res) =>{
       console.log("3213");
      if(res[1] == '1'){
        const {data} = await global.$http.get(`/catrgories/${res[0]}`)
        temp_parentid.value = '0'
        formLabelAlign.category_name = data[0].category_name
        formLabelAlign.category_id = data[0].category_id
      }else{
        const {data} = await global.$http.get(`/catrgorieschild/${res[0]}`)
        temp_parentid.value = data[0].category_part_id
        formLabelAlign.category_name = data[0].category_child_name
        formLabelAlign.category_child_id = data[0].category_child_id
      }
    }
    getnode(res)
}
</script>

<style>
</style>