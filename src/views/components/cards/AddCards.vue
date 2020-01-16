<template>
  <section class="pt-5">
    <div class="row shadow p-2">
      <div class="col-md-1" style="text-align:left;color:#161e7a;">
        <a href="#" @click.prevent="handleBackToCards" ><i class="fas fa-arrow-left fa-sm"></i></a>
      </div>
      <div class="col-md-5" style="text-align:left">
        <h5 style="font-weight:600;font-size:12px;color:#161e7a;padding-top:5px;">{{'Add Card'.toUpperCase()}}</h5>
      </div>
      <div class="col-md-6" style="text-align:right;color:#161e7a;">
        <a href="#" @click.prevent="handleCardSave" ><i class="fas fa-save fa-lg"></i></a>
      </div>
    </div>
    <div class="row shadow p-4">
      <div class="col-md-3 media-secton">
        <div class="row">
          <img
            id="cardImage"
            class="card-img img-responsive"
            src="../../../assets/img/card.jpg"
          />
        </div>

        <div class="row media-buttons">
          <div class="col-md-6">
            <md-field>
              <label>Initial Value</label>
              <md-input 
                type="file"
                accept="image/*"
                id="cardImageSelect"
                style="font-size:10px;"
                @change="() => handleFileSelected()"
              ></md-input>
            </md-field>
            <!-- <input
              type="file"
              accept="image/*"
              id="cardImageSelect"
              style="font-size:10px;"
              @change="() => handleFileSelected()"
            /> -->
          </div>

          <div class="alert alert-danger" v-if="!imagePresent">
            <p>{{ imageError }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <form action="">
          <div class="row">
            <div class="col-md-3">
              <md-field>
                <label for="movie">Salutaton</label>
                <md-select v-model="salutation" name="salutaton" id="movie">
                  <md-option value="fight-club">Fight Club</md-option>
                  <md-option value="Mr">Mr</md-option>
                  <md-option value="Mrs">Mrs</md-option>
                  <md-option value="Ms">Ms</md-option>
                  <md-option value="Dr">Dr</md-option>
                  <md-option value="Other">Other</md-option>
                  
                </md-select>
              </md-field>
              <!-- <label for="exampleFormControlSelect1" style="font-size:10px;">Salutaton</label>
              <select class="form-control" id="userType" v-model="salutation" style="font-size:10px;">
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Other">Other</option>
              </select> -->
            </div>
            <div class="col-md-3">
              <!-- <label for="" style="font-size:10px;">First Name</label>
              <input
                type="text" 
                style="font-size:10px;"
                class="form-control"
                placeholder="John"
                v-model="cFirstname"
              /> -->
              <md-field>
                <label>First Name</label>
                <md-input type="text" 
                placeholder="Firstname"
                v-model="cFirstname"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Last Name</label>
              <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Doe"
                v-model="cLastname"
              /> -->
              <md-field>
                <label>Last Name</label>
                <md-input type="text"
                placeholder="Lastname"
                v-model="cLastname"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" >
              <md-field>
                <label for="movie">Type</label>
                <md-select style="font-size:10px;" v-model="cType">
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
            <div class="col-md-3">
              <!-- <label for="">Organization</label> -->
              <!-- <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Hp, Dell, etc.."
                v-model="cOrganization"
              /> -->
              <md-field>
                <label>Organization</label>
                <md-input placeholder="Organization"
                v-model="cOrganization"></md-input>
              </md-field>
            </div>
            <div class="col-md-3">
              <md-field>
                <label for="exampleFormControlSelect1">Tier</label>
                <md-select id="userType" v-model="cTier">
                  <md-option value="Commercial">Commercial</md-option>
                  <md-option value="Consumer">Consumer</md-option>
                  <md-option value="Component">Component</md-option>
                </md-select>

              </md-field>
              

            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Designation</label>
              <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Manager, Head, Client, etc.."
                v-model="cDesignation"
              /> -->
              <md-field>
                <label>Designation</label>
                <md-input  placeholder="Designation"
                v-model="cDesignation"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Email</label>
              <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Doe"
                v-model="cEmail"
              /> -->
              <md-field>
                <label>Email</label>
                <md-input placeholder="Email"
                v-model="cEmail"></md-input>
              </md-field>
            
            </div>
          </div>

          <div class="row">
            <div class="col-md-4" style="font-size:10px;">
              <!-- <label for="">Phone</label>
              <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="+919746747214"
                v-model="cPhone"
              /> -->

              <md-field>
                <label>Phone</label>
                <md-input  placeholder="Phone"
                v-model="cPhone"></md-input>
              </md-field>
            </div>
            <div class="col-md-4" style="font-size:10px;">
              <!-- <label for="">Alternate Number</label>
              <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="+919746747214"
                v-model="cAltPhone"
              /> -->
               <md-field>
                <label>Alternate Number</label>
                <md-input   placeholder="Alternate Number"
                v-model="cAltPhone"></md-input>
              </md-field>
            </div>
            <div class="col-md-4" style="font-size:10px;">
              <!-- <label for="">Role</label>
              <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                v-model="cRole"
              /> -->
              <md-field>
                <label>Role</label>
                <md-input   placeholder="Role"
                v-model="cRole"></md-input>
              </md-field>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Address</label>
              <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                v-model="cAddress"
              /> -->
              <md-field>
                <label>Address</label>
                <md-input  placeholder="Address"
                v-model="cAddress"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">City</label>
              <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                v-model="cCity"
              /> -->
               <md-field>
                <label>City</label>
                <md-input placeholder="City"
                v-model="cCity"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Pincode</label>
              <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                v-model="cPincode"
              /> -->
              <md-field>
                <label>Pincode</label>
                <md-input placeholder="Pincode"
                v-model="cPincode"></md-input>
              </md-field>
            </div>
            <div class="col-md-3" style="font-size:10px;">
              <!-- <label for="">Country</label>
              <input style="font-size:10px;"
                type="text"
                class="form-control"
                placeholder="Decission Maker"
                v-model="cCountry"
              /> -->
              <md-field>
                <label>Country</label>
                <md-input placeholder="Country"
                v-model="cCountry"></md-input>
              </md-field>
            </div>
          </div>
        </form>
      </div>

      <div class="col-md-2">
        <add-new-tags/> 
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../../store/index.js";
import firebase from "firebase";
import AddNewTags from './AddNewTags.vue';
export default {
  name: "AddCards",
  components:{
    AddNewTags
  },
  data() {
    return {
      // cardImageUrl:require('../../../assets/img/card.jpg'),
      image: "",
      imageError: "",
      imagePresent: true,
      name: '',
      phone: '',
      email: '',
      address: '',
      forecast: '',
      requirements: '',
      comments: '',
      
      isLoading: false,
      tags: [],
      salutation: '',
      cFirstname: '',
      cLastname: '',
      cType: '',
      cOrganization: '',
      cTier: '',
      cDesignation: '',
      cEmail: '',
      cPhone: '',
      cAltPhone: '',
      cRole: '',
      cAddress: '',
      cCity: '',
      cPincode: '',
      cCountry: ''
    };
  },
  methods: {
    handleAddTag() {
      if(document.getElementById("tag").value != ''){
        this.tags.push(document.getElementById("tag").value);
        document.getElementById("tag").value = "";
      }
      
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
        this.resizedataURL(data, 400, 400);
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
          status:"active"
        };
        // console.log(cardObj);
        firebase
          .firestore()
          .collection("Cards")
          .add(cardObj)
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
  },
  computed:{
    getAddedTags(){
      return store.state.selectedCardTags;
    },
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
