<template>
  <div class="card-box">
    <div class="table-responsive">
      <div class="row table-row">
        <div class="col-md-12">
          <div class="table-header d-inline">
            <h5 class="table-title">Latest additions</h5>
            
          </div>

          <!-- <div class="row">
            <div class="col-md-3" v-for="(card, index) in getAllCards" :key="index">
              <img class="card-img" :src="card.image" />
            </div>
          </div> -->
          <div class="row">
              <cards-card v-for="(card, index) in getAllCards" :key="index" :data="card"/>
          </div>
          
        </div>
      </div>
    </div>
    <!-- <div class="row pagination-row">
      <nav aria-label="Page navigation page-nav">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div> -->
  </div>
</template>
<script>
import store from "../../../store/index.js";
import CardsCard from "./CardsCard.vue";
export default {
  name: "CardsList1",
  components:{
    CardsCard
  },
  methods: {
    showEditCardsModal() {
      store.commit("toggleEditCardModal");
    },
    showDeleteCardsModal() {
      store.commit("toggleDeleteCardModal");
    },
    showEditCard(index) {
      store.commit("setCardsSection", "edit");
      store.commit('setSelectedCard',this.getAllCards[index])
    },
    handleSelectedCard(event,cid){
      console.log(event);
      store.commit('setSelectedCardList',cid)
    }

  },
  computed: {
    getAllCards() {
      return store.state.filteredBusinessCards;
    },
    getSelectedTags(){
      return store.state.getAllTags;
    },
    getCardCategoryList(){
      return store.state.cardCategoryList;
    }
  },
  beforeCreate() {
    store.dispatch("fetchAllBusinessCards");
  }
};
</script>
<style scoped>
table {
  border-top: none;
  font-size: 14px;
}

th {
  font-weight: 400;
}
.table-title {
  padding: 10px;
}
.card-box {
  /* padding: 20px; */
  border: 2px solid #f3f3f3;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  /* margin-top: 100px; */
  margin-bottom: 20px;
  background-color: #ffffff;
}
.table-head {
  background-color: #f95473;
  color: white;
}
.pagination-row {
  padding-top: 10px;
}
nav {
  width: 100%;
}

li.page-item > a {
  color: #f95473;
  background-color: white;
}
li.page-item.active > a {
  color: #f95473;
  background-color: #212b5e;
  border-color: transparent;
}
.card-img {
  width: 50px;
}
.tag-pill{
  margin-right:10px;
}
</style>
