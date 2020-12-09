import React, {useState} from 'react';
import './SearchFeature.css';
import Searchbar from './Searchbar';
import SearchResult from './SearchResult';
import { useSelector, useDispatch } from 'react-redux';
import {saveResults, testResults, selectSearchResults} from './searchSlice';




function SearchFeature(props) { 
    const results = useSelector(state => state.searchFeature.hits);
    
        return (
          <div >
           <h3>Search The Hacker News API</h3>
          <Searchbar />
          <ul>
             {results.map((result, index) => (
                <SearchResult key={index} title={result.title} author={result.author} url={result.url} comments={result.num_comments}
                  points={result.points} secondsAgo={result.created_at_i} date={result.created_at}
                />  
            ))} 
          </ul>
                
          </div>
        );
      }
      export default SearchFeature;