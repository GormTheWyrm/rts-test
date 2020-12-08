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
      }
      if (event.target.pollops.checked === true) {
        myTags += `pollopt,`;
      }
      if (event.target.showhn.checked === true) {
        myTags += `show_hn,`;
      }
      if (event.target.showhn.checked === true) {
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
      console.log('searchUrl');
      console.log(searchUrl);
    }
    // if &numericFilters then add &numericFilters=
    //
     let myNum = parseInt(event.target.pagenum.value);
      let myBool = Number.isInteger(myNum);
    if (myNum > 1){
    
      
      if (myBool === true){
        searchUrl += `&page=${myNum}`;
      //else would do nothing - no need for an else statement...
      }
      
    }
    console.log(event.target.pagenum.value);

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



        <label>
          Search for:
       <input type="text" name="searchbar" className='Searchbar' />
        </label>
        <input type="submit" value="Search"
        />

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
        <input type="checkbox" name="useAuthor" />
        <label > Use Author ID</label>
        <input type="text" name="authorId" />
        <br />
        <input type="checkbox" name="useStory" />
        <label > Use Story ID</label>
        <input type="text" name="storyId" />
        <br />

        {/* page number: not yet validated  */}
        <label > Page Number</label>
        <input type="number" name="pagenum" placeholder={1} />
        {/* for attribute not supported by Edge */}


        {/* below is unfinished */}
        <p>numeric filters</p>
        {/* created_at_i, points, num_comments, 
            page= integer
            
        */}
        {/* dropdowns work best for numeric? options of <, <=, =, > or >= */}
        {/* URL parameters like &page=2 or hitsPerPage=50 ...number of pages and results per page should be paramters! */}
        {/* add a page and num per page button... */}

        <select name='dateSelect'>
          <option value="<"> </option>
          <option value="<=">Lime</option>
          <option selected value="=">Coconut</option>
          <option value="mango">Mango</option>
        </select>


        <input type="checkbox" name="createdat" />
        <label > Created At</label>
        {/* text input too? */}
        <br />
        <input type="checkbox" name="points" />
        <label > Points</label>
        {/* text input too? */}
        <br />
        <input type="checkbox" name="createdat" />
        <label > Created At</label>
        {/* text input too? */}
        <br />
        <input type="checkbox" name="createdat" />
        <label > Created At</label>
        {/* text input too? */}
        <br />
        <input type="checkbox" name="createdat" />
        <label > Created At</label>
        {/* text input too? */}
        <br />
        {/* example url: https://hn.algolia.com/api/v1/search?tags=story,author_breck&query=cheese
                  http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>X,created_at_i<Y    
          */}
      </form>
    </div >
  );
}
export default Searchbar;
//need to save query in state
//need to save each filter as a bool... 
//...