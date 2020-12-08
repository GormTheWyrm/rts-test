// slice and actions are in a single slice file for each feature
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const searchSlice = createSlice({
    name: 'searchFeature', //name of slice - should be key name in store
    initialState: {
        hits: [{}], //contains articles returned from api
        tags: { active: false, tags: [] }, // I could simply map "&"+arrayElement to the search url if I leave tags as strings
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

            //this should not actually mutate logic because of @reduxjs/toolkit 's reliance on immer library

            console.log('ACTION');
            console.log(action);
            let newState = state;
            newState.hits = [...action.payload.hits];
            newState.searchTerms = [...state.searchTerms];
            newState.searchTerms.push(action.payload.query);
            console.log(action.payload);    //query is undefined...
            //action will need: hits[], query...
            console.log('NEW STATE');
            console.log(newState);
            return newState;

        },
        saveFilters(state, action) {
            //this should save the filters and tags and such... does it also need to set up the query?
            //no...

        },

        testResults: state => {
            // state.hits[0]= {title: "Example Title", author: "Example Author"};
            let newState = state;

            console.log('testing state');   //this seems to revert... why?
            newState.hits[0].title = 'testTitle';
            newState.hits[0].author = 'testAuthor';
            //hits[0].title     is API structure
            return newState;

        }
    }

});
export const { saveResults, testResults } = searchSlice.actions; //this defines the actions for this Reducer-Slice-Function
// add reducers to above when adding reducers
// call with searchSlice.actions.xxx    these actions will change the state
// export const testData = state => state.searchFeature.testData;

export const selectSearchResults = state => state.searchFeature.hits;
//useSelectors like above can also be defined where the are used.

export const searchAPI = (action) => {
    //action = hits[20], searchterms,searchUrl - no payload!
    //will be able to change length of array soon
    console.log('search API action');
    // console.log(action);  //seems to be working now
    
    return async (dispatch, getState) => {
        try {
            // console.log(action); //action made it into this function - still no payload
            //axios here
            axios.get(action.searchUrl) //axios searches API
                .then(res => {

                    let myData = {};
                    myData.hits = [...res.data.hits];
                    console.log('my data:');
                    myData.query = res.data.query
                    console.log(myData); 
                    dispatch(saveResults(myData));
                    // state currently is searchfeature.hits[], tags, numericfilters, page, hitsperpage, searchterms[null-initialized as empty]
                    //myData = query, hits[], 
                    //does not pass through url
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