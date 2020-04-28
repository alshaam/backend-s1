'use strict';

var express = require("express");
var app = express();
var cors = require('cors')

var db = require('./db');

var jsonParse = require("body-parser").json;
var logger = require('morgan');

app.use(cors());
app.use(logger('dev'));
app.use(jsonParse());
// get all meals
app.get('/meals', function(req, res, next){
    db.query("SELECT * FROM meal", (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


//get one meal
app.get('/meals/:id', function(req, res, next){
    db.query("SELECT * FROM meal WHERE mealId = ?", [req.params.id],(err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


//delete one meal
app.delete('/meals/:id', function(req, res, next){
    db.query("DELETE FROM meal WHERE mealId = ?", [Number(req.params.id)],(err, rows, fields) => {
        if(!err)
        res.send("Deleted successfully");
        else
        console.log(err);
    })
});


//create meal
app.post('/meals', function(req, res, next){
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      dp.query('INSERT INTO meal SET ?', req.body, (error, result) => {
        if (error) throw error;
 
        res.status(201).send(` added with ID: ${result.insertId}`);
    });
});

//Update meal
app.put('/meals/:id', function(req, res, next){
    const id = req.params.id;
 
    db.query('UPDATE meal SET ? WHERE id = ?', [req.body, id], (error, result) => {
        if (error) throw error;
 
        res.send('User updated successfully.');
    });
});


var port = process.env.port || 3000;

app.listen(port);