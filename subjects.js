document.addEventListener("DOMContentLoaded", function(){

let subjectGrid = document.getElementById("subjectGrid");
let nextBtn = document.querySelector(".next-btn");
let backBtn = document.querySelector(".back-btn");
let backArrow = document.querySelector(".back-arrow");

let selectedSubjects = [];

/* GET CLASS */
let selectedClass = Number(localStorage.getItem("selectedClass"));

let subjects = [];

/* SUBJECT FLOW */
if(selectedClass >=1 && selectedClass <=5){
subjects = ["Maths","EVS","English"];
}
else if(selectedClass >=6 && selectedClass <=8){
subjects = ["Maths","Science","English","Social Science"];
}
else if(selectedClass >=9 && selectedClass <=10){
subjects = ["Maths","Science","English"];
}
else if(selectedClass >=11 && selectedClass <=12){
subjects = ["Physics","Chemistry","Maths / Biology"];
}

/* CREATE CARDS */
subjects.forEach(function(sub){

let card = document.createElement("div");
card.className="subject-card";
card.innerText=sub;

subjectGrid.appendChild(card);

card.addEventListener("click",function(){

card.classList.toggle("selected");

if(selectedSubjects.includes(sub)){
selectedSubjects = selectedSubjects.filter(function(s){
return s!==sub;
});
}else{
selectedSubjects.push(sub);
}

nextBtn.disabled = selectedSubjects.length===0;

});

});


backBtn.onclick=function(){
window.location.href="board.html";
};

backArrow.onclick=function(){
window.location.href="board.html";
};
nextBtn.addEventListener("click", function(){

    if(selectedSubjects.length === 0){
        return; // safety check
    }

    // save subjects for next page
    localStorage.setItem(
        "selectedSubjects",
        JSON.stringify(selectedSubjects)
    );

    // go to fee page
    window.location.href = "fee.html";

});
});