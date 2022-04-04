<template>
  <div class="about">
    <h1>{{ props.id ? "编辑" : "新建" }}英雄</h1>
    <el-form  :model="model" style="max-width: 860px">
      <el-tabs type="border-card" model-value="skill">
        <el-tab-pane label="基础信息">
                <el-form-item label="名称">
        <el-input v-model="model.data.name" />
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="model.data.title" />
      </el-form-item>
      <el-form-item label="类别">
       <el-select
      v-model="model.data.categories"
      multiple
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="item in options1"
        :key="item._id"
        :label="item.name"
        :value="item._id"
      />
    </el-select>
      </el-form-item>
      
    <el-form-item label="难度">
        <el-rate :max=10 :show-score='true' style="margin-top:0.6rem;" v-model="model.data.scores.diffcult" />
      </el-form-item>
      
       <el-form-item label="技能">
        <el-rate :max=10 :show-score='true' style="margin-top:0.6rem;" v-model="model.data.scores.skills" />
      </el-form-item>

       <el-form-item label="攻击">
        <el-rate :max=10 :show-score='true' style="margin-top:0.6rem;" v-model="model.data.scores.attack" />
      </el-form-item>

       <el-form-item label="生存">
        <el-rate :max=10 :show-score='true' style="margin-top:0.6rem;" v-model="model.data.scores.survive" />
      </el-form-item>

           <el-form-item label="顺风出装">
       <el-select
      v-model="model.data.items1"
      multiple
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="item in options2"
        :key="item._id"
        :label="item.name"
        :value="item._id"
      />
    </el-select>
      </el-form-item>

      <el-form-item label="逆风出装">
       <el-select
      v-model="model.data.items2"
      multiple
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="item in options2"
        :key="item._id"
        :label="item.name"
        :value="item._id"
      />
    </el-select>
      </el-form-item>

<el-form-item label="使用技巧">
        <el-input type='textarea' v-model="model.data.usageTips" />
      </el-form-item>

      <el-form-item label="对抗技巧">
        <el-input type='textarea' v-model="model.data.battleTips" />
      </el-form-item>

      <el-form-item label="团战思路">
        <el-input type='textarea' v-model="model.data.teamTips" />
      </el-form-item>




      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadURL + '/upload'"
          :show-file-list="false"
          :on-success="UploadProps"
        >
          <img v-if="model.data.avator" :src="model.data.avator" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能"  name="skill">
          <el-button @click="model.data.skills.push({})" ><el-icon><circle-plus /></el-icon>添加技能</el-button>
          <el-row type="flex" style="flew-warp:warp;">
            <el-col style="margin:0.5rem" :md="10" v-for="(item,i) in model.data.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                   <el-upload
          class="avatar-uploader"
          :action="uploadURL + '/upload'"
          :show-file-list="false"
          :on-success="res => item.icon = res.url"
        >
          <img v-if="item.icon" :src="item.icon" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"></el-input>
              </el-form-item>
               <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
               <el-form-item label="">
                <el-button type="danger" @click="model.data.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:1rem;">
        <el-button type="primary" @click="save()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { CirclePlus } from '@element-plus/icons-vue'
import { reactive, ref, getCurrentInstance, toRefs } from 'vue'
import useRouter from '../rounter'

const internalInstance = getCurrentInstance();
//  全局变量
let global = internalInstance.appContext.config.globalProperties;

const props = defineProps({
  id: String
})

let uploadURL = ref(global.$http.defaults.baseURL)

let model = reactive({data:{
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
}})
/**
 * 从list过来
 */
if (props.id) {
  async function getModel() {
    const { data } = await global.$http.get(`rest/heros/${props.id}`)
    /**
     * 画重点咯
     */
    model.data = {...model.data,...data}
  }
  getModel()
}

const save = async () => {
  if (props.id) {
    const res = await global.$http.put(`rest/heros/${props.id}`, model.data)
  } else {
    const res = await global.$http.post('rest/heros', model.data)
  }
  useRouter.push('/heros/list')
  ElMessage.success({ message: '发送成功' })
}

const options1 = ref([])
const getCategory = async () => {
    //查询一级分类
    let { data } = await global.$http.get('rest/categories')
    options1.value = data
}
getCategory()

const options2 = ref([])
const getItems = async () => {
    //查询一级分类
    let { data } = await global.$http.get('rest/items')
    options2.value = data
}
getItems()


/**
 * 上传图片
 * 上传成功后，会从服务器返回一个在线浏览地址
 */
const UploadProps = (res) => {
  model.data.avator = res.url
}

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 5rem;
  height: 5rem;
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
  width: 5rem;
  height: 5rem;
  text-align: center;
  }
</style>