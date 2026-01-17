export default {
    name: "auth",
    path: "/auth",
    component: () => import("../layouts/Layout.vue"),
    children: [
        {
            name: "login",
            path: "/login",
            component: () => import("../views/Login.vue"),
        },
    ],
}