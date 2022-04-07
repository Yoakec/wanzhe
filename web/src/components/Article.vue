<template>
  
  <div class="art-page">
      <div class="d-flex py-3 px-2">
          <div class="iconfont icon-means"></div>
          <strong class="page-title flex-1">{{articleData.data.title}}</strong>
          <div class="text-grey">2019-06-19</div>
      </div>

        <div class="content">
             <Viewer :value="articleData.data.body"/>
        </div>
        <div class="footer">
            <div class="d-flex px-3 ai-center">
            <div class="iconfont icon-means"></div>
            <strong class="text-blue flex-1 px-2">相关资讯</strong>
            </div>
            <div class="footerlink">
                <router-link
                custom
                :to="`/articles/${art._id}`"
                v-slot="{ navigate, href }"
                v-for="(art,index) in articleData.data.related"
                :key="index">
                <div
                class="mx-2 mt-3"
                @click="navigate"
                :href="href">
                {{art.title}}
                </div>
                </router-link>

            </div>
        </div>
  </div>

</template>

<script setup>
import { Viewer } from '@bytemd/vue-next'
import {reactive,getCurrentInstance,watch,ref} from 'vue'

const internalInstance = getCurrentInstance();
//  全局变量
let global = internalInstance.appContext.config.globalProperties;

const props = defineProps({
    id:String
})


const articleData = reactive({
    data:{
        related:[]
    }
})


const fetcharticleData = async (id) =>{
    let {data} = await global.$http.get(`articles/${props.id}`)
    articleData.data = {...data}
}
fetcharticleData()


watch(
  () => props,
  (p, prevp) => {
    console.log(p.id,prevp.id);  
    fetcharticleData()
  },
  { deep: true }
)
</script>

<style>

</style>