fetch('https://git.esi-bru.be/api/v4/projects/40922/repository/files/recipes.json/raw')
    .then(response => response.json())
    .then(loadCards)
    .catch(alert);

/**let requestURL = 'https://git.esi-bru.be/api/v4/projects/40922/repository/files/recipes.json/raw';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    let data = request.response;
    loadCards(data);
}
*/


/**
 * ...
 * @param {any} data ...
 */
function loadCards(data) {
    //$("#recipe-container h1").text(data.recipes[0]["recipeName"])
    console.table(data);
    for(let i = 0; i<data.recipes.length; i++){
        console.log(data.recipes[i].recipeName);
    }
    
   


}


