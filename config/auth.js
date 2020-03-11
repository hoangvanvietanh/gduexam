module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.role == "admin") {
        return res.redirect('/admin/home');
      }
      return next();
    }
    req.flash('error_msg', 'Vui lòng đăng nhập {-.~}');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/users/home');
  },
  takeExamAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/exam/take_exam');
  }
};
