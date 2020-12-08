import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SearchFeature.css';
import API from './API';  //delete this?
import { saveResults, testResults, searchAPI } from './searchSlice';


//when user submits query it should save query into state
//...actual axios call made on main page so that the results can be mapped there
//.....no, made here, and main page will use the results from state...
//this function should also add filters and other info to state...
//but those must be displayed here

//sort by relevance, points then number of comments
//...
//sort by date, most recent first
//...
// can filter on tags: story, comment, poll, pollop, show_hn, ask_hn, front_page, author_:USERNAME, story_:ID
//numeric filters: numericFilters=  created_at_i, points, num_comments
//...< , <= , = , >, <, >=
//page=pagenumber
//return axios.get(finalURL);
// Axios.get('http://hn.algolia.com/api/v1/search?query=test')



function Searchbar() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.searchbar.value);  //!!! VALUE I NEED!
    let query = event.target.searchbar.value;
    const baseUrl = 'https://hn.algolia.com/api/v1/search?';
    let searchUrl = baseUrl + 'query=' + query; //query can be blank without error


    // console.log(event.target.comments.checked);

    let myTags = '';
    // sets up myTags if any of the tag checkboxes are checked
    if ((event.target.story.checked === true) || (event.target.comments.checked === true) || (event.target.polls.checked === true)
      || (event.target.pollops.checked === true) || (event.target.showhn.checked === true) || (event.target.askhn.checked === true)
      || (event.target.frontpage.checked === true)) {
      myTags += `&tags=`;
      if (event.target.orTags.checked === true) {
        myTags += '(';
      }

      //adds to myTas, which will be added to searchUrl
      if (event.target.comments.checked === true) {
        myTags += `story,`;
        //returning just the author, not title... need to find something to return here to make it accessible...
      }
      if (event.target.comments.checked === true) {
        myTags += `comment,`;
        //returning just the author, not title... need to find something to return here to make it accessible...
      }
      if (event.target.polls.checked === true) {
        myTags += `poll,`;
        //retuned title, but no URL... maybe return the objectID?
        //maybe return points as well...
      }
      if (event.target.pollops.checked === true) {
        myTags += `pollopt,`;
        //only author showing up...
      }
      if (event.target.showhn.checked === true) {
        myTags += `show_hn,`;
        //no results -troubleshoot me!
      }
      if (event.target.showhn.checked === true) {
        myTags += `ask_hn,`;
        //n0 results - needs troubleshooting!
      }
      if (event.target.showhn.checked === true) {
        myTags += `front_page,`;
      }
      if (event.target.orTags.checked === true) {
        myTags += ')';
      }
      searchUrl += myTags;  //adds myTags to search url. This code is missed if no tags selected
      console.log('searchUrl');
      console.log(searchUrl);
    }
    //author: USERNAME
    //story: ID
    //will need to figure out whether this is going through as AND or OR and make the option available
    //replace query with ID and url if author or sotry id == true?... remov query and ...
    //...no, add a text form/box to read values from...


    let results = { hits: [{}], searchTerms: query, searchUrl: searchUrl }; // create results to be sent through middleware
    // results.searchUrl = searchUrl;  //set searchUrl in results so it gets searched in API
    console.log('URL');
    console.log(results.searchUrl); //issues here!



    dispatch(searchAPI(results)); //update to include custom query
    //working, but only does basic search, no tags, etc
  }


//


  return (
    <div className='SearchbarContainer'>
      <form onSubmit={(event) => handleSubmit(event)}>
        {/* swap with saveResults... once working */}
        {/* dispatch(testResults()) */}
        <label>
          Search for:
       <input type="text" name="searchbar" className='Searchbar' />
        </label>
        <input type="submit" value="Search"
        />
        {/* saveResults function from searchSlice - 
        need to figure out how to read redux state in order to check if it worked... 
        which mens learning thunks...
        and implementing thunk where?*/}
        <br />
        <input type="checkbox" name="orTags" />
        <label > Select to toggle tag search behavior from AND to OR</label><br />

        <p>Search among tags: </p>

        {/*  can filter on tags: story, comment, poll, pollop, show_hn, ask_hn, front_page, author_:USERNAME, story_:ID */}

        <input type="checkbox" name="story" />
        <label > Story / Title Name</label><br />
        <input type="checkbox" name="comments" />
        <label > Comments</label><br />
        <input type="checkbox" name="polls" />
        <label > Polls</label><br />
        <input type="checkbox" name="pollops" />
        <label > PollOps</label> <br />
        <input type="checkbox" name="showhn" />
        <label > Show HN</label> <br />
        <input type="checkbox" name="askhn" />
        <label > Ask HN</label> <br />
        <input type="checkbox" name="frontpage" />
        <label > Front Page</label> <br />
        {/* for attribute not supported by Edge */}
        {/* need author and id search options... (verify this)*/}
        {/* URL parameters like &page=2 or hitsPerPage=50 ...number of pages and results per page should be paramters! */}
        {/* add a page and num per page button... */}
      </form>
    </div >
  );
}
export default Searchbar;
//need to save query in state
//need to save each filter as a bool... 
//...