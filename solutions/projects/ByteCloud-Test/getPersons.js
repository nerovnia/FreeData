/******************************************************
 * Utilite: Test data provider
 ******************************************************
 * For project: Medicine Application
 * Volodymyr Nerovnia (c) 2023
 ******************************************************
 * Under MIT license
 ******************************************************/

const names = require('../../../en/person/names');
const longListSurnames = require('../../../en/person/surnames');
const { getRandomInt } = require('../../../utilites/math');
const person = require('../../../utilites/person');
const { saveFile } = require('../../../utilites/file');

// Change this constant, and set count of persons what do you want to get
const maxSurnames = 100;
const maxPatients = 400;
const maxDoctors = 50;

const startShiftHour = 6;
const shiftDuration = 14;

const pathToBuildDirectory = './solutions/projects/ByteCloud-Test/build/';
const nameResultJSONFile = 'right-data.json' 

const resultReestr = {};

const surnames = person.getUnsortedNumberOfSurnames(longListSurnames, maxSurnames);

// It separates male and femaile names
const male_names = person.getPersonsWithFullNames(person.filterNames(names, 'M'), surnames);
const female_names = person.getPersonsWithFullNames(person.filterNames(names, 'F'), surnames);

// patient's and doctor's names
let patients = male_names.slice(0, Math.ceil(maxPatients / 4)).concat(female_names.slice(Math.ceil(maxPatients / 4), maxPatients))
let doctors = male_names.slice(0, Math.ceil(maxDoctors / 4)).concat(female_names.slice(Math.ceil(maxDoctors / 4), maxDoctors));

// Create set of random positions in patients array
const idsPatientsSet = new Set();
for(i=0; idsPatientsSet.size <= patients.length ; i++) {
  idsPatientsSet.add(getRandomInt(patients.length * 2));
}

// Create set of random positions in doctors array
const idsDoctorsSet = new Set();
for(i=0; idsDoctorsSet.size <= doctors.length ; i++) {
  idsDoctorsSet.add(getRandomInt(doctors.length * 2) + patients.length * 2);
}

// Get iterators for doctor's and patient's sets
const it_idsPat = idsPatientsSet.values();
const it_idsDoc = idsDoctorsSet.values();

// Get doctor's and patient's objects with all properties
resultReestr.patients = person.fillPersonAdditionalParams(patients, it_idsPat, startShiftHour, shiftDuration);
resultReestr.doctors = person.fillPersonAdditionalParams(doctors, it_idsDoc, startShiftHour, shiftDuration);

saveFile(pathToBuildDirectory, nameResultJSONFile, JSON.stringify(resultReestr));
