<template>
  <div>
    <!--未加载完成前的loading符号-->
    <mu-circular-progress v-if="!flag" class="loading demo-circular-progress" :size="48"></mu-circular-progress>
    <!--detail具体内容-->
    <div class="d-Detail" v-if="flag">
      <!--头部，包含返回按钮和小说标题-->
      <div class="d-header">
        <span @click="back" class="d-back-btn icon-arrow_lift">返回</span>
        <span class="d-head-title">{{bookInfo.title}}</span>
      </div>
      <!--顶部小说内容，包行小说标题、作者、图片。。。-->
      <div class="d-head-content">
        <div class="d-title">
          <div class="b-cover">
            <!--小说图片-->
            <img :src="bookInfo.cover" width="94">
          </div>
          <div class="b-text">
            <!--小说名-->
            <span class="d-book-title">{{bookInfo.title}}</span>
            <!--作者-->
            <span class="d-book-author">{{bookInfo.author}}</span>
            <!--分类-->
            <span class="d-book-cate">{{bookInfo.majorCate}} / {{bookInfo.minorCate}}</span>
            <!--字数-->
            <span class="d-book-wordCount">{{(bookInfo.wordCount / 10000).toFixed(2)}}万字</span>
            <!--小说跟新章节-->
            <span class="d-book-lastChapter">{{bookInfo.lastChapter}}</span>
          </div>
        </div>
        <!--按钮-->
        <div class="b-btn">
          <!--添加书架-->
          <span class="b-btn1" @click="addBook()">加入书架</span>
          <!--点击阅读-->
          <span class="b-btn2" @click="readBook()">点击阅读</span>
        </div>
      </div>
      <!--小说详细介绍-->
      <div class="d-book-detailInfo">
        <span class="d-book-detail-text">{{bookInfo.longIntro}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
//      在路由进入前发起请求获取数据
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getBookDetail()
      })
    },
    data() {
      return {
        bookInfo: {}, // 存放小说信息
        flag: false
      }
    },
    methods: {
      // 获取书本详细信息
      getBookDetail() {
        if (this.$route.params.bookId) {
          this.axios.get('/api/book/' + this.$route.params.bookId)
            .then(res => {
//               console.log(res)
              // 网络请求完成时候res.status为200
              if (res.status === 200) {
                res = res.data
//                console.log(res)
                // 获取小说信息
                this.bookInfo = res
                // 将小说的图片网址路径进行解码
                this.$set(this.bookInfo, 'cover', this.decodeUrl(this.bookInfo.cover))
                // 给小说信息添加一个属性用于存放阅读的最后一个章节索引
                Object.assign(this.bookInfo, {
                  readedLastChapter: 0
                })
                this.flag = true
              }
            })
        }
      },
//      返回到上一句router
      back() {
        this.flag = false
        this.$router.go(-1)
      },
//      解码图片路径
      decodeUrl(url) {
        return decodeURIComponent(url).substring(7)
      },
//      点击阅读
      readBook() {
        this.$router.push({name: 'readbook', params: {bookInfo: this.bookInfo}})
      },
      // 添加到小说书架
      addBook() {
        this.$store.commit('SET_BOOK_SHELF', this.bookInfo)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../../../public/scss/mixin"
  .loading
    margin-top: 200px
    margin-left: 200px

  .d-Detail
    width: 100%
    height: 100%
    padding: 0 18px
    box-sizing: border-box
    .d-header
      margin: 0 auto
      height: 50px
      width: 100%
      line-height: 50px
      padding: 10px 0
      .d-back-btn
        display: inline-block
        height: 30px
      .d-head-title
        display: inline-block
        margin-left: 10px
        height: 30px
    .d-head-content
      margin-top: 20px
      width: 100%
      height: 220px
      @include border-1px(rgba(7, 17, 27, 0.4))
      .d-title
        display: flex
        width: 100%
        height: 160px
        .b-cover
          flex: 0 0 94px
          width: 94px
        .b-text
          flex: 1
          margin-left: 10px
          height: 136px
          .d-book-title
            display: block
            margin-bottom: 10px
            font-size: 18px
            font-weight: 700
          .d-book-author
            display: block
            margin-bottom: 10px
          .d-book-cate
            display: block
            margin-bottom: 10px
          .d-book-wordCount
            display: block
            margin-bottom: 10px
          .d-book-lastChapter
            display: block
            height: 18px
            line-height: 18px
            white-space: pre-line
            text-overflow: ellipsis
            overflow: hidden
      .b-btn
        display: flex
        box-sizing: border-box
        margin-bottom: 10px
        width: 100%
        height: 40px
        text-align: center
        line-height: 40px
        border: 1px solid rgba(7, 17, 27, 0.4)
        .b-btn1
          flex: 1
        .b-btn2
          flex: 1
          background: #ff5030
          color: #ffffff
    .d-book-detailInfo
      width: 100%
      min-height: 100px
      padding: 20px 0
      @include border-1px(rgba(7, 17, 27, 0.4))
      .d-book-detail-text
        font-size: 16px
        line-height: 30px
</style>
