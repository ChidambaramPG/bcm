<template>
  <div class="card-box mt-5">
    <div class="">
      <div class="row table-row">
        <div class="col-md-2">
          <div class="filter-header">
            <h5 class="table-title" style="font-weight:600;font-size:12px;color:#161e7a;">
              {{"Filters".toUpperCase()}}</h5>
            <tags-filter />
          </div>
        </div>
        <div class="col-md-10  pl-4 cards-section">
          <div class="row mb-4 pt-3 pb-3">
            <div class="col-md-10" style="padding-left:0px;">
              <span 
                class="table-title" 
                style="font-weight:600;font-size:12px;color:#161e7a">{{"Contacts".toUpperCase()}}
              </span>
            </div>
            <div class="col-md-2" v-if="selectedView =='list'" style="text-align:right">
              <a href="#" @click.prevent="() => changeView('list')">
                <md-icon class="fas fa-list" style="color:rgb(0, 148, 255)" />
              </a>
              <a href="#" @click.prevent="() => changeView('card')">
                <md-icon class="fas fa-address-card ml-2"  />
              </a>
            </div>
            <div class="col-md-2"  v-if="selectedView=='card'" style="text-align:right">
             
              <a href="#" @click.prevent="() => changeView('list')">
                <md-icon class="fas fa-list" />
              </a>
              <a href="#" @click.prevent="() => changeView('card')">
                <md-icon class="fas fa-address-card ml-2" style="color:rgb(0, 148, 255)"/>
              </a>
             
            </div>
          </div>
          
          <div class="row mb-4" v-if="selectedView=='card'">
            <single-card :data="card" v-for="(card, index) in getAllCards" :key="index"/>
          </div>

          <div class="row mb-4" v-if="selectedView=='list'">
            <cards-list :cards="getAllCards"/>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
import store from "../../../store/index.js";
// import TagSection from "./TagSection.vue";
import TagsFilter from "./TagsFilter.vue";
import SingleCard from "./SingaleCard.vue";
import CardsList from "./CardsList.vue";

export default {
  name: "BusinessCards",
  data(){
    return{
      deleteItemAlert:false,
      selectedView:"list",
      cardsFetched:false
    }
  },
  components: {
    // TagSection,
    TagsFilter,
    SingleCard,
    CardsList,
  },
  methods: {
    // showDeleteItemDiv(){
    //   this.deleteItemAlert = !this.deleteItemAlert;
    // },
    changeView(view){
      this.selectedView = view;
      store.commit('setBulkSelectedCardList',{status:false,items:[]})
    },
    showEditCardsModal() {
      store.commit("toggleEditCardModal");
    },
    showDeleteCardsModal() {
      store.commit("toggleDeleteCardModal");
    },
    showEditCard(index) {
      // console.log(index);
      store.commit("setCardsSection", "edit");
      store.commit("setSelectedCard", this.getAllCards[index]);
    },
    handleSelectedCard(event, cid) {
      // console.log(event);

      let temp = [];
      this.getAllCards.forEach(item => {
        if (item.cid == cid) {
          if (event.target.checked) {
            temp.push({ ...item, selected: true });
          } else {
            temp.push({ ...item, selected: false });
          }
        } else {
          temp.push(item);
        }
      });
      store.commit("setSelectedCardListManually", temp);
    },
    handleAllItemsSelection(event) {
      // console.log(event.target.checked)

      let temp = [];
      this.getAllCards.forEach(item => {
        // item.selected = true;
        // console.log(item.selected);
        if (event.target.checked) {
          temp.push({ ...item, selected: true });
        } else {
          temp.push({ ...item, selected: false });
        }
      });
      store.commit("setSelectedCardListManually", temp);
    }
  },
  computed: {
    getAllCards() {
      return store.state.filteredBusinessCards;
    },
    getSelectedTags() {
      return store.state.getAllTags;
    },
    getCardCategoryList() {
      return store.state.cardCategoryList;
    }
  },
  mounted() {
    if(this.getAllCards.length < 1 && !this.cardsFetched){
      store.dispatch("fetchAllBusinessCards");
      this.cardsFetched = true;
    }
    
  }
};
</script>
<style scoped>

@media (min-width: 768px) { 
  .cards-section{
    border-left:1px 
  }

}

/* .filter-header{
  border-style: solid;
} */
/* .card-image:hover{
  opacity: 0.7;
} */
.card-body{
  padding-bottom:0;
  padding-left:15px;
  padding-right:15px;
}

.card-selector {
  margin-bottom: -30px;
  margin-left: 10px;
}
.card-single {
  margin: 5px;
}
table {
  font-family: Lato;
  border-top: none;
  font-size: 12px;
}

th {
  font-weight: 400;
}
.table-title {
  /* background: rgb(67, 70, 73);
  background: linear-gradient(
    90deg,
    rgba(67, 70, 73, 1) 0%,
    rgba(41, 38, 39, 1) 100%
  ); */
  /* background-color:#0094ff; */
  
  padding: 15px;
  font-size: 14px;
  font-weight: 500;
  /* color: white; */
  
}
.card-box {
  /* padding: 20px; */
  /* border: 2px solid #f3f3f3;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box; */
  /* margin-top: 100px; */
  /* margin-bottom: 20px;
  background-color: #ffffff; */
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
.tag-pill {
  margin-right: 10px;
}
</style>
