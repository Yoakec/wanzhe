<template>
  
  <div class="card bg-white p-3 mt-3">
            <div class="card-header d-flex ai-center pb-3">
                <i class="iconfont" :class="`icon-${icon}`"></i>
                <div class="fs-xxl flex-1 px-2">{{title}}</div>
                <i class="iconfont icon-means"></i>
            </div>
            <div class="card-body pt-3">
                <slot></slot>
            </div>
        </div>
</template>

<script setup>


const props = defineProps({
  title: String,
  icon: String
})

</script>

<style lang="scss">
@import '../scss/varible';
.card{
    .card-header{
        border-bottom: 3px solid $border-color;
    }
    border-bottom: 3px solid $border-color;
}

</style>