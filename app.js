/**
 * example use of express. under construction is an app which listens for
 *  messages in the form of new badges earned from www.codeschool.com, and
 *  sends them to a subsocket.
 *  
 * Uses express (lightweight node 'framework'), axon (message socket library),
 *  underscore (helper library (@see badges.js)), and redis (key val storage).
 *  
 */
'use strict';

var express = require('express'); // import express library
var app     = express();          // create instance of express
var badges  = require('./controllers/badges');

// app.use() declares middleware for the request before routing occurrs
//  express.json() causes the request body to be parsed as JSON
app.use(express.json());

// route for POST request to '/'
//  'badges.save' and 'badges.send' represent middleware and method
//    (i.e., "controller"."action"). the save() method will be evoked on
//    request. when save() completes, the request will pass through send().
app.post('/', badges.save, badges.send, function(req, res) {
    res.send("\nrequest success, response complete\n\n");
});

app.get('/badges', badges.get);

// the following is an example of a view render, if this app were doing
//  more than parsing JSON.
// app.post('/', badges.save, badges.send, function(req, res){ // (request, response)
//     // res.render('dashboard'); // render a view
// });

// listen for requests to this server on port 8000
app.listen(8000, function() {
    console.log('Server is listening on port %d...', 8000);
});