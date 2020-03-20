const express = require('express');
const router = express.Router();
const ListStudents = require('../models/User');
const ListExams = require('../models/Exam');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticatedAdmin, forwardAuthenticatedAdmin } = require('../config/authForAdmin');
//var Dia_chi_Dich_vu = "https://dv-webtracnghiem.herokuapp.com/";
//var Dia_chi_Dich_vu = "https://gduexam-service.herokuapp.com/"
var Dia_chi_Dich_vu = "http://localhost:1200"
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/users', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/exam', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
    // xử lý sau khi user cho phép xác thực với facebook
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/users/home',
            failureRedirect: '/'
        })
    );

//router.get('/admin', ensureAuthenticatedAdmin, (req, res) => res.render('adhome'));
router.get('/admin', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adhome', {
    user: req.user
  })
);
// Dashboard
router.get('/exam/manage_exam', ensureAuthenticated, (req, res) =>
  res.render('manage_exam', {
    user: req.user,
    markList: JSON.stringify(req.user.marks),
    examList: JSON.stringify(ListExams)
  }),
);

router.get('/exam/trainning', ensureAuthenticated, (req, res) =>
  res.render('trainning', {
    user: req.user,
    examList: JSON.stringify(ListExams)
  }),
);

router.get('/exam/take_exam', ensureAuthenticated, (req, res) =>
  res.render('take_exam', {
    user: req.user,
    infoUser: JSON.stringify(req.user),
    examList: JSON.stringify(ListExams)
  })
);

router.get('/users/home', ensureAuthenticated, (req, res) =>
  res.render('home', {
    user: req.user
  })
);

router.get('/admin/home', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adhome', {
    user: req.user
  })
);

router.get('/admin/exam', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adexam', {
    user: req.user,
    examList: JSON.stringify(ListExams)
  })
);

router.get('/admin/question', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adquestion', {
    user: req.user
  })
);

router.get('/admin/listScores', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adlistScores', {
    user: req.user
  })
);

router.get('/admin/createExam', ensureAuthenticatedAdmin, (req, res) =>
  res.render('formCreateExam', {
    user: req.user
  })
);

router.get('/admin/createExamRandom', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adCreateExamRandom', {
    user: req.user
  })
);

router.get('/admin/createQuestion', ensureAuthenticatedAdmin, (req, res) =>
  res.render('formCreateQuestion', {
    user: req.user
  })
);

router.get('/admin/addClassToExam', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adAddClassToExam', {
    user: req.user,
    examList: JSON.stringify(ListExams)
  })
);

router.get('/admin/users', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adUsers', {
    user: req.user
  })
);

router.get('/admin/class', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adclass', {
    user: req.user
  })
);

router.get('/admin/faculty', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adfaculty', {
    user: req.user
  })
);

router.get('/admin/major', ensureAuthenticatedAdmin, (req, res) =>
  res.render('admajor', {
    user: req.user
  })
);

router.get('/admin/subject', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adsubject', {
    user: req.user
  })
);


router.post('/admin/users', (req, res) => {

  var user = {};
  user.full_name = req.body.fullName;
  user.student_code = req.body.studentCode;
  user.identity_card_number = req.body.identityCardNumber;
  user.sex = req.body.sex;
  user.date_of_birth = req.body.dateOfBirth;
  user.place_of_birth = req.body.placeOfBirth;
  user.address = req.body.address;
  user.status = req.body.studentStatus;
  var today = new Date();
  var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  user.registration_date = date;
  var studentClass = {};
  var getClass = req.body.myClassOnModal.split("-");
  studentClass.class_name = getClass[0];
  studentClass.major = getClass[1];
  studentClass.faculty = req.body.myFacultyOnModal;
  user.student_class = studentClass;
  user.marks = [];
  bcrypt.hash(req.body.identityCardNumber, 10, (err, hash) => {
    user.password = hash;
    ListStudents.push(user);
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Them_Sinh_vien`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(user)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    res.redirect('/admin/users');

  })
  //console.log(user);
});

router.post('/admin/updateUsers', (req, res) => {
  var updateUser = {};
  ListStudents.forEach(user => {
    if (user.student_code == req.body.studentCode) {
      user.full_name = req.body.fullName;
      user.student_code = req.body.studentCode;
      user.identity_card_number = req.body.identityCardNumber;
      user.sex = req.body.sex;
      user.date_of_birth = req.body.dateOfBirth;
      user.place_of_birth = req.body.placeOfBirth;
      user.address = req.body.address;
      user.status = req.body.studentStatus;
      updateUser = user;
    }
  })


  var Xu_ly_HTTP = new XMLHttpRequest()
  var Tham_so = `Ma_so_Xu_ly=Cap_nhat_Sinh_vien`
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
  Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
  var Chuoi_goi = JSON.stringify(updateUser)
  Xu_ly_HTTP.send(Chuoi_goi)
  Kq = Xu_ly_HTTP.responseText
  res.redirect('/admin/users');

});

router.post('/admin/createExam', (req, res, next) => {
  req.body.question_list = JSON.parse(req.body.question_list);
  req.body.class_take_exam = [];

  var Kq = ""
  var Xu_ly_HTTP = new XMLHttpRequest()
  var Tham_so = `Ma_so_Xu_ly=Them_De_thi`
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
  Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
  var Chuoi_goi = JSON.stringify(req.body)
  Xu_ly_HTTP.send(Chuoi_goi)
  Kq = Xu_ly_HTTP.responseText

  ListExams.push(req.body);
  res.redirect('/admin/exam');
});

router.post('/admin/updateExam', (req, res, next) => {
  req.body.question_list = JSON.parse(req.body.question_list);
  req.body.class_take_exam = JSON.parse(req.body.class_take_exam)

  ListExams.forEach(examUpdate => {
    if (examUpdate.exam_code == req.body.exam_code) {
      examUpdate.class_take_exam = req.body.class_take_exam;
      examUpdate.question_list = req.body.question_list;
      examUpdate.topic = req.body.topic;
      examUpdate.time = req.body.time;
      examUpdate.semester = req.body.semester;
      examUpdate.status = req.body.status;
      examUpdate.subject = req.body.subject;
      var Kq = ""
      var Xu_ly_HTTP = new XMLHttpRequest()
      var Tham_so = `Ma_so_Xu_ly=Cap_nhat_De_thi`
      var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
      Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
      var Chuoi_goi = JSON.stringify(examUpdate)
      Xu_ly_HTTP.send(Chuoi_goi)
      Kq = Xu_ly_HTTP.responseText


      res.redirect('/admin/exam');
    }
  })

});

router.post('/exam/take_exam', (req, res, next) => {
  ListStudents.forEach(student => {
    if (student.student_code == req.user.student_code) {
      student.marks.push(req.body);
      var Kq = ""
      var Xu_ly_HTTP = new XMLHttpRequest()
      var Tham_so = `Ma_so_Xu_ly=Cap_nhat_Diem_Sinh_vien`
      var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
      Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
      var Chuoi_goi = JSON.stringify(student)
      Xu_ly_HTTP.send(Chuoi_goi)
      Kq = Xu_ly_HTTP.responseText
      
      //res.send('POST request to the homepage')
    }
  });
});

module.exports = router;
