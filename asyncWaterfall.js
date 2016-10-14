'use strict';

const async = require('async');
const _ = require('lodash');
const moment = require('moment');

var stack = [];

let functionOne = (cb) => {
    try {
        if (Math.random() < 0.75) {
            return cb(null, 'Param to the next function');
        }
        else {
            throw 'Error functionOne';
        }
    }
    catch (err) {
        return cb(err, null);
    }
};

let functionTwo = (paramFromFunctionOne, cb) => {
    try {
        if (Math.random() < 0.75) {
            return cb(null, `Param from functionOne was: ${paramFromFunctionOne}`);
        }
        else {
            throw 'Error functionTwo';
        }
    }
    catch (err) {
        return cb(err, null);
    }
};

stack.push(functionOne);
stack.push(functionTwo);

async.waterfall(stack, (err, resolve) => {
    if (err) {
        console.log(`Error: ${err}`);
        return;
    }

    console.log(resolve);
});