import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import OrdersIndex from "../views/Orders/OrdersIndex.vue";
import OrderDetails from "../views/Orders/OrderDetails.vue";
import OrdersCreate from "../views/Orders/OrdersCreate.vue";
import OrderEdit from "../views/Orders/OrderEdit.vue";
import AccountLogin from "../views/Account/Login.vue";
import Register from "../views/Account/Register.vue";
import ManageAccount from "../views/Account/Manage.vue";
import EmailChangeMessage from "../views/Account/EmailChangeMessage.vue";
import PostTypesIndex from "../views/PostTypes/PostTypesIndex.vue";
import PostTypesCreate from "../views/PostTypes/PostTypesCreate.vue";
import PostTypesEdit from "../views/PostTypes/PostTypesEdit.vue";
import PostTypesDetails from "../views/PostTypes/PostTypesDetails.vue";
import BlogPostsIndex from "../views/BlogPosts/BlogPostsIndex.vue";
import BlogPostsCreate from "../views/BlogPosts/BlogPostsCreate.vue";
import BlogPostsDetails from "../views/BlogPosts/BlogPostsDetails.vue";
import BlogPostsEdit from "../views/BlogPosts/BlogPostsEdit.vue";
import MessagingHub from "../views/Messaging/MessagingHub.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: AccountLogin
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/manage",
        name: "Manage account",
        component: ManageAccount
    },
    {
        path: "/emailchanged",
        name: "Email changed",
        component: EmailChangeMessage
    },
    {
        path: "/orders/",
        name: "Orders",
        component: OrdersIndex
    },
    {
        path: "/orders/details/:id?",
        name: "Order details",
        component: OrderDetails,
        props: true
    },
    {
        path: "/orders/create",
        name: "Order create",
        component: OrdersCreate
    },
    {
        path: "/orders/edit/:id?",
        name: "Order edit",
        component: OrderEdit,
        props: true
    },
    {
        path: "/posttypes",
        name: "Post types",
        component: PostTypesIndex
    },
    {
        path: "/posttypes/create",
        name: "Create new post type",
        component: PostTypesCreate
    },
    {
        path: "/posttypes/edit/:id",
        name: "Edit post type",
        component: PostTypesEdit,
        props: true
    },
    {
        path: "/posttypes/details/:id",
        name: "Post type details",
        component: PostTypesDetails,
        props: true
    },
    {
        path: "/blogposts",
        name: "Blogposts",
        component: BlogPostsIndex
    },
    {
        path: "/blogposts/create",
        name: "Create a new blogposts",
        component: BlogPostsCreate
    },
    {
        path: "/blogposts/details/:id",
        name: "Details of blogpost",
        component: BlogPostsDetails,
        props: true
    },
    {
        path: "/blogposts/edit/:id",
        name: "Edit blogpost",
        component: BlogPostsEdit,
        props: true
    },
    {
        path: "/messages",
        name: "Your messages",
        component: MessagingHub
    }
];

const router = new VueRouter({
    routes
});

export default router;
