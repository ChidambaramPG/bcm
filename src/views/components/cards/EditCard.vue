<template>
  <section class="pt-5">
    <div class="row shadow p-2"> 
      <div class="col-md-1" style="text-align:left;color:#161e7a;">
        <a href="#" @click.prevent="handleBackToCards" ><i class="fas fa-arrow-left fa-sm"></i></a>
      </div>
      <div class="col-md-5" style="text-align:left">
        <h5 style="font-weight:600;font-size:12px;color:#161e7a;padding-top:5px;">{{'Edit Card'.toUpperCase()}}</h5>
      </div>
      <div class="col-md-6" style="text-align:right;color:#161e7a;">
        <a href="#" @click.prevent="handleCardSave" ><i class="fas fa-save fa-lg"></i></a>
      </div>
    </div>
    <div class="row shadow p-5">
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
              style="font-size:10px;"
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
      <div class="col-md-7">
        <form action="" style="font-size:10px;">
          <div class="row">
            <div class="col-md-3">
              <md-field>
                <label for="exampleFormControlSelect1">Salutaton</label>
                <md-select style="font-size:10px;" id="salutation" :value="getSelectedCard.salutation">
                  <md-option value="Mr">Mr</md-option>
                  <md-option value="Mrs">Mrs</md-option>
                  <md-option value="Ms">Ms</md-option>
                  <md-option value="Dr">Dr</md-option>
                  <md-option value="Other">Other</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">First Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="John"
                :value="getSelectedCard.cFirstname"
                id="cFirstname"
                style="font-size:10px;"
              /> -->
              <md-field>
                <label>First Name</label>
                <md-input type="text" 
                placeholder="Firstname"
                id="cFirstname"
                :value="getSelectedCard.cFirstname"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Last Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Doe"
                :value="getSelectedCard.cLastname"
                id="cLastname"
                style="font-size:10px;"
              /> -->
              <md-field>
                <label>Last Name</label>
                <md-input type="text"
                placeholder="Lastname"
                :value="getSelectedCard.cLastname"
                id="cLastname"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;" >
              <!-- <label for="exampleFormControlSelect1">Type</label>
              <select class="form-control" id="cType" :value="getSelectedCard.cType" style="font-size:10px;">
                <option value="End Customer">End Customer</option>
                <option value="Reseller">Reseller</option>
                <option value="OEM">OEM</option>
                <option value="Commercal">Commercal</option>
                <option value="Consumer">Consumer</option>
                <option value="Component">Component</option>
              </select> -->
              <md-field>
                <label for="movie">Type</label>
                <md-select style="font-size:10px;" id="cType" :value="getSelectedCard.cType">
                  <md-option value="End Customer">End Customer</md-option>
                  <md-option value="Reseller">Reseller</md-option>
                  <md-option value="OEM">OEM</md-option>
                  <md-option value="Commercal">Commercal</md-option>
                  <md-option value="Consumer">Consumer</md-option>
                  <md-option value="Component">Component</md-option>
                </md-select>
              </md-field>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Organization</label>
              <input
                type="text"
                class="form-control"
                placeholder="Hp, Dell, etc.."
                :value="getSelectedCard.cOrganization"
                id="cOrganization"
                style="font-size:10px;"
              /> -->
              <md-field>
                <label>Organization</label>
                <md-input placeholder="Organization"
                :value="getSelectedCard.cOrganization"
                id="cOrganization"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="exampleFormControlSelect1">Tier</label>
              <select class="form-control" id="cTier" style="font-size:10px;" :value="getSelectedCard.cTier">
                <option value="Sales">Sales</option>
                <option value="Procurement">Procurement</option>
                <option value="IT Department">IT Department</option>
                <option value="Management">Management</option>
                <option value="Category">Category</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select> -->
              <md-field>
                <label for="exampleFormControlSelect1">Tier</label>
                <md-select id="cTier"  :value="getSelectedCard.cTier">
                  <md-option value="Sales">Sales</md-option>
                  <md-option value="Procurement">Procurement</md-option>
                  <md-option value="IT Department">IT Department</md-option>
                  <md-option value="Management">Management</md-option>
                  <md-option value="Category">Category</md-option>
                  <md-option value="Marketing">Marketing</md-option>
                  <md-option value="Other">Other</md-option>
                </md-select>

              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Designation</label>
              <input
                type="text"
                class="form-control"
                style="font-size:10px;"
                placeholder="Manager, Head, Client, etc.."
                :value="getSelectedCard.cDesignation"
                id="cDesignation"
              /> -->
              <md-field>
                <label>Designation</label>
                <md-input  placeholder="Designation"
                :value="getSelectedCard.cDesignation"
                id="cDesignation"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Email</label>
              <input
                type="text"
                class="form-control"
                placeholder="Doe"
                :value="getSelectedCard.cEmail"
                id="cEmail"
                style="font-size:10px;"
              /> -->
               <md-field>
                <label>Email</label>
                <md-input placeholder="Email"
                :value="getSelectedCard.cEmail"
                id="cEmail"></md-input>
              </md-field>
            
            </div>
          </div>

          <div class="row">
            <div class="col-md-4" style="font-size:10px;">
              <!-- <label for="">Phone</label>
              <input
                type="text"
                style="font-size:10px;"
                class="form-control"
                placeholder="+919746747214"
                :value="getSelectedCard.cPhone"
                id="cPhone"
              /> -->
              <md-field>
                <label>Phone</label>
                <md-input  placeholder="Phone"
                :value="getSelectedCard.cPhone"
                id="cPhone"></md-input>
              </md-field>
            </div>
            <div class="col-md-4" style="font-size:10px;">
              <!-- <label for="">Alternate Number</label>
              <input
                type="text"
                style="font-size:10px;"
                class="form-control"
                placeholder="+919746747214"
                :value="getSelectedCard.cAltPhone"
                id="cAltPhone"
              /> -->
               <md-field>
                <label>Alternate Number</label>
                <md-input   placeholder="Alternate Number"
                :value="getSelectedCard.cAltPhone"
                id="cAltPhone"></md-input>
              </md-field>
            </div>
            <div class="col-md-4" style="font-size:10px;">
              <!-- <label for="">Role</label>
              <input
                type="text"
                style="font-size:10px;"
                class="form-control"
                placeholder="Decission Maker"
                :value="getSelectedCard.cRole"
                id="cRole"
              /> -->
              <md-field>
                <label>Role</label>
                <md-input   placeholder="Role"
                :value="getSelectedCard.cRole"
                id="cRole"></md-input>
              </md-field>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Address</label>
              <input
                type="text"
                style="font-size:10px;"
                class="form-control"
                placeholder="Decission Maker"
                :value="getSelectedCard.cAddress"
                id="cAddress"
              /> -->
               <md-field>
                <label>Address</label>
                <md-input  placeholder="Address"
                 :value="getSelectedCard.cAddress"
                id="cAddress"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">City</label>
              <input
                style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                :value="getSelectedCard.cCity"
                id="cCity"
              /> -->
               <md-field>
                <label>City</label>
                <md-input placeholder="City"
                :value="getSelectedCard.cCity"
                id="cCity"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Pincode</label>
              <input
              style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                :value="getSelectedCard.cPincode"
                id="cPincode"
              /> -->
              <md-field>
                <label>Pincode</label>
                <md-input placeholder="Pincode"
                :value="getSelectedCard.cPincode"
                id="cPincode"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Country</label>
              <input
                type="text"
                style="font-size:10px;"
                class="form-control"
                placeholder="Decission Maker"
                :value="getSelectedCard.cCountry"
                id="cCountry"
              /> -->
              <md-field>
                <label>Country</label>
                <md-input placeholder="Country"
                :value="getSelectedCard.cCountry"
                id="cCountry"></md-input>
              </md-field>
            </div>
          </div>

        </form>
      </div>
      <div class="col-md-2">
        <add-tags/>
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

.md-card.md-theme-default {
    background-color: #e1e1e1 !important;

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
