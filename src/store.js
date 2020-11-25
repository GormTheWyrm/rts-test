import { configureStore } from '@reduxjs/toolkit';
// now import reducers
import searchReducer from './features/SearchFeature/searchSlice';

export default configureStore({
    reducer: { //list slice reducer functions here
        searchFeature: SearchFeatureReducer
        //, name: Reducer-Action //these are key pairs in state value
    }
})