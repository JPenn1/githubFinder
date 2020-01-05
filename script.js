'use strict';



function displayResults(responseJson){
    console.log(responseJson);
    console.log(responseJson.length);
    console.log(responseJason[0].owner.login)
    $('#results-list').empty();
        

    for(let i=0; i<responseJson.length; i++){
        $('#results-item').append(
            <div class="results-item">
            <li>
            ${responseJson[i].name}
            <span>
            <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
            </span>
            </li>
            </div>
        )}
    $('#results').removeClass("hidden");    
};

function getUserRepos(){
const userSearch= $('#js-search-user');
const userSearchValue=userSearch.val();   
    fetch(`https://api.github.com/users/`+ userSearchValue +`/repos`)
        .then(response=> response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            displayError(err.message);
        });
   };

function watchForm(){
    $('form').submit(event=>{
        event.preventDefault();
        getUserRepos();
    });
};    

$(watchForm);

