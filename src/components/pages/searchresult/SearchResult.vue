<template>
  <div class="searchResultWrapper">
    <mu-appbar>
      <span @click="back" style="color: #fff">返回</span>
      <span class="cateTitle">搜索结果</span>
    </mu-appbar>
    <div class="resultListWrapper" ref="resultListWrapper">
      <div class="resultListBox">
        <div class="resultList" v-for="(item, index) in searchResultList" :key="index" @click="turn(item._id)">
          <div class="b-cover">
            <img :src="decodeUrl(item.cover)" width="80" ref="pic"/>
          </div>
          <div class="b-text">
            <span class="b-title">{{item.title}}</span>
            <span class="b-author">{{item.author}}</span>
            <span class="b-lastC">{{item.lastChapter}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.search()
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.resultListWrapper, {
          click: true
        })
      })
    },
    data() {
      return {
        searchResultList: []
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      search() {
        if (this.$route.params.value) {
          this.axios.get('/api/book/fuzzy-search?query=' + this.$route.params.value)
            .then(res => {
//            console.log(res)
              if (res.status === 200) {
                res = res.data
                this.searchResultList = res.books.slice(0, 20)
                console.log(this.searchResultList)
                this.scroll.refresh()
                this.scroll.scrollTo(0, 0)
              }
            })
        }
      },
      turn(id) {
        this.$router.push({name: 'bookdetail', params: {bookId: id}})
      },
      decodeUrl(url) {
        return decodeURIComponent(url).substring(7)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../public/scss/mixin'
  .searchResultWrapper
    width: 100%
    height: 100%
    .mu-appbar
      width: 100%
      background: #2955F3
      background: linear-gradient(to right, #2955F3 0%, #7db8e7 70%)
      color: white
      .cateTitle
        display: inline-block
        margin-left: 120px
        margin-right: 120px
        text-align: center
    .resultListWrapper
      position: absolute
      top: 60px
      bottom: 0
      left: 0
      width: 100%
      height: 100%
      overflow: hidden
      .resultListBox
        width: 100%
        height: auto
        padding: 0 10px
        .resultList
          display: flex
          height: 120px
          width: 100%
          @include border-1px(rgba(7, 17, 27, 0.4))
          .b-cover
            display: inline-block
            flex: 0 0 80px
            width: 80px
            height: 100%
            overflow: hidden
          .b-text
            margin: 10px
            display: inline-block
            flex: 1
            & > span
              display: inline-block
              width: 100%
              font-size: 14px
            .b-title
              flex: 1
              font-size: 20px
              margin-bottom: 10px
            .b-author
              margin-bottom: 20px
            .b-lastC
              height: 20px
              font-size: 16px
              line-height: 20px
              white-space: pre-line
              text-overflow: ellipsis
              overflow: hidden
</style>
