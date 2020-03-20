
createListExam(classOfUser.value,JSON.parse(idListExam.value),JSON.parse(idListMark.value));

function createListExam(studentClass, listExam, markList) {
    runFirst(listExam)
    var html = "";
    var countExam = 0;
    listExam.forEach(exam => {
        var checkMark = 0;
        markList.forEach(mark => {
            if (exam.exam_code == mark.exam_code) {
                checkMark++;
            }

        })
        if (checkMark == 0) {
            for (var i = 0; i < exam.class_take_exam.length; i++) {
                if (exam.class_take_exam[i] == studentClass && exam.status != "close") {
                    countExam++;
                    html += `<li class="header">Bài thi ${countExam}</li>
            <li class="grey">
                <div>
                    <p style="float: left;margin-bottom: 5px;"> Mã đề :</p>
                    <p style="float: right;margin-bottom: 5px;">${exam.exam_code}</p>
                    <div style="clear: both;"></div>
                </div>
            </li>
            <li class="grey">
                <div>
                    <p style="float: left;margin-bottom: 5px;"> Môn học:</p>
                    <p style="float: right;margin-bottom: 5px;">${exam.subject}</p>
                    <div style="clear: both;"></div>
                </div>
            </li>
            <li class="grey">
                <div>
                    <p style="float: left;margin-bottom: 5px;"> Học kỳ:</p>
                    <p style="float: right;margin-bottom: 5px;">${exam.semester}</p>
                    <div style="clear: both;"></div>
                </div>
            </li>
            <li class="grey">
                <div>
                    <p style="float: left;margin-bottom: 5px;"> Ngày làm:</p>
                    <p style="float: right;margin-bottom: 5px;" >${Get_date_now()}</p>
                    <div style="clear: both;"></div>
                </div>
            </li>
            <li class="grey">
                <div>
                    <p style="float: left;margin-bottom: 5px;"> Thời gian:</p>
                    <p style="float: right;margin-bottom: 5px;" >${exam.time}</p>
                    <div style="clear: both;"></div>
                </div>
            </li>
            <li class="grey">
                <div>
                    <p style="float: left;margin-bottom: 5px;"> Số câu hỏi:</p>
                    <p style="float: right;margin-bottom: 5px;">${exam.question_list.length}</p>
                    <div style="clear: both;"></div>
                </div>
            </li>
            <li class="grey">
    
                <button type="button" class="btn btn-primary" onclick="takeExam('${exam.exam_code}')"
                    style="width: 100%;font-size: 30px;background-color: #214a80"><strong>Bắt đầu bài thi ${countExam}</strong> </button>
                
            </li>`
                }
            }
        }

    });
    if (countExam == 0) {
        html = "Bạn không có bất cứ kỳ thi nào"
    }
    thongTinDeThi.innerHTML = html;

    document.getElementById("idListExam").remove();
    document.getElementById("idListMark").remove();
}

function takeExam(examCode) {
    //openFullscreen();
    localStorage.setItem("exam_code", examCode);
    document.location.href = "take_exam";
}


function Get_date_now() {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    return date;
}

function runFirst(listExam)
{
    btnTakeExam.onclick = () => {
        console.log(inputExamCode.value)
        listExam.forEach(exam => {
            console.log(exam)
            if(exam.exam_code == inputExamCode.value)
            {
                console.log("Vao nè 2")
                takeExam(inputExamCode.value)
            }
        })
        inputExamCode.value = ""
        inputExamCode.placeholder = "Mã đề thi không tồn tại"
    }
}




