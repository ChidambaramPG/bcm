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
    selectedGroupId:"",
    tagFilterItems:[],
    bulkSelectedCards:[],
    filteredTableCards:[]
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
      // console.log("tags:",state.allTags)
    },
    setSelectedTags: (state,payload) => {

      if(state.tagFilterItems.length < 1){
        // console.log('adding first tag')
        state.tagFilterItems.push(payload)
      }else{
        // console.log('tags are present ')
        // let tempSelTags = []
        let tagPresent = state.tagFilterItems.includes(payload)

        if(!tagPresent) {
          state.tagFilterItems.push(payload)
        }else{
          state.tagFilterItems = state.tagFilterItems.filter((val) => {
            return val != payload
          })
        }
        // console.log(state.tagFilterItems)
      }
      
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
        
        let tagPresent = false;
        
        state.tagFilterItems.forEach( gid => {
            // console.log(item.tags,gid)
            var regex = new RegExp( item.tags.join( "|" ), "i");
            if(regex.test(gid)){
              // console.log("tag present ==> ",item.tags.includes(gid))
              tagPresent = true;
            }
            // console.log(tag)
        })
        if(tagPresent){
          // console.log("adding item")
          selectedItems.push(item)
        }
        
      })
      // console.log(new Set(selectedItems));
      if(state.tagFilterItems.length<1){
        state.filteredBusinessCards = state.businessCards
      }else{
        state.filteredBusinessCards = new Set(selectedItems);
      }
      
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
    setBulkSelectedCardList:(state,payload)=>{
      if(payload.status){
        state.isItemSelected = true
        state.bulkSelectedCards = payload.items
      }else{
        state.isItemSelected = false
        state.bulkSelectedCards = []
      }
      
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
        // console.log(cid)
        state.businessCards.forEach(card => {
          // console.log(card.cid)
          if(cid==card.cid){
            temp2.push({...card,selected:true})
          }
        })
      })
      // console.log(temp2)
      state.selectedcardGroupItems = temp2;
      state.selectedGroupId = payload.gid;

    },
    exportSelectedGroup:(state,payload)=> {
      function ConvertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }
      if(state.selectedcardGroupItems.length > 0){
        if(payload=='csv'){
          var jsonObject = JSON.stringify(state.selectedcardGroupItems);
          let csvFile = ConvertToCSV(jsonObject);
          // console.log(csvFile)
          var hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
          hiddenElement.target = '_blank';
          hiddenElement.download = 'people.csv';
          hiddenElement.click();
        }
      }
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
      
    },

    searchStringForTable: (state,payload) => {
      const toLower = text => {
        return text.toString().toLowerCase();
      };
      
      const searchByName = (items, term) => {
        if (term) {
          return items.filter(item =>
            toLower(
              item.cFirstname + " " + item.cLastname + " " + item.cOrganizaton + " " + item.cDesignation + " " + item.cEmail + " " + item.cPhone
            ).includes(toLower(term))
          );
        }
      
        return items;
      };

      let searched = searchByName(state.businessCards, payload);

      state.filteredBusinessCards = searched;

    },
    // addColumnToData:(state,payload) => {
    //   console.log(payload)
    // }
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
        state.filteredTableCards = cards;
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
        // console.log("fetched again")
        resp.forEach(item => {
          temp.push({...item.data(),gid:item.id,selected:false})
        })
        // console.log("fetched tags:",temp)
        commit('setTagsList',temp)
      })

      
    },
    removeTagfromItem: ({state},payload) => {

      // console.log("payload:",payload)
      let temp = [];
      state.selectedCardTags.forEach(item => {
        // console.log(item)
        if(item != payload){
          temp.push(item);
        }
      })
      state.selectedCardTags = temp;
      // console.log(state.selectedCard)
      firebase.firestore().collection('Cards').doc(state.selectedCard.cid).update({
        tags:temp
      })
      
    }

  },
  modules: {

  },  
});
