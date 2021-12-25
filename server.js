// modules =================================================
const express = require('express');
var mongoose = require('mongoose');
const app = express();

const port = 3000;

app.use(express.static(__dirname + '/public'));

var db = require('./config/db');
console.log("connecting--", db);
mongoose.connect(db.url);
// startup our app at http://localhost:3000

//defining route
app.get('/route', function (req, res) {
    res.send('This is routing for the application developed using Node and Express...');
});

var Student = require('./app/models/students');
// define our students model
app.get('/api/students', function (req, res) {
    Student.find(function (err, students) {
        if (err)
            res.send(err);
        res.json(students);
    })
})

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// set up BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.post('/api/students/add', function (req, res) {
    var student = new Student(); // create a new instance of the student model
    student.place = req.body.place;
    student.name = req.body.name;
  
    student.lastname = req.body.lastname; // set the student name (comes from the request)
    student.birthday = req.body.birthday ; // set the student name (comes from the request)
    student.group = req.body.group ; // set the student name (comes from the request)
    student.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'student created!' });
    });
});

app.get('/api/students', function (req, res) {
    // use mongoose to get all students in the database
    Student.find(function (err, students) {
        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);
        res.json(students); // return all students in JSON format
    });
});

app.delete('/api/students/:id', function (req, res) {
    Student.remove({
        _id: req.params.id
    }, function (err, bear) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

/////////////////////////////////////////////////////////////////////////////
var Group = require('./app/models/groups');
// define our students model
app.get('/api/groups', function (req, res) {
    Group.find(function (err, groups) {
        if (err)
            res.send(err);
        res.json(groups);
    })
})

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// set up BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.post('/api/groups/add', function (req, res) {
    var group = new Group(); // create a new instance of the student model
    group.name = req.body.name;
    group.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'group created!' });
    });
});

app.get('/api/groups', function (req, res) {
    // use mongoose to get all students in the database
    Group.find(function (err, groups) {
        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);
        res.json(groups); // return all students in JSON format
    });
});

app.delete('/api/groups/:id', function (req, res) {
    Group.remove({
        _id: req.params.id
    }, function (err, bear) {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted group' });
    });
});

// module.exports allows us to pass this to other files when it
//is called
app.listen(port, () => console.log('Example app listening on port ${port}!'));

// module.exports = mongoose.model('Student', {
//  name : {type : String, default: ''}
// });