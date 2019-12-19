<template>
  <div class="card-box">
    <div class="table-responsive">
      <div class="row table-row">
        <div class="col-md-12">
          <h5 class="table-title">Latest additions</h5>
          <table class="table table-hover">
            <thead class="table-head">
              <tr>
                <th>Card</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>Contact Person</th>
                <th>Phone No</th>
                <th>Added By</th>
                <th>Action</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(card, index) in getAllCards" :key="index">
                <td>
                  <img class="card-img img-responsive" :src="card.image" />
                </td>
                <td>
                  <span v-if="card.name != null">{{ card.name }}</span>
                  <span v-else>Not Added</span>
                </td>
                <td>
                  <span v-if="card.address != null">{{ card.address }}</span>
                  <span v-else>Not Added</span>
                </td>
                <td>
                  <span v-if="card.cName != null">{{ card.cName }}</span>
                  <span v-else>Not Added</span>
                </td>
                <td>
                  <span v-if="card.cPhone != null">{{ card.cPhone }}</span>
                  <span v-else>Not Added</span>
                </td>
                <td>Administrator</td>
                <td>
                  <a href=""  @click.prevent="() => showEditCard(index)"
                    ><i class="fas fa-edit text-success"></i
                  ></a>
                  <a href="" @click.prevent="() => showDeleteCardModal()"
                    ><i class="fas fa-times text-danger"></i
                  ></a>
                </td>
                <td v-if="card.tags == null">
                  <span class="badge badge-warning">No Tag Added</span>                  
                </td>
                <td v-else>
                  <span class="badge badge-info tag-pill" v-for="(tag,ind) in card.tags" :key="ind">{{tag}}</span>
                </td>
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
export default {
  name: "BusinessCards",
  methods: {
    showEditCardsModal() {
      
      store.commit("toggleEditCardModal");
    },
    showDeleteCardsModal() {
      store.commit("toggleDeleteCardModal");
    },
    showEditCard(index) {
      console.log(event)
      console.log(index)
      console.log(this.getAllCards[index])
      store.commit("setCardsSection", "edit");
      store.commit('setSelectedCard',this.getAllCards[index])
    }
  },
  computed: {
    getAllCards() {
      return store.state.businessCards;
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
  width: 200px;
}
.tag-pill{
  margin-right:10px;
}
</style>
