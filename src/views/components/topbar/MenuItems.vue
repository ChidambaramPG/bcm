<template>
  <li class="nav-item">
    <a
      class="nav-link"
      @click.prevent="() => setContentLayout(name)"
      v-if="activePage == name"
      href="#"
    >
      {{ convertName(name) }}
    </a>
    <a
      class="nav-link"
      @click.prevent="() => setContentLayout(name)"
      v-else
      href="#"
    >
      {{ convertName(name) }}
    </a>
  </li>
</template>
<script>
import store from "../../../store/index.js";
import router from "../../../router/index.js";
export default {
  name: "MenuItems",
  methods: {
    setContentLayout: page => {
      // console.log("setting page", page);
      store.commit("setActivePage", page);
      router.push(page)
    },
    convertName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  },
  props: ["name"],
  computed: {
    activePage() {
      return store.state.activePage;
    }
  }
};
</script>
<style scoped>
.active-section {
  background-color: #f95473;
  color: white;
  text-align: right;
}
.nav-item{
    z-index:9999;
    background-color:white;
    padding-left: 10px;
}
</style>
