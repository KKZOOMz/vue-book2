<template>
  <mu-carousel hide-controls class="banner">
    <mu-carousel-item>
      <img :src="carouselImg1" class="img">
    </mu-carousel-item>
    <mu-carousel-item>
      <img :src="carouselImg2" class="img">
    </mu-carousel-item>
    <mu-carousel-item>
      <img :src="carouselImg3" class="img">
    </mu-carousel-item>
    <mu-carousel-item>
      <img :src="carouselImg4" class="img">
    </mu-carousel-item>
  </mu-carousel>
</template>

<script>
  import carouselImg1 from '../../../../static/img/banner1.jpg'
  import carouselImg2 from '../../../../static/img/banner2.jpg'
  import carouselImg3 from '../../../../static/img/banner3.jpg'
  import carouselImg4 from '../../../../static/img/banner4.jpg'
  export default {
    data() {
      return {
        carouselImg1,
        carouselImg2,
        carouselImg3,
        carouselImg4
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .banner
    width: 100%
    height: 150px
    padding: 15px 0
    .img
      width: 100%
      height: 120px
</style>
