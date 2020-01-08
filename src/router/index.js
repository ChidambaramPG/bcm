import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/pages/Login.vue";
import Dashboard from "../views/pages/Dashboard.vue"
import Brochure from "../views/pages/Brochures.vue";
import Cards from "../views/pages/Cards.vue";
import Users from "../views/pages/Users.vue";
import Categories from "../views/pages/Categories.vue";
import Profile from '../views/pages/Profile.vue';
import Settings from '../views/pages/Settings.vue';
import Groups from "../views/pages/Groups.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "cards",
    component: Cards,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: false
    }
  },
  {
    path:"/brochure",
    name:'brochure ',
    component:Brochure ,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:"/cards",
    name:'cards',
    component:Cards,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:"/users",
    name:'users',
    component:Users,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:"/categories",
    name:'categories',
    component:Categories,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:"/profile",
    name:'profile',
    component:Profile,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:"/settings",
    name:'settings',
    component:Settings,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:"/lists",
    name:'lists',
    component:Groups,
    meta:{
      requiresAuth:true
    }
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

let isAuthenticated = () => {
  let user = firebase.auth().currentUser;
  // console.log(user.email);
  if (user == null) {
    return false;
  } else {
    return true;
  }
};

router.beforeEach(async (to, from, next) => {
  // console.log(isAuthenticated())
  const isAuth = await isAuthenticated();
  const isAuthReq = to.matched.some(record => record.meta.requiresAuth);

  if (!isAuth && isAuthReq) {
    next('/login')
  } else {
    next();
  }
});

export default router;
