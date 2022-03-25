import Vue from "vue";
import Router from "vue-router";
import NOtFound from "./views/404.vue";
import "nprogress/nprogress.css";
import nprogress from "nprogress";
//import { compile, component } from "vue/types/umd";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      hideInMenu: true,
      // component: {render:h=>h("router-view")}
      // component: RenderRouterView,
      component: () =>
        import(/* webpackChunkName:"layout" */ "./layout/UserLayout"),
      children: [
        {
          path: "/user",
          redirect: "/user/login",
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName:"user" */ "./views/User/Login "),
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/*  webpackChunkName:"user" */ "./views/User/register"),
        },
      ],
    },
    {
      path: "/",
      component: () =>
        import(/*webpackChunName:"Layout" */ "./layout/BasicLayout"),
      children: [
        {
          path: "/",
          redirect: "/dashboard/analysis",
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "仪表盘" },
          // component:{ render： h => h("router-view")},
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "分析页面" },
              component: () =>
                import(
                  /*webpackChunkName:"dashboard" */ "./views/dashboard/analysis"
                ),
            },
          ],
        },
        {
          path: "/form",
          name: "form",
          meta: { icon: "form", title: "表单 " },
          //component:{ render： h => h("router-view")},

          children: [
            {
              path: "/form/basic-form",
              name: "BasicForm",
              meta: { title: "基础表单" },
              component: () =>
                import(
                  /*webpackChunName： "form"*/ "./views/Forms/BasicForm.vue"
                ),
            },

            {
              path: ".form/step-form",
              name: "stepform",
              meta: { title: "分布表单" },
              hideChildrenMenu: true,
              component: () =>
                import(/*webpackChunkName: */ "./views/Forms/StepForm"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info",
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /*webpackChunkName :"form" */ "./views/Forms/StepForm/Step1.vue"
                    ),
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /*webpackChunkName :"form" */ "./views/Forms/StepForm/Step2.vue"
                    ),
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /*webpackChunkName :"form" */ "./views/Forms/StepForm/Step3.vue"
                    ),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "*",
      name: "404",
      hideInMenu: true,
      component: NOtFound,
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    nprogress.start;
  }
  next;
});

router.afterEach(() => {
  nprogress.done;
});

export default router;
