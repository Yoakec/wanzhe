<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}广告</h1>
    <el-form label-position="right" label-width="100px" :model="model" style="max-width: 460px">
      <el-form-item label="名称">
        <el-input v-model="model.data.name" />
      </el-form-item>
      <el-form-item label="广告">
          <el-button @click="model.data.items.push({})" ><el-icon><circle-plus /></el-icon>添加广告</el-button>
          <el-row style="">
            <el-col  v-for="(item,i) in model.data.items" :key="i">
              <el-form-item label="URL">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="图片"  style="margin-top:1rem;">
                   <el-upload
          class="avatar-uploader"
          :action="uploadURL + '/upload'"
          :show-file-list="false"
          :on-success="res => item.image = res.url"
        >
          <img v-if="item.image" :src="item.image" style="max-width: 100px;" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
              </el-form-item>
               <el-form-item label="">
                <el-button type="danger" @click="model.data.items.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
let uploadURL = ref(global.$http.defaults.baseURL)
let model = reactive({
  data:{
    name:'',
    items:[]
}
})
/**
 * 从list过来
 */
if (props.id) {
  async function getModel() {
    const {data} = await global.$http.get(`rest/ads/${props.id}`)
    model.data = {...model.data,...data}
  }
  getModel()
}

const save = async () => {
  if (props.id) {
    const res = await global.$http.put(`rest/ads/${props.id}`,model.data)
    }else{
    const res = await global.$http.post(`rest/ads`, model.data)
    }
  useRouter.push('/ads/list')
  ElMessage.success({ message: '发送成功' })
}


</script>

<style>
</style>