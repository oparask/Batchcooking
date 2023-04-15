"use strict";

/**
 * Hide all containers on departure.
 */
function hideAllContainers() {
    $("#planning-container").hide();
    $("#recipe-container").hide();
    $("#shopping-list-container").hide();
}

/**
 * Allows to display the container recipe-container.
 */
function showRecipeAction() {
    hideAllContainers();
    $("#recipe-container").show();
    $("title").text("Recipe");
}

/**
 * Allows to display the shopping-list-container.
 */
function showShoppingListAction() {
    hideAllContainers();
    $("#shopping-list-container").show();
    $("title").text("Shopping list");
}

/**
 * Allows to display the container planning-container.
 */
function showPlanningAction() {
    hideAllContainers();
    $("#planning-container").show();
}
/**
 * Main function.
 */
$(function () {
    //showRecipeAction();
    //showPlanningAction();
    showShoppingListAction();
});

