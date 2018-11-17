<template>
  <div class="home">
    <div class="head">
      <TopHeader></TopHeader>
    </div>
    <div class="body">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="tabbar">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
  import {TopHeader, Tabbar} from '../../widget'
  export default {
    components: {
      TopHeader,
      Tabbar
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .home
    width: 100%
    height: 100%
    .head
      position: fixed
      display: block
      top: 0
      left: 0
      width: 100%
      height: 56px
    .body
      position: fixed
      top: 56px
      bottom: 56px
      left: 0
      right: 0
      width: 100%
      overflow: hidden
    .tabbar
      position: fixed
      bottom: 0
      left: 0
      width: 100%
</style>
