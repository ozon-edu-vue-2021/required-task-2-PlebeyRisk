<template>
  <a
    class="link-item"
    :class="{'selected': isSelected}"
    :href="data.target"
    v-on="$listeners"
  >
    <span class="icon">
      <img src="../assets/icons/link.svg" />
    </span>

    <span class="title">
      {{data.name}}
    </span>
  </a>
</template>

<script>
import TreeItemMixin from '../mixins/treeItemMixin.js';

export default {
  name: 'LinkItem',
  mixins: [TreeItemMixin],
}
</script>

<style scoped>
.link-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  cursor: pointer;
  margin-right: auto;
}

.link-item.selected {
  background-color: #cecece;
}

.icon {
  margin-right: 5px;
  display: flex;
  align-items: center;
}
</style>