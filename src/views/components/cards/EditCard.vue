<template>
  <section class="">
    <div class="row">
      <div class="col-md-6">
        <h5>Edit Card</h5>
      </div>
    </div>
    <div class="row add-new-card">
      <div class="col-md-4 media-secton">
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
            <div class="col-md-3">
              <label for="exampleFormControlSelect1">Salutaton</label>
              <select class="form-control" id="salutation" :value="getSelectedCard.salutation">
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="col-md-3">
              <label for="">First Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="John"
                :value="getSelectedCard.cFirstname"
                id="cFirstname"
              />
            </div>
            <div class="col-md-3">
              <label for="">Last Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Doe"
                :value="getSelectedCard.cLastname"
                id="cLastname"
              />
            </div>
            <div class="col-md-3">
              <label for="exampleFormControlSelect1">Type</label>
              <select class="form-control" id="cType" :value="getSelectedCard.cType">
                <option value="End Customer">End Customer</option>
                <option value="Reseller">Reseller</option>
                <option value="OEM">OEM</option>
                <option value="Commercal">Commercal</option>
                <option value="Consumer">Consumer</option>
                <option value="Component">Component</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3">
              <label for="">Organization</label>
              <input
                type="text"
                class="form-control"
                placeholder="Hp, Dell, etc.."
                :value="getSelectedCard.cOrganization"
                id="cOrganization"
              />
            </div>
            <div class="col-md-3">
              <label for="exampleFormControlSelect1">Tier</label>
              <select class="form-control" id="cTier" :value="getSelectedCard.cTier">
                <option value="Sales">Sales</option>
                <option value="Procurement">Procurement</option>
                <option value="IT Department">IT Department</option>
                <option value="Management">Management</option>
                <option value="Category">Category</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="col-md-3">
              <label for="">Designation</label>
              <input
                type="text"
                class="form-control"
                placeholder="Manager, Head, Client, etc.."
                :value="getSelectedCard.cDesignation"
                id="cDesignation"
              />
            </div>
            <div class="col-md-3">
              <label for="">Email</label>
              <input
                type="text"
                class="form-control"
                placeholder="Doe"
                :value="getSelectedCard.cEmail"
                id="cEmail"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <label for="">Phone</label>
              <input
                type="text"
                class="form-control"
                placeholder="+919746747214"
                :value="getSelectedCard.cPhone"
                id="cPhone"
              />
            </div>
            <div class="col-md-4">
              <label for="">Alternate Number</label>
              <input
                type="text"
                class="form-control"
                placeholder="+919746747214"
                :value="getSelectedCard.cAltPhone"
                id="cAltPhone"
              />
            </div>
            <div class="col-md-4">
              <label for="">Role</label>
              <input
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                :value="getSelectedCard.cRole"
                id="cRole"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <label for="">Address</label>
              <input
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                :value="getSelectedCard.cAddress"
                id="cAddress"
              />
            </div>
            <div class="col-md-3">
              <label for="">City</label>
              <input
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                :value="getSelectedCard.cCity"
                id="cCity"
              />
            </div>
            <div class="col-md-3">
              <label for="">Pincode</label>
              <input
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                :value="getSelectedCard.cPincode"
                id="cPincode"
              />
            </div>
            <div class="col-md-3">
              <label for="">Country</label>
              <input
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                :value="getSelectedCard.cCountry"
                id="cCountry"
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
                <div class="spinner-border" role="status" v-if="isLoading">
                  <span class="sr-only">Loading...</span>
                </div>
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
import AddTags from './AddTags.vue';
export default {
  name: "EditCards",
  components:{
    AddTags
  },
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
      
      isLoading: false,
      tags: [],
      salutation: null,
      cFirstname: null,
      cLastname: null,
      cType: null,
      cOrganization: null,
      cTier: null,
      cDesignation: null,
      cEmail: null,
      cPhone: null,
      cAltPhone: null,
      cRole: null,
      cAddress: null,
      cCity: null,
      cPincode: null,
      cCountry: null
    };
  },
  computed:{
    getSelectedCard() {
      return store.state.selectedCard;
    },
    getAddedTags(){
      return store.state.selectedCardTags;
    }
  },
  methods: {
    handleAddTag() {
      this.tags.push(document.getElementById("tag").value);
      document.getElementById("tag").value = "";
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
      // console.log("adding card");
      // let user = firebase.auth().currentUser;

      this.image = document.getElementById("cardImage").src;
      this.cFirstname = document.getElementById("cFirstname").value;
      this.cLastname = document.getElementById("cLastname").value;
      this.cOrganization = document.getElementById("cOrganization").value;
      this.cDesignation = document.getElementById("cDesignation").value;
      this.cEmail = document.getElementById("cEmail").value;
      this.cPhone = document.getElementById("cPhone").value;
      this.cAltPhone = document.getElementById("cAltPhone").value;
      this.cRole = document.getElementById("cRole").value;
      this.cAddress = document.getElementById("cAddress").value;
      this.cCity = document.getElementById("cCity").value;
      this.cPincode = document.getElementById("cPincode").value;
      this.cCountry = document.getElementById("cCountry").value;
      this.salutation = document.getElementById("salutation").value;
      this.cType = document.getElementById("cType").value;
      this.cTier = document.getElementById("cTier").value;


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
          tags: this.getAddedTags,
          salutation: this.salutation,
          cFirstname: this.cFirstname,
          cLastname: this.cLastname,
          cType: this.cType,
          cOrganization: this.cOrganization,
          cTier: this.cTier,
          cDesignation: this.cDesignation,
          cEmail: this.cEmail,
          cPhone: this.cPhone,
          cAltPhone: this.cAltPhone,
          cRole: this.cRole,
          cAddress: this.cAddress,
          cCity: this.cCity,
          cPincode: this.cPincode,
          cCountry: this.cCountry,
        };
        // console.log(cardObj);
        firebase
          .firestore()
          .collection("Cards")
          .doc(this.getSelectedCard.cid)
          .update(cardObj)
          .then(() => {
            // console.log(resp);
            this.isLoading = false;
            store.commit("setCardsSection", "table");
          })
          .catch(() => {
            // console.log(error);
            this.isLoading = false;
          });
      }
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
  padding: 20px;
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
/* .media-secton{
    margin-right:5px
} */
.card-img {
  height: 200px;
}
</style>
