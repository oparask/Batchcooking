"use strict";

fetch("https://git.esi-bru.be/api/v4/projects/40922/repository/files/recipes-it3.json/raw")
    .then((response) => response.json())
    .then(loadCards)
    .catch(alert);

/**
 * Displays the recovered recipes data;
 * 
 * @param {RecipesAndRelatedData} data ...
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
        const tab = new Array(3);
       for (const ingrédient of recette.ingredients) {
           const ingredientName = ingrédient.ingredientName;
           const ingredientsData = data.ingredientsData[ingrédient.ingredientName];

           const intakes = ingredientsData.intakes;
        

           if(intakes!==undefined){
               for(const tag of intakes){
                if(!tab.includes(tag)){
                    tab.push(tag);
                    $(".tags", card).append(
                      $("<span>")
                          .addClass(data.intakes[tag])
                          .text(data.intakes[tag])
                  );
                }
               }
           }


           /*switch (intakes) {
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
            }*/
        }
        
        tab.length = 0;
        
        //pour recette
        infoButton(card, recette, data.units);
        $("#cards").append(card);
    }
}

/**
 * Adds the cards for each of the recipes.
 * 
 * @param {JQuery<HTMLDivElement>} card
 * @param {Recipe} recette
 * @param {Object<string, string>} units ...
 */
function infoButton(card, recette, units) {
    $(".icônes .recette", card).on("click", () => {
        //titre
        $("#recipe-container h1").text(recette.recipeName);
        const img = $("#recipe-image");
        //image
        img.attr("src", recette.imageLink);
        img.attr("alt", recette.recipeName);
        img.attr("title", recette.recipeName);
        showRecipeAction();
        fillRecipe(recette, units);
    });
}

/**
 * Allows you to modify the container "reciper-container"
 * to display the recipe passed in parameter.
 * 
 * @param {Recipe} recette ...
 * @param {Object<string, string>} units ...
 */
function fillRecipe(recette, units) {
    $("#recipe-ingredients ul").empty();
    $("#recipe-steps ol").empty();
    for (const ingrédient of recette.ingredients) {
        const nom = ingrédient.ingredientName;
        if ("quantity" in ingrédient) {
            const quantité = ingrédient.quantity;
            const unité = units[ingrédient.unit];
            $("#recipe-ingredients ul").append(
                $("<li>")
                    .text(`${quantité} ${unité} ${nom}`)
            );
        } else {
            $("#recipe-ingredients ul").append(
                $("<li>")
                    .text(nom)
            );
        }
    }
    for (const étape of recette.steps) {
        $("#recipe-steps ol").append(
            $("<li>")
                .text(étape)
        );
    }
}
