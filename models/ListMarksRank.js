const ListStudents = require('../models/User');
var listMarksPhysical = [];
var listMarksChemistry = [];
var listMarksMath = [];
var listMarksEnglish = [];
getListMark();
sortRank(listMarksPhysical);
sortRank(listMarksChemistry);
sortRank(listMarksMath);
sortRank(listMarksEnglish);
function getListMark() {
    ListStudents.forEach(student => {
        if(student.role != "admin")
        {
            student.marks.forEach(score => {
                const info = {};
                info.ho_ten = student.full_name;
                info.email = student.facebook.email;
                info.exam_score = score.examData.exam_score;
                var dateTime = score.examData.date.split(" ");
                var date = dateTime[0].split("-");
                var time = dateTime[1].split(":");
                info.day = date[2];
                info.month = date[1];
                info.hour = time[0];
                info.minute = time[1];
                info.seconds = time[2];
                //console.log(info)
                if (score.examData.subject.trim() == "Vật lý") {
                    listMarksPhysical.push(info);
                }
                else if (score.examData.subject.trim() == "Hóa Học") {
                    listMarksChemistry.push(info);
                }
                else if (score.examData.subject.trim() == "Tiếng Anh") {
                    listMarksEnglish.push(info);
                }
                else {
                    listMarksMath.push(info);
                }
            })
        }
        
    })
}

function sortRank(array) {
    var n = array.length;
    var a = array;
    var tg;
    for(var i = 0; i < n - 1; i++){
        for(var j = i + 1; j < n; j++){
            if(a[i].exam_score < a[j].exam_score){
                // Hoan vi 2 so a[i] va a[j]
                tg = a[i];
                a[i] = a[j];
                a[j] = tg;        
            }
        }
    }    
}

var DuLieu = {};
DuLieu.listMarksPhysical = listMarksPhysical;
DuLieu.listMarksChemistry = listMarksChemistry;
DuLieu.listMarksMath = listMarksMath;
DuLieu.listMarksEnglish = listMarksEnglish;

module.exports = DuLieu;