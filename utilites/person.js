/******************************************************
 * Module: Functions for working with personal data
 ******************************************************
 * For project: Free data
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

/******************************************************
 * Get person's card
 ******************************************************
 * @name fillPersonAdditionalParams
 * @param persons - array of persons
 * @param it - person Set iterator 
 * @param startShiftHour - an hour from shift is start  
 * @param shiftDuration - shift duration
 * @param minAvaluableHours - a minimum the number of hours than person is available
 * @param maxAvaluableHours - a maximum the number of hours than person is available
 * @param personStartOld - starting age that a person can have today
 * @param personEndOld - age limit that a person can have today
 * @return person's card with parameters: id, hours, birthDate, name
 */
 function fillPersonAdditionalParams(persons, it, startShiftHour, shiftDuration, minAvaluableHours, maxAvaluableHours, personStartOld, personEndOld) {
  return persons.map(patient => {
    patient.id = it.next().value;

    if (minAvaluableHours > shiftDuration) {
      minAvaluableHours = shiftDuration - 1;
    }
    if (maxAvaluableHours > shiftDuration) {
      maxAvaluableHours = shiftDuration;
    }
    if (minAvaluableHours > maxAvaluableHours) {
      [minAvaluableHours, maxAvaluableHours] = [maxAvaluableHours, minAvaluableHours];
    }
    const realShiftDuration = getRandomInt(maxAvaluableHours - minAvaluableHours) + minAvaluableHours;
    const startHour = getRandomInt(shiftDuration - realShiftDuration) + startShiftHour;
    const endHour = startHour + realShiftDuration;
    patient.hours = `${startHour}-${endHour}`;
    const month = (getRandomInt(11) + 1).toString().padStart(2, '0');
    const day = ((month === 2) ? getRandomInt(27) + 1 : getRandomInt(29) + 1).toString().padStart(2, '0');
    patient.birthDate = `${day}.${month}.${new Date().getFullYear() - personStartOld - getRandomInt(personEndOld - personStartOld)}`;

    return patient;
  })
}

module.exports = { 
  getUnsortedNumberOfSurnames, 
  fillPersonAdditionalParams, 
  filterNames, 
  getPersonsWithFullNames 
};