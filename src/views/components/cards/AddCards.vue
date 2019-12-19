<template>
  <section class="">
    <div class="row">
      <div class="col-md-6">
        <h5>Add New Card</h5>
      </div>
    </div>
    <div class="row add-new-card">
      <div class="col-md-4 media-secton">
        <div class="row">
          <img
            id="cardImage"
            class="card-img img-responsive"
            src="../../../assets/img/card.jpg"
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
            <div class="col-md-10">
              <input
                type="text"
                class="form-control"
                placeholder="personal,events,etc.."
                id="tag"
              />
            </div>
            <div class="col-md-2">
              <button
                class="btn btn-block rounded btn-new"
                @click.prevent="handleAddTag"
              >
                <span>Add Tag</span>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-10 " >
              <span class="badge badge-info tag-pills" v-for="(tag,index) in tags" :key="index">{{tag}}</span>
            </div>
          </div>

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
export default {
  name: "AddCards",
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
  methods: {
    handleAddTag() {
      this.tags.push(document.getElementById('tag').value)
      document.getElementById('tag').value = ''
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
        this.resizedataURL(data,200,200);
        this.imagePresent = true;
      }
    },
    resizedataURL(datas, wantedWidth, wantedHeight)
    {
        // We create an image to receive the Data URI
        var img = document.createElement('img');
        let parent = this;
        img.onload = function()
            {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = wantedWidth;
                canvas.height = wantedHeight;

                ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

                var dataURI = canvas.toDataURL('image/jpeg', 1);
                
                // console.log(dataURI)
                parent.image = dataURI;
            };
        img.src = datas;
    },
    handleCardSave() {
      // console.log("adding card");
      // let user = firebase.auth().currentUser;

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
          tags:this.tags
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
          .catch( () => {
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
