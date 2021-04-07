const express = require('express');
const {check, validationResult, body} = require('express-validator');
const fs = require('fs');

var statusRouter = express.Router();

statusRouter
    .get(
        '/getAll', 
        function(request, response){
        
            // get all
            var statuses;
            fs.readFile(appRoot + '/data/status.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                statuses = JSON.parse(data);

                return response.json(
                    statuses
                );

            });

        }
    );

statusRouter
    .get(
        '/getById',
        function(request, response){

            var id = request.query.id;

            fs.readFile(appRoot + '/data/status.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                var statuses = JSON.parse(data);

                var exists = false;

                for (let element of statuses) {
                    if(element.id == id){
                        exists = true;
                        break;
                    }
                }

                if(exists){
                    
                    statuses = statuses.filter(emp => emp.id != id);
                    
                    var statuses = JSON.parse(data);

                    status = statuses.filter(emp => emp.id == id);
    
                    return response.json(
                        status
                    );
    
                }
    
                return response.json({
                    success: false,
                    message: "Could not get status, because there is no such with this id: " + id                    
                });

            });

        }
    );

module.exports = statusRouter;