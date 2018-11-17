<template>
  <div class="rankingsWrapper">
    <div class="leftBtn">
      <div v-for="(item, index) in cate" :key="index">
        <span @click="select(index)" class="menuBtn">{{item}}</span>
      </div>
    </div>
    <div class="rightContent" ref="rightContent">
      <div class="wrapperBox">
        <div v-for="(items, indexs) in cats"
             class="cateBox"
             @click="turn(items.name)"
             :key="indexs">
          <span>{{items.name}}</span>
          <span>{{(items.bookCount / 10000).toFixed(2)}}万册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScorll from 'better-scroll'
  export default {
    created() {
      this.axios.get('/api/cats/lv2/statistics')
        .then(res => {
//          console.log(res)
          if (res.status === 200) {
            res = res.data
            this.category = res
            this.cats = this.category.male
            this.gender = 'male'
//            console.log(this.category)
            this.scroll.refresh()
          }
        })
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScorll(this.$refs.rightContent, {
          click: true
        })
      })
    },
    data() {
      return {
        category: {},
        cate: ['男生', '女生', '出版', '漫画'],
        cats: {},
        gender: ''
      }
    },
    methods: {
      turn(major) {
        this.$router.push({name: 'rankings', params: {gender: this.gender, major: major}})
//        console.log('go')
//        this.$router.push('/rankingdetail')
      },
      select(index) {
        switch (index) {
          case 0:
            this.cats = this.category.male
            this.gender = 'male'
            break
          case 1:
            this.cats = this.category.female
            this.gender = 'female'
            break
          case 2:
            this.cats = this.category.press
            this.gender = 'press'
            break
          case 3:
            this.cats = this.category.picture
            this.gender = 'picture'
            break
        }
        this.scroll.refresh()
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../public/scss/mixin'
  .rankingsWrapper
    display: flex
    width: 100%
    height: 100%
    .leftBtn
      flex: 0 0 80px
      width: 80px
      height: 100%
      text-align: center
      border-right: 1px solid rgba(7, 17, 27, 0.3)
      .menuBtn
        display: block
        padding: 20px 20px
        @include border-1px(rgba(7, 17, 27, 0.3))
    .rightContent
      flex: 1
      height: 100%
      width: 100%
      .wrapperBox
        width: 100%
        height: auto
        padding: 20px 20px
        box-sizing: border-box
        .cateBox
          display: inline-block
          flex: 1 1 110px
          width: 110px
          height: 80px
          /*line-height: 10px*/
          margin-bottom: 30px
          margin-left: 16px
          padding: 10px 0
          text-align: center
          /*padding: 10px*/
          border: 1px solid rgba(7, 17, 27, 0.3)
          & > span
            display: block
            margin-top: 6px
</style>
