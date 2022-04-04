<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}文章</h1>
    <el-form label-position="right" label-width="100px" :model="model" style="max-width: 460px">
      <el-form-item label="题目">
        <el-input v-model="model.data.title" />
      </el-form-item>
      <el-form-item label="分类">
        <el-select
          v-model="model.data.categories"
          class="m-2"
          multiple
          placeholder="Select"
          size="large"
        >
          <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <Editor 
        class="bymdEditor"
        :value="model.data.body" 
        :locale="zhHans" 
        :plugins="plugins" 
        :uploadImages="uploadImage"
        @change="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref, getCurrentInstance, toRefs } from 'vue'
import useRouter from '../rounter'
/**
 * 富文本编辑器
 */
import 'bytemd/dist/index.css'
import { Editor } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import gemoji from '@bytemd/plugin-gemoji'
import zhHans from 'bytemd/locales/zh_Hans.json'
import highlight from '@bytemd/plugin-highlight '
import zoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'

const plugins = [gfm(),gemoji(),highlight(),zoom(),mermaid()]
const internalInstance = getCurrentInstance();
//  全局变量
let global = internalInstance.appContext.config.globalProperties;

const props = defineProps({
  id: String
})

let uploadURL = ref(global.$http.defaults.baseURL)

let model = reactive({
  data: {
    title: '',
    categories: [],
    body: ''
  }
})

const handleChange = (v) => {
  model.data.body = v
}

const uploadImage = async (files) => {
      // files 获取的图片文件，这里处理逻辑
      console.log(files[0]);
      const formData = new FormData()
      formData.append('file',files[0])
      const {data} = await global.$http.post('/upload',formData)
      return [
        {
          title: files.map((i) => i.name),
          url: data.url
        }
      ]
    }

/**
 * 从list过来
 */
if (props.id) {
  async function getModel() {
    const { data } = await global.$http.get(`rest/articles/${props.id}`)
    model.data = { ...model, ...data }
  }
  getModel()
}

const save = async () => {
  if (props.id) {
    const res = await global.$http.put(`rest/articles/${props.id}`, model.data)
  } else {
    const res = await global.$http.post('rest/articles', model.data)
  }
  useRouter.push('/articles/list')
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

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.bymdEditor{
  z-index: 10;
}
</style>