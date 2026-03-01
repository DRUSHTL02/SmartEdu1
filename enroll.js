document.addEventListener("DOMContentLoaded", function(){

    let cards = document.querySelectorAll(".class-card");
    let nextBtn = document.querySelector(".next-btn");

    let selectedClass = null;
    cards.forEach(function(card){

        card.addEventListener("click", function(){
            cards.forEach(function(c){
                c.classList.remove("selected");
            });
            card.classList.add("selected");
            nextBtn.disabled = false;

            
            selectedClass = Number(card.querySelector("h4").innerText);
            localStorage.setItem("selectedClass", selectedClass);
        });

    });
    nextBtn.addEventListener("click", function(){

        if(selectedClass){
            window.location.href = "board.html";
        }

    });
    let backArrow = document.getElementById("backDash");

if(backArrow){
    backArrow.addEventListener("click", function(){
        window.location.href = "dashboard.html";
    });
}
});