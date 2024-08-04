require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');

// imported routes
const stuedntRoutes = require('./routes/StudentRouter');
const teacherRoutes = require('./routes/TeacherRouter');
const facultyRoutes = require('./routes/FacultyRouter');
const answerRoutes = require('./routes/AnswerRouter');
const departmentRoutes = require('./routes/DepartmentRouter');
const questionRoutes = require('./routes/QuestionRouter');
const subjectRoutes = require('./routes/SubjectRouter');
const subjectCardRoutes = require('./routes/SubjectCardsRouter');
const authRouter = require('./routes/AuthRouter');

const app = new express();

// enabaling json passing
app.use(express.json({ extended: true }));

app.use(cors());
// register studnet routes
app.use('/subject-cards', subjectCardRoutes);
// register students routes
app.use('/students', stuedntRoutes);
// register teacher routes
app.use('/teachers', teacherRoutes);
// register faculty routes
app.use('/faculties', facultyRoutes);
// register answer routes
app.use('/answers', answerRoutes);
// register department routes
app.use('/departments', departmentRoutes);
// register questions routes
app.use('/questions', questionRoutes);
// register subjects routes
app.use('/subjects', subjectRoutes);
// authentication routes
app.use('/auth', authRouter);

// create log file stream
// The 'a' flag is used to open the file in append mode.
const logFileStream = fs.createWriteStream('./logs/app.log', { flags: 'a' });

// for global error handling
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    // Write error details to the log file
    logFileStream.write(`Error Stack: ${err.stack}\n`);
    logFileStream.write(`Error Name: ${err.name}\n`);
    logFileStream.write(`Error Code: ${err.code}\n`);
    logFileStream.end();

    res.status(500).json({
        message: "500: Server Error!"
    })
    next();
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})