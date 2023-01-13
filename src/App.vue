<template>
  <div>
    <IconConfigProvider size="15">
      <router-view />
    </IconConfigProvider>
  </div>
</template>


<script>
import { IconConfigProvider } from '@v2icons/utils'
export default {
  components: {
    IconConfigProvider
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
