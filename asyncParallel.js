'use strict';

const async = require('async');
const _ = require('lodash');
const moment = require('moment');

var stack = [];

let functionOne = (cb) => {
    try {
        if (Math.random() < 0.75) {
            return cb(null, 'First Function Result');
        }
        else {
            throw 'Error functionOne';
        }
    }
    catch (err) {
        return cb(err, null);
    }
};

let functionTwo = (cb) => {
    try {
        if (Math.random() < 0.75) {
            return cb(null, 'Second Function Result');
        }
        else {
            throw 'Error functionTwo';
        }
    }
    catch (err) {
        return cb(err, null);
    }
};

let functionThree = (cb) => {
    try {
        if (Math.random() < 0.75) {
            return cb(null, 'Third Function Result');
        }
        else {
            throw 'Error functionThree';
        }
    }
    catch (err) {
        return cb(err, null);
    }
};

stack.push(functionOne);
stack.push(functionTwo);
stack.push(functionThree);

async.parallel(stack, (err, resolve) => {
    if (err) {
        console.log(`Error: ${err}`);
        return;
    }

    console.log(resolve);
});
