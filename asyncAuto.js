'use strict';

const async = require('async');
const _ = require('lodash');
const moment = require('moment');

async.auto(
    {
        'get_username': (cb) => {
            console.log('In get_username');
            return cb(null, 'Zhi');
        },
        'connect_to_db': (cb) => {
            let connected = true;

            console.log('In connet_to_db');

            if (connected) {
                connected = true;
                return cb(null, connected);
            }
            else {
                return cb('Error connection to DB', null);
            }
        },
        'check_if_user_exit': ['get_username', 'connect_to_db', (results, cb) => {
            console.log('In check_if_user_exit', JSON.stringify(results));
            let userExists = false;

            if (userExists) {
                return cb('User already exists in db', null);
            }
            else {
                setTimeout(() => {
                    return cb(null, userExists);
                }, 1000);
            }

        }],
        'sign_up': ['check_if_user_exit', (results, cb) => {
            console.log('In sign_up', JSON.stringify(results));

            let username = results.get_username;
            let isDBConnected = results.connect_to_db;
            let userExists = results.check_if_user_exit;

            if (username && isDBConnected && !userExists) {
                return cb(null, { 'status': '200', 'msg': 'Seccessfully signed up user' });
            }
            else {
                return cb('Error signing up user', null);
            }

        }],
    }, (err, resolve) => {
        if (err) {
            console.log(`Error ${err}`);
        }
        else {
            console.log(`results ${JSON.stringify(resolve)}`);
        }
    }
);

