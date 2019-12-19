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
            id="cardImage"
            class="card-img img-responsive"
            :src="getSelectedCard.image"
          />
        </div>
        <div class="row media-buttons">
          <div class="col-md-6">
            <input
              type="file"
              accept="image/*"
              id="cardImageSelect"
              @change="() => handleFileSelected()"
            />
          </div>

          <div class="alert alert-danger" v-if="!imagePresent">
            <p>{{ imageError }}</p>
          </div>
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
                :value="getSelectedCard.name"
                id="name"
              />
            </div>
            <div class="col-md-4">
              <label for="">Phone</label>
              <input
                type="text"
                class="form-control"
                placeholder="555-444-3434"
                :value="getSelectedCard.phone"
                id="phone"
              />
            </div>
            <div class="col-md-4">
              <label for="">Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="ikenkeiki@gmail.com"
                :value="getSelectedCard.email"
                id="email"
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
                :value="getSelectedCard.address"
                id="address"
              />
            </div>
            <div class="col-md-6">
              <label for="">Forecast</label>
              <input
                type="text"
                class="form-control"
                placeholder="5M"
                :value="getSelectedCard.forecast"
                id="forecast"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <label for="">Requirements</label>
              <input
                type="text"
                class="form-control"
                placeholder="Safety CDC"
                :value="getSelectedCard.requirements"
                id="requirements"
              />
            </div>
            <div class="col-md-6">
              <label for="">Comments</label>
              <input
                type="text"
                class="form-control"
                placeholder="Loem psum Dolor Sit Amet"
                :value="getSelectedCard.comments"
                id="comments"
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
                :value="getSelectedCard.cName"
                id="cName"
              />
            </div>
            <div class="col-md-4">
              <label for="">Phone</label>
              <input
                type="text"
                class="form-control"
                placeholder="9746747214"
                :value="getSelectedCard.cPhone"
                id="cPhone"
              />
            </div>
            <div class="col-md-4">
              <label for="">Email</label>
              <input
                type="text"
                class="form-control"
                placeholder="adbulrahman@gmail.com"
                :value="getSelectedCard.cEmail"
                id="cEmail"
              />
            </div>
          </div>

          <add-tags/>

          <div class="row">
            <div class="col-md-4">
              <button
                class="btn btn-block rounded btn-new"
                @click="handleBackToCards"
              >
                <span>Back</span>
              </button>
            </div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <button
                class="btn btn-block rounded btn-new"
                @click.prevent="handleCardSave"
              >
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
import store from "../../../store/index.js";
import firebase from "firebase";
import AddTags from '../cards/AddTags.vue';
export default {
  name: "EditCard",
  data() {
    return {
      // cardImageUrl:require('../../../assets/img/card.jpg'),
      image: "",
      imageError: "",
      imagePresent: true,
      name: null,
      phone: null,
      email: null,
      address: null,
      forecast: null,
      requirements: null,
      comments: null,
      cName: null,
      cPhone: null,
      cEmail: null,
      isLoading: false,
      tags:[]
    };
  },
  components:{
    AddTags
  },
  methods: {
    
    handleAddTag() {
      // this.tags.push()
      // document.getElementById('tag').value = ''
      let tag = document.getElementById('tag').value;
      store.commit('addTagsToCard',tag)
      
    },
    handleBackToCards() {
      store.commit("setCardsSection", "table");
    },
    handleFileSelected() {
      let inpt = document.getElementById("cardImageSelect");
      var imgFileReader = new FileReader();
      imgFileReader.readAsDataURL(inpt.files[0]);
      let parent = this;
      imgFileReader.onload = function(oFREvent) {
        document.getElementById("cardImage").src = oFREvent.target.result;
        parent.setImageData(oFREvent.target.result);
      };
    },
    setImageData(data) {
      if (data != "") {
        this.resizedataURL(data, 200, 200);
        this.imagePresent = true;
      }
    },
    resizedataURL(datas, wantedWidth, wantedHeight) {
      // We create an image to receive the Data URI
      var img = document.createElement("img");
      let parent = this;
      img.onload = function() {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = wantedWidth;
        canvas.height = wantedHeight;

        ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

        var dataURI = canvas.toDataURL("image/jpeg", 1);

        // console.log(dataURI)
        parent.image = dataURI;
      };
      img.src = datas;
    },
    handleCardSave() {

      this.image = document.getElementById("cardImage").src;
      this.name = document.getElementById("name").value;
      this.phone = document.getElementById("phone").value;
      this.email = document.getElementById("email").value;
      this.address = document.getElementById("address").value;
      this.forecast = document.getElementById("forecast").value;
      this.requirements = document.getElementById("requirements").value;
      this.comments = document.getElementById("comments").value;
      this.cName = document.getElementById("cName").value;
      this.cPhone = document.getElementById("cPhone").value;
      this.cEmail = document.getElementById("cEmail").value;

      console.log(
        "name " + this.name,
        "phone " + this.phone,
        "email " + this.email,
        "address " + this.address,
        "forecast: " + this.forecast,
        "requirements: " + this.requirements,
        "comments: " + this.comments,
        "cName: " + this.cName,
        "cPhone: " + this.cPhone,
        'cEmail'+this.cEmail
      );

      if (this.image == "") {
        this.imagePresent = false;
        this.imageError = "Image is requied";
      } else {
        this.isLoading = true;
        let cardObj = {
          image: this.image,
          addedBy: firebase.auth().currentUser.uid,
          addedOn: new Date(),
          converted: "pending",
          name: this.name,
          phone: this.phone,
          email: this.email,
          address: this.address,
          forecast: this.forecast,
          requirements: this.requirements,
          comments: this.comments,
          cName: this.cName,
          cPhone: this.cPhone,
          cEmail: this.cEmail,
          tags:this.getAddedTags,
        };
        firebase
          .firestore()
          .collection("Cards")
          .doc(this.getSelectedCard.cid)
          .update(cardObj)
          .then(() => {
            this.isLoading = false;
            store.commit("setCardsSection", "table");
          })
          .catch(() => {
            this.isLoading = false;
          });
      }
    }
  },
  computed: {
    getSelectedCard() {
      return store.state.selectedCard;
    },
    getAddedTags(){
      return store.state.selectedCardTags;
    }
  },
  updated(){
    console.log('updated')
  }
};
</script>

<style scoped>
.tag-pills{
  margin-right:10px;
}
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
  padding-bottom: 20px;
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
.media-secton {
  margin-left: 20px;
}
.card-img {
  height: 200px;
}
</style>
