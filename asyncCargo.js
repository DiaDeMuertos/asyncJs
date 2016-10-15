'use strict';

const async = require('async');
const _ = require('lodash');
const moment = require('moment');

let taskList = _.times(10, _.uniqueId.bind(null, 'task_'));

let taskCargo = async.cargo((tasks, cb) => {
    _.each(tasks, (task)=>{
        console.log(`Working on ${task.name}`);
    });

    try{
        if(Math.random()<=0.75){
            return cb(null, 'Done');
        }
        else{
            throw ('error');
        }        
    }
    catch(err){
        return cb(err, null);
    }

}, 3);

_.each(taskList, (task) => {
    taskCargo.push({ 'name': task }, (err) => {
        if(err){
            console.log(`Error ${err}`);
            return;
        }
        
        console.log(`Task ${task} is done`);
    });
});