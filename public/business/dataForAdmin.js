//var Dia_chi_Dich_vu = "https://dv-webtracnghiem.herokuapp.com/"
//var Dia_chi_Dich_vu = "https://gduexam-service.herokuapp.com/"
var Dia_chi_Dich_vu = "http://172.16.26.26:1200/"
//var Dia_chi_Media = "http://localhost:1100"
var Dia_chi_Media = "https://dv-media-vietanh.herokuapp.com/"

var questionListOfData = Doc_Thu_vien_Cau_hoi().Danh_sach_Cau_hoi;
var listClass = Doc_Danh_sach_Lop_Hoc().Danh_sach_Lop_hoc;
var studentsList = Doc_Danh_sach_Sinh_vien().Danh_sach_Sinh_vien;
var listSubject = Doc_Danh_sach_Mon_hoc().Danh_sach_Mon_hoc;
var listExam = Doc_Danh_sach_De_thi().Danh_sach_De_thi;

function Doc_Danh_sach_De_thi() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_De_thi`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

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

function Doc_Thu_vien_Cau_hoi() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Cau_hoi`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Doc_Danh_sach_Lop_Hoc() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Lop_hoc`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Them_De_thi(De_thi) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Them_De_thi`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(De_thi)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

function Them_Cau_hoi(Cau_hoi) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Them_Cau_hoi`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(Cau_hoi)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

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

function Them_Khoa(khoa) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Them_Khoa`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(khoa)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

function Cap_nhat_Khoa(khoa) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Cap_nhat_Khoa`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(khoa)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

function Them_Cau_hoi_Mon_moi(Cau_hoi) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Them_Thu_vien_Cau_hoi`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(Cau_hoi)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

function Them_Mon_hoc(Mon_hoc) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Them_Mon_hoc`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(Mon_hoc)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}


function Cap_nhat_De_thi(exam) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Cap_nhat_De_thi`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(exam)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

function Doc_Danh_sach_Sinh_vien() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Sinh_vien`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Doc_Danh_sach_Mon_hoc() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Mon_hoc`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Get_date_now()
{
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    return date;
}

function post(path, params, method = 'post') {

    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function imageExists(image_url) {

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}

function Get_date_now()
{
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    return date;
}

function Xem_truoc_Media() {
    var reader = new FileReader();
    reader.onload = function (e) {
        Th_Hinh_Xem_truoc.src = e.target.result;
    }
    reader.readAsDataURL(Th_file.files[0]);
}

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}