<template>
  <div>
    <md-table
      style="font-size:10px;width:100%"
      v-model="getAllCards"
      md-sort="cFirstname"
      md-sort-order="asc"
      md-card
      md-fixed-header
      @md-selected="onSelect"
    >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Cards</h1>
        </div>

        <md-field style="width:30%;margin-right:10px;">
          <label for="movies">Columns</label>
          <md-select v-model="defaultColumns" multiple @md-selected="toggleSelectedColumn">
            <md-option
              :key="index"
              v-for="(col, index) in getColumns"
              :name="col"
              :value="col"
              
              >{{ removeInitialC(col) }}</md-option
            >
          </md-select>
        </md-field>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Search"
            v-model="search"
            @input="searchOnTable"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No card found!"
        :md-description="
          `No card found for this '${search}' query. Try a different search term.`
        "
      >
      </md-table-empty-state>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="multiple"
        md-auto-select
        style="font-size:10px;"
      >
        <md-table-cell
          v-for="(column, index) in defaultColumns"
          :key="index"
          :md-label="removeInitialC(column)"
          :md-sort-by="column"
          style="font-size:11px;"
          >{{ item[column] }}</md-table-cell
        >
        <md-table-cell
          md-label="Actions"
          style="font-size:11px;"
          >
          <a href="#" @click="()=>viewCardDetails(item)">view details</a>
        </md-table-cell>

        
        
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import store from "../../../store/index.js";
// import firebase from 'firebase';


export default {
  name: "CardsList",
  data: () => ({
    search: null,
    searched: [],
    selected: [],
    defaultColumns:['cFirstname','cLastname','cType','cOrganization'],
    selectedColumns:[],
    allColumns:[],
    columnsUpdated:false,
    selectedCard:[]
  }),
  props: ["cards"],
  methods: {
    toggleSelectedColumn() {
      // console.log(event)
      setTimeout(function(){ 
        store.commit("searchStringForTable",' ')
      }, 400);
      
    },
    searchOnTable() {
      store.commit("searchStringForTable",this.search)
    },
    onSelect(items) {
      this.selected = items;
      if(this.selected.length > 0) {
        store.commit('setBulkSelectedCardList',{status:true,items:items})
      }else{
        store.commit('setBulkSelectedCardList',{status:false,items:items})
      }

    },
    removeInitialC(str){
      if(str[0]==='c' && str[1] === str[1].toUpperCase()){
        return str.slice(1)
      }else{
        return str;
      }
    },
    viewCardDetails(card){
      // Error(card)
      this.selectedCard = card;
    }
  },
  computed: {
    getAllCards() {
      return  Array.from(store.state.filteredBusinessCards)
    },
    getColumns(){
      return Object.keys(store.state.filteredBusinessCards[0])
    }
  },
 
  created() {
    // firebase.firestore().collection("Cards").where("status","==","active").onSnapshot(resp => {
    //     let cards = [];
    //     resp.forEach(item => {
    //       cards.push({...item.data(),cid:item.id,selected:false})
    //     });

    //     console.log('cards fetched')
    //     store.commit('setBusinessCards',cards)
    //     this.allColumns = Object.keys(this.searched[0]);
    //     this.defaultColumns = this.allColumns.splice(5,5).reverse()
    //     this.searched = cards;

    // })


  },
  beforeCreate() {
    store.dispatch("fetchAllBusinessCards");
  },

};
</script>

<style scoped>
/* .md-field {
    max-width: 300px;
  } */
</style>
