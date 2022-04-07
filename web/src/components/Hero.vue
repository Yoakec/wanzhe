<template>
  <div class="hero-page">
    
  </div>
</template>

<script setup>

import {reactive,getCurrentInstance} from 'vue'

let inner = getCurrentInstance()

let global = inner.appContext.config.globalProperties

const props = defineProps({
    id:String
})

const heroinitData = reactive({
    heroData:{

    }
})

const fetchheroData = async (id) =>{
    const {data} = await global.$http.get(`/hero/${id}`)
    heroinitData.heroData =  {...data}
}
fetchheroData(props.id)
</script>

<style>

</style>