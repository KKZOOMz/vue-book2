<template>
  <div class="searchWrapper">
    <mu-container>
      <mu-text-field v-model="value" placeholder="搜索" @input="fuzzySearch"></mu-text-field>
      <mu-button color="#2955F3" @click="search">搜索</mu-button>
    </mu-container>
    <div class="fuzzyListWrapper" v-if="flag">
      <div class="fuzzyList" v-for="(item, index) in keywords" :key="index" @click="setKeywords(item)">
        <div>{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        value: '',
        keywords: [],
        fuzzySearchList: [],
        flag: false
      }
    },
    methods: {
      fuzzySearch() {
        this.flag = false
        this.axios.get('/api/book/auto-complete?query=' + this.value)
          .then(res => {
//            console.log(res)
            if (res.status === 200) {
              res = res.data
              console.log(res)
              this.keywords = res.keywords.slice(0, 6)
              this.flag = true
            }
          })
      },
      setKeywords(val) {
        this.value = val
      },
      search() {
        this.$router.push({name: 'searchresult', params: {value: this.value}})
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../public/scss/mixin'
  .searchWrapper
    width: 100%
    height: 100%
    padding: 0 10px
    .container
      margin-top: 10px
      width: 100%
      height: 30px
      .mu-button
        float: right
        vertical-align: bottom
        margin-top: 10px
        height: 90%
        background: #2955F3
        background: linear-gradient(to right, #2955F3 0%, #7db8e7 70%)
        color: white
      .mu-text-field
        height: 100%
        width: 100%
    .fuzzyListWrapper
      width: 100%
      margin-top: 10px
      .fuzzyList
        padding: 0 10px
        width: 100%
        height: 40px
        line-height: 40px
        @include border-1px(rgba(7, 17, 27, 0.4))
</style>
