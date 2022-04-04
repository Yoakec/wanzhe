<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-position="right" label-width="100px" :model="model" style="max-width: 460px">
      <el-form-item label="名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="model.title" />
      </el-form-item>
      <el-form-item label="类别">
       <el-select
      v-model="model.categories"
      multiple
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item._id"
        :label="item.name"
        :value="item._id"
      />
    </el-select>
      </el-form-item>
      
    <el-form-item label="难度">
        <el-rate show- v-model="model.scores.diffcult" />
      </el-form-item>
      
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL + '/upload'"
          :show-file-list="false"
          :on-success="UploadProps"
        >
          <img v-if="model.avator" :src="model.avator" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
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
    name:'',
    avator:'',
    title:'',
    categories:[],
    scores:{
        diffcult:0,
        skills:0,
        attack:0,
        survive:0,
    },
    skills:[],
    items1:[],
    items2:[],
    usageTips:'',
    battleTips:'',
    teamTips:'',
    partners:[]
})
/**
 * 从list过来
 */
if (props.id) {
  async function getModel() {
    const { data } = await global.$http.get(`rest/heros/${props.id}`)
    model = reactive({...model,...data})
    console.log(model);
  }
  getModel()
}

const save = async () => {
  if (props.id) {
    const res = await global.$http.put(`rest/heros/${props.id}`, model)
  } else {
    const res = await global.$http.post('rest/heros', model)
  }
  useRouter.push('/heros/list')
  ElMessage.success({ message: '发送成功' })
}

const options = ref([])
const getCategory = async () => {
    //查询一级分类
    let { data } = await global.$http.get('rest/categories')
    options.value = data
}
getCategory()


/**
 * 上传图片
 * 上传成功后，会从服务器返回一个在线浏览地址
 */
const UploadProps = (res) => {
  model.avator = res.url
}


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
</style>