<template>
  <span
    class="file-item"
    :class="{'selected': isSelected}"
    v-on="$listeners"
  >
    <Icon class="icon" name="file" />
    <span class="title">
      {{data.name}}
    </span>
  </span>
</template>

<script>
import Icon from './Icon.vue';
import TreeItemMixin from '../mixins/treeItemMixin.js';

export default {
  name: 'FileItem',
  components: {
    Icon,
  },
  mixins: [TreeItemMixin],
}
</script>

<style scoped>
.file-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: auto;
  user-select: none;
}

.file-item.selected {
  background-color: #cecece;
}

.icon {
  margin-right: 5px;
  display: flex;
  align-items: center;
}
</style>
