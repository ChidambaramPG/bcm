<template>
  <section class="container mx-auto">
    <div class="row" style="margin-top:50px;">
      <div class="col-md-6" style="text-align:right;">
        <img class="mb-4" src="../../assets/img/businessman.png" alt="" />
      </div>
      <div class="col-md-3 mt-5 login-form" style="text-align:center;">
        <form class="form-signin" style="">
          <div class="form-group">
            <span class="h3 mb-3 font-primary-bold" style="font-size:25px;">Business Card Management</span>
          </div>
          <div class="form-group ">
            <label for="inputEmail" class="sr-only font-primary-normal">Email address</label>
            <input
              type="email"
              id="inputEmail"
              class="form-control font-primary-normal"
              placeholder="Email address"
              required="true"
              autofocus=""
              v-model="email"
              style=""
            />
          </div>
          <div class="form-group" style="text-align:center;">
            <label for="inputPassword" class="sr-only">Password</label>
            <input
              type="password"
              id="inputPassword"
              class="form-control font-primary-normal"
              placeholder="Password"
              required=""
              v-model="password"
            />
          </div>
          <div class="form-group">
            <button
              class="btn btn-block color-primary font-primary-normal"
              type="submit"
              
              @click.prevent="loginAdmin"
            >
              <div class="spinner-border" role="status" v-if="loading">
                <span class="sr-only">Loading...</span>
              </div>
              Sign in
            </button>
          </div>

          <!-- <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div> -->
        </form>
      </div>
    </div>

    <div class="alert alert-danger" v-if="errorMessage != ''">
      <p>{{ errorMessage }}</p>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import router from "../../router/index.js";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMessage: ""
    };
  },
  methods: {
    loginAdmin() {
      this.loading = true;
      if (this.email == "" || this.password == "") {
        // alert('email or password is missing')
        this.errorMessage = "email or password is missing";
        this.loading = false;
      } else {
        // console.log('signing in')
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // console.log(resp)
            this.loading = false;
            router.push("/");
          })
          .catch(error => {
            this.loading = false;

            let errorMessage = error.message;
            this.errorMessage = errorMessage;
          });
      }
    }
  }
};
</script>

<style scoped>
/* .container {
  background-color: #f9f9f9;
  padding: 30px;
  margin-top: 30px;
}
.form-signin {
  width: 30%;
  margin: 0 auto;
  text-align: center;
}
input {
  margin-top: 10px;
}

.btn-custom {
  background-color: #f95473;
} */

.login-form{
 
}
</style>
