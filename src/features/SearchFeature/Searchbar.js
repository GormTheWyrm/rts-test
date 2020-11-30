import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SearchFeature.css';
import API from './API';
import { saveResults, testResults } from './searchSlice';


//when user submits query it should save query into state
//...actual axios call made on main page so that the results can be mapped there
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
  //NEED TO FIGURE OUT HOW TO DO A FUNCTION IN HERE

  // set as query and parameters


  //call api search function
  let query = 'test';
  let parameters = ''; //get these from state
  // API.search(query, parameters)
  // .then(res => this.setState({ results: res.data.data }))
  // .catch(err => console.log(err));
  // .then(res => console.log(res))
  // .catch(err => console.log(err));
  //figure out why data is logged twice

  const dispatch = useDispatch();
  return (
    <div className='SearchbarContainer'>
      <form onSubmit={() => dispatch(testResults())}>
        {/* swap with saveResults... once working */}
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
      

      <button onSubmit={() => dispatch(testResults())}> TEST </button>
      <p>Search among tags: </p>
      <input type="checkbox" id="titleTag" name="titleTag" value={true} />
      <label > Story / Title Name</label> <br />
      {/* I think story is a redundant tag */}
      <input type="checkbox" id="comments" name="comments" value={0} />
      <label > Comments</label><br />
      <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
      <label > Polls</label><br />
      <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
      <label > PollOps</label> <br />
      <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
      <label > Show HN</label> <br />
      <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
      <label > Ask HN</label> <br />
      <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
      <label > Front Page</label> <br />
      <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
      {/* for attribute not supported by Edge */}
      {/* need author and id search options... (verify this)*/}

      </form>
    </div >
  );
}
export default Searchbar;
//need to save query in state
//need to save each filter as a bool... 
//...