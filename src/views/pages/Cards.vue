<template>
  <div id="">
    <top-bar />
    <div class="container" style="margin-top:100px;">
      <!-- <cards-header /> -->
      <!-- <img :src="require('../../assets/img/background.jpg')" /> -->
      <business-cards class="brochures-table" v-if="cardsSection == 'table'" />
      <!-- <cards-list1 class="brochures-table" v-if="cardsSection == 'table'" /> -->
      <add-cards v-if="cardsSection == 'add'"/>
      <edit-card v-if="cardsSection == 'edit'" />
      <floating-add-button style="z-index:99999"/>
    </div>
  </div>
</template>

<script>
import TopBar from "../shared/TopBar.vue";
import BusinessCards from "../components/cards/BusinessCards.vue";
import AddCards from '../components/cards/AddCards.vue';
import EditCard from '../components/cards/EditCard.vue';
import FloatingAddButton from '../components/cards/FloatingAddButton.vue';
import store from '../../store/index.js';

export default {
  name: "Cards",
  components: {
    TopBar,
    // CardsHeader,
    BusinessCards,
    AddCards,
    EditCard,
    FloatingAddButton,
    // CardsList1
  },
  computed:{
    cardsSection(){
      return store.state.cardsSecton;
    }
  }
};
</script>
<style scoped>
.brochures-table {
  margin-top: 20px;
}
.container{
  /* background-color:red; */
 
}
</style>
