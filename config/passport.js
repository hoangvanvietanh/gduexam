const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var configAuth = require('./config');
// Load User model
const ListStudents = require('../models/User');
//var Dia_chi_Dich_vu = "https://dv-webtracnghiem.herokuapp.com/"
var Dia_chi_Dich_vu = "http://172.16.26.26:1300/"
//var Dia_chi_Dich_vu = "http://localhost:1200"
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var FacebookStrategy = require('passport-facebook').Strategy;

// Lấy thông tin những giá trị auth
var configAuth = require('./config');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'student_code' }, (student_code, password, done) => {
      var flag = 0;
      console.log("5");
      ListStudents.forEach(student => {
        if (student.student_code == student_code) {
          bcrypt.compare(password, student.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, student);
            } else {
              return done(null, false, { message: 'Sai mật khẩu !!!' });
            }
          });
          flag++;
        }
      });
      if (flag == 0) {
        return done(null, false, { message: 'Mã số sinh viên không tồn tại !!!' });
      }
    })
  );


  passport.use(new FacebookStrategy({
    // điền thông tin để xác thực với Facebook.
    // những thông tin này đã được điền ở file auth.js
    clientID: configAuth.clientID,
    clientSecret: configAuth.clientSecret,
    callbackURL: configAuth.callbackURL,
    enableProof: true,
    profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'middle_name']
  },

    // Facebook sẽ gửi lại chuối token và thông tin profile của user
    function (token, refreshToken, profile, done) {
      // asynchronous
      process.nextTick(function () {
        // tìm trong db xem có user nào đã sử dụng facebook id này chưa
        var user = {};
        var checkAddUser = 0;
        ListStudents.forEach(student => {
          if (typeof student.facebook === 'undefined') {
            user.full_name = profile.name.familyName+" "+profile.name.givenName;
            user.student_code = profile.id;
            user.identity_card_number = profile.id;
            user.sex = "Nam";
            user.date_of_birth = "1-1-2020";
            user.place_of_birth = "Chưa cập nhật thông tin";
            user.address = "Chưa cập nhật thông tin";
            user.status = "Đăng ký";
            user.registration_date = "1-1-2020";
            var studentClass = {};
            studentClass.class_name = "Chưa cập nhật thông tin";
            studentClass.major = "Chưa cập nhật thông tin";
            studentClass.faculty = "Chưa cập nhật tin";
            user.student_class = studentClass;
            user.marks = [];
            var facebook = {};
            facebook.id = profile.id;
            facebook.token = token;
            facebook.email = profile.emails[0].value;
            user.facebook = facebook;
            
          }
          else if (student.facebook.id == profile.id) {
            user = student;
            checkAddUser++;
          }
        })
        if (checkAddUser == 0) {
          Them_Sinh_vien(user)
          ListStudents.push(user);
          return done(null, user);
        } else {
          return done(null, user);
        }
      });

    }));

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  function Them_Sinh_vien(student) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Them_Sinh_vien`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(student)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
  }
};
