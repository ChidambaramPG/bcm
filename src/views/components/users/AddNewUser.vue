<template>
  <section class="add-user-section">
    <div class="row">
      <div class="col-md-6">
        <h5>Add New User</h5>
      </div>
    </div>
    <div class="row add-new-user">
      <div class="col-md-4 media-section border-right">
        <div class="row">
          <img
            id="cardImage"
            class="card-img img-responsive"
            src="../../../assets/img/user-img.jpg"
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
        </div>
      </div>
      <div class="col-md-8">
        <form action="">
          <div class="row form-group">
            <div class="col-md-4">
              <label for="">Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Riken Keiki Safety"
                v-model="name"
                required
              />
            </div>
            <div class="col-md-4">
              <label for="">Phone</label>
              <input
                type="text"
                class="form-control"
                placeholder="555-444-3434"
                v-model="phone"
              />
            </div>
            <div class="col-md-4">
              <label for="">Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="ikenkeiki@gmail.com"
                v-model="email"
                required
              />
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-4">
              <label for="exampleFormControlSelect1">User type</label>
              <select class="form-control" id="userType" v-model="type">
                <option>Management</option>
                <option>Backend Data Entry</option>
                <option>Data Collection</option>
              </select>
            </div>
            <div class="col-md-8">
              <label for="">Address</label>
              <input
                type="text"
                class="form-control"
                placeholder="12B Bake Street"
                v-model="address"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <label for="">District</label>
              <input
                type="text"
                class="form-control"
                placeholder="Thrissur"
                v-model="district"
              />
            </div>
            <div class="col-md-4">
              <label for="">State</label>
              <input
                type="text"
                class="form-control"
                placeholder="kerala"
                v-model="state"
              />
            </div>
            <div class="col-md-4">
              <label for="">Country</label>
              <input
                type="text"
                class="form-control"
                placeholder="India"
                v-model="country"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 custom-control custom-checkbox">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="numPass"
                  checked
                  @click="event => handlePasswordCustomizer(event)"
                />
                <label class="custom-control-label" for="numPass"
                  >Use phone number as password</label
                >
              </div>
            </div>
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Custom Password"
                v-model="password"
                v-if="useCustomPass"
              />
              <input
                type="text"
                class="form-control"
                placeholder="Custom Password"
                v-else
                disabled
              />
            </div>
          </div>
          <div class="row button-sec">
            <div class="col-md-3">
              <button
                class="btn btn-block rounded btn-new"
                @click="handleBackToUser"
              >
                <span>Back</span>
              </button>
            </div>
            <div class="col-md-3"></div>
            <div class="col-md-3"></div>
            <div class="col-md-3">
              <button
                class="btn btn-block rounded btn-new"
                @click.prevent="handleAddUser"
              >
                <span>Add User</span>
              </button>
            </div>
          </div>
        </form>
        <div class="alert alert-danger" v-if="errorMessages.length > 0">
          <p v-for="(err, index) in errorMessages" :key="index">{{ err }}</p>
        </div>
        <div class="alert alert-success" v-if="showSucessMessage">
          <p>User has been successfully ceated</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "../../../store/index.js";
import firebase from "firebase";
export default {
  name: "AddNewUser",
  data() {
    return {
      name: null,
      phone: null,
      email: null,
      type: null,
      address: null,
      district: null,
      state: null,
      country: null,
      image: null,
      errorMessages: [],
      password: "",
      useCustomPass: false,
      showSucessMessage: false
    };
  },
  methods: {
    handleBackToUser() {
      store.commit("setUsersSection", "table");
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
    handlePasswordCustomizer(event) {
      // console.log(event);
      if (!event.target.checked) {
        this.useCustomPass = true;
      } else {
        this.useCustomPass = false;
      }
    },
    handleAddUser() {
      let error = [];
      this.errorMessages = []
      if (this.name == null || this.name == "") {
        error.push("name is required");
      }
      if (this.phone == null || this.phone == "") {
        error.push("phone is required");
      }
      if (this.email == null || this.email == "") {
        error.push("email is required");
      }
      if (this.type == null || this.type == "") {
        error.push("type is required");
      }
      if (this.address == null || this.address == "") {
        error.push("address is required");
      }
      if (this.district == null || this.district == "") {
        error.push("district is required");
      }
      if (this.state == null || this.state == "") {
        error.push("state is required");
      }
      if (this.country == null || this.country == "") {
        error.push("country is required");
      }
      if (this.image == null || this.image == "") {
        error.push("image is required");
      }

      if (this.useCustomPass) {
        if (this.password != null || this.password != "") {
          if (this.password.length < 7) {
            error.push("password needs to be of minimum 6 charecters");
          }
        } else {
          error.push("password is required");
        }
      } else {
        this.password = this.phone;
      }

      if (error.length < 1) {
        // console.log("everything is present");
        // console.log(this.email, this.password);

        let userObj = {
          name: this.name,
          phone: this.phone,
          email: this.email,
          type: this.type,
          address: this.address,
          district: this.district,
          state: this.state,
          country: this.country,
          image: this.image,
          password: this.password
          // uid:resp1.user.uid
        };

        let createUserObj = firebase
          .functions()
          .httpsCallable("handleCreateUser");

        createUserObj(userObj).then(result => {

          // console.log("function call ", result.data.status);

          if (result.data.status == "success") {
            // console.log('inside success conditon')
            let createProfile = firebase
              .functions()
              .httpsCallable("handleUserProfileCreation");

            let profileObj = {
              name: this.name,
              phone: this.phone,
              email: this.email,
              type: this.type,
              address: this.address,
              district: this.district,
              state: this.state,
              country: this.country,
              image: this.image,
              uid: result.data.uid
            };

            createProfile(profileObj).then(() => {
              // console.log("profileCreationSuccess");
              this.showSucessMessage = true;
            }).catch(error => {
              this.errorMessages = error;
            })

          } else {
            // console.log(result);
            this.errorMessages.push(result.data.message)
          }
        }).catch(err => {
          // console.log(err)
          this.errorMessages.push(err.errorInfo.message);
        });
      } else {
        this.errorMessages.push(error);
      }
    }
  }
};
</script>

<style scoped>
.add-user-section {
  margin-top: 20px;
}
.btn-new {
  background-color: #f95473;
  color: white;
}
.button-sec {
  margin-top: 50px;
}
.add-new-user {
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
.card-img {
  border-radius: 50%;
  margin-bottom: 20px;
}
form {
  padding-top: 20px;
}
.media-section {
  padding: 20px;
}

.row {
  margin-top: 20px;
}
</style>
