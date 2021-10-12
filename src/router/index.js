import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import Confirm from "../pages/user/Confirm";
import Create from "../pages/user/Create";
import List from "../pages/user/List";
import PostList from "../pages/post/PostList";
import store from "../store";

Vue.use(VueRouter);

const routes = [{
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/post/list",
        name: "post-list",
        component: PostList,
    },
    {
        path: "/create",
        name: "create",
        component: Create,
    },
    {
        path: "/list",
        name: "list",
        component: List,
    },
    {
        path: "/confirm",
        name: "confirm",
        component: Confirm,
    },
    {
        path: "/*",
        redirect: "/post/list",
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

/**
 * This is to handle and check authentication for routing.
 */
router.beforeEach((to, from, next) => {
    const loggedIn = store.getters.isLoggedIn;
    if (!loggedIn && to.name != "login" && to.name != "create" && to.name != "list" && to.name != "confirm") {
        return next("/login");
    }
    next();
});

export default router;