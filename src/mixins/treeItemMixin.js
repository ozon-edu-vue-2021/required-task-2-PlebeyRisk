export default {
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
    selectedItems: {
      type: Array,
      default: () => ([]),
    },
    expandedFolders: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    fullPath() {
      return `${this.path}${this.path !== '/' ? '/' : ''}${this.data?.name}`;
    },
    isSelected() {
      return this.selectedItems.includes(this.fullPath) || this.selectedItems.includes(this.fullPath + '/');
    },
  },
}