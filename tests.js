document.addEventListener("DOMContentLoaded", function(){

    let back = document.getElementById("backDash");
    back.onclick = function(){
        window.location.href = "dashboard.html";
    };

    let user = JSON.parse(localStorage.getItem("smarteduUser"));

    if(!user){
        window.location.href = "login.html";
        return;
    }

    let enrollKey = "enrollments_" + user.email;
    let enrollments = JSON.parse(localStorage.getItem(enrollKey)) || [];

    let grid = document.getElementById("testGrid");
    let empty = document.getElementById("emptyState");

    if(enrollments.length === 0){
        empty.style.display = "block";
        return;
    }

    enrollments.forEach(function(enroll){

        let classNum = enroll.class;
        let subjects = enroll.subjects || [];

        subjects.forEach(function(subject){

            createTestCard(subject, classNum, "Weekly Test", "weekly", grid);
            createTestCard(subject, classNum, "Monthly Test", "monthly", grid);
            createTestCard(subject, classNum, "Unit Test", "unit", grid);

            if(classNum == "10" || classNum == "12"){
                createTestCard(subject, classNum, "Board Pattern Mock Exam", "mock", grid);
            }

        });

    });

});

function createTestCard(subject, classNum, title, type, grid){
    let durationValue =
        type === "weekly" ? "60 mins" :
        type === "monthly" ? "90 mins" :
        type === "unit" ? "120 mins" :
        "180 mins";
    let marksValue =
    type === "weekly" ? "30" :
    type === "monthly" ? "50" :
    type === "unit" ? "70" :
    "100";   
    let card = document.createElement("div");
    card.className = "test-card";

    card.innerHTML = `
        <div class="card-top">
            <span class="test-badge ${type}">${title}</span>
            <div class="icon-box">
                <i class="fa-solid ${
                    type==="weekly" ? "fa-file-lines" :
                    type==="monthly" ? "fa-award" :
                    type==="unit" ? "fa-clock" :
                    "fa-graduation-cap"
                }"></i>
            </div>
        </div>

        <h3>${subject} ${title}</h3>

        <div class="test-info">
            <span>Class:</span>
            <span>${classNum}th Standard</span>
        </div>

        <div class="test-info">
            <span>Duration:</span>
            <span>${durationValue}</span>
        </div>

        <div class="test-info">
            <span>Total Marks:</span>
            <span>${marksValue}</span>
        </div>

        <button class="start-btn"
            onclick="startTest('${subject}','${classNum}','${type}')">
            Start Test
        </button>
    `;

    grid.appendChild(card);
}

function startTest(subject, classNum, type){

    localStorage.setItem("testSubject", subject);
    localStorage.setItem("testClass", classNum);
    localStorage.setItem("testType", type);

    window.location.href = "test-player.html";
}