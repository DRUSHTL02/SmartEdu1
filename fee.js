document.addEventListener("DOMContentLoaded", function(){

    let classNum = Number(localStorage.getItem("selectedClass"));
    let board = localStorage.getItem("selectedBoard");
    let subjects = JSON.parse(localStorage.getItem("selectedSubjects")) || [];

    let cards = document.querySelectorAll(".type-card");
    let totalFeeEl = document.getElementById("totalFee");

    document.getElementById("summaryClass").innerText =
        classNum + "th Standard";

    document.getElementById("summaryBoard").innerText = board;

    document.getElementById("summarySubjects").innerText =
        subjects.length + " selected";

    let baseFee = classNum * 500;

    let boardFee = 0;
    if(board === "CBSE"){
        boardFee = 1000;
    }else if(board === "ICSE"){
        boardFee = 1500;
    }else if(board === "State Board"){
        boardFee = 500;
    }

    let subjectFee = subjects.length * 500;

    cards.forEach(function(card){

        card.addEventListener("click", function(){

            cards.forEach(c=>c.classList.remove("selected"));
            card.classList.add("selected");

            let type = card.dataset.type;
            document.getElementById("summaryType").innerText = type;

            let typeFee = 0;

            if(type === "Group"){
                typeFee = 500;
            }
            else if(type === "Individual"){
                typeFee = 1000;
            }

            let total = baseFee + boardFee + subjectFee + typeFee;
            totalFeeEl.innerText = "₹" + total;
            localStorage.setItem("selectedType", type);
            localStorage.setItem("totalFee", total);

        });

    });

    document.querySelector(".back-btn").onclick=function(){
        window.location.href="subjects.html";
    };

    document.querySelector(".back-arrow").onclick=function(){
        window.location.href="dashboard.html";
    };
    let confirmBtn = document.getElementById("confirmBtn");

    if(confirmBtn){
        confirmBtn.onclick = function(){
            let user = JSON.parse(localStorage.getItem("smarteduUser"));
            if(!user){
                window.location.href="login.html";
                return;
            }
            let enrollKey = "enrollments_" + user.email;
            let enrollments = JSON.parse(localStorage.getItem(enrollKey)) || [];
            let newEnrollment = {
                class: localStorage.getItem("selectedClass"),
                board: localStorage.getItem("selectedBoard"),
                subjects: JSON.parse(localStorage.getItem("selectedSubjects")),
                type: localStorage.getItem("selectedType"),
                fee: localStorage.getItem("totalFee")
            };
            enrollments.push(newEnrollment);
            localStorage.setItem(enrollKey, JSON.stringify(enrollments));
            localStorage.setItem("showSuccessToast", "true");

            window.location.href = "dashboard.html";
        };
    }

});