<template>
  <LeftNavigationBar />
  <RouterView />
</template>

<script>
import LeftNavigationBar from '~/components/LeftNavigationBar.vue'

export default {
  components: {
    LeftNavigationBar
  }
}
</script>
