<template>
  <div class="folder-item">
    <div
      class="header"
      @click="expanded = !expanded"
    >
      <span class="icon">
        <img v-show="!expanded" src="../assets/icons/folder.svg" />
        <img v-show="expanded" src="../assets/icons/folder-open.svg" />
      </span>

      <span class="title">
        {{data.name}}
      </span>
    </div>

    <template v-if="items.length">
      <div
        v-if="expanded && items.length"
        class="list"
      >
        <component
          v-for="item in items"
          :key="item.name"
          :is="renderComponent(item.type)"
          :data="item"
          :path="nextPath"
          :depth="depth + 1"
          :selectedItems="$attrs.selectedItems"
          @click="clickItemHandler($event, item)" />
      </div>
    </template>
  </div>
</template>

<script>
import FileItem from './FileItem.vue';
import LinkItem from './LinkItem.vue';
import FolderItem from './FolderItem.vue';

export default {
  name: 'FolderItem',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    depth: {
      type: Number,
      default: 0,
    },
    path: {
      type: String,
      default: '/',
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    items() {
      return (this.data?.contents || []).sort((a, b) =>
        (a.type === 'directory' && b.type !== 'directory') ? -1 : 0
      );
    },
    nextPath() {
      return `${this.path}${this.path !== '/' ? '/' : ''}${this.data?.name}`;
    }
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
    clickItemHandler(event, item) {
      if (['file','link'].includes(item?.type)) {
        this.$emit('click', { event, item, fullPath: `${this.nextPath}/${item?.name}`});
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
}

.icon {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.list {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}
</style>