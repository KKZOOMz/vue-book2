<template>
  <div class="listBox">
    <mu-circular-progress v-if="!flag" class="demo-circular-progress" :size="36"></mu-circular-progress>
    <div class="list" v-if="flag" v-for="(list, index) in rankingList" @click="turn(list._id)" :key="index">
      <!--小说图片-->
      <div class="b-cover">
        <img :src="decodeUrl(list.cover)" width="80" ref="pic"/>
      </div>
      <!--小说信息-->
      <div class="b-text">
        <!--小说标题-->
        <span class="b-title">{{list.title}}</span>
        <!--小说作者-->
        <span class="b-author">{{list.author}}</span>
        <!--小说短述-->
        <span class="b-shortInfo">{{list.shortIntro}}</span>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: ['id'],
    data() {
      return {
        rankingList: [],
        flag: false
      }
    },
    created() {
//      console.log(this.id)
      this.getRankingList(this.id)
    },
    methods: {
      turn(id) {
        this.$router.push({name: 'bookdetail', params: {bookId: id}})
      },
      // 对图片的路径进行解码
      decodeUrl(url) {
        return decodeURIComponent(url).substring(7)
      },
//      获取排行榜内容(通过id)
      getRankingList(id) {
        this.axios.get('/api/ranking/' + id)
          .then(res => {
            // console.log(res)
            if (res.status === 200) {
              res = res.data
              // console.log(res)
              if (res.ok) {
                res = res.ranking
                let books = res.books
                // console.log(books, 'getBooks')
                // 存放获取到的的数据
                this.setRankingList(books)
              }
            }
          })
      },
      // 只截取其中的前三，将它们存放在rankingList里面
      setRankingList (rankingList) {
        this.flag = true
        this.rankingList = rankingList.slice(0, 3)
//        console.log(this.rankingList)
//        console.log(state.rankingList)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .listBox
    width: 100%
    padding: 0 10px
    .list
      display: flex
      margin: 8px 0
      height: 120px
      width: 100%
      .b-cover
        display: inline-block
        flex: 0 0 80px
        width: 80px
        height: 100%
        overflow: hidden
      .b-text
        margin: 8px
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
          margin-bottom: 10px
        .b-shortInfo
          display: inline-block
          height: 20px
          font-size: 16px
          line-height: 20px
          white-space: pre-line
          text-overflow: ellipsis
          overflow: hidden
</style>
