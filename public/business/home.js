//var Dia_chi_Dich_vu = "https://dv-webtracnghiem.herokuapp.com/"
//var Dia_chi_Dich_vu = "https://gduexam-service.herokuapp.com/"
var Dia_chi_Dich_vu = "https://daihocgiadinh.com.vn/"
//var Dia_chi_Media = "http://localhost:1100"
var Dia_chi_Media = "https://dv-media-vietanh.herokuapp.com/"

var studentCode = localStorage.getItem("student_code");

function Ghi_Media(Hinh) {
    console.log("ok ghi")
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Dia_chi_Xu_ly = `${Dia_chi_Media}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_Goi = JSON.stringify(Hinh)
    Xu_ly_HTTP.send(Chuoi_Goi)
    var Chuoi_KQ = Xu_ly_HTTP.responseText
    return Chuoi_KQ
}

function Doc_Danh_sach_Nhat_ky() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Nhat_ky`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Ghi_nhat_ky(Nhat_ky) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Ghi_Nhat_ky`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(Nhat_ky)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

function imageExists(image_url) {

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

function checkKeyConnect() {
    if (localStorage.getItem("keyConnect") != undefined) {
        return localStorage.getItem("keyConnect");
    }
    else {
        return Math.random().toString(36).substring(7);
    }

}





function checkExamAlready(studentCode) {
    if (localStorage.getItem("timeCount") != undefined && localStorage.getItem("student_code") == studentCode || localStorage.getItem("listQuestionRandom") != undefined) {
        openFullscreen();
        document.location.href = "/exam/take_exam";
    }
}

$(document).keydown(function (event) {
    if (event.keyCode == 123) { // Prevent F12
        return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
        return false;
    }
});

var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}




//var Dia_chi_Dich_vu = "https://dv-webtracnghiem.herokuapp.com/"
//var Dia_chi_Dich_vu = "http://localhost:1200"
// var examList = Doc_Danh_sach_De_thi().Danh_sach_De_thi;

// function Doc_Danh_sach_De_thi() {
//     var Du_lieu = {}
//     var Xu_ly_HTTP = new XMLHttpRequest()
//     var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_De_thi`
//     var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
//     Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
//     Xu_ly_HTTP.send("")
//     var Chuoi_JSON = Xu_ly_HTTP.responseText
//     if (Chuoi_JSON != "")
//         Du_lieu = JSON.parse(Chuoi_JSON)
//     return Du_lieu
// }

// function Doc_Danh_sach_Diem_Sinh_vien() {
//     var Du_lieu = {}
//     var Xu_ly_HTTP = new XMLHttpRequest()
//     var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Diem_Sinh_vien`
//     var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
//     Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
//     Xu_ly_HTTP.send("")
//     var Chuoi_JSON = Xu_ly_HTTP.responseText
//     if (Chuoi_JSON != "")
//         Du_lieu = JSON.parse(Chuoi_JSON)
//     return Du_lieu
// }

// function Cap_nhat_Diem_Sinh_vien(Sinh_vien) {
//     var Kq = ""
//     var Xu_ly_HTTP = new XMLHttpRequest()
//     var Tham_so = `Ma_so_Xu_ly=Cap_nhat_Diem_Sinh_vien`
//     var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
//     Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
//     var Chuoi_goi = JSON.stringify(Sinh_vien)
//     Xu_ly_HTTP.send(Chuoi_goi)
//     Kq = Xu_ly_HTTP.responseText
//     return Kq
// }



