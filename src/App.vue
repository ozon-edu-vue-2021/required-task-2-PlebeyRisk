<template>
  <div id="app">
    <tree-component :data="data" />
  </div>
</template>

<script>
import TreeComponent from './components/TreeComponent.vue';
import jsonData from '../public/static/node_modules.json';

export default {
  name: 'App',
  components: {
    TreeComponent,
  },
  data() {
    return {
      data: jsonData,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
