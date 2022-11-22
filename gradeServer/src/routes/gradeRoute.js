module.exports = function(app){
    const grade = require('../controllers/gradeController');

    app.post('/grades',  grade.startGrade);

};