<template>
  <div style="width: 256px">
    <a-menu
      :selected-keys="selectedkeys"
      :open-keys="openkeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu.vue";

export default {
  components: {
    "sub-menu": SubMenu,
  },
  watch: {
    "$route.path": function (val) {
      this.selectedkeys = this.selectedkeysMap[val];
      this.openkeys = this.collapsed ? [] : this.openkeysMap[val];
    },
  },
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  data() {
    this.selectedkeysMap = {};
    this.openkeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      selectedkeys: this.selectedkeysMap[this.$route.path],
      openkeys: this.collapsed ? [] : this.openkeysMap[this.$route.path],
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentkeys = [], selectedkey) {
      const menuData = null;
      routes.forEach((item) => {
        if (item.name && !item.hideInMenu) {
          this.openkeysMap[item.path] = parentkeys;
          this.selectedkeysMap[item.path] = [item.path || selectedkey];

          const newItem = { ...item };
          delete newItem.children;
          if (item.collapsed && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentkeys,
              item.path,
            ]);
          } else {
            newItem.children = this.getMenuData(
              item.children,
              selectedkey ? parentkeys : [...parentkeys, item.path],
              selectedkey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentkeys, item.path])
          );
        }
      });
      return menuData;
    },
  },
};
</script>
