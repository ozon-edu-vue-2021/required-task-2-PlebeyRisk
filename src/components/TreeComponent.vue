<template>
  <div class="tree">
    <div class="info">
      {{aboutSelectText}}<br>
      <template v-if="lastSelected">
        Последний выделенный: {{lastSelected}}
      </template>
    </div>
    <folder-item
      :data="data"
      :selectedItems="selectedItems"
      :expandedFolders="expandedFolders"
      @collapse="collapseFolderHandler"
      @expand="expandFolderHandler"
      @click="clickItemHandler" />
  </div>
</template>

<script>
import FolderItem from './FolderItem.vue';
import pluralForm from '../utils/pluralForm';

export default {
  name: 'Tree',
  components: {
    FolderItem,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selectedItems: [],
      expandedFolders: [],
    }
  },
  computed: {
    lastSelected() {
      return this.selectedItems.length
        ? this.selectedItems[this.selectedItems.length - 1]
        : null;
    },
    aboutSelectText() {
      return `${pluralForm(this.selectedItems.length, 'Выделен', 'Выделено', 'Выделено')} ${this.selectedItems.length} ${
        pluralForm(this.selectedItems.length, 'объект', 'объекта', 'объектов')}`;
    },
  },
  methods: {
    keyDownHandler(event) {
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
        if (!this.selectedItems.length) {
          event.preventDefault();
          this.selectedItems = [`/${this.data.name}/`];
        }
      } else if (event.key === 'Enter') {
        const folderPath = this.selectedItems.length ? this.selectedItems[this.selectedItems.length - 1] : null;
        if (folderPath) {
          event.preventDefault();
          if (this.expandedFolders.includes(folderPath)) {
            this.collapseFolderHandler(folderPath);
          } else {
            this.expandFolderHandler(folderPath);
          }
        }
      }
    },
    expandFolderHandler(folderPath) {
      if (this.expandedFolders.includes(folderPath)) return;
      this.expandedFolders = [...this.expandedFolders, folderPath];
    },
    collapseFolderHandler(folderPath) {
      this.expandedFolders = this.expandedFolders.filter((path) => path !== folderPath);
      this.resetSelectedFilesInFolder(folderPath);
      this.collapseExpandedFoldersInFolder(folderPath);
    },
    resetSelectedFilesInFolder(folderPath) {
      this.selectedItems = this.selectedItems.filter((path) => !path.includes(folderPath) || path === folderPath);
    },
    collapseExpandedFoldersInFolder(folderPath) {
      this.expandedFolders = this.expandedFolders.filter((path) => !path.includes(folderPath) || path === folderPath);
    },
    clickItemHandler({fullPath, event} = {}) {
      if (event.ctrlKey || event.metaKey) {
        if (this.selectedItems.includes(fullPath)) {
          this.selectedItems = this.selectedItems.filter((path) => path !== fullPath);
          return;
        }
        this.selectedItems = [...this.selectedItems, fullPath];
      } else {
        if (this.selectedItems.length < 2 && this.selectedItems.includes(fullPath)) {
          this.selectedItems = [];
          return;
        }
        this.selectedItems = [fullPath];
      }

      this.$emit('change', this.selectedItems);
    }
  },
  created() {
    window.addEventListener('keydown', this.keyDownHandler);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keyDownHandler);
  }
}
</script>

<style scoped>
.info {
  margin-bottom: 30px;
  min-height: 44px;
}
</style>
