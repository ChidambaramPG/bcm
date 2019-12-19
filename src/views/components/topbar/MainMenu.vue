<template>
  <ul class=" navbar-nav" >
      <menu-items name="dashboard"/>
      <menu-items name="cards"/>
      <menu-items name="users"/>
      <menu-items name="categories"/>
      
    </ul>
</template>

<script>
import MenuItems from './MenuItems.vue';
export default {
    name:'MainMenu',
    components:{
        MenuItems
    }
}
</script>

<style>
.navbar-nav{
    z-index: 9999;
    background-color:white;

}
</style>