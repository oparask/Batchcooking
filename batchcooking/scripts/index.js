"use strict";

fetch("https://git.esi-bru.be/api/v4/projects/40922/repository/files/recipes-it3.json/raw")
    .then((response) => response.json())
    .then(loadCards)
    .catch(alert);

/**
 * Displays the retrieved recipes data.
 *
 * The function populates the HTML template with the recipe data
 * and adds event handlers for displaying recipe info and selecting cards for the planning.
 * It also attaches a click event handler to the shopping list button to trigger the display of the shopping list.
 *
 * @param {RecipesAndRelatedData} data - The data object containing recipes and related information.
 * @returns {void}
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

        // Boutton qui donne les info de la recette
        infoButton(card, recette, data.units, data);

        // Sélectionner une carte
        card.find(".calendrier").on("click", function () {
            // @ts-ignore
            selectedCard(recette, this);
        })

        // Clone de la carte à la fin et ajout dans l'html
        $("#cards").append(card);
    }

    // Lorsqu'on clique sur le boutton shopping list, toutes les cartes sont deja clonnées
    $(".shoppingList").on("click", getShowShoppingListAction(data));
}


/**
 * Enables access to the recipe by clicking on the info button in the card.
 *
 * The function attaches a click event handler to the info button of the card.
 * When clicked, it triggers the showRecipeAction() function to display the recipe's HTML page
 * and calls the fillRecipe() function to populate the steps and ingredients of the recipe.
 *
 * @param {JQuery<HTMLDivElement>} card - The card element containing the info button.
 * @param {Recipe} recette - The recipe associated with the card.
 * @param {Object<string, string>} units - The units data for displaying ingredient quantities.
 * @param {RecipesAndRelatedData} data - The data object containing ingredients information.
 * @returns {void}
 */
function infoButton(card, recette, units, data) {
    $(".icônes .recette", card).on("click", () => {
        showRecipeAction(); // pour afficher la page html de la recette
        fillRecipe(recette, units, data); // remplir les étapes ainsi que les ingrédients de la recette 
    });
}

/**
 * Modifies the "recipe-container" container to display the provided recipe.
 *
 * The function updates the title, image, ingredients, and steps of the recipe in the designated HTML elements.
 *
 * @param {Recipe} recette - The recipe to be displayed.
 * @param {Object<string, string>} units - The units data for displaying ingredient quantities.
 * @param {RecipesAndRelatedData} data - The data object containing ingredients information.
 * @returns {void}
 */
function fillRecipe(recette, units, data) {
    //titre
    $("#recipe-container h1").text(recette.recipeName);
    const img = $("#recipe-image");
    //image
    img.attr("src", recette.imageLink);
    img.attr("alt", recette.recipeName);
    img.attr("title", recette.recipeName);
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
 * Handles the selection of a card and triggers actions based on the selected recipe.
 *
 * If the card associated with the button is already selected,
 * it removes the 'selected' class from the card element and sets the selectedCardData to undefined.
 * If the card associated with the button is not selected,
 * it removes the 'selected' class from all cards,
 * adds the 'selected' class to the card associated with the button, and sets the selectedCardData to the selected recipe.
 *
 * Finally, it calls the addOrRmoveCardPlanning() function to add or remove the selected card from the planning.
 *
 * @param {Recipe} recette - The selected recipe.
 * @param {any} button - The button associated with the selected card.
 * @returns {void}
 */
function selectedCard(recette, button) {
    console.log(recette);


    if ($(button).parent().parent().hasClass("selected")) {
        $(button).parent().parent().removeClass("selected")
        selectedCardData = undefined;
    }
    else {
        // Une seule fiche peut-être sélectionnée à la fois
        let cards = $('.card');
        cards.removeClass('selected');
        $(button).parent().parent().addClass("selected")
        selectedCardData = recette;
    }

    addOrRmoveCardPlanning(recette, button);
}

/**
 * Adds or removes a card from the planning based on the selected recipe.
 *
 * If a card is selected, it performs operations with the selected card.
 * It appends the selected card's recipe name to the clicked day in the planning,
 * adds the 'scheduled' class to the selected card,
 * and adds the recipe to the 'tabSelecetedCards' array.
 *
 * If no card is selected and a recipe in the planning is clicked,
 * it removes the recipe from the planning by calling the 'removeCardPlanning' function.
 *
 * @param {Recipe} recette - The selected recipe to be added.
 * @param {any} button - The button associated with the selected card.
 * @returns {void}
 */
function addOrRmoveCardPlanning(recette, button) {
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

                // je lui ajoue la classe scheduled 
                // $(button).parent().parent().removeClass("selected")
                $(button).parent().parent().addClass("scheduled")

                //je rajoute la carte dans le tableau 
                tabSelecetedCards.push(recette);
                console.log(tabSelecetedCards);
            })

        });
    } else {
        //supprimer l'element ajouté dans planning lorsque aucune carte est selectionnée
        removeCardPlanning();
    }
}

/**
 * Removes click event handlers from previous elements, adds click event listeners to the paragraphs of planning days,
 * removes the clicked paragraph from the planning which corresponds tp the recipe name,
 * and removes the corresponding recipe from the 'tabSelecetedCards' array.
 * Also updates the class 'scheduled' for cards based on the updated 'tabSelecetedCards' array.
 *
 * @returns {void}
 */
function removeCardPlanning() {
    // Supprimer les gestionnaires d'événements click précédents
    $('.jour p').off('click');

    let days = $('.jour');
    //ajouter un ecouteur d'evenement de clic aux paragraphes de jours du planning
    days.each(function () {
        let day = $(this);
        day.on('click', 'p', function () {
            let recetteNom = $(this).text();

            //supprimer le paragraphe du plannig
            $(this).remove();


            let removed = false; // Flag variable to track removal
            // Retirer la recette correspondante du tableau tabSelecetedCards
            tabSelecetedCards.forEach(function (recette, index) {
                if (!removed && recette.recipeName === recetteNom) {
                    tabSelecetedCards.splice(index, 1);
                    removed = true; // Set the flag to true
                }
            });

            console.log(tabSelecetedCards);
            //Enlever la classe scheduled des cartes qui se toruvent pas dans le planning
            checkClassScheduledCards();
        });

    });
}

/**
 * Updates the class 'scheduled' for cards based on the selected recipes in the 'tabSelecetedCards' array.
 *
 * The function removes the 'scheduled' class from all cards,
 * and then adds the 'scheduled' class to the cards that match the recipe names in the 'tabSelecetedCards' array.
 *
 * @returns {void}
 */
function checkClassScheduledCards() {
    let cards = $('.card');
    cards.removeClass('scheduled');

    if (tabSelecetedCards.length > 0) {
        tabSelecetedCards.forEach(function (recette) {
            cards.each(function () {
                let card = $(this);
                if (recette.recipeName === $('.titre', card).text()) {
                    card.addClass('scheduled');
                }
            });
        });
    }
}

/**
 * Fills the shopping list based on the selected recipes.
 *
 * The function iterates through the selected recipes and their ingredients,
 * retrieves the corresponding category and translated ingredient data from the provided 'data' object, and populates the shopping list accordingly.
 *
 * @param {RecipesAndRelatedData} data - The data object containing recipes and categories information.
 * @returns {void}
 */
function fillShoppingList(data) {

    const LISTE = new Set();
    const tabCategories = new Set();

    let tabSelecetedCardsSet = [...new Set(tabSelecetedCards)];

    tabSelecetedCardsSet.forEach((recette) => {
        recette.ingredients.forEach((/** @type {{ ingredientName: string | number; }} */ ingredient) => {
            const ingredientData = data.ingredientsData[ingredient.ingredientName];
            if (ingredientData && ingredientData.category) {
                const categoryName = data.categories[ingredientData.category];
                if (categoryName) {
                    const translatedIngredient = ingredientData.fr;
                    // @ts-ignore
                    if (!LISTE[categoryName]) {
                        // @ts-ignore
                        LISTE[categoryName] = new Set();
                        tabCategories.add(categoryName);
                    }
                    // @ts-ignore
                    LISTE[categoryName].add(translatedIngredient);
                }
            }
        });
    });

    const listeDeCourse = $("#catégories");
    listeDeCourse.empty();

    tabCategories.forEach((category) => {
        const div = $('<div class="categorie">');
        const elem = $("<ul>");
        div.append(elem.append($("<h2>").text(category)));
        // @ts-ignore
        if (LISTE[category]) { // on vérifie si la catégorie est dans la liste
            // @ts-ignore
            LISTE[category].forEach((/** @type {string | number | boolean | ((this: HTMLElement, index: number, text: string) => string | number | boolean)} */ ingredientName) => {
                div.append(elem.append($("<li>").text(ingredientName)));
            });
        }
        listeDeCourse.append(div);
    });
}

/**
 * Returns the action for displaying the shopping list with the provided data.
 *
 * The function returns a callback function that calls the 'showShoppingListAction()' function with the given 'data'.
 *
 * @param {RecipesAndRelatedData} data - The data object containing recipes and categories information.
 * @returns {Function} - The action for displaying the shopping list.
 */
function getShowShoppingListAction(data) {
    return function () {
        showShoppingListAction(data);
    };
}



