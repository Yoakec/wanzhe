<template>
  <div class="login-container">
      <el-card header="请先登录" class="login-card">
          <el-form label-position="right" label-width="100px" >
              <el-form-item label="用户名">
                  <el-input v-model="model.data.username"></el-input>
              </el-form-item>
               <el-form-item label="密码">
                  <el-input v-model="model.data.password"></el-input>
              </el-form-item>
               <el-form-item >
               <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>

</template>

<script setup>
import { reactive,getCurrentInstance } from 'vue';
import useRouter from '../rounter'
import { ElMessage } from 'element-plus';
const internalInstance = getCurrentInstance();
//  全局变量
let global = internalInstance.appContext.config.globalProperties;

let model = reactive({
    data:{
        username:'',
        password:''
    }
})

const login = async () =>{ 
    const res = await global.$http.post('login',model.data)
    localStorage.token =  res.data.token
    useRouter.push('/')
    ElMessage.success('登录成功！')
}

</script>

<style>
.login-card{
    width: 25rem;
    margin: 5rem auto;
}
</style>