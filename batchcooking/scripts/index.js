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
    const template = /** @type{HTMLTemplateElement} */ (document.getElementById("card"));
    for (const recette of data.recipes) {
        const clone = /** @type{HTMLDivElement} */ (template.content.cloneNode(true));
        const card = $(clone);
        const img = $(".photo", card);
        //image
        img.attr("src", recette.imageLink);
        img.attr("alt", recette.recipeName);
        img.attr("title", recette.recipeName);
        //titre
        $(".titre", card).text(recette.recipeName);
        //ajouter les apports;
        for (const tag of recette.supplies) {
            switch (tag) {
            case "proteins":
                $(".tags", card).append(
                    $("<span>")
                        .addClass("protéines")
                        .text("Protéines")
                );
                break;
            case "starches":
                $(".tags", card).append(
                    $("<span>")
                        .addClass("féculents")
                        .text("Féculents")
                );
                break;
            case "vegetables":
                $(".tags", card).append(
                    $("<span>")
                        .addClass("légumes")
                        .text("Légumes")
                );
                break;
            }
        }
        infoButton(card, recette);
        $("#cards").append(card);
    }
}

/**
 * @param {JQuery<HTMLDivElement>} card
 * @param {Recipe} recette
 */
function infoButton(card, recette) {
    $(".icônes .recette", card).on("click", () => {
        showRecipeAction();
    });
}
