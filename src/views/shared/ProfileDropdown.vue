<template>
  <div
    class="dropdown-menu dropdown-menu-right"
    aria-labelledby="navbarDropdown"
  >
    <a
      class="dropdown-item"
      href="#"
      @click.prevent="() => setContentLayout('profile')"
      ><i class="fas fa-pencil-alt"></i> Profile</a
    >
    <a class="dropdown-item" href="#"
    @click.prevent="() => setContentLayout('settings')"
      ><i
        class="fas fa-cogs"
        
      ></i> 
      Settings</a
    >
    <a class="dropdown-item" href="#"
      @click.prevent="() =>setUserPage()"
      ><i
        class="fa fa-user"
        
      ></i> 
      Users</a
    >
    <a class="dropdown-item" href="#"
      ><i class="fas fa-arrow-down"></i> 
      <input type="file" id="inputCSVFile" @change="() => fileSelection()"/> Import excel</a
    >
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#"
      @click.prevent="handleAdminSignout"><i class="fas fa-sign-out-alt"></i> Signout</a
    >
  </div>
</template>

<script>
import store from "../../store/index.js";
import firebase from "firebase";
import router from '../../router/index.js';
import Papa from 'papaparse'
export default {
  name: "ProfileDropdown",
  methods: {
    setContentLayout: page => {
      store.commit("setActivePage", page);
    },
    handleAdminSignout(){
      firebase.auth().signOut().then(function() {
        router.push('/login')
      }).catch(function(error) {
        alert(error)
      });

    },
    
    setUserPage(){
      // console.log('setting user page')
      store.commit('setActivePage', 'úsers')
    },
    fileSelection(){
      // console.log(event)
      let fileInput = document.getElementById('inputCSVFile')
      let singleFile = fileInput.files[0]
      // console.log(singleFile)

      const filereader = new FileReader();
      // Reading a file as plain text
      filereader.readAsText(singleFile);
      // Call this function to print the contents of the file
      // once the file has been read.
      filereader.onload = function() {
          // console.log(filereader.result);
          // console.log(Papa.parse(filereader.result))
          let cards = Papa.parse(filereader.result).data
          // console.log(cards)
          cards.forEach(card => {

            if(card[0] != ''){
              let name = card[0].split(' ')
              let firstname = '';
              let lastname = '';
              if(name.length > 1){
                firstname = name[0]
                name.shift()
                lastname = name.join()
              }else{
                firstname = card[0]
              }

              // let tags = []


              let cardObj = {
                addedBy: firebase.auth().currentUser.uid,
                addedOn: new Date(),
                converted: "pending",
                tags: [card[5],card[6]],
                cFirstname: firstname,
                cLastname: lastname,
                cOrganization: card[2],
                cDesignation: card[1],
                cEmail: card[4],
                cPhone: card[3],
                status:"active"
              };

              //console.log(cardObj)

              firebase
              .firestore()
              .collection("Cards")
              .add(cardObj)
              .then(() => {
                // console.log(res)             
              })
              .catch(() => {
                // console.log(err)
              });
            }

            
          })
          // let cardObj = {
          //   image: this.image,
          //   addedBy: firebase.auth().currentUser.uid,
          //   addedOn: new Date(),
          //   converted: "pending",
          //   tags: this.getAddedTags,
          //   salutation: this.salutation,
          //   cFirstname: this.cFirstname,
          //   cLastname: this.cLastname,
          //   cType: this.cType,
          //   cOrganization: this.cOrganization,
          //   cTier: this.cTier,
          //   cDesignation: this.cDesignation,
          //   cEmail: this.cEmail,
          //   cPhone: this.cPhone,
          //   cAltPhone: this.cAltPhone,
          //   cRole: this.cRole,
          //   cAddress: this.cAddress,
          //   cCity: this.cCity,
          //   cPincode: this.cPincode,
          //   cCountry: this.cCountry,
          //   status:"active"
          // };
          // console.log(cardObj);
          // firebase
          //   .firestore()
          //   .collection("Cards")
          //   .add(cardObj)
          //   .then(() => {
          //     // console.log(resp);
          //     this.isLoading = false;
          //     store.commit("setCardsSection", "table");
          //   })
          //   .catch(() => {
          //     // console.log(error);
          //     this.isLoading = false;
          //   });

      };
      // Print the error incase there is one
      filereader.onerror = function() {
          alert("Error: ", filereader.error);
      };

    }
  }
};
</script>

<style scoped>

a{
  /* color:white; */
  font-size:12px;
  color:grey;
}

svg{
  margin-right:5px;
}

</style>
