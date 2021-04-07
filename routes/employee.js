const express = require('express');
const {check, validationResult, body} = require('express-validator');
const fs = require('fs');

var employeeRouter = express.Router({mergeParams: true});

employeeRouter
    .get(
        '/getAll', 
        function(request, response){
        
            // get all
            var employees;
            fs.readFile(appRoot + '/data/employee.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                employees = JSON.parse(data);

                response.json(
                    employees
                );

            });

        }
    );

employeeRouter
    .get(
        '/getById',
        function(request, response){
            const errors = validationResult(request);

            if(errors && !errors.isEmpty){
                response.json({ errors: errors.array() });
            }

            var id = request.query.id;

            fs.readFile(appRoot + '/data/employee.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                var employees = JSON.parse(data);
    
                var exists = false;
    
                for (let element of employees) {
                    if(element.id == id){
                        exists = true;
                        break;
                    }
                }
    
                if(exists){
                    
                    employees = employees.filter(emp => emp.id != id);
                    
                    var employees = JSON.parse(data);

                    employee = employees.filter(emp => emp.id == id);
    
                    return response.json(
                        employee
                    );
    
                }
    
                return response.json({
                    success: false,
                    message: "Could not get employee, because there is no such with this id: " + id                    
                });
    
            });

        }
    );

employeeRouter
    .post(
        '/add',
        // [
        //     body("name")
        //         .isEmpty()
        //         .withMessage("No 'name' value has been provided!"),
        //     body("name")
        //         .isLength({
        //             min: 0,
        //             max: 32
        //         })
        //         .withMessage("'name' should be in the range 0-32!"),
        //     body("name")
        //         .not().matches(/^[A-Za-z0-9\s]+$/)
        //         .withMessage("'name' should contain only letters and numbers!"),

        //     body("dob")
        //         .isEmpty()
        //         .withMessage("'dob' should not be empty!"),
        //     body("dob")
        //        .not().isDate({
        //             format: 'dd.MM.YYYY'
        //         })
        //         .withMessage("'dob' should be valid date!"),

        //     body("occupation_id")
        //         .isEmpty()
        //         .withMessage("No 'occupation_id' provided!"),

        //     body("status_id")
        //         .isEmpty()
        //         .withMessage("No 'status_id' provided!")
        // ],
        function(request, response){
            const validation = validationResult(request);

            if(validation.errors && validation.errors.length > 0){
                return response.json(
                    validation.errors
                );
            }

            var name = request.body.name;
            var dob = request.body.dob;
            var occupation_id = request.body.occupation;
            var status_id = request.body.status;
            var other = request.body.other;

            var employee = {
                id: uuidv4(),
                name: name,
                dob: dob,
                occupation_id: occupation_id,
                status_id: status_id,
                other: other
            }

            fs.readFile(appRoot + '/data/employee.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                var employees = JSON.parse(data);

                employees.push(employee);

                fs.writeFile(appRoot + '/data/employee.json', JSON.stringify(employees), (err) => {
                    if (err){
                        throw err;
                    }
                });

                return response.json(
                    employee
                );

            });

        }
    );

employeeRouter
    .post(
        '/update',
        // [
        //     body("id")
        //         .isEmpty()
        //         .withMessage("No 'id' value has been provided!"),

        //     body("name")
        //         .isEmpty()
        //         .withMessage("No 'name' value has been provided!"),
        //     body("name")
        //         .isLength({
        //             min: 0,
        //             max: 32
        //         })
        //         .withMessage("'name' should be in the range 0-32!"),
        //     body("name")
        //         .not().matches(/^[A-Za-z0-9\s]+$/)
        //         .withMessage("'name' should contain only letters and numbers!"),

        //     body("dob")
        //         .isEmpty()
        //         .withMessage("'dob' should not be empty!"),
        //     body("dob")
        //        .not().isDate({
        //             format: 'dd.MM.YYYY'
        //         })
        //         .withMessage("'dob' should be valid date!"),

        //     body("occupation_id")
        //         .isEmpty()
        //         .withMessage("No 'occupation_id' provided!"),

        //     body("status_id")
        //         .isEmpty()
        //         .withMessage("No 'status_id' provided!")
        // ],
        function(request, response){
            const validation = validationResult(request);

            if(validation.errors && validation.errors.length > 0){
                return response.json(
                    validation.errors
                );
            }

            var id = request.body.id;

            fs.readFile(appRoot + '/data/employee.json', 'utf8', function (err, data) {
                if (err){
                    throw err;
                }
                var employees = JSON.parse(data);

                var exists = false;

                for (let element of employees) {
                    if(element.id == id){
                        exists = true;
                        break;
                    }
                }

                if(exists){
                    
                    var name = request.body.name;
                    var dob = request.body.dob;
                    var occupation_id = request.body.occupation;
                    var status_id = request.body.status;
                    var other = request.body.other;
        
                    var employee = {
                        id: id,
                        name: name,
                        dob: dob,
                        occupation_id: occupation_id,
                        status_id: status_id,
                        other: other
                    }

                    employees = employees.filter(emp => emp.id != id);
                    employees.push(employee);
    
                    fs.writeFile(appRoot + '/data/employee.json', JSON.stringify(employees), (err) => {
                        if (err){
                            throw err;
                        }
                    });
    
                    return response.json(
                        {
                            success: true
                        }
                    );

                }

                return response.json({
                    success: false,
                    message: "Could not update employee, because there is no such with this id: " + id    
                });

            });

        }
    );

employeeRouter.route('/delete/:id?')
    .get(function(request, response){
        var id = request.params.id;

        fs.readFile(appRoot + '/data/employee.json', 'utf8', function (err, data) {
            if (err){
                throw err;
            }
            var employees = JSON.parse(data);

            var exists = false;

            for (let element of employees) {
                if(element.id == id){
                    exists = true;
                    break;
                }
            }

            if(exists){
                
                employees = employees.filter(emp => emp.id != id);
                
                fs.writeFile(appRoot + '/data/employee.json', JSON.stringify(employees), (err) => {
                    if (err){
                        throw err;
                    }
                });

                return response.json(
                    {
                        success: true
                    }
                );

            }

            return response.json({
                success: false,
                message: "Could not delete employee, because there is no such with this id: " + id                    
            });

        });

    });

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = employeeRouter;