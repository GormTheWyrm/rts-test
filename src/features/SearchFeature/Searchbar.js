import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SearchFeature.css';
import { saveResults, testResults, searchAPI } from './searchSlice';


function Searchbar() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    let query = event.target.searchbar.value;
    const baseUrl = 'https://hn.algolia.com/api/v1/search?';
    let searchUrl = baseUrl + 'query=' + query; //query can be blank without error


    // console.log(event.target.comments.checked);

    let myTags = '';
    // sets up myTags if any of the tag checkboxes are checked
    if ((event.target.story.checked === true) || (event.target.comments.checked === true) || (event.target.polls.checked === true)
      || (event.target.pollops.checked === true) || (event.target.showhn.checked === true) || (event.target.askhn.checked === true)
      || (event.target.frontpage.checked === true) || (event.target.useAuthor.checked === true) || (event.target.useStory.checked === true)) {
      myTags += `&tags=`;
      if (event.target.orTags.checked === true) {
        myTags += '(';
      }

      //adds to myTas, which will be added to searchUrl
      if (event.target.story.checked === true) {
        myTags += `story,`;
        //returning just the author, not title... need to find something to return here to make it accessible...
      }
      if (event.target.comments.checked === true) {
        myTags += `comment,`;
        //returning just the author, not title... need to find something to return here to make it accessible...
      }
      if (event.target.polls.checked === true) {
        myTags += `poll,`;
      }
      if (event.target.pollops.checked === true) {
        myTags += `pollopt,`;
      }
      if (event.target.showhn.checked === true) {
        myTags += `show_hn,`;
      }
      if (event.target.askhn.checked === true) {
        myTags += `ask_hn,`;
      }
      if (event.target.frontpage.checked === true) {
        myTags += `front_page,`;
      }

      if (event.target.useAuthor.checked === true) {
        myTags += `author_${event.target.authorId.value},`;
      }
      if (event.target.useStory.checked === true) {
        myTags += `story_${event.target.storyId.value},`;
      }

      if (event.target.orTags.checked === true) {
        myTags += ')';
      }
      searchUrl += myTags;  //adds myTags to search url. This code is missed if no tags selected

    }
    // &numericFilters
    if ((event.target.numeric1.checked === true) || (event.target.numeric2.checked === true)) {
      //check each filter individually
      let numFilters = '&numericFilters=';
      
      
      if (event.target.numeric1.checked === true) {
        let numSelect1 = parseInt(event.target.numberSelect1.value);
        if (isNaN(numSelect1) === true) { numSelect1 = 0; }
        numFilters += `${event.target.textSelect1.value}${event.target.conditionSelect1.value}${numSelect1},`;
      }

      if (event.target.numeric2.checked === true) {
        let numSelect2 = parseInt(event.target.numberSelect2.value);
        if ((isNaN(numSelect2) === true)) { numSelect2 = 0; }
        numFilters += `${event.target.textSelect2.value}${event.target.conditionSelect2.value}${numSelect2}`;
      }
      

      searchUrl += numFilters;
      console.log('num filters');
      console.log(numFilters);
    }


    let pageNum = parseInt(event.target.pagenum.value);
    let pageBool = Number.isInteger(pageNum);
    if (pageNum > 1) {


      if (pageBool === true) {
        searchUrl += `&page=${pageNum}`;
        //else would do nothing - no need for an else statement...
      }

    }

    let pageHitNum = parseInt(event.target.numHits.value);
    if ((isNaN(pageHitNum) === true || pageHitNum < 1)) {
      pageHitNum = 10;
    }
    searchUrl += `&hitsPerPage=${pageHitNum}`;



    let results = { hits: [{}], searchTerms: query, searchUrl: searchUrl }; // create results to be sent through middleware
    // results.searchUrl = searchUrl;  //set searchUrl in results so it gets searched in API
    console.log('URL');
    console.log(results.searchUrl); //issues here!



    dispatch(searchAPI(results));
  }
  // START COMPONENT
  return (
    <div className='SearchbarContainer'>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>
          Search for:
       <input type="text" name="searchbar" className='Searchbar' />
        </label>
        <input type="submit" value="Search" />
        <br />
        <input type="checkbox" name="orTags" />
        <label > Select to toggle tag search behavior from AND to OR</label><br />
        <p>Search among tags: </p>
        {/*  can filter on tags: story, comment, poll, pollop, show_hn, ask_hn, front_page, author_:USERNAME, story_:ID */}
        {/* checkboxes */}
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
        <input type="checkbox" name="useAuthor" />
        <label > Use Author ID</label>
        <input type="text" name="authorId" />
        <br />
        <input type="checkbox" name="useStory" />
        <label > Use Story ID</label>
        <input type="text" name="storyId" />
        <br />
        {/* page number */}
        <label > Page Number</label>
        <input type="number" name="pagenum" placeholder={1} />
        {/* hitsPerPage */}
        <br />
        <label >Results Per Page</label>
        <input type="number" name="numHits" placeholder={20} />
        {/* for attribute not supported by Edge */}
        <p>numeric filters</p>
        {/* checkbox for each filter, then two selects where dropdown and numerical condition can be selected */}
        <label > First Numeric Filter</label> <br />
        <input type="checkbox" name="numeric1" />
        <select name='textSelect1'>
          <option value='created_at_i'>Created At</option>
          <option value='points'>Points</option>
          <option value="num_comments">Number of Comments</option>
        </select>
        <select name='conditionSelect1'>
          <option value='<'>Less Than</option>
          <option value='<='>Less Than or Equal To</option>
          <option value="=">Equal to</option>
          <option value='>'> Greater Than</option>
          <option value='>='>Greater Than or Equal To</option>
        </select>
        <input type="number" name="numberSelect1" />
        {/* second Numeric filter so users can do a range or narrow down results to some degree */}
        <label > Second Numeric Filter</label> <br />
        <input type="checkbox" name="numeric2" />
        <select name='textSelect2'>
          <option value='created_at_i'>Created At</option>
          <option value='points'>Points</option>
          <option value="num_comments">Number of Comments</option>
        </select>
        <select name='conditionSelect2'>
          <option value='<'>Less Than</option>
          <option value='<='>Less Than or Equal To</option>
          <option value="=">Equal to</option>
          <option value='>'> Greater Than</option>
          <option value='>='>Greater Than or Equal To</option>
        </select>
        <input type="number" name="numberSelect2" />
        {/* example url: https://hn.algolia.com/api/v1/search?tags=story,author_breck&query=cheese
                  http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>X,created_at_i<Y    
          */}
      </form>
    </div >
  );
}
export default Searchbar;
