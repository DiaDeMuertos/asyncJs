'use strict';

const async = require('async');
const _ = require('lodash');
const moment = require('moment');

let targetNumber = 0;

let checkIfDone = (next) => {
    targetNumber++;

    if (targetNumber === 5000) {
        next('Target number reached....stopping forever');
    }
    else {
        console.log(`Increasing targetNumber ${targetNumber + 1}`);
        next();
    }
};

let finished = (err) => {
    if (err) {
        console.log(err);
    }
};


async.forever(checkIfDone, finished);

