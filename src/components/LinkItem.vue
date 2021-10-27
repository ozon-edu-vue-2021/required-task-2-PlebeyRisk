<template>
  <a
    class="link-item"
    :class="{'selected': isSelected}"
    :href="data.target"
    v-on="$listeners"
  >
    <Icon class="icon" name="link" />
    <span class="title">
      {{data.name}}
    </span>
  </a>
</template>

<script>
import Icon from './Icon.vue';
import TreeItemMixin from '../mixins/treeItemMixin.js';

export default {
  name: 'LinkItem',
  components: {
    Icon,
  },
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
  user-select: none;
}

.link-item.selected {
  background-color: #cecece;
}

.icon {
  margin-right: 5px;
}
</style>
