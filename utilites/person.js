/******************************************************
 * Module: Test data compilator
 ******************************************************
 * For project: Medicine Application-Test
 * Volodymyr Nerovnia (c) 2023
 ******************************************************
 * Under MIT license
 ******************************************************/

const { getRandomInt } = require('./math');

/******************************************************
 * Get the number of random English surnames
 ******************************************************
 * @name getUnsortedNumberOfSurnames
 * @param maxNumber - number of surnames which will be return
 * @return array person's card objects with parameters: id, hours, birthDate, name
 */
function getUnsortedNumberOfSurnames(surnames, maxNumber) {
  const surSet = new Set();
  const surnamesLength = surnames.length;

  while (surSet.size < maxNumber) {
    surSet.add(getRandomInt(surnamesLength - 1));
  }

  const newListSurnames = [];
  surSet.forEach(index => newListSurnames.push(surnames.at(index))); 

  return newListSurnames;
}

/******************************************************
 * Get person's card
 ******************************************************
 * @name fillPersonAdditionalParams
 * @param persons - 
 * @param it - Set iterator 
 * @return person's card with parameters: id, hours, birthDate, name
 */
function fillPersonAdditionalParams(persons, it) {

  return persons.map(patient => {
    patient.id = it.next().value;
    patient.hours = `${getRandomInt(14) + 6}-${getRandomInt(14) + 6}`;
    const month = (getRandomInt(11) + 1).toString().padStart(2, '0');
    const day = ((month === 2) ? getRandomInt(27) + 1 : getRandomInt(29) + 1).toString().padStart(2, '0');
    patient.birthDate = `${day}.${month}.${new Date().getFullYear() - getRandomInt(93)}`;

    return patient;
  })
}

/******************************************************
 *  Filter names by gender
 ******************************************************
 * @name filterNames
 * @param names - array of names to filter
 * @param gender - gender
 * @return array of gender-appropriate names
 */
function filterNames(names, gender) {

  return names.filter((name) => name.gender === gender)
}

/******************************************************
 *  Compile test person data with name and surname
 ******************************************************
 * @name getPersonsWithFullNames
 * @param names - array of person names
 * @param surnames - array of person surnames
 * @return array person's objects 
 */
 function getPersonsWithFullNames(names, surnames) {
  
  return names.map(name => { 
    const rand = getRandomInt(surnames.length-1);
  
    return {
      name: name.name,
      surname: surnames.at(rand)
    };
  });
}

module.exports = { 
  getUnsortedNumberOfSurnames, 
  fillPersonAdditionalParams, 
  filterNames, 
  getPersonsWithFullNames 
};