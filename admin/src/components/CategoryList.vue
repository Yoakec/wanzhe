<template>
    <div>
        <el-scrollbar>
            <el-table :data="categories">
                <el-table-column :formatter="formatterid" label="Id" width="220" />
                <el-table-column :formatter="formatterpaname" label="上级分类" />
                <el-table-column :formatter="formattername" label="名称" />
                <el-table-column label="操作" width="220">
                    <template #default="scope">
                        <!-- <el-button type="text" size="small" @click="handleClick">详情</el-button> -->
                        <el-button
                            type="text"
                            size="small"
                            @click="useRouter.push(`/categories/edit/${typeof scope.row.category_part_id === 'undefined'?  scope.row.category_id:scope.row.category_child_id} ${scope.row.category_part_id?2:1}`)"
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
    //查询一级分类
    let { data:pada } = await global.$http.get('/catrgories')
    categories.value = pada
    //查询二级分类
    let { data:chda } = await global.$http.get('/catrgorieschild')
    categories.value = categories.value.concat(chda)
    console.log(categories.value);
}
getCategory()


/**
 * typeof row.category_part_id ==='undefined'
 * true 是一级分类
 * false 是二级分类
 */
const formatterid = (row) => {
  return typeof row.category_part_id ==='undefined'? row.category_id:row.category_child_id
}
const formatterpaname = (row) => {
  return typeof row.category_part_id ==='undefined'? '':row.category_name
}
const formattername = (row) => {
  return typeof row.category_part_id ==='undefined'? row.category_name:row.category_child_name
}



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
            if(typeof row.category_part_id ==='undefined'){
                const res = await global.$http.delete(`/catrgories/${row.category_id}`)
            }else{
                const res = await global.$http.delete(`/catrgorieschild/${row.category_id}`)
            }
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