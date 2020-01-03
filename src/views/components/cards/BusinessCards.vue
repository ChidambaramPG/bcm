<template>
  <div class="card-box">
    <div class="table-responsive">
      <div class="row table-row">
        <div class="col-md-12">
          <div class="table-header d-inline">
            <h5 class="table-title">Latest additions</h5>
            <tags-filter/>
          </div>

          <!-- <div class="row">
            <div class="col-md-3" v-for="(card, index) in getAllCards" :key="index">
              <img class="card-img" :src="card.image" />
            </div>
          </div> -->
          
          <table class="table table-hover">
            <thead class="table-head">
              <tr>
                <th><div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="select-all-cards"
                      @click="(event) => handleAllItemsSelection(event)"
                    />
                    <label
                      class="custom-control-label"
                      for="select-all-cards"
                    ></label>
                  </div></th>
                <th>Card</th>
                <th>Name</th>
                <th>Type</th>
                <th>Organization</th>
                <th>Tier</th>
                <th>Phone</th>
                <th>Action</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(card, index) in getAllCards" :key="index">
                <td v-if="card.selected == true">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      :id="card.cid"
                      @click="(event)=>handleSelectedCard(event,card.cid)"
                      checked
                    />
                    <label
                      class="custom-control-label"
                      :for="card.cid"
                    ></label>
                  </div>
                </td>
                <td v-else>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      :id="card.cid"
                      @click="(event)=>handleSelectedCard(event,card.cid)"
                    />
                    <label
                      class="custom-control-label"
                      :for="card.cid"
                    ></label>
                  </div>
                </td>
                <td>
                  <img class="card-img img-responsive" :src="card.image" />
                </td>
                <td>
                  <span v-if="card.cFirstname != ''">{{ card.cFirstname }}</span>
                  <span v-else>Not Added</span>
                </td>
                <td>
                  <span v-if="card.cType != ''">{{ card.cType }}</span>
                  <span v-else>Not Added</span>
                </td>
                <td>
                  <span v-if="card.cOrganization != ''">{{ card.cOrganization }}</span>
                  <span v-else>Not Added</span>
                </td>
                <td>
                  <span v-if="card.cTier != ''">{{ card.cTier }}</span>
                  <span v-else>Not Added</span>
                </td>
                <td>
                  <span v-if="card.cPhone != ''">{{ card.cPhone }}</span>
                  <span v-else>Not Added</span>
                </td>
                <td>
                  <a href=""  @click.prevent="() => showEditCard(index)"
                    ><i class="fas fa-edit text-success"></i
                  ></a>
                  <a href="" @click.prevent="() => showDeleteCardModal()"
                    ><i class="fas fa-times text-danger"></i
                  ></a>
                </td>

                <tag-section :data="card.tags" :cardId="card.cid"/>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row pagination-row">
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
    </div>
  </div>
</template>
<script>
import store from "../../../store/index.js";
import TagSection from './TagSection.vue';
import TagsFilter from './TagsFilter.vue';

export default {
  name: "BusinessCards",
  components:{
    TagSection,
    TagsFilter
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
      
      let temp = [];
      this.getAllCards.forEach(item => {  
        if(item.cid == cid){
          if(event.target.checked){
            temp.push({...item,selected:true});
          }else{
            temp.push({...item,selected:false});
          }
        }else{
          temp.push(item)
        }
        
        
      })
      store.commit('setSelectedCardListManually',temp)
    },
    handleAllItemsSelection(event){
      console.log(event.target.checked)

      let temp = [];
      this.getAllCards.forEach(item => {
        // item.selected = true;
        if(event.target.checked){
          temp.push({...item,selected:true});
        }else{
          temp.push({...item,selected:false});
        }
        
      })
      store.commit('setSelectedCardListManually',temp)
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
