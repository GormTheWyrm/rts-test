import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SearchFeature.css';


function SearchResult(props) {

  return (
    <div className="SearchResult">
      <h3>Title: {props.title}</h3>
      <p>Author: {props.author}</p>
      <p>URL: {props.url}</p>
      <p>Created At: {props.date}</p>
      <p>Number of Comments: {props.comments}</p>
      <p>Points: {props.points}</p>
      
      
      
      {/* <p>Date: {results.date}</p> */}
      {/* fix date- created at? */}
    </div>
    // created_At,title,url,author,points,created_at_i,num_comments,relevancy_score (and nulls)
  );
}
export default SearchResult;

