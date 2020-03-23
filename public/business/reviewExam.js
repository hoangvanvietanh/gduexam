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
soCauLam.innerHTML = `Số câu đã làm: 0`
var examCreatedForTrainning = localStorage.getItem("examForTrainning")
var listAnswerOfStudent = [];

//Create grading function
var i = 0;
var numberOfCorrectSentences = 0;
function createExamHTMLForTrainning(exam,store_Anser) {
    examTake = exam;
    totalNumberOfSentences = exam.question_list.length; //Get length of answer system
    thoi_gian.innerHTML = exam.time + " phút"; //Get the time of the exam
    // localStorage.setItem("timeOfExam", exam.time + ":0");
    mon_hoc.innerHTML = exam.subject;
    ngay_lam.innerHTML = exam.date;
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
        //var store_Anser;
        var checkAnswer = 0;
        j++;
        html += `<tbody width="100%"> <tr>
    <td id="${j}CH"><input id="${j}CH_question" type="hidden" value="${contentQuestion[1]}" /><b>Câu ${j} : ${contentQuestion[0]} </b></td>
    `
        //store_Anser = localStorage.getItem(contentQuestion[1])
        //console.log(store_Anser)

        for (var k = 0; k < content.answer_list.length; k++) {
            //console.log("=>" + store_Anser + "--" + content.answer_list[k] + "<-")
            var contentAnswer = content.answer_list[k].split("_idquestion");
            
            var setAnswer = "";
            store_Anser.forEach(answer=>{
                var getidquestion = contentAnswer[1].split("_");
                // console.log(getidquestion)
                if(getidquestion[0] == answer.idquestion)
                {
                    setAnswer = answer.idanswer;
                }
            })
            //console.log(setAnswer + "<--->" + contentAnswer[1])
            if (setAnswer == contentAnswer[1]) {

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
    //console.log(html)

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

function gradingExam(exam) {
    //A number of correct answers
    //Get the question
    $(':radio:not(:checked)').attr('disabled', true);
    exam.question_list.forEach(question => {
        //Get the exam with the code
        i++;
        //console.log(i)
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
            //console.log(valueChecked+ "--------------------" + radios[1].value)
            if (radios[j].checked) {

                //console.log(correctAnswer.value.length +"::::--------------::::"+valueChecked.length)
                //********Check correct sentence**********
                if (correctAnswer.value.trim() == valueChecked.trim()) {
                    //console.log(valueChecked + "Đúng quá")
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

function goHome()
{
    localStorage.clear();
    document.location.href="/users/home";
}

function justShowCorrect()
{
    $("td#" + `"1-2"`).css("background-color", "red")
}

function showBoth()
{

}