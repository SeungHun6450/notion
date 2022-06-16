<template>
  <div class="app__container">
    <LeftNavigationBar />
    <div class="app__page">
      <RouterView />
    </div>
  </div>
</template>

<script>
import LeftNavigationBar from '~/components/LeftNavigationBar.vue'

export default {
  components: {
    LeftNavigationBar
  }
}
</script>

<style lang="scss" scoped>
.app {
  &__container {
  display: flex;
  height: 100vh;
  box-sizing: border-box;
  }
   &____page {
    flex-grow: 1;
    box-sizing: border-box;
  }
}
</style>
