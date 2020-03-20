//var Dia_chi_Dich_vu = "https://dv-webtracnghiem.herokuapp.com/"
//var Dia_chi_Dich_vu = "https://gduexam-service.herokuapp.com/"
var Dia_chi_Dich_vu = "https://daihocgiadinh.vn/"
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

const studentsList = Doc_Danh_sach_Sinh_vien().Danh_sach_Sinh_vien;

module.exports = studentsList;