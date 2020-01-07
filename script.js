    'use strict';

    function displayResults(responseJson){
        console.log(responseJson);
        console.log(responseJson.length);
        console.log(responseJson[0].owner.login)
        
        $('.results-list').empty();

        let userHeader = `<h3>UserName: ${responseJson[0].owner.login}</h3>
        <h3># of Repos: ${responseJson.length}</h3>`
    
        $('.results-list').append(userHeader)
        for(let i=0; i < responseJson.length; i++){
            $('.results-list').append(`<p>
                         
                ${responseJson[i].name}<br>
                <span>                
                <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
                </span></p>`
                 
            )}
        $('.results-list').removeClass("hidden");    
    };
    
    function getUserRepos(userSearchValue){
    console.log("getUserRepos ran"); 
    const url = `https://api.github.com/users/${userSearchValue}/repos`
    console.log(url);  
    
        fetch(url)
            .then(response=> {
                if (response.ok) {
                    $(".results-error").empty();
                    return response.json();
                }
               
            })

            .then(responseJson => displayResults(responseJson))
//the catch intiiates the error
            .catch(error => {
                $(".results-error").empty();
                $(".results-list").addClass("hidden");
                $(".results-error").text(`${userSearchValue} is not a valid Github UserName, Please try again`);
            });
             
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