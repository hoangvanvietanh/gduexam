var htmlListSubject = "";
        var totalNumberQuestionInSubject = 0;
        questionListOfData.forEach(subject => {
            htmlListSubject += `<option value="${subject.subject}" >${subject.subject}</option>`;
        })
        list_subject.innerHTML = htmlListSubject;

        runFirst();
        chooseSubject();

        function runFirst() {
            var subject = document.getElementById("subject").value;
            questionListOfData.forEach(data => {
                if (data.subject == subject) {
                    data.question_list.sort(function (a, b) {
                        return 0.5 - Math.random()
                    });
                }
            });
        }

        function chooseSubject() {
            var subject = document.getElementById("subject").value;
            questionListOfData.forEach(data => {
                if (data.subject == subject) {
                    totalNumberQuestionInSubject = data.question_list.length;
                }
            });
        }

        function checkNumberQuestions() {
            var subject = document.getElementById("subject").value;
            var numberOfExams = document.getElementById("numberOfExam").value;

            if (numberOfExams > totalNumberQuestionInSubject) {
                numberOfExam.value = totalNumberQuestionInSubject
            }
        }

        buttonStartTrainning.onclick = () => {
            var examCode = "00000";
            var timeOfExam = document.getElementById("timeOfExam").value;
            var numberOfExam = document.getElementById("numberOfExam").value;
            var subject = document.getElementById("subject").value;
            var topic = "Tập luyện môn " + subject;
            var status = "";
            var semester = "Thi thử";
            var radios = "Mở";
            var examRate = document.getElementById("examRate").value;
            var listQuestionOfExam = [];
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    status = radios[i].value;
                    break;
                }
            }
            var cauDe = 0;
            var cauTB = 0;
            var cauKho = 0;
            var cauCucKho = 0;
            if (examRate == 1) {
                cauDe = Math.round(numberOfExam * 0.6)
                cauTB = Math.round(numberOfExam * 0.25)
                cauKho = Math.round(numberOfExam * 0.1)
                cauCucKho = Number(numberOfExam - (cauDe + cauTB + cauKho));
            }
            else if (examRate == 2) {
                cauDe = Math.round(numberOfExam * 0.5);
                cauTB = Math.round(numberOfExam * 0.3);
                cauKho = Math.round(numberOfExam * 0.15);
                cauCucKho = numberOfExam - (cauDe + cauTB + cauKho);
            } else if (examRate == 3) {
                cauDe = Math.round(numberOfExam * 0.4);
                cauTB = Math.round(numberOfExam * 0.3);
                cauKho = Math.round(numberOfExam * 0.2);
                cauCucKho = numberOfExam - (cauDe + cauTB + cauKho);
            } else if (examRate == 4) {
                cauDe = Math.round(numberOfExam * 0.3);
                cauTB = Math.round(numberOfExam * 0.3);
                cauKho = Math.round(numberOfExam * 0.3);
                cauCucKho = numberOfExam - (cauDe + cauTB + cauKho);
            }

            //console.log(cauDe + "-" + cauTB + "-" + cauKho + "_" + cauCucKho)

            var countCauDe = 0;
            var countCauTB = 0;
            var countCauKho = 0;
            var countCauCucKho = 0;
            
            questionListOfData.forEach(data => {
                if (data.subject == subject) {
                    //console.log(data)
                    data.question_list.sort(function (a, b) {
                    return 0.5 - Math.random()
                });
                    data.question_list.forEach(content => {
                        if (content.level_question == 1) {
                            countCauDe++;
                            if (countCauDe <= cauDe) {
                                listQuestionOfExam.push(content)
                            }
                        }
                        else if (content.level_question == 2) {
                            countCauTB++;
                            if (countCauTB <= cauTB) {
                                listQuestionOfExam.push(content)
                            }
                        }
                        else if (content.level_question == 3) {
                            countCauKho++;
                            if (countCauKho <= cauKho) {
                                listQuestionOfExam.push(content)
                            }
                        }
                        else if (content.level_question == 4) {
                            countCauCucKho++;
                            if (countCauCucKho <= cauCucKho) {
                                listQuestionOfExam.push(content)
                            }
                        }
                    })
                }
            });
            //console.log(listQuestionOfExam)

            var examCreated = createExam(examCode, timeOfExam, subject, topic, status, semester, listQuestionOfExam);

            localStorage.setItem("examForTrainning", JSON.stringify(examCreated));
            document.location.href = "/exam/take_exam";
        }



        function createExam(examCode, timeOfExam, subject, topic, status, semester, questionList) {
            var exam = {}
            exam.exam_code = examCode;
            exam.topic = topic;
            exam.time = timeOfExam;
            exam.semester = semester;
            exam.status = status;
            exam.subject = subject;
            exam.date_created = Get_date_now();
            exam.question_list = questionList;
            exam.class_take_exam = [];
            exam.listening = [];
            exam.reading = [];
            exam.for_english = false;
            //examList.push(exam);
            //Them_De_thi(exam);
            //post("/admin/createExam", exam);
            return exam;
            localStorage.clear();
            //document.location.href = "/admin/exam";

        }