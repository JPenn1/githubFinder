    'use strict';

    function displayResults(responseJson){
        console.log(responseJson);
        console.log(responseJson.length);
        console.log(responseJson[0].owner.login)
       // $('#results-list').empty();
        let userHeader = `<h3>${user}</h3>
        <h3>${responseJson.length}</h3>`
    
        $('#results').append(userHeader)
        for(let i=0; i < responseJson.length; i++){
            $('#results').html(`<p>
                         
                ${responseJson[0].name}
                <span>                
                <a href="${responseJson[0].html_url}">${responseJson[0].html_url}</a>
                </span></p>`
                 
            )}
        $('#results').removeClass("hidden");    
    };
    
    function getUserRepos(userSearchValue){
    console.log("getUserRepos ran"); 
    const url = `https://api.github.com/users/${userSearchValue}/repos`
    console.log(url);  
    
        fetch(url)
            .then(response=> {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })

            .then(responseJson => displayResults(responseJson))

            .catch(error => {alert('Something went wrong')});
             
       };

    function watchForm(){
        $('#js-form').submit(event => {
            event.preventDefault();
            console.log('watchForm ran');
            const userSearchValue = $('.js-search-user').val();
            console.log(userSearchValue);
            getUserRepos(userSearchValue);
        });
    };
    
    $(function() {
        console.log('App loaded! Waiting for submit!');
        watchForm();
      });