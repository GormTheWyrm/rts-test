import React, {useState} from 'react';
import '../App.css';
import SearchFeature from '../features/SearchFeature/SearchFeature';


function MainPage() { 

    return (
      <div className="App">
       <SearchFeature />
      </div>
    );
  }
  export default MainPage;