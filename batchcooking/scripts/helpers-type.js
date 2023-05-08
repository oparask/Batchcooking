"use strict";

/**
 * @typedef {Object} RecipesAndRelatedData Liste des recettes et données associées.
 * @property {Object<string, string>} units Description des unités utilisées dans les recettes.
 * @property {Object<string, string>} categories Description des catégories relatives aux ingrédients.
 * @property {Object<string, string>} intakes Description des apports nutritionnels.
 * @property {Object<string, IngredientData>} ingredientsData
 * @property {Recipe[]} recipes La liste des recettes.
 */

/**
 * @typedef {Object} IngredientData Description d'un ingrédient.
 * @property {string} fr Nom de l'ingrédient en français.
 * @property {string} category Catégorie de l'ingrédient.
 * @property {Supplie[]} intakes Apports nutritionnels de l'ingrédient.
 */

/**
 * @typedef {Object} Recipe Description d'une recette.
 * @property {string} recipeName Nom de la recette.
 * @property {string} imageLink Lien vers une image représentant la recette.
 * @property {string} link Lien vers la source de la recette.
 * @property {number} qp Nombre de personnes comptées pour la quantité d'ingrédients.
 * @property {Array<Ingredient | IngredientWithQuantity>} ingredients Liste des ingrédients nécessaires à la recette.
 * @property {string[]} steps Marche à suivre pour réaliser la recette.
 */

/**
 * @typedef {"proteins" | "starches" | "vegetables"} Supplie Apports nutritionnels existants.
 */

/**
 * @typedef {Object} Ingredient Ingrédient d'une recette sans quantité précise.
 * @property {string} ingredientName Nom de l'ingrédient.
 */

/**
 * @typedef {Object} IngredientWithQuantity Ingrédient d'une recette avec une quantité.
 * @property {string} ingredientName Nom de l'ingrédient.
 * @property {number} quantity Quantité de l'ingrédient nécessaire à la recette.
 * @property {string} unit Unité de mesure de la quantité.
 */
