import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/default.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/pages/home.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/about",
          name: "about",
          component: () => import("@/pages/about.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/users",
          name: "users",
          component: () => import("@/pages/users.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/students",
          name: "students",
          component: () => import("@/pages/manager/students/index.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/candidates",
          name: "candidates",
          component: () => import("@/pages/manager/candidates/index.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/lesson",
          name: "lesson",
          component: () => import("@/pages/teacher/lesson/index.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/lesson/:id",
          name: "lesson-module",
          component: () => import("@/pages/teacher/lesson/lesson-module.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/lesson/dars/:id",
          name: "lesson-dars",
          component: () => import("@/pages/teacher/lesson/dars.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/lesson/dars/create/:id",
          name: "lesson-dars-create",
          component: () => import("@/pages/teacher/lesson/create-dars.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/leads",
          name: "leads",
          component: () => import("@/pages/call-center/leads.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/lead-details/:id",
          name: "lead-details",
          component: () => import("@/pages/call-center/lead-detail.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/groups",
          name: "groups",
          component: () => import("@/pages/manager/groups.vue"),
          meta: { requiresAuth: true, roles: ["super", "teacher"] },
        },
        {
          path: "/groups/:id",
          name: "main-group",
          component: () => import("@/pages/manager/group/main-group.vue"),
          meta: { requiresAuth: true, roles: ["super", "teacher"] },
        },

        {
          path: "/tasks",
          name: "tasks",
          component: () => import("@/pages/call-center/tasks.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/send-messages",
          name: "sendMessages",
          component: () => import("@/pages/call-center/send-messages.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/manager",
          name: "manager",
          component: () => import("@/pages/manager/home.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/payment",
          name: "payment",
          component: () => import("@/pages/manager/payment/index.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/payment/student",
          name: "studentDetail",
          component: () => import("@/pages/manager/payment/payUserDetail.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/salary-report",
          name: "salaryReport",
          component: () => import("@/pages/bugalter/salary_report.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/last-lesson",
          name: "last-lesson",
          component: () => import("@/pages/manager/check-lesson/index.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
        {
          path: "/last-lesson/:id",
          name: "last-lesson-id",
          component: () => import("@/pages/manager/check-lesson/by.vue"),
          meta: { requiresAuth: true, roles: ["super"] },
        },
      ],
    },
    // {
    //   path: '/manager',
    //   component: () => import('@/layouts/default.vue'),
    //   meta: { requiresAuth: true },
    //   children:[
    //     {
    //       path: '/',
    //       name: 'manager',
    //       component: () => import('@/pages/manager/home.vue')
    //     },
    //   ]
    // },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/auth/login.vue"),
    },
    {
      path: "/403",
      name: "NotAuthorized",
      component: () => import("@/pages/403.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const userRole = userStore.user.role;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (userStore.tokens.accessToken) {
      if (to.meta.roles && to.meta.roles.includes(userRole)) {
        next();
        return;
      } else {
        next({ name: "NotAuthorized" });
        return;
      }
    }
    next("/login");
    return;
  }
  next();
});

export default router;
