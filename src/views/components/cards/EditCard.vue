<template>
  <section class="">
      <div class="row">
          <div class="col-md-6">
              <h5>Edit Card</h5>
          </div>
      </div>
    <div class="row add-new-card">
      <div class="col-md-3 media-secton">
        <div class="row">
          <img
            class="card-img img-responsive"
            src="https://www.digitalprinting.co.uk/media/images/products/slides/2/business-cards-1.jpg"
          />
        </div>
      </div>
      <div class="col-md-8">
        <form action="">
          <div class="row">
            <div class="col-md-4">
              <label for="">Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Riken Keiki Safety"
              />
            </div>
            <div class="col-md-4">
              <label for="">Phone</label>
              <input
                type="text"
                class="form-control"
                placeholder="555-444-3434"
              />
            </div>
            <div class="col-md-4">
              <label for="">Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="ikenkeiki@gmail.com"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <label for="">Address</label>
              <input
                type="text"
                class="form-control"
                placeholder="12B Baker Street"
              />
            </div>
            <div class="col-md-6">
              <label for="">Forecast</label>
              <input type="text" class="form-control" placeholder="5M" />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <label for="">Requirements</label>
              <input
                type="text"
                class="form-control"
                placeholder="Safety CDC"
              />
            </div>
            <div class="col-md-6">
              <label for="">Comments</label>
              <input
                type="text"
                class="form-control"
                placeholder="Loem psum Dolor Sit Amet"
              />
            </div>
          </div>

          <div class="row">
            <!-- <label for="">Contact</label> -->
            <div class="col-md-4">
              <label for="">Contact person</label>
              <input
                type="text"
                class="form-control"
                placeholder="Abdul Rahman"
              />
            </div>
            <div class="col-md-4">
              <label for="">Phone</label>
              <input
                type="text"
                class="form-control"
                placeholder="9746747214"
              />
            </div>
            <div class="col-md-4">
              <label for="">Email</label>
              <input
                type="text"
                class="form-control"
                placeholder="adbulrahman@gmail.com"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <button class="btn btn-block rounded btn-new" @click="handleBackToCards">
                <span>Back</span>
              </button>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <button class="btn btn-block rounded btn-new">
                <span>Save Card</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      
    </div>
  </section>
</template>

<script>
import store from '../../../store/index.js';
export default {
  name: "EditCard",
  methods:{
      handleBackToCards(){
          store.commit('setCardsSection','table');
      }
  }
};
</script>

<style scoped>
.btn-add {
  background-color: #f95473;
  color: white;
}
.btn-add:hover {
  color: white;
}
.add-new-card {
  border: 2px solid #f3f3f3;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  /* margin-top: 100px; */
  margin-bottom: 20px;
  background-color: #ffffff;
  padding-bottom:20px;
}
.btn-new {
  background-color: #f95473;
  color: white;
}
.media-buttons {
  margin-top: 20px;
}
.row {
  margin-top: 20px;
}
.media-secton{
    margin-left:20px
}
.card-img {
  height: 200px;
}
</style>
