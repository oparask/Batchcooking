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
        console.log(card);

        //image
        const img = $(".photo", card);
        img.attr("src", recette.imageLink);
        img.attr("alt", recette.recipeName);
        img.attr("title", recette.recipeName);
        //titre
        $(".titre", card).text(recette.recipeName);
        //ajouter les apports;
        const tab = new Array(3);
        for (const ingrédient of recette.ingredients) {
            const ingredientName = ingrédient.ingredientName;
            const ingredientsData = data.ingredientsData[ingredientName];

            const intakes = ingredientsData.intakes;


            if (intakes !== undefined) {
                for (const tag of intakes) {
                    if (!tab.includes(tag)) {
                        tab.push(tag);
                        $(".tags", card).append(
                            $("<span>")
                                .addClass(data.intakes[tag])
                                .text(data.intakes[tag])
                        );
                    }
                }
            }
        }

        tab.length = 0;

        //pour recette
        infoButton(card, recette, data.units, data);

        // Reste du code pour créer la carte...

        card.find(".calendrier").on("click", function () {
            // Sélectionner une carte
            // @ts-ignore
            selectedCard(recette, this);
        })

        //clone de la carte à la fin
        $("#cards").append(card);
    }

}

/**
 * Adds the cards for each of the recipes.
 * 
 * @param {JQuery<HTMLDivElement>} card
 * @param {Recipe} recette
 * @param {Object<string, string>} units ...
 * @param {RecipesAndRelatedData} data ...
 */
function infoButton(card, recette, units, data) {
    $(".icônes .recette", card).on("click", () => {
        //titre
        $("#recipe-container h1").text(recette.recipeName);
        const img = $("#recipe-image");
        //image
        img.attr("src", recette.imageLink);
        img.attr("alt", recette.recipeName);
        img.attr("title", recette.recipeName);
        showRecipeAction();
        fillRecipe(recette, units, data);
    });
}

/**
 * Allows you to modify the container "reciper-container"
 * to display the recipe passed in parameter.
 * 
 * @param {RecipesAndRelatedData} data ...
 * @param {Recipe} recette ...
 * @param {Object<string, string>} units ...
 */
function fillRecipe(recette, units, data) {
    $("#recipe-ingredients ul").empty();
    $("#recipe-steps ol").empty();
    for (const ingrédient of recette.ingredients) {
        //const nom = ingrédient.ingredientName; //en anglais
        const nom = data.ingredientsData[ingrédient.ingredientName].fr
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

/**
 * @type {Recipe|undefined}
 */
let selectedCardData;

/**
 * @type {Recipe[]} - tableau de recettes
 */
const tabSelecetedCards = new Array();

/**
 * Adds the cards in the planning
 * 
 * @param {Recipe} recette
 * @param {any} button
 * 
 */
function selectedCard(recette, button) {
    console.log(recette);

    if ($(button).parent().parent().hasClass("selected")) {
        $(button).parent().parent().removeClass("selected")
        selectedCardData = undefined;
    }
    else {
        console.log("pas de class");
        $(button).parent().parent().addClass("selected")
        selectedCardData = recette;
    }

    addCardPlanning(recette);

}

/**
 * 
 * @param {Recipe} recette 
 */
function addCardPlanning(recette) {
    // Supprimer les gestionnaires d'événements click précédents
    $('.jour').off('click');

    if (selectedCardData) {
        console.log(selectedCardData);
        // opérations avec la carte sélectionnée ici
        // parcourir tous les jours du planning
        let days = $('.jour');

        days.each(function () {
            let day = $(this);
            day.on('click', function () {
                //récuperer le titre de la carte selectionnee
                day.append(
                    $("<p>")
                        // @ts-ignore
                        .text(selectedCardData.recipeName)
                );

                //je rajoute la carte dans le tableau 
                tabSelecetedCards.push(recette);
                console.log(tabSelecetedCards);
            })

        });

    }
}

function removeCardPlanning() {
    // Supprimer les gestionnaires d'événements click précédents
    $('.jour').off('click');
    let days = $('.jour');
    //ajouter un ecouteur d'evenement de clic aux paragraphes du planning
    days.on('click', 'p', function () {
        let recetteNom = $(this).text();

        //supprimer le paragraphe du plannig
        $(this).remove();

        //

    })


}
