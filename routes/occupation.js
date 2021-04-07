const express = require('express');
const {check, validationResult, body} = require('express-validator');
const fs = require('fs');

var occupationRouter = express.Router();

occupationRouter
    .get(
        '/getAll', 
        function(request, response){
        
            // get all
            var occupations;
            fs.readFile(appRoot + '/data/occupation.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                occupations = JSON.parse(data);

                return response.json(
                    occupations
                );

            });

        }
    );

occupationRouter
    .get(
        '/getById',
        function(request, response){

            var id = request.query.id;

            fs.readFile(appRoot + '/data/occupation.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                var occupations = JSON.parse(data);

                var exists = false;

                for (let element of occupations) {
                    if(element.id == id){
                        exists = true;
                        break;
                    }
                }

                if(exists){
                    
                    occupations = occupations.filter(emp => emp.id != id);
                    
                    var occupations = JSON.parse(data);

                    occupation = occupations.filter(emp => emp.id == id);
    
                    return response.json(
                        occupation
                    );
    
                }
    
                return response.json({
                    success: false,
                    message: "Could not get occupation, because there is no such with this id: " + id                    
                });

            });

        }
    );

module.exports = occupationRouter;