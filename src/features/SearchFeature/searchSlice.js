import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const searchSlice = createSlice({
    name: 'searchFeature', //name of slice - should be key name in store
    initialState: {
        hits: [{}], //contains articles returned from api
        numericFilters: { active: false, created_at_i: null, points: null, num_comments: null, created_at_i2: null, points2: null, num_comments2: null },
        page: { active: false, page: 1 },
        hitsPerPage: { active: false, hitsPerPage: 10 },
        // query: { active: false, query: '' }
        searchTerms: []
    },
    reducers: { // each of these functions should define a new state
        saveResults: (state, action) => {
            //data coming in should be action. 
            //action.payload.hits[],query, type: 'searchFeature/saveResults'
            let newState = state;
            newState.hits = [...action.payload.hits];
            newState.searchTerms = [...state.searchTerms];
            newState.searchTerms.push(action.payload.query);
            //action will need: hits[], query...
            return newState;
            //this should not actually mutate logic because of @reduxjs/toolkit 's reliance on immer library but I return a new state anyways
        },
        ApiError: (state, action) => {
            //error in API just reset state
            let newState = state;
            return newState;
        },
    }

});
export const { saveResults } = searchSlice.actions; //this defines the actions for this Reducer-Slice-Function
// add reducers to above when adding reducers
// call with searchSlice.actions.xxx    these actions will change the state


export const selectSearchResults = state => state.searchFeature.hits;
//useSelectors like above can also be defined where they are used.

export const searchAPI = (action) => {
    //action = hits[], searchterms,searchUrl - no payload!  
    return async (dispatch) => {
        try {
            //action made it into this function - still no payload
            axios.get(action.searchUrl) //axios searches API
                .then(res => {
                    //res.data = hits[], hitsperpage, nbhits, nbpages, page, params, processingTimesMS, query
                    let myData = {};
                    myData.hits = [...res.data.hits];
                    myData.query = res.data.query
                    dispatch(saveResults(myData));
                    //myData = query, hits[]
                });
        } catch (err) {
            //error handling here
            console.log(err);
            //should dispatch an error action
        }
    }

}

export default searchSlice.reducer;


//this file should export: searchSlice, searchSlice.actions, and searchSlice.reducer