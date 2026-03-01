document.addEventListener("DOMContentLoaded", function(){

let cards = document.querySelectorAll(".board-card");
let nextBtn = document.querySelector(".next-btn");
let backArrow = document.getElementById("backDash");

cards.forEach(function(card){

card.addEventListener("click", function(){

cards.forEach(function(c){
c.classList.remove("selected");
});

card.classList.add("selected");
nextBtn.disabled = false;

});

});
let backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", function(){
    window.location.href = "enroll.html";
});
backArrow.addEventListener("click", function(){
window.location.href = "dashboard.html";
}); 
nextBtn.addEventListener("click", function(){

    let selected = document.querySelector(".board-card.selected");

    if(selected){
        let boardName = selected.querySelector("h3").innerText;
        localStorage.setItem("selectedBoard", boardName);

        window.location.href = "subjects.html";  
    }

});
});