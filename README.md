# HNA Search Application
## Description 
This project is a take home exercise for RTS Labs.

See deployed version at: https://gorms-rts-lab-homework.herokuapp.com/

## Instructions-For-Use: 
    1. Navigate to https://gorms-rts-lab-homework.herokuapp.com/
    2. Type in search query in the top searchbar
    3. Select the first checkbox if you want to search among multiple tags (ei search comments OR front page instead of comments AND front page)
    4. Select checkboxes for tags. Each checkbox will add a tag directign the API to look for data in a certain place, example being comments tag makes tha API search among comments and front page tag makes the API search among the front page for relevant results.
    - To use the author ID tag check the box and type in the Authors name
    - To use the Story Id tag check the box and type in the story ID
    5. 
    6. Select the numeric conditional Filters, if desired. These allow the user to specify conditions for 3 tags; created_at, points, and number_of_comments. 
    - select the checkbox to the left
    - pick a tag in the left dropdown
    - choose whether the tag should be greater than, less than, equal to, equal to or greater than, or equal to or less than 
    - input a numeric variable on the right. if no input the app reverts to a variable of 0
    * example: [checked box] [points equal to or greater than] [300]
    7. hit submit

    * Note that the app will work if the user simply types in a query and hits submit.

## Assignment Instructions:

    Here's what we'd like to see for an at-home exercise:

    Using React and Redux:

    - Build an application that lets the user search the Hacker News Algolia API and displays a list of results (https://hn.algolia.com/api)

    - Save the user's search terms in the Redux state (don't need to persist across sessions)
    We're looking to see if what you know in React and Redux and querying an API. We're interested in whether you can write clean code and have the ability to learn/understand new technologies. We don't care about design/UI (for this project)

    Resources:
    - create-react-app

    - HN search API: https://hn.algolia.com/api

    - Redux intro: https://egghead.io/courses/getting-started-with-redux


    Let us know if you have any questions! If you're good to go, please send us back your project at your convenience (please upload your project to a public git repository, such as Github).




