const express = require('express');
const app = express();
const port = 3005;
const apiVersion = '/api/v1/';
const path = require('path');
const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


global.appRoot = path.resolve(__dirname);

app.listen(port, (err)=>{
    if(err){
        throw err;
    }

    console.log("App running on: " + port);

});

app.set('view engine', 'pug');

app.use('/assets', express.static('assets'));
app.use('/data', express.static('data'));

// employee router

const employeeRouter = require('./routes/employee');
app.use(apiVersion + 'employee', employeeRouter);


// occupation router

const occupationRouter = require('./routes/occupation');
app.use(apiVersion + 'occupation', occupationRouter);


// status router

const statusRouter = require('./routes/status');
app.use(apiVersion + 'status', statusRouter);


// views

app.get('/', (request, response)=>{
    let occupations = fs.readFileSync(appRoot + '/data/occupation.json', 'utf8');
    let statuses = fs.readFileSync(appRoot + '/data/status.json', 'utf8');
    response.render('index', {
        title: "Employee: List",
        occupations: occupations,
        statuses: statuses
    });
});

app.get('/add', (request, response)=>{
    let occupations = fs.readFileSync(appRoot + '/data/occupation.json', 'utf8');
    let statuses = fs.readFileSync(appRoot + '/data/status.json', 'utf8');
    response.render('add', {
        title: "Employee: Create",
        occupations: occupations,
        statuses: statuses
    });
});

app.get('/edit/:id', (request, response)=>{
    let occupations = fs.readFileSync(appRoot + '/data/occupation.json', 'utf8');
    let statuses = fs.readFileSync(appRoot + '/data/status.json', 'utf8');
    response.render('add', {
        title: "Employee: Create",
        action: 'edit',
        id: request.params.id,
        occupations: occupations,
        statuses: statuses
    });
});




