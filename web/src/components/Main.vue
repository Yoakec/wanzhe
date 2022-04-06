<template>
  <div>
      <div class="topbar bg-black py-2 px-4 d-flex ai-center ">
          <img src="../assets/20220405203245.jpg" height="30" alt="">
          <div class="px-2 flex-1">
              <div class="text-white">王者荣耀</div>
              <div class="text-grey fs-xxs">团队成就更多</div>
          </div>
          <button class="btn bg-primary" type="button">立即下载</button>
      </div>
      <div class="bg-primary pt-3 pb-2">
           <div>
               <div class="nav nav-inverse jc-around">
                   <div class="nav-item active">
                        <router-link class="nav-link" custom to="/"><div>首页</div></router-link>
                   </div>
                   <div class="nav-item">
                        <router-link class="nav-link" custom to="/"><div>新闻中心</div></router-link>
                   </div>
                   <div class="nav-item">
                        <router-link class="nav-link" custom to="/"><div>赛事中心</div></router-link>
                   </div>
               </div>
           </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.topbar{
    position: sticky;
    top: 0;
    z-index: 9;
}

</style>