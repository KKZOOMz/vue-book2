<template>
  <div class="discoverWrapper" ref="discoverWrapper">
    <div class="contentWrapper">
      <div class="bannerWrapper">
        <!--banner轮播图-->
        <Banner></Banner>
      </div>
      <div class="rankingWrapper">
        <!--排行版-->
        <div class="rankingList" v-for="(item, index) in rankings" :key="index">
          <span>{{item.title}}</span>
          <RankingList :id="item._id"></RankingList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import {Banner, RankingList} from '../../widget'
  export default {
    components: {
      Banner,
      RankingList
    },
    data() {
      return {
        firstRead: false
      }
    },
    mounted() {
      this.$nextTick(() => { // 注册使用better-scroll
        this.scroll = new BScroll(this.$refs.discoverWrapper, {
          click: true
        })
      })
    },
    created() {
      this.$store.dispatch('getRanking')
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.scrollRefresh()
      })
    },
    methods: {
      scrollRefresh() {
        if (!this.firstRead) {
          this.firstRead = true
        } else {
          this.scroll.refresh()
        }
      }
    },
    computed: mapState({rankings: 'rankings'})
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .discoverWrapper
    width: 100%
    height: 100%
    .contentWrapper
      padding: 0 14px
      width: 100%
      height: auto
      .bannerWrapper
        margin: 0 auto
      .rankingWrapper
        margin: 40px auto
        width: 100%
        .rankingList
          margin-top: 40px
          span
            font-size: 26px
            font-style: italic
</style>
