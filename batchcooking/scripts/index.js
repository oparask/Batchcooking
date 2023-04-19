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
    /*for (let i = 0; i < data.recipes.length; i++) {
        console.log(data.recipes[i].recipeName);
    }
    */

    let image = $(".photo");

    for (let i = 0; i < data.recipes.length; i++) {
        const template = /** @type{HTMLTemplateElement} */ (document.getElementById("card"));
        const clone = /** @type{HTMLDivElement} */ (template.content.cloneNode(true));
        const card = $(clone);

        $(".titre").text(data.recipes[i].recipeName);
        
        //ajouter les apports 
        for (let j = 0; i < data.recipes[i].supplies.length; j++) {
            switch(data.recipes[i].supplies[j]){
                case "proteins":  $(".tags").text(data.recipes[i].supplies[j]);
                case "starches" : $(".féculents").text(data.recipes[i].supplies[j]);
                case "vegetables" :  $(".légumes").text(data.recipes[i].supplies[j]);
            }
            

        }
        $(".tags").text(data.recipes[i].supplies[0]);


    }

}
