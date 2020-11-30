import React, {useState} from 'react';
import './SearchFeature.css';
import Searchbar from './Searchbar';
import SearchResult from './SearchResult';
import { useSelector, useDispatch } from 'react-redux';
import {saveResults, testResults, selectSearchResults} from './searchSlice';




function SearchFeature(props) { 
    // const results = useSelector(selectSearchResults);
    const results = useSelector(state => state.searchFeature.hits);
    

    //get details from state here 
    // const testDataString = useSelector(testData);
    // //broken
    
        return (
          <div >
           <h3>Search The Hacker News API</h3>
          <Searchbar />
          <ul>
             {results.map((result, index) => (
                <SearchResult key={index} title={result.title} author={result.author} url={result.url} comments={result.comments}/>  
            ))} 
          </ul>
            
          
          {/* map the search results next! */}
    
    {/* add a next page button- would need a page number in state */}
    
          </div>
        );
      }
      export default SearchFeature;