/*********************************************************************************
*  BTI425 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nishi Bipin Mehta Student ID: 152417218 Date: 19/01/2023
*  Cyclic Link: 
*
********************************************************************************/ 

const express = require('express');
const path = require('path');
const cors = require("cors");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(cors());
require('dotenv').config();
app.use(express.json())

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
    }).catch((err)=>{
    console.log(err);
    });


    app.get("/", (req,res) => {
        res.sendFile(path.join(__dirname, "/index.html"));
      });


    app.post("/api/movies",(req,res)=>{
        db.addNewMovie(req.body)
        .then(() => {
                res.status(201).json(`new movie successfully added`);
            })
        .catch((err) => {
                res.status(404).json(err);
            });
        });


    app.get("/api/movies",(req,res)=>{
        db.getAllMovies(req.query.page,req.query.perPage,req.query.title)
        .then((movies) => {
                res.status(200).json(movies);
            })
        .catch((err) => {
                res.status(404).json(err);
            });
        });

    app.get("/api/movies/:id",(req,res)=> {
        db.getMovieById(req.params.id)
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
    });

    app.put("/api/movies/:id",(req,res)=> {
        db.updateMovieById(req.params.id)
        .then(() => {
            res.status(200).json('movie successfully updated');
        })
        .catch((err) => {
            res.status(404).json(err);
        });
    });

    app.delete("/api/movies/:id",(req,res)=> {
        db.deleteMovieById(req.params.id)
        .then(() => {
            res.status(204).json('movie successfully deleted');
        })
        .catch((err) => {
            res.status(404).json(err);
        });
    });