<template>
  <div style="width:100%">
    <datatable :columns="getColumns" :rows="getAllCards">
      <template slot="tbody-tr" scope="props">
        <td>
          <button class="btn red darken-2 waves-effect waves-light compact-btn"
            @click="() => showEditCard(props.row)">
            <i class="medium material-icons white-text" style="color:#ff5252;">edit</i>
          </button>
        </td>
        
      </template>
    </datatable>
  </div>
</template>

<script>
import store from "../../../store/index.js";
// import firebase from 'firebase';
import DataTable from "vue-materialize-datatable";

export default {
  name: "CardsList",
  data: () => ({
    search: null,
    searched: [],
    selected: [],
    defaultColumns:['cFirstname','cLastname','cDesignation','cOrganization','cEmail','cPhone','Actions'],
    selectedColumns:[],
    allColumns:[],
    columnsUpdated:false,
    selectedCard:[],
    allCards:[]
  }),
  props: ["cards"],
  components:{
    "datatable": DataTable
  },
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
      // console.log(items)
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
    },
    showEditCard(item) {
      store.commit("setCardsSection", "edit");
      store.commit("setSelectedCard", item);
    },
  },
  computed: {
    getAllCards() {
      // console.log(Array.from(store.state.filteredBusinessCards))
      return  Array.from(store.state.filteredBusinessCards)
    },
    getColumns(){
      // console.log('columns:',this.getAllCards.length)
      if(this.getAllCards[0] != undefined){
        let keys = Object.keys(this.getAllCards[0]);
        let temp = []
        keys.slice(2).forEach(item => {

          if(this.defaultColumns.includes(item)){
            temp.push({
              label:this.removeInitialC(item),
              field:item,
              numeric:false,
              html:false
            })
          }
          
        })
        return temp
      }else{
        return []
      }
      
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
  watch:{
    getAllCards(){
      // console.log(this.getAllCards)
      this.allCards = this.getAllCards
    }
  }

};
</script>

<style scoped>

/* .md-field {
    max-width: 300px;
  } */

.md-toolbar.md-table-toolbar{
  background-color:#e9ebee;
  color:white;
}

/* .md-toolbar.md-theme-default.md-transparent .md-title{

color:white;
  } */

/* #columnsInputLabel{
  color:white !important;
} */
/* 
.md-input{
  display:none !important
} */

#columnsInputLabel{
  display:none;
}

.md-menu.md-select {
    display: flex;  
    overflow: auto;
    text-align: right;
}

table, th, td {
  border: none;
}

table {
  width: 100%;
  display: table;
  border-collapse: collapse;
  border-spacing: 0;
}

table.striped tr {
  border-bottom: none;
}

table.striped > tbody > tr:nth-child(odd) {
  background-color: rgba(242, 242, 242, 0.5);
}

table.striped > tbody > tr > td {
  border-radius: 0;
}

table.highlight > tbody > tr {
  -webkit-transition: background-color .25s ease;
  transition: background-color .25s ease;
}

table.highlight > tbody > tr:hover {
  background-color: rgba(242, 242, 242, 0.5);
}

table.centered thead tr th, table.centered tbody tr td {
  text-align: center;
}

tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

td, th {
  padding: 15px 5px;
  display: table-cell;
  text-align: left;
  vertical-align: middle;
  border-radius: 2px;
}

@media only screen and (max-width: 992px) {
  table.responsive-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    display: block;
    position: relative;
    /* sort out borders */
  }
  table.responsive-table td:empty:before {
    content: '\00a0';
  }
  table.responsive-table th,
  table.responsive-table td {
    margin: 0;
    vertical-align: top;
  }
  table.responsive-table th {
    text-align: left;
  }
  table.responsive-table thead {
    display: block;
    float: left;
  }
  table.responsive-table thead tr {
    display: block;
    padding: 0 10px 0 0;
  }
  table.responsive-table thead tr th::before {
    content: "\00a0";
  }
  table.responsive-table tbody {
    display: block;
    width: auto;
    position: relative;
    overflow-x: auto;
    white-space: nowrap;
  }
  table.responsive-table tbody tr {
    display: inline-block;
    vertical-align: top;
  }
  table.responsive-table th {
    display: block;
    text-align: right;
  }
  table.responsive-table td {
    display: block;
    min-height: 1.25em;
    text-align: left;
  }
  table.responsive-table tr {
    border-bottom: none;
    padding: 0 10px;
  }
  table.responsive-table thead {
    border: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
  }
}

</style>
