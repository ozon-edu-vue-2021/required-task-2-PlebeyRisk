<template>
  <span
    class="file-item"
    :class="{'selected': isSelected}"
    v-on="$listeners"
  >
    <span class="icon">
      <img src="../assets/icons/file.svg" />
    </span>

    <span class="title">
      {{data.name}}
    </span>
  </span>
</template>

<script>
import TreeItemMixin from '../mixins/treeItemMixin.js';

export default {
  name: 'FileItem',
  mixins: [TreeItemMixin],
}
</script>

<style scoped>
.file-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: auto;
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