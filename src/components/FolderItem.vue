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
            'change:select': (event) => {this.$emit('change:select', event)},
            'needSelect': (direction) => {
              if (direction === 'top') {
                this.$emit('change:select', this.fullPath);
              }
            },
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
    // isNeedSelectLastItem() {
    //   const lastSelectedItem = this.selectedItems.length ? this.selectedItems[this.selectedItems.length - 1] : null;
    //   const parentFolder = lastSelectedItem?.split('/')?.length ? lastSelectedItem.split('/').slice(0,-1).join('/') : null;
    //   return !!(lastSelectedItem && parentFolder && lastSelectedItem[lastSelectedItem.length - 1] === '/' && parentFolder === this.fullPath);
    // }
  },
  watch: {
    selectedItems(val) {
      // if (this.isNeedSelectLastItem) {
      //   this.$emit('change:select', `${this.fullPath}/${this.items[this.items.length - 1]?.name}`);
      //   return;
      // }
      if (val.length && (val[val.length - 1].split('/').slice(0,-1).join('/') === this.fullPath)) {
        window.addEventListener('keydown', this.keyDownHandler);
        return;
      }
      window.removeEventListener('keydown', this.keyDownHandler);
    },
  },
  methods: {
    keyDownHandler(event) {
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
        const isArrowUp = event.key === 'ArrowUp';
        if (!this.selectedItems.length) {
          event.preventDefault();
          this.selectedItems = [`/${this.data.name}/`];
        } else {
          const lastSelectedItemPath = this.selectedItems[this.selectedItems.length - 1];
          const index = this.items.findIndex(item => {
            return `${this.fullPath}/${item.name}` === lastSelectedItemPath;
          });
          const newIndex = isArrowUp ? index - 1 : index + 1;

          if (newIndex > this.items.length - 1) {
            // this.$emit('needSelect', 'bottom');
            return;
          }

          if (newIndex === -1) {
            this.$emit('change:select', this.fullPath);
            return;
          }

          if (newIndex < -1) {
            this.$emit('needSelect', 'top');
            return;
          }

          let newSelectedPath = `${this.fullPath}/${this.items[newIndex]?.name}`;
          // if (this.expandedFolders.includes(newSelectedPath + '/')) {
          //   newSelectedPath += '/';
          // }
          this.$emit('change:select', newSelectedPath);
        }
      }
    },
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
  },
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
