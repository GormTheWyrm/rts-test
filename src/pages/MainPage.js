import React from 'react';
import '../App.css';
import Searchbar from '../features/SearchFeature/Searchbar';
import SearchResult from '../features/SearchFeature/SearchResult';


function MainPage() {
    return (
      <div className="App">
          {/* header name */}
          {/* search bar - form */}
          {/* search results */}
       <h3>Search The Hacker News API</h3>
      <Searchbar />
      <SearchResult />

      </div>
    );
  }
  export default MainPage;