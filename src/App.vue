<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  #app
    width: 100%
    height: 100%
</style>
