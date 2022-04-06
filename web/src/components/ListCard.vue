<template>
    <div>
            <m-card :icon="icon" :title="title">
            <div class="nav jc-between">
                <div class="nav-item" :class="{active:isactive === index}"
                 v-for="(item,index) in categories" :key="index" 
                 @click="toJump(index)">
                    <div class="nav-link">{{item.name}}</div>
                </div>
            
            </div>
            <div class="pt-3">
                <swiper
                ref="list"
                @swiper="setControlledSwiper"
                @slideChange="onSlideChange"
                >
                    <swiper-slide  v-for="(category,index) in categories" :key="index">
                      <slot name="items" :category="category"></slot>
                    </swiper-slide>
                </swiper>
            </div>
        </m-card>
    </div>


</template>

<script setup>
import {ref,reactive,nextTick  } from 'vue'

const props = defineProps({
    title:String,
    icon:String,
    categories: Array

})
const isactive =ref(0)

const list = ref(null)


const state = reactive({
			controlledSwiper: null
		});
const setControlledSwiper = (swiper) => {
			state.controlledSwiper = swiper;
		};
		// 这里调用需要nextTick一下否则初始化操作未执行调用，会报slideTo，undefind错
nextTick(() => {
			console.log(state.controlledSwiper.slideTo(1,1000,false));
		});

const onSlideChange = (swiper) => {
    isactive.value  =  swiper.realIndex
};

 
const toJump = (index) =>{
    isactive.value = index
    state.controlledSwiper.slideTo(index)
}




</script>

<style>

</style>