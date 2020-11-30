import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; //from react-redux.js.org
//replaces createStore from redux and allows use of thunks
// now import reducers from slice files
import searchFeatureReducer from './features/SearchFeature/searchSlice';


export default configureStore({ //should allow devtools to work
    reducer: { //list slice reducer functions here
        searchFeature: searchFeatureReducer,    //key name generated from searchSlice, key value generated automatically
        //, name: Reducer-Action //these are key pairs in state value
    }
})