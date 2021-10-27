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
    data: Object,
  },
  data() {
    return {
      selectedItems: [],
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
    clickItemHandler({fullPath, event} = {}) {
      if (event.ctrlKey || event.metaKey) {
        if (this.selectedItems.includes(fullPath)) {
          this.selectedItems = [...this.selectedItems.filter((path) => path !== fullPath)];
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
  }
}
</script>

<style scoped>
.info {
  margin-bottom: 30px;
  min-height: 44px;
}
</style>