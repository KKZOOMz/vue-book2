<template>
  <div class="cateDetail">
    <mu-appbar style="width: 100%;" color="#2955F3">
      <span @click="back" style="color: #fff">返回</span>
      <span class="cateTitle">{{major}}</span>
    </mu-appbar>
    <div class="contentWrapper">
      <div class="contentBox">
        <div class="list" v-for="(item, index) in bookList" @click="turn(item._id)" :key="index">
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

  export default {
    beforeRouteEnter(to, from, next) {
//      this.gender =
//      console.log(this.$route)
//      this.this.axios.get('/api/book/by-categories?gender=' + this.$route.params.gender + '&type=hot&major=' + this.$route.params.major + '&minor=&start=0&limit=20')
//        .then(res => {
//          console.log(res)
//        })
      next(vm => {
        vm.getInfo()
      })
    },
    data() {
      return {
        gender: '',
        major: '',
        bookList: [],
        cateTitle: ''
      }
    },
    methods: {
      turn(id) {
        this.$router.push({name: 'bookdetail', params: {bookId: id}})
      },
      back() {
        this.$router.go(-1)
      },
      decodeUrl(url) {
        return decodeURIComponent(url).substring(7)
      },
      getInfo() {
        if (this.$route.params.gender) {
          this.axios.get('/api/book/by-categories?gender=' + this.$route.params.gender + '&type=hot&major=' + this.$route.params.major + '&minor=&start=0&limit=20')
            .then(res => {
//            console.log(res)
              if (res.status === 200) {
                res = res.data
                console.log(res)
                this.bookList = res.books
                this.gender = this.$route.params.gender
                this.major = this.$route.params.major
              }
            })
        } else {
          this.axios.get('/api/book/by-categories?gender=' + this.gender + '&type=hot&major=' + this.major + '&minor=&start=0&limit=20')
            .then(res => {
//            console.log(res)
              if (res.status === 200) {
                res = res.data
                console.log(res)
                this.bookList = res.books
              }
            })
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../public/scss/mixin'
  .cateDetail
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
    /*.header
      width: 100%
      height: 40px
      line-height: 40px
      padding: 0 10px
      box-sizing: border-box
      background: #3F4AFE
      .back
        display: inline-block
        width: 50px
        height: 40px
        font-size: 20px
        color: #fff
      .cateTitle
        display: inline-block
        margin: 0 auto 0 110px
        width: 80px
        height: 100%
        text-align: center
        font-size: 24px
        !*font-weight: 700*!
        color: #ffffff*/
    .contentWrapper
      width: 100%
      height: 100%
      padding: 0 10px
      .contentBox
        width: 100%
        height: auto
        .list
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
