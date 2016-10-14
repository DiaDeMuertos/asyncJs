'use strict';

const async = require('async');
const _ = require('lodash');
const moment = require('moment');

let addFive = (num, cb) => {
    try {
        return cb(null, num + 5);
    }
    catch (err) {
        return cb(err, null);
    }
};

let timesTen = (num, cb) => {
    try {
        return cb(null, num * 10);
    }
    catch (err) {
        return cb(err, null);
    }
};

let calculate = async.compose(addFive, timesTen);

calculate(5, (err, resolve) => {
    console.log(resolve);
});