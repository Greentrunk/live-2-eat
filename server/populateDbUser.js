#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

import mongoose from 'mongoose';
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

import User from './models/User.js';

// Create food and save to database
const createUser = async () => {
    const newUser = new User();
    try {
        await newUser.save();
        console.log('User saved');
    } catch (err) {
        console.log(err);
    }
}

// Loop through array and upload
for (let i=0; i<10; i++) {
    createUser();
}

console.log('Upload Complete!');