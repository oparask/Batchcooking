"use strict";

    //Cache tous les conteneurs au depart
function hideAllContainers() {
    $("#planning-container").hide();
    $("#recipe-container").hide();
    $("#shopping-list-container").hide();
}

//Permet d’afficher le conteneur recipe-container 
function showRecipeAction() {
    hideAllContainers();
    $("#recipe-container").show();
}

//Permet d’afficher le conteneur shopping-list-container
function showShoppingListAction() {
    hideAllContainers();
    $("#shopping-list-container").show();
}

//Permet d’afficher le conteneur planning-container 
function showPlanningAction() {
    hideAllContainers();
    $("#planning-container").show();
}

$(function() {
   //showRecipeAction();
   showPlanningAction();
   //showShoppingListAction();
});
 
