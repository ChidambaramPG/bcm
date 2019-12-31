<template>
  <div id="">
    <top-bar />
    <div class="container">
      <!-- <cards-header /> -->
      <business-cards class="brochures-table" v-if="cardsSection == 'table'" />
      <add-cards v-if="cardsSection == 'add'"/>
      <edit-card v-if="cardsSection == 'edit'" />
      <floating-add-button/>
    </div>
  </div>
</template>

<script>
import TopBar from "../shared/TopBar.vue";
import BusinessCards from "../components/cards/BusinessCards.vue";
// import CardsHeader from "../components/cards/CardsHeader.vue";
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
    FloatingAddButton
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
</style>
