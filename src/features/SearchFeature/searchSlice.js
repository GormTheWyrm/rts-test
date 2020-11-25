// it appears that redux files are camelcase, this feels weird to me, check RTS' standards
// slice and actions are in a single file for each feature
// 

import { createSlice } from '@reduxjs/toolkit';
export const slice = createSlice({  
    name: 'searchResults', //name of slice - should be name of feature?
    initialState: {
        data: 'no search results yet'
        //revise this dta structure based on API data returned
    },
    reducers: { // each f these functions should define a new state
        loadResults: state => {
            //this should not actually mutate logic because of @reduxjs/toolkit 's reliance on immer library
            // otherwise this would need to go into a 'newstate'...
            // I don't like using mutating logic here, may need to see what tools/toolkits team uses
            // ... do I need to use mutating logic here?
            state.data = 'test data'
        }
        //, can put another function here - perhaps add in a filtering function
        // look at API data structure
    }

});
export const { loadResults } = slice.actions; //this defines the actions for this Reducer-Slice-Function
// add reducers to above when adding reducers

export default slice.reducer;

//need to check on the name of slice object. I think it should be customized but I'm not seeing that in documentation
