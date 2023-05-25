"use strict";

fetch("https://git.esi-bru.be/api/v4/projects/40922/repository/files/recipes.json/raw")
    .then((response) => response.json())
    .then(loadCards)
    .catch(alert);

/**
 * Displays the recovered recipes data;
 * 
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
            // @ts-ignore
            const quantité = (ingrédient.quantity/(recette.qp)*4).toFixed(2); 
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
