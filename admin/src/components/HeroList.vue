<template>
    <div>
        <el-scrollbar>
            <el-table :data="items">
                <el-table-column prop="_id" label="Id" width="220" />
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="avator" label="头像" >
                    <template #default="scope">
                        <img :src="scope.row.avator" alt="" style="height:3rem" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="handleClick(scope.row)">删除</el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="useRouter.push(`/heros/edit/${scope.row._id}`)"
                        >编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import useRouter from '../rounter'
import { ElMessage, ElMessageBox } from 'element-plus';


const internalInstance = getCurrentInstance();
//  全局变量
let global = internalInstance.appContext.config.globalProperties;
let items = ref([])
const getCategory = async () => {
    //查询一级分类
    let { data } = await global.$http.get('rest/heros')
    items.value = data
}
getCategory()

const handleClick = (row) => {
    ElMessageBox.confirm(
        `真的要删除 '${row.name}' 吗？`,
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            const res = await global.$http.delete(`rest/heros/${row._id}`)
            ElMessage({
                type: 'success',
                message: '操作成功！',
            })
            getCategory()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除!',
            })
        })
}
</script>

<style>
</style>