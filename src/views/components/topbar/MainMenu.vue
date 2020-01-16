<template>
  <ul class=" navbar-nav">
    <!-- <menu-items name="dashboard" /> -->
    <menu-items name="cards" />
    <!-- <menu-items name="users" /> -->
    <menu-items name="lists" />
    <!-- <menu-items name="category" /> -->
  </ul>
</template>

<script>
import MenuItems from "./MenuItems.vue";
export default {
  name: "MainMenu",
  components: {
    MenuItems
  }
};
</script>

<style>
.navbar-nav {
  z-index: 9999 !important;
  /* background-color:white; */
  color: white;
}

@media only screen and (max-width: 768px) {
  .navbar-nav {
    z-index: 9999 !important;
    background-color:white;
    color: rgba(128, 128, 128, 0.247);
    padding-left:10px;
    padding-right:10px;
  }

}
</style>
