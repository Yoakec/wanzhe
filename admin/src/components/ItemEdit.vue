<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}物品</h1>
    <el-form label-position="right" label-width="100px" :model="model" style="max-width: 460px">
 <el-form-item label="名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="图标">
          <el-upload
    class="avatar-uploader"
    :headers="global.$getAuth()"
    :action="uploadURL+'/upload'"
    :show-file-list="false"
    :on-success="UploadProps"
  >
    <img v-if="model.icon" :src="model.icon" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
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

let model = ref({
  name:'',
  icon:''
})
/**
 * 从list过来
 */
if (props.id) {
  async function getModel() {
    const {data} = await global.$http.get(`rest/items/${props.id}`)
    model.value = data
  }
  getModel()
}

const save = async () => {
  if (props.id) {
    const res = await global.$http.put(`rest/items/${props.id}`, model.value)
  } else {
    const res = await global.$http.post('rest/items', model.value)
    }
  useRouter.push('/items/list')
  ElMessage.success({ message: '发送成功' })
}


/**
 * 上传图片
 */
const UploadProps = (res) => {
    model.value.icon = res.url
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