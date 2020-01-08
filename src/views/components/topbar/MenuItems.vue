<template>
  <li class="nav-item">
    <a
      class="nav-link active-section"
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
a{
  font-size:12px;
}

.nav-item a{
    z-index:9999;
    /* background-color:white; */
    color:white !important;
    padding-left: 10px;
}
.active-section.nav-link{
  /* background-color: #f95473; */
  color: white !important;
  font-weight:800;
  text-align: right;
}

@media only screen and (max-width: 768px) {
  .nav-item a{
    z-index:9999;
    color:grey !important;
    padding-left: 10px;
    border-bottom: 1px solid grey;
  }
  .active-section.nav-link{    
    color: grey !important;
    font-weight:800;
    text-align: right;    
    border-bottom: 1px solid grey;
  }
}
</style>
