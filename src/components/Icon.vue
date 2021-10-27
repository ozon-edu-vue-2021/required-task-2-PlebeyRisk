<template>
  <span class="icon">
    <img
      v-if="name && name.length"
      :src="require(`../assets/icons/${name}.svg`)" />
  </span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String,
  }
}
</script>

<style scoped>
.icon {
  display: flex;
  align-items: center;
}
</style>