<template>
  <mu-appbar style="width: 100%;" color="primary">
    <mu-button icon slot="left">
      <mu-icon value="view_headline"></mu-icon>
    </mu-button>
    <div class="title">
      {{t1}}
    </div>
    <mu-button flat slot="right">
      <mu-icon value="perm_identity"></mu-icon>
    </mu-button>
  </mu-appbar>
</template>

<script>
//  import {mapState} from 'vuex'
  export default {
    name: 'TopHeader',
    computed: {
      t1() {
//          mapState({t1: 'headerTitle'})
        return this.$store.state.headerTitle
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .mu-appbar
    width: 100%
    background: #2955F3
    background: linear-gradient(to right, #2955F3 0%, #7db8e7 70%)
    color: white
    .title
      text-align: center
</style>
