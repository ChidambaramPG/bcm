<template>
  <section class="container mx-auto">
    <form class="form-signin">
      <img
        class="mb-4"
        src="../../assets/img/id-card.png"
        alt=""
        width="120"
        height="120"
      />
      <h1 class="h3 mb-3 font-weight-normal">Business Card Management</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required=true
        autofocus=""
        v-model="email"
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required=""
        v-model="password"
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-custom btn-block" type="submit" @click.prevent="loginAdmin">
        <div class="spinner-border" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">© 2019-2020</p>
    </form>
    <div class="alert alert-danger" v-if="errorMessage!=''">
      <p>{{errorMessage}}</p>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase';
import router from '../../router/index.js';
export default {
    name:'Login',
    data(){
      return {
        email:'',
        password:'',
        loading:false,
        errorMessage:''
      }
    },
    methods:{
      loginAdmin(){
        this.loading = true;
        if(this.email == '' || this.password == ''){
          // alert('email or password is missing')
          this.errorMessage = 'email or password is missing';
        this.loading = false;

        }else{
          // console.log('signing in')
          firebase.auth().signInWithEmailAndPassword(this.email,this.password)
          .then(() => {
            // console.log(resp)
            this.loading = false;
            router.push('/')
          })
          .catch( error => {
            this.loading = false;

            let errorMessage = error.message;
            this.errorMessage = errorMessage;            

          })
        }
      }
    }
};
</script>

<style scoped>
.container{
    background-color: #f9f9f9;
    padding:30px;
    margin-top:30px;
}
.form-signin{
    width:30% ;
    margin: 0 auto; 
    text-align:center;
}
input{
    margin-top:10px;
}

.btn-custom{
  background-color:#f95473;
}
</style>
