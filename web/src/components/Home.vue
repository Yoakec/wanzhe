<template>
    <div>
        <swiper :autoplay="{ delay: 3500, disableOnInteraction: false }"
            :pagination="{ clickable: true, dynamicBullets: true }">
            <swiper-slide>
                <img class="w-100" src="../assets/f86188d10da794efb4abb8e4cc48c0e3.jpeg" alt />
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/40501c2dcec354c8da2ab4d3dc3388ec.jpeg" alt />
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/2cd4a6f7ec40771674e6b3a1594ec301.jpeg" alt />
            </swiper-slide>
        </swiper>

        <div class="nav-icons text-center bg-white mt-3 pt-3 text-grey">
            <div class="d-flex flex-warp">
                <div class="nav-items mb-3" v-for="i in 10" :key="i">
                    <i class="sprite sprite-news"></i>
                    <div class="py-2">爆料站</div>
                </div>
            </div>
            <div class="bg-light fs-sm py-2">
                <i class="sprite sprite-arrow mr-2"></i>
                <span>收起</span>
            </div>
        </div>
        <m-listcard icon="-superhero" title="官方咨询" :categories="newcates">
            <template #items="{ category }">
                <router-link custom :to="`/articles/${items._id}`" v-slot="{ navigate, href }"
                    v-for="(items, i) in category.newsList" :key="i">
                    <div class="py-2 d-flex" @click="navigate" :href="href">
                        <span class="text-primary">[{{ items.categoryName }}]</span>
                        <span class="px-2">|</span>
                        <span class="flex-1 text-warp pr-2">{{ items.title }}</span>
                        <span class="text-grey fs-sm">{{ formatDay(items.createdAt) }}</span>
                    </div>
                </router-link>
            </template>
        </m-listcard>

        <m-listcard icon="-superhero" title="英雄列表" :categories="herocates">
            <template #items="{ category }">
                <div class="d-flex flex-warp" style="margin:0 -0.5rem">
                    <router-link custom :to="`/hero/${hero._id}`" v-slot="{ navigate, href }" class="p-2 text-center"
                        v-for="(hero, i) in category.heroesList" :key="i">
                        <div class="p-2 text-center" style="width:20%;" @click="navigate" :href="href">
                            <img :src="hero.awatar" class="w-100" alt />
                            <div>{{ hero.name }}</div>
                        </div>
                    </router-link>
                </div>
            </template>
        </m-listcard>

        <m-card icon="-superhero" title="英雄列表"></m-card>
        <m-card icon="-superhero" title="英雄列表"></m-card>
        <m-card icon="-superhero" title="英雄列表"></m-card>
        <m-card icon="-superhero" title="英雄列表"></m-card>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import dayjs from 'dayjs'

const internalInstance = getCurrentInstance();
//  全局变量
let global = internalInstance.appContext.config.globalProperties;


const newcates = ref([])

const fetchNewsList = async () => {
    const { data } = await global.$http.get('news/list')
    newcates.value = [...data]
}

fetchNewsList()


const herocates = ref([])

const fetchheroesList = async () => {
    const { data } = await global.$http.get('heroes/list')
    herocates.value = [...data]
}

fetchheroesList()



const formatDay = (val) => {
    return dayjs(val).format('MM/DD')
}


</script>

<style lang="scss">
@import "../scss/_varible.scss";

.swiper-pagination-bullets-dynamic {
    left: 85% !important;
}
.swiper-pagination-bullet {
    background: map-get($colors, "white") !important;
    border-radius: 0.1538rem;
}

.nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-items {
        width: 25%;
        border-left: 1px solid $border-color;
        &:nth-child(4n + 1) {
            border-left: none;
        }
        &:last-child {
            border-right: 1px solid $border-color;
        }
    }
}
</style>


