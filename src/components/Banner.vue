<template>
  <div
    v-bind:style="{'background-image': 'url('+ require('../assets/' + image ) +')',
    'background-size': 'cover',
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'position': 'relative',
    'height': '130px'}"
    class="banner"
  >
    <div class="banner-overlay"></div>
    <div class="banner-text">
      <h1>{{title}}</h1>
      <h2>{{user}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: ["bannerDetail"],
  data() {
    return {
      title: this.bannerDetail.title,
      user: "Rafael",
      image: this.bannerDetail.background
    };
  },
  computed: {}
};
</script>

<style scoped>
.banner-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.banner-text {
  padding: 0 30px;
  position: absolute;
  bottom: 10%;
  color: white;
}

h1 {
  font-weight: 400;
}

h2 {
  font-weight: 350;
}
</style>