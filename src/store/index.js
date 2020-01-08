import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    brochureCount:150,
    businessCardsCount:100,
    categoriesCount:40,
    usersCount:20,
    brochures:[],
    businessCards:[],
    filteredBusinessCards:[],
    categories:[],
    allUsers:[],
    categoriesList:[],
    allTags:[],
    cardCategoryList:[],

    sidebarVisible:false,

    // page views
    activePage:'cards',
    categorySubTag:'all',
    cardsSecton:'table',
    usersSection:'table',
    categorySection:'table',

    // modal views
    newBrochureModalVisible:false,
    editBrochureModalVisible:false,
    deleteBrochureModalVisible:false,
    newCardsModalVisible:false,
    editCardsModalVisible:false,
    deleteCardsModalVisible:false,
    newCategoryModalVisible:false,
    
    // pagnation
    cardsListPage:1,

    // selected items
    selectedCard:[],
    selectedCardTags:[],
    selectedCategory:[],
    isItemSelected:false,
    selectedcardGroupItems:[],
    selectedGroupId:""
    


  },
  mutations: {
    setActivePage: (state,payload) => {
      state.activePage = payload;
    },
    toggleNewBrochureModal: state=>{
      state.newBrochureModalVisible = !state.newBrochureModalVisible;
    },
    toggleNewCardModal: state => {
      state.newCardsModalVisible = !state.newCardsModalVisible;
    },
    toggleEditBrochureModal: state => {
      state.editBrochureModalVisible = !state.editBrochureModalVisible;
    },
    toggleDeleteBrochureModal: state => {
      state.deleteBrochureModalVisible = !state.deleteBrochureModalVisible;
    },
    toggleEditCardModal: state => {
      state.editCardsModalVisible = !state.editCardsModalVisible;
    },
    toggleDeleteCardModal: state => {
      state.deleteCardsModalVisible = !state.deleteCardsModalVisible;
    },
    toggleNewCategoryModal: state => {
      state.newCategoryModalVisible = !state.newCategoryModalVisible;
    },
    toggleNewCardSection: state => {
      state.cardsSecton = 'add'
    },
    toggleEditCard: state => {
      state.cardsSecton = 'edit'
    },
    setCardsSection: (state,payload) => {
      state.cardsSecton = payload;
    },
    setUsersSection:(state,payload) => {
      state.usersSection = payload;
    },
    setCategorySection: (state,payload) => {
      state.categorySection = payload;
    },
    setBusinessCards:(state,payload) => {
      state.filteredBusinessCards = payload;
      state.businessCards = payload;
    },
    setSelectedCard:(state,payload)=> {
      state.selectedCard = payload;
      state.selectedCardTags = [];
      state.selectedCardTags = payload.tags;  
    },
    addTagsToCard: (state,payload) => {
      state.selectedCardTags.push(payload);
    },
    setCategoriesList:(state,payload) => {
      state.categoriesList = payload;
    },
    setSelectedCategory: (state,payload) => {
      state.selectedCategory = state.categoriesList[payload];
      state.categorySubTag = state.selectedCategory.name; 
    },
    setTagsList: (state,payload) => {
      state.allTags = [];
      state.allTags = payload;
      console.log("tags:",state.allTags)
    },
    setSelectedTags: (state,payload) => {
      state.allTags.forEach(item => {
        if(item.gid == payload){
          if(item.selected == false){
            item.selected = true;
          }else{
            item.selected = false;
          }
        }
      })
      let selectedItems = [];
      state.businessCards.forEach((item) => {
        // console.log(tags)
        let tagPresent = true;
        state.allTags.forEach(({gid,selected}) => {
          if(selected == true){
            if(!item.tags.includes(gid)){
              tagPresent = false;
            }
          }          
        })
        if(tagPresent){
          selectedItems.push(item)
        }
      })
      // console.log(new Set(selectedItems));
      state.filteredBusinessCards = new Set(selectedItems);
    },
    setSelectedCardList: (state,payload) => {
      let temp = state.filteredBusinessCards;

      state.businessCards.forEach(item => {
        if(item.cid == payload){
          if(item.selected == false){
            item.selected = true;
            temp.push(item); 
          }else{
            item.selected = false;
            temp.pop()
          }
        }     
      })
      state.filteredBusinessCards = temp;
    },
    setSelectedCardListManually: (state,payload) => {
      // console.log("inside setSelectedCardListManually")

      let temp = [];
      state.isItemSelected = false
      state.filteredBusinessCards.forEach(item => {
        // console.log(item.selected)
        if(item.cid == payload.cid){
          if(item.selected == true){
            item.selected = false;
          }else{
            state.isItemSelected = true;
            item.selected = true;
          }
        }
        temp.push(item)
      })
      // console.log("isItemSelected",state.isItemSelected)
      state.filteredBusinessCards = [];
      state.filteredBusinessCards = temp;
    },
    getSelectedItems:state => {
      let temp = [];
      state.filteredBusinessCards.forEach(item => {
        if(item.selected == true){
          temp.push(item)
        }
      })

      return temp;
    },
    setSelectedGroup: (state,payload) => {
      // console.log(payload)
      let temp = []
      state.categoriesList.forEach( item => {
        // console.log(item)
        if(item.gid == payload.gid){
          temp = item.items;
        }
      })

      // console.log(temp)
      let temp2 = []
      temp.forEach(cid => {
        console.log(cid)
        state.businessCards.forEach(card => {
          console.log(card.cid)
          if(cid==card.cid){
            temp2.push({...card,selected:true})
          }
        })
      })
      console.log(temp2)
      state.selectedcardGroupItems = temp2;
      state.selectedGroupId = payload.gid;

    },
    updateCategoryListItems: (state,payload) => {
      let itemFound = false;
      if(payload.checked){
        state.selectedcardGroupItems.forEach(item => {
          if(item.cid == payload.cid){
            itemFound = true
          }
        })
        if(!itemFound){
          state.selectedcardGroupItems.push(payload)
        }
      }else{
        let temp = []
        state.selectedcardGroupItems.forEach(item => {
          if(item.cid == payload.cid){
            itemFound = true
          }else{
            temp.push(item)
          }
        })
        state.selectedcardGroupItems = temp;
      }
      
    }
  },
  actions: {
    fetchAllBusinessCards:({state}) => {
      
      firebase.firestore().collection("Cards").where("status","==","active").onSnapshot(resp => {
        let cards = [];
        resp.forEach(item => {
          cards.push({...item.data(),cid:item.id,selected:false})
        });
        state.filteredBusinessCards = cards;
        state.businessCards = cards;
      })
    },
    fetchAllUsers: ({state}) => {
      firebase.firestore().collection("Users").onSnapshot(resp => {
        let users = [];
        resp.forEach(item => {
          users.push({...item.data(),uid:item.id})
        });
        state.allUsers = users;
      })
    },

    fetchCategoriesList:({commit}) => {
      let temp = [];
      firebase.firestore().collection('Groups').where('addedBy','==',firebase.auth().currentUser.uid)
      .get().then( resp => {
        
        resp.forEach(item => {
          temp.push({...item.data(),gid:item.id,selected:false})
        })
      })
      commit('setCategoriesList',temp)
    },
    fetchAllTags: ({commit}) => {
      
      firebase.firestore().collection('Tags')
      .onSnapshot(resp => {
        // temp = [];
        let temp = [];
        console.log("fetched again")
        resp.forEach(item => {
          temp.push({...item.data(),gid:item.id,selected:false})
        })
        console.log("fetched tags:",temp)
        commit('setTagsList',temp)
      })

      
    },
    removeTagfromItem: ({state},payload) => {

      console.log("payload:",payload)
      let temp = [];
      state.selectedCardTags.forEach(item => {
        console.log(item)
        if(item != payload){
          temp.push(item);
        }
      })
      state.selectedCardTags = temp;
      console.log(state.selectedCard)
      firebase.firestore().collection('Cards').doc(state.selectedCard.cid).update({
        tags:temp
      })
      
    }

  },
  modules: {

  },  
});
