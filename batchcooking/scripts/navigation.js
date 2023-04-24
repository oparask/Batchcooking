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
 * Allows to display the shopping-list-container.
 */
function showShoppingListAction() {
    $("#planning-container").addClass("hide");
    $("#recipe-container").addClass("hide");
    $("#shopping-list-container").removeClass("hide");
    $("title").text("Shopping list");
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
