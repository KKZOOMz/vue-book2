<template>
  <mu-container>
    <mu-bottom-nav :value.sync="tab" @change="change">
      <mu-bottom-nav-item value="bookshelf" title="书架" icon="chat_bubble_outline"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="discover" title="发现" icon="chat_bubble_outline"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="category" title="分类" icon="supervisor_account"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="search" title="搜索" icon="explore"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>

<script>

  export default {
    name: 'bottomTab',
    data() {
      return {
        tab: 'discover'
      }
    },
    methods: {
      change(val) {
        this.$router.push(val)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>

</style>
