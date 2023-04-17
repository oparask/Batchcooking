/**
 * @typedef {Object} RecipesAndUnits Liste des recettes et les unités de mesures utilisées.
 * @property {Object<string, string>} units Description des unités utilisées dans les recettes.
 * @property {Recipe[]} recipes La liste des recettes.
 */

/**
 * @typedef {Object} Recipe Description d'une recette.
 * @property {string} recipeName Nom de la recette.
 * @property {string} imageLink Lien vers une image représentant la recette.
 * @property {Supplie[]} supplies Liste des apports nutritionnels pour la recette.
 * @property {string} link Lien vers la source de la recette.
 * @property {number} qp Nombre de personnes comptées pour la quantité d'ingrédients.
 * @property {Array<Ingredient | IngredientWithQuantity>} ingredients Liste des ingrédients nécessaires à la recette.
 * @property {string[]} steps Marche à suivre pour réaliser la recette.
 */

/**
 * @typedef {"proteins" | "starches" | "vegetables"} Supplie Apports nutritionnels existants.
 */

/**
 * @typedef {Object} Ingredient Description d'un ingrédient.
 * @property {string} ingredientName Nom de l'ingrédient.
 */

/**
 * @typedef {Object} IngredientWithQuantity Description d'un ingrédient avec une quantité.
 * @property {string} ingredientName Nom de l'ingrédient.
 * @property {string} quantity Quantité de l'ingrédient nécessaire à la recette.
 * @property {string} unit Unité de mesure de la quantité.
 */
