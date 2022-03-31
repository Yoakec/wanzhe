<template>
    <div>
        <el-scrollbar>
            <el-table :data="categories">
                <el-table-column prop="category_id" label="Id" width="220" />
                <el-table-column prop="category_name" label="名称" />
                <el-table-column label="操作" width="220">
                    <template #default="scope">
                        <!-- <el-button type="text" size="small" @click="handleClick">详情</el-button> -->
                        <el-button
                            type="text"
                            size="small"
                            @click="useRouter.push(`/categories/edit/${scope.row.category_id}`)"
                        >编辑</el-button>
                        <el-button type="text" size="small" @click="open(scope.row)">删除</el-button>
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
let categories = ref([])
const getCategory = async () => {
    const { data } = await global.$http.get('/catrgories')
    categories.value = data
}
getCategory()

const open = (row) => {
    ElMessageBox.confirm(
        `是否要删除"${row.category_name}"?`,
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    )
        .then(async () => {
            const res = await global.$http.delete(`/catrgories/${row.category_id}`)
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            getCategory()
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消操作',
            })
        })
}

</script>

<style>
</style>