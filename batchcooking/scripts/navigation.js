"use strict";

/**
 * Allows to display the container recipe-container.
 */
function showRecipeAction() {
    $("#planning-container").addClass("hide");
    $("#shopping-list-container").addClass("hide");
    $("#recipe-container").removeClass("hide");
    $("title").text("Recipe");
}

/**
 * Affiche la liste de courses en masquant le planning et les cartes qui contiennent les recettes.
 * @param {RecipesAndRelatedData} data
 */
function showShoppingListAction(data) {
    $("#planning-container").addClass("hide");
    $("#recipe-container").addClass("hide");
    $("#shopping-list-container").removeClass("hide");
    $("title").text("Shopping list");
    fillShoppingList(data);
}



/**
 * Allows to display the container planning-container.
 */
function showPlanningAction() {
    $("#recipe-container").addClass("hide");
    $("#shopping-list-container").addClass("hide");
    $("#planning-container").removeClass("hide");
    $("title").text("Planning");
}

/**
 * Allows to displays the main page which is the planning;
 */
function navigationButton() {
    $(".back-nav").on("click", () => {
        showPlanningAction();
    });
}


/**
 * Main function.
 */
$(function () {
    //showRecipeAction();
    showPlanningAction();
    //showShoppingListAction();
    navigationButton();
});



