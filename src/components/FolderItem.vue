<template>
  <div
    class="folder-item"
    :class="{'selected': isSelected}"
  >
    <div
      class="header"
      @click="headerClickHandler"
    >
      <Icon class="icon" :name="iconName" />
      <span class="title">
        {{data.name}}
      </span>
    </div>

    <template v-if="items.length">
      <div
        v-if="isExpanded && items.length"
        class="list"
      >
        <component
          v-for="item in items"
          :key="item.name"
          :is="renderComponent(item.type)"
          :data="item"
          :path="fullPath"
          :depth="depth + 1"
          :selectedItems="selectedItems"
          :expandedFolders="expandedFolders"
          v-on="listeners"
          @click="itemClickHandler($event, item)" />
      </div>
    </template>
  </div>
</template>

<script>
import FileItem from './FileItem.vue';
import LinkItem from './LinkItem.vue';
import Icon from './Icon.vue';
import FolderItem from './FolderItem.vue';
import TreeItemMixin from '../mixins/treeItemMixin.js';

export default {
  name: 'FolderItem',
  components: {
    Icon,
  },
  mixins: [TreeItemMixin],
  computed: {
    listeners() {
      switch(this.data?.type) {
        case 'directory':
          return {
            expand: (path) => {this.$emit('expand', path)},
            collapse: (path) => {this.$emit('collapse', path)},
          }
        default:
          return {};
      }
    },
    items() {
      return (this.data?.contents || []).sort((a, b) =>
        (a.type === 'directory' && b.type !== 'directory') ? -1 : 0
      );
    },
    iconName() {
      return this.isExpanded ? 'folder-open' : 'folder';
    },
    isExpanded() {
      return this.expandedFolders.includes(this.fullPath + '/');
    },
  },
  methods: {
    renderComponent(type) {
      switch(type) {
        case 'file':
          return FileItem;
        case 'link':
          return LinkItem;
        default:
          return FolderItem;
      }
    },
    headerClickHandler() {
      !this.isExpanded ? this.$emit('expand', this.fullPath + '/') : this.$emit('collapse', this.fullPath + '/');
    },
    itemClickHandler(event, item) {
      if (['file','link'].includes(item?.type)) {
        this.$emit('click', { event, item, fullPath: `${this.fullPath}/${item?.name}`});
      } else {
        this.$emit('click', event);
      }
    }
  }
}
</script>

<style scoped>
.header {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.folder-item.selected > .header {
  background-color: #cecece;
}

.icon {
  margin-right: 5px;
}

.list {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}
</style>
