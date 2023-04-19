"use strict";

fetch("https://git.esi-bru.be/api/v4/projects/40922/repository/files/recipes.json/raw")
    .then((response) => response.json())
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
 * @param {RecipesAndUnits} data ...
 */
function loadCards(data) {
    console.table(data);
    for (let i = 0; i < data.recipes.length; i++) {
        console.log(data.recipes[i].recipeName);
    }
}
