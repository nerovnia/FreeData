/******************************************************
 * Module: Mathematic module
 ******************************************************
 * For project: Free Data
 * Volodymyr Nerovnia (c) 2023
 ******************************************************
 * Under MIT license
 ******************************************************/

 /******************************************************
 * Get rundom integer number
 ******************************************************
 * @name getRandomInt
 * @param max - maximum integer number
 * @return rundom integer number
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max) ?? -1;
}

module.exports = { getRandomInt };