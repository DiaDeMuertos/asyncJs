'use strict';

const async = require('async');
const _ = require('lodash');
const moment = require('moment');

let counter = 0;

let testCondition = () => {
    return counter < 5;
};

let increaseCounter = (cb) => {
    counter++;
    console.log(`Counter is now ${counter}`);

    setTimeout(()=>{
        if(Math.random()<0.90){
            return cb();
        }

        return cb('err');
    }, 1000);
};

async.whilst(testCondition,increaseCounter,function cb(err){
    if(err){
        console.log(err);
        return;
    }

    console.log('Job complete');

});