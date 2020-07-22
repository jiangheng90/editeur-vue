<template>
  <div id="app">
    <div class="c">
      <editeur width="600px" height="400px"></editeur>
    </div>
  </div>
</template>

<script>
import editeur from './components/editeur'
export default {
  name: 'app',
  components: {
    editeur
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.c {
  margin: 100px 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
