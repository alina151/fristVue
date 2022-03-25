<template>
  <div :class="[`nav-theme0-${navTheme}, ``nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        :trigger="null"
        v-model="collapsed"
        collapsible
        :theme="navTheme"
        v-if="navLayout === 'left'"
        width="256px"
      >
        <div class="logo">ant design vue pro</div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" />
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-fold' : 'menu-unfold'"
          @click="collapsed = !collapsed"
        ></a-icon>
        <Header />
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SiderMenu from "./SiderMenu.vue";
//import SettingDrawer from "../components/SettingDrawer";
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    navTheme() {
      return this.$router.query.navTheme || "dark";
    },
    navLayout() {
      return this.$router.query.navLayout || "left";
    },
  },
  components: {
    Header,
    Footer,
    SiderMenu,
  },
};
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  font-size: 20px;
  overflow: hidder;
}
.nav-theme-dark >>> .logo {
  color: #eeeeee;
}
</style>
>
