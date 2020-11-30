// slice and actions are in a single slice file for each feature
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({  
    name: 'searchFeature', //name of slice - should be key name in store
    initialState: {
        hits: [{title: 'no data', author: 'no data'}]
        //revise this data structure based on API data returned
    },
    reducers: { // each of these functions should define a new state
        saveResults: state => { 
            //should generate action creator: searchFeature.actions.saveResults
            //with an action of type: "searchFeature/saveResults"
            //creates a real reducer function...


            //this should not actually mutate logic because of @reduxjs/toolkit 's reliance on immer library
            // otherwise this would need to go into a 'newstate'...
            // I don't like using mutating logic here, may need to see what tools/toolkits team uses
            // ... do I need to use mutating logic here?


            state.data = 'test data';
            //replace with an array of title, author, comment number, date, and url
        }
        //, can put another function here - perhaps add in a filtering function
        // look at API data structure
        ,
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
export const { saveResults, testResults } = slice.actions; //this defines the actions for this Reducer-Slice-Function
// add reducers to above when adding reducers
// call with searchSlice.actions.xxx    these actions will change the state
// export const testData = state => state.searchFeature.testData;

export const selectSearchResults = state => state.searchFeature.hits;
//useSelectors like above can also be defined where the are used.
export default slice.reducer;
