{{<template>
  <section>
    

    <div class="row">
      <div class="col-md-8">
        <div class="form-group mg-b-10">
          <h5 for="">Select Category Items</h5>
          
        </div>
        <form action="">
          <table class="table table-hover">
            <thead class="table-head">
              <tr>
                <th>Select</th>
                <th>Card</th>
                <th>Company Name</th>
                <th>Phone No</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(card,index) in getAllCards" :key="index">
                <td>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      :id="card.cid"
                      @click="(event) =>handleCardSelection(event,index)"
                    />
                    <label
                      class="custom-control-label"
                      :for="card.cid"
                    ></label>
                  </div>
                </td>
                <td>
                  <img
                    class="card-img img-responsive"
                    :src="card.image"
                  />
                </td>
                <td>
                  {{card.name}}
                </td>

                <td>{{card.phone}}</td>

                <td>
                  <p v-for="(tag,ind) in card.tags" :key="ind">
                    <span class="badge badge-info">{{tag}}</span>
                  </p>
                </td>
              </tr>
              
            </tbody>
          </table>
          
        </form>
      </div>
      <div class="col-md-4">
        <div class="form-group mg-b-10">
          <h5 for="">New Category</h5>
          <input
            type="text"
            class="form-control"
            placeholder="Category Name"
          />
        </div>

        <table class="table table-hover">
          <thead class="table-head">
            <tr>
              <th>Card</th>
              <th>Company Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(card,index) in cardsSelected" :key="index">
              <td>
                <img
                  class="card-img img-responsive"
                  :src="card.image"
                />
              </td>
              <td>
                {{card.name}}
              </td>
            </tr>
            
          </tbody>
        </table>
        <div class="row">
            <div class="col-md-6">
              <button
                class="btn btn-block rounded btn-new"
                @click.prevent="handleBackToCategory"
              >
                <span>Back</span>
              </button>
            </div>
            <div class="col-md-6">
              <button class="btn btn-block rounded btn-new">
                <span>Save Category</span>
              </button>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../../store/index.js";
export default {
  name: "AddNewCategory",
  data(){
    return{
      cardsFetched:false,
      cardsSelected:[]
    }
  },
  methods: {
    handleBackToCategory() {
      store.commit("setCategorySection", "table");
    },
    handleCardSelection(event,id){
      console.log(event,id)
      if(event.target.checked){
        this.cardsSelected.push(this.getAllCards[id])
      }
      
    }
  },
  computed: {
    getAllCards(){
      return store.state.businessCards;
    }
  },
  created(){
    if(this.getAllCards.length<1 && !this.cardsFetched){
      store.dispatch('fetchAllBusinessCards');
      this.cardsFetched = true;
    }
  }

};
</script>

<style scoped>
input.form-control {
  font-size: 14px;
}
.card-img {
  width: 100px;
}

tbody {
  height: 250px;
}

section {
  font-size: 14px;
}
</style>
}}