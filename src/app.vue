<template>
  <div id="test">{{text}}</div>
</template>

<script>
  export default {
    name: "app",
    data() {
      return {
        text: 'asdasd'
      }
    }
  }
</script>

<style scoped>
  #test {
    color: red
  }
</style>