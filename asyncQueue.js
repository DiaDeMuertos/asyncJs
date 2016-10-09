'use strict';

const async = require('async');
const _ = require('lodash');
const moment = require('moment');

let taskList = _.times(10, _.uniqueId.bind(null, 'task_'));

let taskQueue = async.queue((task, cb) => {
    console.log(`Performing task: ${task.name} ${task.event}`);
    console.log(`Waiting to be processed: ${taskQueue.length()}`);
    console.log('----------------------------------------------');

    setTimeout(() => {
        return cb();
    }, 1000);
}, 1);

taskQueue.drain = () => {
    console.log('All items have been processed.');
};

_.forEach(taskList, (task) => {
    taskQueue.push({ 'name': task, 'event': moment().format('YYYY-MM-DD HH:mm:ss') }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('DONE....');
        }
    });
});

taskQueue.unshift({ 'name': 'Most importan task', 'event': moment().format('YYYY-MM-DD HH:mm:ss') });

