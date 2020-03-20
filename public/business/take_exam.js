var examCode = localStorage.getItem("exam_code");
var studentCode = localStorage.getItem("student_code")

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
var l = 1;
var examTake = {};
var totalNumberOfSentences = 0; //A number of total question
var SinhVien = JSON.parse(idUser.value);
soCauLam.innerHTML = `Số câu đã làm: 0`
var examCreatedForTrainning = localStorage.getItem("examForTrainning")
if(examCreatedForTrainning != undefined)
{
    createExamHTMLForTrainning(JSON.parse(examCreatedForTrainning));
}
else
{
    createTheExam(examCode, JSON.parse(idListExam.value));
}

//***Create the exam**********************
function createTheExam(examCode, listExam) {
    listExam.forEach(exam => {
        if (exam.exam_code == examCode && exam.for_english == "false") {
            console.log(exam)
            examTake = exam;
            totalNumberOfSentences = exam.question_list.length; //Get length of answer system
            ma_de.innerHTML = exam.exam_code; //Get code of the exam
            thoi_gian.innerHTML = exam.time + " phút"; //Get the time of the exam
            localStorage.setItem("timeOfExam", exam.time + ":0");
            mon_hoc.innerHTML = exam.subject;
            hoc_ky.innerHTML = exam.semester;
            ngay_lam.innerHTML = Get_date_now();
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
                exam.question_list.sort(function (a, b) {
                    return 0.5 - Math.random()
                });
                //localStorage.setItem("listQuestionRandom",JSON.stringify(exam.question_list));
            }

            //Create the questions for the exam
            tongCauHoi.innerHTML = `Tổng: ${exam.question_list.length}`
            tongCauHoi2.innerHTML = `${exam.question_list.length} câu`
            var examListQuestion = exam.question_list;

            if (localStorage.getItem("listQuestionRandom") != undefined && timeCount != exam.time) {
                examListQuestion = JSON.parse(localStorage.getItem("listQuestionRandom"))
            }

            var totalAnswerInStore = 0;
            html += "<div class='bailam'> <table class='table'> "
            examListQuestion.forEach(content => {
                var contentQuestion = content.question.split("_idquestion")
                var store_Anser;
                var checkAnswer = 0;
                j++;
                html += `<tbody width="100%"> <tr>
            <td id="${j}CH"><input id="${j}CH_question" type="hidden" value="${contentQuestion[1]}" /><b>Câu ${j} : ${contentQuestion[0]} </b></td>
            `
                store_Anser = localStorage.getItem(contentQuestion[1])
                console.log(store_Anser)
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
                    console.log(content.answer_list)
                    //console.log(contentAnswer[1] +"----" +store_Anser) 
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
        //Create exam for english//////////////////////////////////////////////////////////////////////////////
        else if (exam.exam_code == examCode && exam.for_english == "true") {
            examTake = exam;
            totalNumberOfSentences = 0; //Get length of answer system
            exam.listening.forEach(lis => {
                totalNumberOfSentences += lis.question_list.length;
            })
            exam.reading.forEach(reading => {
                totalNumberOfSentences += reading.question_list.length;
            })
            ma_de.innerHTML = exam.exam_code; //Get code of the exam
            thoi_gian.innerHTML = exam.time + " phút"; //Get the time of the exam
            localStorage.setItem("timeOfExam", exam.time + ":0");
            mon_hoc.innerHTML = exam.subject;
            hoc_ky.innerHTML = exam.semester;
            ngay_lam.innerHTML = Get_date_now();
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
            }

            //Create the questions for the exam
            tongCauHoi.innerHTML = `Tổng: ${totalNumberOfSentences}`
            tongCauHoi2.innerHTML = `${totalNumberOfSentences} câu`


            var totalAnswerInStore = 0;

            //create ul for reading
            var stt_part = 1;
            exam.reading.forEach(content_listening => {
                if (stt_part == 1) {
                    html += `<ul class='nav nav-tabs' id="myTab" role="tablist"><li class="nav-item"><a class='nav-link active' data-toggle='tab' href='#part_reading_${stt_part}' role="tab">Reading ${stt_part}</a></li>`
                }
                else {
                    html += `<li><a class='nav-link' data-toggle='tab' href='#part_reading_${stt_part}'>Reading ${stt_part}</a></li>`
                }
                stt_part++;
            })

            //create ul for listening
            var stt_part = 1;
            exam.listening.forEach(content_listening => {

                html += `<li class="nav-item"><a class='nav-link' data-toggle='tab' href='#part_${stt_part}' role="tab">Listening ${stt_part}</a></li>`; stt_part++;
            })


            html += "</ul><div class='tab-content'>"

            //create content for reading
            var stt_part = 1;
            exam.reading.forEach(content_listening => {
                if (stt_part == 1) {
                    html += `<div id="part_reading_${stt_part}" class="tab-pane fade in active show"> <h3>Reading part ${stt_part}</h3>`;
                    html += "<div class='bailam'><table class='table'>" + createQuestionOfListening(content_listening.question_list, exam.time) + "</table></div></div>";
                }
                else {
                    html += `<div id="part_reading_${stt_part}" class="tab-pane fade"> <h3>Reading part ${stt_part}</h3>`;
                    if (content_listening.picture.length > 1) {
                        html += `<div class='w3-content w3-display-container'>`
                        content_listening.picture.forEach(pic => {
                            console.log(pic)
                            html += `<img class='mySlides' src='/img/${pic}' style='width:100%'>`
                        })
                        var textSlide = "mySlidesPart" + stt_part;
                        html += `
                    <button class='w3-button w3-black w3-display-left' onclick='plusDivs(-1)'>&#10094;</button>
                    <button class='w3-button w3-black w3-display-right' onclick='plusDivs(1)'>&#10095;</button>
                  </div>`
                    }
                    else {
                        html += `<img src="/img/readingpart${stt_part}.jpg" alt="" height=50% width=70%></img>`
                    }

                    html += "<div class='bailam'><table class='table'>" + createQuestionOfListening(content_listening.question_list, exam.time) + "</table></div></div>";
                }
                stt_part++;
                //console.log(html)                
            })
            //html+="</div>"

            //create content for listening
            var stt_part = 1;
            exam.listening.forEach(content_listening => {
                if (stt_part == 1) {
                    html += `<div id="part_${stt_part}" class="tab-pane fade"> <h3>Listening part ${stt_part}</h3>`;
                    html += `<audio controls>
                    <source src="/audio/nghe${stt_part}.mp3" type="audio/mpeg">
                  </audio>`
                    html += "<div class='bailam'><table class='table'>" + createQuestionOfListening(content_listening.question_list, exam.time) + "</table></div></div>";
                }
                else {
                    html += `<div id="part_${stt_part}" class="tab-pane fade"> <h3>Listening part ${stt_part}</h3>`;
                    html += `<audio controls>
                    <source src="/audio/nghe${stt_part}.mp3" type="audio/mpeg">
                  </audio>`
                    html += "<div class='bailam'><table class='table'>" + createQuestionOfListening(content_listening.question_list, exam.time) + "</table></div></div>";
                }
                stt_part++;
                //console.log(html)                
            })
            html += "</div>"

            // if (timeCount == exam.time) {
            //     localStorage.setItem("listQuestionRandom", JSON.stringify(exam.question_list));
            // }

            soCauLam.innerHTML = `Số câu đã làm: ${totalAnswerInStore}`;
            cauDaLam = totalAnswerInStore;
        }
    });
}

function createQuestionOfListening(examListQuestion, time_Count) {
    var html = "";
    examListQuestion.forEach(content => {
        var deBai = content.question.split("_")
        var store_Anser;
        var checkAnswer = 0;
        j++;

        if (deBai.length == 2) {
            html += `<tbody class="form"  width="100%"> <tr>
<td id="${j}CH"><b> Câu ${j}: ${deBai[0]} </b></br>
<img src="/img/${deBai[1]}" alt="" height=25% width=50%></img></b>
</td>
`
            store_Anser = localStorage.getItem(deBai[0])
            if (store_Anser != null) {
                store_Anser = store_Anser.trim()
            }
        } else {
            html += `<tbody width="100%"> <tr>
<td id="${j}CH"><b> Câu ${j}: ${content.question} </b></td>
`
            store_Anser = localStorage.getItem(content.question)
            if (store_Anser != null) {
                store_Anser = store_Anser.trim()
            }
        }

        if (store_Anser == null) {
            checkAnswer++;
        }
        // if (timeCount == time_Count) {
        //     content.answer_list.sort(function (a, b) {
        //         return 0.5 - Math.random()
        //     });
        // }

        for (var k = 0; k < content.answer_list.length; k++) {
            //console.log("=>" + store_Anser + "--" + content.answer_list[k] + "<-")
            if (store_Anser == content.answer_list[k]) {

                html += `
<tr >
<td class="inputGroup" style="padding: 0rem;border-top: none;" id="${j}-${k}"><input type="radio" id="CH_${j}-${k}_lb" name="CH_${j}" value="${k}_${
                    content.answer_list[k]
                    } " checked> <label style="margin-bottom:1px;" for="CH_${j}-${k}_lb">${content.answer_list[k]}</label> </td>
</tr>
`
            }
            else {
                html += `
<tr >
<td class="inputGroup" style="padding: 0rem;border-top: none;" id="${j}-${k}"><input type="radio" id="CH_${j}-${k}_lb" name="CH_${j}" value="${k}_${
                    content.answer_list[k]
                    }"> <label style="margin-bottom:1px;" for="CH_${j}-${k}_lb">${content.answer_list[k]}</label> </td>
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
            //totalAnswerInStore++;
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
    return html;
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

function gradingExam(examCode, exam) {
    //A number of correct answers
    //Get the question
    exam.question_list.forEach(question => {
        //Get the exam with the code

        i++;

        var radios = document.getElementsByName(`CH_${i}`); //Get the answer
        var correctAnswer = document.getElementById(`Cau_${i}`); //Get results
        console.log(correctAnswer)
        // console.log(radios)
        // console.log(correctAnswer)
        var answer = "";

        for (var j = 0, length = radios.length; j < length; j++) {
            var flag = 0;


            var valueChecked = radios[j].value; //Get value of radio checked
            console.log(valueChecked)
            //*****Check radio checked*****
            if (radios[j].checked) {

                //********Check correct sentence**********
                if (correctAnswer.value == valueChecked) {
                    console.log(valueChecked + "Đúng quá")
                    // $("td#" + `${i + "-" + valueChecked[0]}`).css("background-color", "green"); //Change color with id tag "td" of correct sentence 
                    $("a#" + `${i}TA`).css("color", "green"); //Change color tag "a" of correct sentence
                    numberOfCorrectSentences++;
                    flag++;
                }
            }

            //**********Check incorrect sentence***********
            if (valueChecked == correctAnswer.value && flag == 0) {
                console.log("Sai nè")
                $("td#" + `${i + "-" + j}`).css("background-color", "#96f23a") //Change color with id tag "td" of incorrect sentce
                $("a#" + `${i}TA`).css("color", "red"); //Change color tag "a" of incorrect sentence
            }
        }
    });
    if (exam.for_english == "true") {
        exam.reading.forEach(partOfReading => {
            //Get the exam with the code
            partOfReading.question_list.forEach(question => {
                i++;

                var radios = document.getElementsByName(`CH_${i}`); //Get the answer
                var correctAnswer = document.getElementById(`Cau_${i}`); //Get results
                var answer = "";

                for (var j = 0, length = radios.length; j < length; j++) {
                    var flag = 0;


                    var valueChecked = radios[j].value.split("_"); //Get value of radio checked
                    //*****Check radio checked*****
                    if (radios[j].checked) {

                        answer = valueChecked[1];
                        //********Check correct sentence**********
                        if (correctAnswer.value == valueChecked[1].trim()) {
                            // $("td#" + `${i + "-" + valueChecked[0]}`).css("background-color", "green"); //Change color with id tag "td" of correct sentence 
                            $("a#" + `${i}TA`).css("color", "green"); //Change color tag "a" of correct sentence
                            numberOfCorrectSentences++;
                            flag++;
                        }
                    }

                    //**********Check incorrect sentence***********
                    if (valueChecked[1] == correctAnswer.value && flag == 0) {
                        $("td#" + `${i + "-" + valueChecked[0]}`).css("background-color", "#96f23a") //Change color with id tag "td" of incorrect sentce
                        $("a#" + `${i}TA`).css("color", "red"); //Change color tag "a" of incorrect sentence
                    }
                }
            })

        });

        exam.listening.forEach(partOfListening => {
            //Get the exam with the code
            partOfListening.question_list.forEach(question => {
                i++;

                var radios = document.getElementsByName(`CH_${i}`); //Get the answer
                var correctAnswer = document.getElementById(`Cau_${i}`); //Get results
                var answer = "";

                for (var j = 0, length = radios.length; j < length; j++) {
                    var flag = 0;


                    var valueChecked = radios[j].value.split("_"); //Get value of radio checked
                    //*****Check radio checked*****
                    if (radios[j].checked) {

                        answer = valueChecked[1];
                        //********Check correct sentence**********
                        if (correctAnswer.value == valueChecked[1].trim()) {
                            // $("td#" + `${i + "-" + valueChecked[0]}`).css("background-color", "green"); //Change color with id tag "td" of correct sentence 
                            $("a#" + `${i}TA`).css("color", "green"); //Change color tag "a" of correct sentence
                            numberOfCorrectSentences++;
                            flag++;
                        }
                    }

                    //**********Check incorrect sentence***********
                    if (valueChecked[1] == correctAnswer.value && flag == 0) {
                        $("td#" + `${i + "-" + valueChecked[0]}`).css("background-color", "#96f23a") //Change color with id tag "td" of incorrect sentce
                        $("a#" + `${i}TA`).css("color", "red"); //Change color tag "a" of incorrect sentence
                    }
                }
            })

        });
    }

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
            nopBaiThi(SinhVien);
        }
        else {
            setTimeout(function () {
                openFullscreen();
            }, 1000);
        }
    }
    else {
        nopBaiThi(SinhVien);
    }
};


function nopBaiThi(SinhVien) {
    submit = true;
    sessionStorage.removeItem("time");
    status++;
    time_count.innerHTML = "Hoàn thành bài thi";
    $(':radio:not(:checked)').attr('disabled', true); //Cannot allow people can check radio
    gradingExam(examCode, examTake);

    var duLieu = {};
    duLieu.exam_code = examCode;
    duLieu.subject = mon_hoc.innerHTML;
    duLieu.semester = hoc_ky.innerHTML;
    duLieu.date = ngay_lam.innerHTML;
    duLieu.exam_score = scores.toFixed(2);

    post("/exam/take_exam", duLieu);
    createReport(SinhVien.full_name, SinhVien.student_code, SinhVien.student_class.class_name, SinhVien.student_class.faculty, SinhVien.identity_card_number, SinhVien.sex, SinhVien.date_of_birth, SinhVien.place_of_birth, examCode, mon_hoc.innerHTML, `${numberOfCorrectSentences}/${totalNumberOfSentences}`, `${scores.toFixed(2)}`, ngay_lam.innerHTML)

    alert("Bạn có 10 giây kể từ lúc thông báo này để xem lại đáp án đúng trước khi tự động logout");
}

var flag2 = 0;
//*********************Can click on tag "tr" on table ************************************
$('#noi_dung_thi tr').click(function () {
    if (status == 0) {
        //****Click td can selected radio*******************
        $(this).find('td input:radio').prop('checked', true);
        var contentAnswer = $(this).find('td input:radio')[0];
        console.log(contentAnswer)
        if (contentAnswer != undefined) {
            var idQues = contentAnswer.name.split("_");
            console.log(idQues[1] + idQues[0])
            var ans = contentAnswer.value.toString().slice(2);
            var ques = document.getElementById(idQues[1] + idQues[0]+"_question").value;
            //openFullscreen();
            if (typeof (Storage) !== "undefined") {
                // Store
                localStorage.setItem(ques, ans);
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

function createReport(name, stu_code, class_name, faculty, id_card, gender, dob, pob, exam_code, topic, results, score, date) {
    var doc = new jsPDF({
        unit: 'pt',
        orientation: 'p',
        format: [500, 400],
        //lineHeight: 1.2
    })


    doc.addImage(imgData, 'JPEG', 140, 0, 100, 100)

    doc.setFont('times')
    doc.setFontType('bold')
    doc.text(70, 120, 'REPORT CARD EXAM RESULTS')

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 150, `Full name             : ${xoa_dau(name)}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 170, `Student Code       : ${stu_code}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 190, `Class                    : ${class_name}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 210, `Faculty                 : ${xoa_dau(faculty)}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 230, `ID Card                : ${id_card}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 250, `Gender                 : ${xoa_dau(gender)}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 270, `Date of birth         : ${dob}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 290, `Place of birth        : ${xoa_dau(pob)}`)

    doc.setFont('times')
    doc.setFontType('bold')
    doc.text(140, 310, 'YOUR RESULTS')

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 330, `Exam code           : ${exam_code}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 350, `Subject                  : ${xoa_dau(topic)}`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 370, `Exam result          : ${results} sentences`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 390, `Total score            : ${score} point`)

    doc.setFont('times')
    doc.setFontType('normal')
    doc.text(50, 410, `Date                      : ${date}`)

    doc.save(`${name}-${stu_code}.pdf`);

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





// window.addEventListener('beforeunload', (event) => {
//     event.returnValue = `Bạn đang làm bài thi, cố ý tắt sẽ đồng nghĩa nộp bài, bạn có chắc muốn làm điều đó`;
// });


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
    examTake = exam;
    totalNumberOfSentences = exam.question_list.length; //Get length of answer system
    ma_de.innerHTML = exam.exam_code; //Get code of the exam
    thoi_gian.innerHTML = exam.time + " phút"; //Get the time of the exam
    localStorage.setItem("timeOfExam", exam.time + ":0");
    mon_hoc.innerHTML = exam.subject;
    hoc_ky.innerHTML = exam.semester;
    ngay_lam.innerHTML = Get_date_now();
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
    console.log()

    // if (localStorage.getItem("listQuestionRandom") != undefined && timeCount != exam.time) {
    //     examListQuestion = JSON.parse(localStorage.getItem("listQuestionRandom"))
    // }

    var totalAnswerInStore = 0;
    html += "<div class='bailam'> <table class='table'> "
    examListQuestion.forEach(content => {
        var contentQuestion = content.question.split("_idquestion")
        var store_Anser;
        var checkAnswer = 0;
        j++;
        html += `<tbody width="100%"> <tr>
    <td id="${j}CH"><input id="${j}CH_question" type="hidden" value="${contentQuestion[1]}" /><b>Câu ${j} : ${contentQuestion[0]} </b></td>
    `
        store_Anser = localStorage.getItem(contentQuestion[1])
        console.log(store_Anser)
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
            console.log(contentAnswer[1] +"----" +store_Anser) 
            if (store_Anser == answer[1]) {

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

document.getElementById("idListExam").remove();
document.getElementById("idUser").remove();