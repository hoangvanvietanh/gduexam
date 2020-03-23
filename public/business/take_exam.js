var cau_hoi_thi = "";
var html = "";
var htmlTienDo = "";
var j = 0;
var timeCount = 0;
var status = 0;
var cauDaLam = 0;
var submit = false;
var array = [];
var scores = 0;
var examTake = {};
var totalNumberOfSentences = 0; //A number of total question
var SinhVien = JSON.parse(idUser.value);
var studentCode = localStorage.getItem("student_code");
var examCreatedForTrainning = localStorage.getItem("examForTrainning");
soCauLam.innerHTML = `Số câu đã làm: 0`;
var listAnswerOfStudent = [];
if(localStorage.getItem("listAnswerOfStudent"))
{
    listAnswerOfStudent = JSON.parse(localStorage.getItem("listAnswerOfStudent")) ;
}


if (examCreatedForTrainning) {
    createExamHTMLForTrainning(JSON.parse(examCreatedForTrainning));
}
//*****Change javascript to html with innerHTML************
noi_dung_thi.innerHTML = html;
tien_do.innerHTML = htmlTienDo;
tien_do2.innerHTML = htmlTienDo;
time_count.innerHTML = timeCount + ":" + 00
bam_nop_bai.innerHTML = `<button type="button" class="btn btn-primary" style="width: 100%;background-color:#214a80" id="nop_bai">Nộp bài</button>`
soCauLam2.innerHTML = `0 /`
//Create grading function
var i = 0;
var numberOfCorrectSentences = 0;

function gradingExam(exam) {
    //A number of correct answers
    //Get the question
    exam.question_list.forEach(question => {
        //Get the exam with the code
        i++;
        var radios = document.getElementsByName(`CH_${i}`); //Get the answer
        var correctAnswer = document.getElementById(`Cau_${i}`); //Get results
        //console.log(correctAnswer)
        // console.log(radios)
        // console.log(correctAnswer)
        var answer = "";

        for (var j = 0, length = radios.length; j < length; j++) {
            var flag = 0;
            var valueChecked = radios[j].value; //Get value of radio checked
            //console.log(valueChecked)
            //*****Check radio checked*****
            if (radios[j].checked) {

                //********Check correct sentence**********
                if (correctAnswer.value.trim() == valueChecked.trim()) {
                    console.log(valueChecked + "Đúng quá")
                    // $("td#" + `${i + "-" + valueChecked[0]}`).css("background-color", "green"); //Change color with id tag "td" of correct sentence 
                    $("a#" + `${i}TA`).css("color", "green"); //Change color tag "a" of correct sentence
                    numberOfCorrectSentences++;
                    flag++;
                }
            }

            //**********Check incorrect sentence***********
            if (valueChecked.trim() == correctAnswer.value.trim() && flag == 0) {
                //console.log("Sai nè")
                $("td#" + `${i + "-" + j}`).css("background-color", "#96f23a") //Change color with id tag "td" of incorrect sentce
                $("a#" + `${i}TA`).css("color", "red"); //Change color tag "a" of incorrect sentence
            }
        }
    });

    bam_nop_bai.innerHTML = `Số câu đúng : ${numberOfCorrectSentences}/${i}`
    scores = numberOfCorrectSentences / i * 10;
    tongDiem.innerHTML = `Tổng điểm: ${scores.toFixed(2)}`
}

//*****Submit exam*******************
nop_bai.onclick = () => {

    var checkTime = time_count.innerHTML;
    if (checkTime != "Hoàn thành bài thi") {
        var logout = confirm("Bạn vẫn còn thời gian làm bài, bạn có chắc chắc muốn nộp bài ?");
        if (logout) {
            nopBaiThi();
        }
        else {
            setTimeout(function () {
                openFullscreen();
            }, 1000);
        }
    }
    else {
        nopBaiThi();
    }
 };


function nopBaiThi() {
    submit = true;
    sessionStorage.removeItem("time");
    status++;
    time_count.innerHTML = "Hoàn thành bài thi";
    $(':radio:not(:checked)').attr('disabled', true); //Cannot allow people can check radio
    gradingExam(examTake);
    var listQuestionRandomOnLocal = JSON.parse(localStorage.getItem("listQuestionRandom"));
    var myListMarks = JSON.parse(localStorage.getItem("myListMarks"));
    var duLieu = {};
    var totalOfMarks = myListMarks.length;

    var examFromLocalstore = JSON.parse(localStorage.getItem("examForTrainning"));
    if (myListMarks.length == 0) {
        examFromLocalstore.exam_code = 0;
    }
    else {
        examFromLocalstore.exam_code = totalOfMarks++
    }
    examFromLocalstore.date = ngay_lam.innerHTML;
    examFromLocalstore.exam_score = scores.toFixed(2);

    examFromLocalstore.question_list = listQuestionRandomOnLocal;


    var examDataOfStudent = {};
    examDataOfStudent.examData = examFromLocalstore;
    examDataOfStudent.listAnswer = listAnswerOfStudent;


    myListMarks.push(examDataOfStudent)
    var StudentInsert = {};
    StudentInsert.student_code = SinhVien.student_code;
    StudentInsert.marks = myListMarks;
    Cap_nhat_Diem_Sinh_vien(StudentInsert)
    var duLieuUpdate = {};
    duLieuUpdate.marks = JSON.stringify(examDataOfStudent);
    post("/exam/review_exam", duLieuUpdate);
}

var flag2 = 0;
//*********************Can click on tag "tr" on table ************************************
$('#noi_dung_thi tr').click(function () {
    if (status == 0) {
        //****Click td can selected radio*******************
        $(this).find('td input:radio').prop('checked', true);
        var contentAnswer = $(this).find('td input:radio')[0];
        //console.log(contentAnswer)
        if (contentAnswer != undefined) {
            var idQues = contentAnswer.name.split("_");
            //console.log(idQues[1] + idQues[0])
            //var ans = contentAnswer.value.toString().slice(2);
            var ans = contentAnswer.value.toString();
            var ques = document.getElementById(idQues[1] + idQues[0] + "_question").value;
            //openFullscreen();
            if (typeof (Storage) !== "undefined") {
                // Store
                localStorage.setItem(ques, ans);
                var answerOfStudent = {};
                answerOfStudent.idquestion = ques;
                answerOfStudent.idanswer = ans;
                //console.log(listAnswerOfStudent)
                var isLoopQuestion = false;
                if (listAnswerOfStudent.length != 0) {
                    listAnswerOfStudent.forEach(x => {
                        if (x.idquestion == ques) {
                            x.idanswer = ans;
                            isLoopQuestion = true;
                        }
                    })
                }

                if (isLoopQuestion == false) {
                    listAnswerOfStudent.push(answerOfStudent);
                }
                localStorage.setItem("listAnswerOfStudent",JSON.stringify(listAnswerOfStudent));
            }
        }


        //*****Change color when click tag "tr" on table********
        // $(this)
        //     .closest("tr")
        //     .siblings()
        //     .css("background-color", "white")
        //     .end()
        //     .css("background-color", "skyblue");

        //******Get value "name" in tag "input"*********************
        var a = $(this).find('td input:radio').prop('checked', true)
        if (a[0] != undefined) {
            //console.log("Vào" + a[0])

            var laySttCH = a[0].name.split("_");

            //******Find checkbox with value******************************
            var as = $(`input[type=checkbox][value=${laySttCH[1]}]`).prop("checked", true);
            //console.log(laySttCH[1])

            var flag3 = 0;
            if (flag2 != 0) {
                for (var i = 0; i < array.length; i++) {
                    // console.log(array[i] + "------" + as[0].value)
                    if (as[0].value == array[i]) {
                        flag3++;
                        break;
                    }
                    // console.log("flag: " + flag3 + "---" + as[0].value)
                }
                if (flag3 == 0) {
                    cauDaLam++;
                    soCauLam.innerHTML = `Số câu đã làm: ${cauDaLam}`
                    soCauLam2.innerHTML = `${cauDaLam} /`
                }
            } else {
                cauDaLam++;
                soCauLam.innerHTML = `Số câu đã làm: ${cauDaLam}`
                soCauLam2.innerHTML = `${cauDaLam} /`
            }
            array.push(as[0].value)
            //console.log(as[0].value)
            flag2++;
        }

    }
})

//************************************Checkbox readonly*******************************************
$(document.body).delegate('[type="checkbox"][readonly="readonly"]', 'click', function (e) {
    e.preventDefault();
});


//******************************Time count down***************************************
function startTimer() {
    var presentTime = document.getElementById('time_count').innerHTML;
    var status = document.getElementById("time_count");
    //console.log(status.innerHTML)
    localStorage.setItem("timeCount", status.innerHTML);
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) {
        m = m - 1
    }
    document.getElementById('time_count').innerHTML =
        m + ":" + s;
    if (m >= 0 && s >= 0) {
        setTimeout(startTimer, 1000);
    } else {
        if (submit == false) {
            time_count.innerHTML = "Hoàn thành bài thi";
            localStorage.clear();
            nop_bai.click();
        } else {
            time_count.innerHTML = "Hoàn thành bài thi";
            localStorage.clear();
        }

    }

}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
        sec = "0" + sec
    }; // add zero in front of numbers < 10
    if (sec < 0) {
        sec = "59"
    };
    return sec;
}
//**********************************************************************************

// window.onresize = function(event) {

// };

if (screen.width >= 992 && screen.width <= 1196) {
    if (document.getElementById("lam_bai_thi").classList.contains('col-lg-7')) {
        document.getElementById("lam_bai_thi").classList.remove('col-lg-7');
        document.getElementById("lam_bai_thi").classList.add('col-lg-6');
        document.getElementById("thong_tin_bai_thi").classList.remove('col-lg-3');
        document.getElementById("thong_tin_bai_thi").classList.add('col-lg-4');
    } else if (document.getElementById("lam_bai_thi").classList.contains('col-lg-9')) {
        document.getElementById("lam_bai_thi").classList.remove('col-lg-9');
        document.getElementById("lam_bai_thi").classList.add('col-lg-8');
    }
} else {
    if (document.getElementById("lam_bai_thi").classList.contains('col-lg-6')) {
        document.getElementById("lam_bai_thi").classList.remove('col-lg-6');
        document.getElementById("lam_bai_thi").classList.add('col-lg-7');
        document.getElementById("thong_tin_bai_thi").classList.remove('col-lg-4');
        document.getElementById("thong_tin_bai_thi").classList.add('col-lg-3');
    } else if (document.getElementById("lam_bai_thi").classList.contains('col-lg-8')) {
        document.getElementById("lam_bai_thi").classList.remove('col-lg-8');
        document.getElementById("lam_bai_thi").classList.add('col-lg-9');
    }

}

if (screen.width >= 992) {
    $("#btn_tien_do").hide();
    $("#thong_tin_tien_do").show();
} else {
    $("#btn_tien_do").show();
    $("#thong_tin_tien_do").hide();
}

function do_change() {
    document.getElementById("btn_tien_do").style.display = "block";
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

if (localStorage.getItem("timeCount") != undefined) {
    setTimeout(function () {
        openFullscreen();
    }, 500);
    startTimer();
}

noiQuyThi.onclick = () => {
    openFullscreen();
    startTimer();
}

function createCheckBoxCheckedHTML(stt) {
    var html = "";
    if (stt < 10) {
        html = `<a id="${stt}TA" href="#${stt}CH">Câu 0${stt} : </a>
    <input type="checkbox" class="cbx"  id="${stt}TAIP" style="display: none;" readonly="readonly" value="${stt}" checked>
    <label for="${stt}TAIP" class="check">
      <svg width="18px" height="18px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </label>`;
    }
    else {
        html = `<a id="${stt}TA" href="#${stt}CH">Câu ${stt} : </a>
    <input type="checkbox" class="cbx"  id="${stt}TAIP" style="display: none;" readonly="readonly" value="${stt}" checked>
    <label for="${stt}TAIP" class="check">
      <svg width="18px" height="18px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </label>`;
    }

    return html;
}

function createCheckBoxNotCheckedHTML(stt) {
    var html = "";
    if (stt < 10) {
        html = `<a id="${stt}TA" href="#${stt}CH">Câu 0${stt} : </a>
    <input type="checkbox" class="cbx"  id="${stt}TAIP" style="display: none;" readonly="readonly" value="${stt}" >
    <label for="${stt}TAIP" class="check">
      <svg width="18px" height="18px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </label>`;
    }
    else {
        html = `<a id="${stt}TA" href="#${stt}CH">Câu ${stt} : </a>
    <input type="checkbox" class="cbx"  id="${stt}TAIP" style="display: none;" readonly="readonly" value="${stt}" >
    <label for="${stt}TAIP" class="check">
      <svg width="18px" height="18px" viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </label>`;
    }

    return html;
}

function Get_date_now() {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    return date;
}

function Get_date_time_now() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}

function createExamHTMLForTrainning(exam) {
    var l = 1;
    examTake = exam;
    totalNumberOfSentences = exam.question_list.length; //Get length of answer system
    thoi_gian.innerHTML = exam.time + " phút"; //Get the time of the exam
    localStorage.setItem("timeOfExam", exam.time + ":0");
    mon_hoc.innerHTML = exam.subject;
    ngay_lam.innerHTML = Get_date_time_now();
    var time = localStorage.getItem("timeCount");
    if (time != undefined) {
        timeCount = localStorage.getItem("timeCount");
    }
    else {
        timeCount = exam.time; //Set time count down
    }

    if (timeCount == exam.time) {
        $(window).on('load', function () {
            $('#modelId').modal('show');
        });
        $(document).ready(function () {
            $("#modelId").modal({
                show: false,
                backdrop: 'static'
            });

        });
        //localStorage.setItem("listQuestionRandom",JSON.stringify(exam.question_list));
    }

    //Create the questions for the exam
    tongCauHoi.innerHTML = `Tổng: ${exam.question_list.length}`
    tongCauHoi2.innerHTML = `${exam.question_list.length} câu`
    var examListQuestion = exam.question_list;

    var totalAnswerInStore = 0;
    html += "<div class='bailam'> <table class='table'> "
    examListQuestion.forEach(content => {
        var contentQuestion = content.question.split("_idquestion")
        //console.log(contentQuestion)
        var store_Anser;
        var checkAnswer = 0;
        j++;
        html += `<tbody width="100%"> <tr>
    <td id="${j}CH"><input id="${j}CH_question" type="hidden" value="${contentQuestion[1]}" /><b>Câu ${j} : ${contentQuestion[0]} </b></td>
    `
        store_Anser = localStorage.getItem(contentQuestion[1])
        //console.log(store_Anser)
        if (store_Anser != null) {
            store_Anser = store_Anser.trim()
        }


        if (store_Anser == null) {
            checkAnswer++;
        }
        if (timeCount == exam.time) {
            content.answer_list.sort(function (a, b) {
                return 0.5 - Math.random()
            });
        }

        for (var k = 0; k < content.answer_list.length; k++) {
            //console.log("=>" + store_Anser + "--" + content.answer_list[k] + "<-")
            var contentAnswer = content.answer_list[k].split("_idquestion");
            //console.log(content.answer_list)
            var answer = contentAnswer[1].split("_")
            //console.log(store_Anser + "<--->" + contentAnswer[1])
            //console.log(store_Anser + "<--->" + answer[1])

            if (store_Anser == contentAnswer[1]) {

                html += `
    <tr >
    <td class="inputGroup" style="padding: 0rem;border-top: none;" id="${j}-${k}"><input type="radio" id="CH_${j}-${k}_lb" name="CH_${j}" value="${
                    contentAnswer[1]} " checked> <label style="margin-bottom:1px;" for="CH_${j}-${k}_lb">${contentAnswer[0]}</label> </td>
    </tr>
    `
            }
            else {
                html += `
    <tr >
    <td class="inputGroup" style="padding: 0rem;border-top: none;" id="${j}-${k}"><input type="radio" id="CH_${j}-${k}_lb" name="CH_${j}" value="${
                    contentAnswer[1]}"> <label style="margin-bottom:1px;" for="CH_${j}-${k}_lb">${contentAnswer[0]}</label> </td>
    </tr>
    `
            }

        }
        html += `
    <tr>
    <input type="hidden" id="Cau_${j}" value="${content.correct_answer}">
</tr><tbody>`;
        if (checkAnswer != 0) {
            if (j == l) {
                l = l + 3;
                htmlTienDo += `<tr><td style="padding: 0;"> ${createCheckBoxNotCheckedHTML(j)} </td>`
            }
            else if (j % 3 == 0) {
                htmlTienDo += `<td style="padding: 0;"> ${createCheckBoxNotCheckedHTML(j)} </td></tr>`
            } else {
                htmlTienDo += `<td style="padding: 0;"> ${createCheckBoxNotCheckedHTML(j)} </td>`
            }
        }
        else {
            array.push(`${j}`);
            totalAnswerInStore++;
            if (j == l) {
                l = l + 3;
                htmlTienDo += `<tr><td style="padding: 0;"> ${createCheckBoxCheckedHTML(j)} </td>`
            }
            else if (j % 3 == 0) {
                htmlTienDo += `<td style="padding: 0;"> ${createCheckBoxCheckedHTML(j)} </td></tr>`
            } else {
                htmlTienDo += `<td style="padding: 0;"> ${createCheckBoxCheckedHTML(j)} </td>`
            }
        }
    });
    html += "</table></div>"
    if (timeCount == exam.time) {
        localStorage.setItem("listQuestionRandom", JSON.stringify(exam.question_list));
    }
    soCauLam.innerHTML = `Số câu đã làm: ${totalAnswerInStore}`;
    cauDaLam = totalAnswerInStore;

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
document.getElementById("idUser").remove();