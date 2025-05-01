//The purpose of this code is to: 
//1. Create mongoose schema for database items
//2. Create API endpoints communication between Frontend and backend

//Step 1: Initialize all needed nodejs modules
require('dotenv').config(); //.env file stores sensitive data
const mongoose = require('mongoose'); //Creates data schema
const bP = require('body-parser'); //Processes API requests
const express = require('express'); //Processes API requests
const cors = require('cors'); //Processes API requests
const JWT = require('jsonwebtoken'); //Authentication
const bcrypt = require('bcryptjs'); //Authentication
const { createCompilerHost } = require('typescript');

//Configure
const app = express();
app.use(cors());
app.use(bP.json());

const PORT = 3000;

//Connect to database
mongoose.connect('mongodb://localhost:27017/OnlinePhysicsTutor');
console.log('Connected to database');

//User data schema
const Users = new mongoose.Schema({
    Name: {type: String},
    Email: {type: String},
    Password: {type: String},
    UserType: {type: String, enum: ['admin', 'student']}
});

const UsersM = mongoose.model('UsersM', Users, 'Users'); //Mongoose model

//Registers new users
app.post('/api/auth/register', async(req, res) => {
    //creates new model containing user data
    try {
        const {Name, Email, Password, UserType} = req.body; 
        //Hashes/encrypts password
        const pass = await bcrypt.hash(Password, 10);
        const newuser = new UsersM({Name, Email, Password: pass, UserType});
        await newuser.save();
        res.json({message: 'Registration Successful!'});
    }
    catch(e) {
        res.json({error: 'Registration Error'});
    }
});

//Logs in registered user
app.post('/api/auth/login', async(req, res) => {
    //Searches for email in users collection
    const {Email, Password, UserType} = req.body;
    const user = await UsersM.findOne({Email});
    //If user data is incorrect sends error message
    if(!user || !(await bcrypt.compare(Password, user.Password)) || UserType !== user.UserType) 
        return res.json({message: 'Email or password incorrect'});
    //If user exists creates JWT token allowing access
    const tkn = JWT.sign({userId: user._id, usertype: user.UserType}, 'pass1234', {expiresIn: '1h'});
    res.json({tkn, usertype: user.UserType, message:`Hi, ${user.Name}`});
});

//Get user by email
app.get('/api/users/getbyemail/:email', async(req, res) => {
    try {
        //Finds specific user
        const user = await UsersM.findOne({Email: req.params.email});
        res.json(user);
    }
    catch (e) {
        res.json({e: 'Could not get user'});
    }
})

//Get user by id
app.get('/api/users/getbyid/:id', async(req, res) => {
    try {
        const user = await UsersM.findById(req.params.id);
        res.json(user);
    }
    catch (e) {
        res.json({e: 'Could not find user!'});
    }
})

//Lessons schema
const Lessons = new mongoose.Schema({
    LessonNo: {type: Number},
    Title: {type: String},
    Description: {type: String},
    Content: [
        {
            STitle: {type: String},
            Section: {type: String},
            Animation: {type: Boolean},
            AnimationNo: {type: Number},
            Exercise: {type: Boolean},
            ExerciseNo: {type: Number}
        }
    ],
    Exercises: [
        {
            ExerciseNo: {type: Number},
            MC: {type: Boolean},
            Match: {type: Boolean},
            Calculation: {type: Boolean},
            ExerciseType: {type: String, enum: ['MC', 'calculation', 'matching']},
            ExerciseQ: {type: String},
            AnswerOptions: [{type: String}],
            AnswerArray:[{type: String}],
            ExerciseA: {type: String}
        }
    ]
});

//Lessons model
const LessonsM = mongoose.model('LessonsM', Lessons, 'Lessons');

//Add lessons (Admin Feature)
app.post('/api/lessons/add', async(req, res) => {
    try {
        //Creates new lesson model containing input data
        const lesson = new LessonsM(req.body);
        //Saves data in collection
        await lesson.save();
        //Sends success message
        res.json({message: 'Lesson Successfully Added!'});
    }
    catch (e) {
        //Sends error message
        res.json({e: 'Could not add lesson'});
    }
});

//Update lessons (Admin Feature)
app.put('/api/lessons/append/:id', async(req, res) => {
    try {
        //Finds specific lesson and update with input data
        await LessonsM.findByIdAndUpdate(req.params.id, req.body);
        res.json({message: 'Lesson Successfully Editted!'});
    }
    catch (e) {
        res.json({e: 'Could not update lesson'});
    }
});

//Delete lessons (Admin Feature)
app.delete('/api/lessons/delete/:id', async(req, res) => {
    try {
        await LessonsM.findByIdAndDelete(req.params.id);
        res.json({message: 'Lesson Successfully Removed!'});
    }
    catch (e) {
        res.json({e: 'Could not delete lesson'});
    }
});

//Get lessons for homepage
app.get('/api/lessons/get/all', async(req, res) => {
    try {
        const lessons = await LessonsM.find();
        res.json(lessons);
    }
    catch (e) {
        res.json({e: 'Could not fetch items'});
    }
});

//Get specific lesson for lesson page
app.get('/api/lessons/getbyid/:id', async(req, res) => {
    try {
        const lesson = await LessonsM.findById(req.params.id);
        res.json(lesson);
    }
    catch (e) {
        res.status(500).json({e: 'Could not fetch lesson'});
    }
});


//Quiz Schema
const Quizzes = new mongoose.Schema({
    LessonID: {type: mongoose.Schema.Types.ObjectID},
    Questions: [
        {
            QType: {type: String},
            Instructions: {type: String},
            Options: [{type: String}],
            CorrectAns: {type: String},
            Hints: [{type: String}]
        }
    ]
})

//Quiz model
const QuizzesM = mongoose.model('QuizzesM', Quizzes, 'Quizzes');

//Create Quiz (Admin Feature)
app.post('/api/quiz/add', async(req, res) => {
    try {
        let quiz = new QuizzesM(req.body);
        await quiz.save();
    }
    catch (e) {
        res.status(500).json({e: 'Could not save quiz'});
    }
})

//Update Quiz (Admin Feature)
app.put('/api/quiz/append/:id', async(req, res) => {
    try {
        await QuizzesM.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({message: 'Quiz Successfully Editted!'});
    }
    catch (e) {
        res.status(500).json({e: 'Could not update quiz'});
    }
})

//Check for quiz (Admin Feature)
app.get('/api/quiz/check/:id', async(req, res) => {
    try {
        let quiz = await QuizzesM.findOne({LessonID: req.params.id});
        if (quiz) {
            res.json(true);
        }
        else {
            res.json(false);
        }

    }
    catch (e) {
        res.status(500).json({e: 'Could not fulfill request'});
    }
})

//Get quiz by lesson id
app.get('/api/quiz/getbyid/:lessid', async(req, res) => {
    try {
        let quiz = await QuizzesM.findOne({LessonID: req.params.lessid});
        res.json(quiz);
    }
    catch (e) {
        res.status(500).json({e: 'Quiz could not be found'});
    }
})

//Get quiz by quiz id (Used at the results page to reattempt quiz)
app.get('/api/quiz/getbyqid/:quizid', async(req, res) => {
    try {
        const quiz = await QuizzesM.findById(req.params.quizid);
        res.json(quiz);
    }
    catch(e) {
        res.json({e: 'Could not find quiz'});
    }
})

//Delete quiz by ID
app.delete('/api/quiz/delete/:id', async(req, res) => {
    try {
        await QuizzesM.findByIdAndDelete(req.params.id);
        res.status(201).json({message: 'Quiz successfully deleted!'});
    }
    catch (e) {
        res.status(500).json({e: 'Could not remove quiz'});
    }
})

//LessonsAttemptedSchema
const LessonsAttempts = new mongoose.Schema({
    UserID: {type: mongoose.Schema.Types.ObjectId},
    LessonNo: {type: Number},
    DateStarted: {type: Date},
    DateCompleted: {type: Date},
    Result: {type: Number}
});

//LessonsAttempted Model
const LAttemptedM = mongoose.model('LAttemptedM', LessonsAttempts, 'LessonsAttempts');

//Start lesson
app.post('/api/lessons/loglesson', async(req, res) => {
    try {
        const {UserID, LessonNo, DateStarted} = req.body;
        //Saves Completion date as null to show the log is incomplete
        const DateCompleted = null;
        const newAttempt = new LAttemptedM({UserID, LessonNo, DateStarted, DateCompleted});
        await newAttempt.save();
        res.json(newAttempt._id);
    }
    catch (e) {
        res.status(500).json({e: 'Could not save attempt'});
    }
});

//Check all lessons for user attempt
app.post('/api/lessons/checklog', async(req, res) => {
    try {
        const {UserID, LessonNo} = req.body;
        const log = await LAttemptedM.find({UserID, LessonNo});
        //If log exists and lesson not completed
        if (log) {
            //Uses let to allow for reassignment later on
            let logincomplete = false;
            let logid = '';
            //Iterate through logs to find latest incomplete one
            log.forEach(item => {
                if(!item.toObject().DateCompleted) {
                    logincomplete = true;
                    logid = item.toObject()._id.toString();
                }
            })
            //If there is an incomplete log the client is alerted and the logid is sent to be updated
            if (logincomplete) {
                console.log(logid);
                res.json({Response: true ,logid: logid});
            }
            //Else the client is told that all logs are completed
            else {
                res.json(false);
            }
        }
        //If there is no log
        else if (!log) {
            res.json(false);
        }
    }
    catch (e) {
        res.status(500).json({e: 'Could not check database'});
    }
});

//Complete lesson
app.post('/api/lessons/complete/:id', async(req, res) => {
    //Updates latest incomplete log with Completion date
    try {
        await LAttemptedM.findByIdAndUpdate(req.params.id, req.body);
    }
    catch (e) {
        res.status(500).json({e: 'Could not complete log'});
    }
})

//Get highest quiz score
app.post('/api/lessons/getlog', async(req, res) => {
    try {
        const {UserID, LessonNo} = req.body;
        //Gets the attempt with the highest score (limits response to only one)
        const highestScore = await LAttemptedM.findOne({UserID, LessonNo}).sort({Result: -1}).limit(1);

        //If no attempt found returns null
        if (!highestScore) {
            return res.json({result: null});
        }
        //Else returns the highest score
        res.json({result: highestScore.Result});
    }
    catch (e) {
        res.json({e: 'Could not complete request'});
    }
})

//Exercises Attempted Schema
const ExercisesAttempted = new mongoose.Schema({
    UserID: {type: mongoose.Schema.Types.ObjectId},
    LessonNo: {type: Number},
    ExerciseNo: {type: Number},
    Score: {type: Number},
    DateAttempted: {type: Date}
});

//Exercises Attempted model
const EAttemptsM = mongoose.model('EAttemptsM', ExercisesAttempted, 'ExercisesAttempted');

//Mark Exercise

//Submit exercise answers
app.post('/api/lessons/exercise', async(req, res) => {
    try {
        const exercise = new EAttemptsM(req.body);
        await exercise.save();
        console.log('Attempt recieved');
    }
    catch (e) {
        res.status(500).json({e: 'Could not recieve exercise attempt'});
    }
});

//Quizzes Attempted Schema
const QuizzesAttempted = new mongoose.Schema({
    UserID: {type: mongoose.Schema.Types.ObjectId},
    QuizID: {type: mongoose.Schema.Types.ObjectId},
    Answers: [{type: String}],
    DateAttempted: {type: Date},
    Result: {type: Number}
});

//Quizzes Attempted Model
const QAttemptedM = mongoose.model('QAttemptedM', QuizzesAttempted, 'QuizAttempts');

//Submit Quiz (Student) Logs result
app.post('/api/quiz/attempt', async(req, res) => {
    try {
        const quiz = new QAttemptedM(req.body);
        const attempt = await quiz.save();
        //Responds with log id for reference by the student
        res.status(201).json({message: 'Quiz logged!', id: attempt._id});
    }
    catch (e) {
        res.status(500).json({e: 'Could not complete request'});
    }
    
})

//Get quiz attempt
app.get('/api/quiz/getattempt/:id', async(req, res) => {
    try {
        const quiz = await QAttemptedM.findById(req.params.id);
        res.json(quiz);
    }
    catch (e) {
        res.status(500).json({e: 'Process could not be completed'});
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));