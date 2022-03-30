<template>
    <div>
        <el-scrollbar>
            <el-table :data="categories">
                <el-table-column prop="category_id" label="Id" width="220" />
                <el-table-column prop="category_name" label="名称"/>
            </el-table>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance} from 'vue'
const internalInstance = getCurrentInstance();
//  全局变量
let global = internalInstance.appContext.config.globalProperties;
let categories = ref([])
const getCategory = async ()=>{
  const {data} = await global.$http.get('/catrgories') 
 categories.value = data
}
getCategory()



</script>

<style>
</style>