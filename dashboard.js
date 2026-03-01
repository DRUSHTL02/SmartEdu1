document.addEventListener("DOMContentLoaded", function(){
    let toast = document.getElementById("successToast");
    if(localStorage.getItem("showSuccessToast") === "true"){
        toast.classList.add("show");
        setTimeout(function(){
            toast.classList.remove("show");
        }, 3000);
        localStorage.removeItem("showSuccessToast");
    }
    let user = JSON.parse(localStorage.getItem("smarteduUser"));
    if(!user){
        window.location.href="login.html";
        return;
    }
    document.getElementById("userWelcome").childNodes[0].nodeValue ="Hello, " + user.name + " ";
    let badge = document.getElementById("roleBadge");
    badge.innerText = user.role;
    let studentCard = document.getElementById("studentCard");
    let tutorCard   = document.getElementById("tutorCard");
    let role = user.role.toLowerCase();
    if(role === "tutor"){
        studentCard.style.display="none";
    }
    if(role === "parent"){
        studentCard.style.display="none";
        tutorCard.style.display="none";
    }
    let enrollKey = "enrollments_" + user.email;
    let enrollments = JSON.parse(localStorage.getItem(enrollKey)) || [];
    let countEl = document.getElementById("activeCount");
    if(countEl){
        countEl.innerText = enrollments.length;
    }
    let container = document.getElementById("enrollmentContainer");
    let emptyState = document.getElementById("emptyState");
    if(container){
        let oldCards = container.querySelectorAll(".enroll-card");
        oldCards.forEach(c => c.remove());
    if(enrollments.length === 0){
        container.style.display = "block";
        emptyState.style.display = "block";
    }else{
        container.style.display = "grid";
        emptyState.style.display = "none";
        enrollments.forEach(function(e){

            let card = document.createElement("div");
            card.className = "enroll-card";

            card.innerHTML = `
                <div class="enroll-top">
                    <span class="type-badge">${e.type}</span>
                    <span class="fee">\u20B9${Number(e.fee).toLocaleString("en-IN")}</span>
                </div>

                <h3>${e.class}th Standard</h3>
                <p><b>Board:</b> ${e.board}</p>
                <p><b>Subjects:</b> ${e.subjects.join(", ")}</p>

                <span class="status active">active</span>
            `;

            container.appendChild(card);
        });
    }
}
        let enrollBtn = document.querySelector(".enroll-btn");
        if(enrollBtn){
            enrollBtn.onclick = function(){

                localStorage.removeItem("selectedClass");
                localStorage.removeItem("selectedBoard");
                localStorage.removeItem("selectedSubjects");
                localStorage.removeItem("selectedType");
                localStorage.removeItem("totalFee");
                window.location.href = "enroll.html";
            };
        }
        let getStartBtn = document.querySelector(".get-started-btn");
        if(getStartBtn){
            getStartBtn.onclick = function(){

                localStorage.removeItem("selectedClass");
                localStorage.removeItem("selectedBoard");
                localStorage.removeItem("selectedSubjects");
                localStorage.removeItem("selectedType");
                localStorage.removeItem("totalFee");

                window.location.href = "enroll.html";
            };
        }
        let logoutBtn = document.getElementById("logoutBtn");
        if(logoutBtn){
            logoutBtn.onclick = function(){
                // remove current session only
                localStorage.removeItem("smarteduUser");
                // go back to login page
                window.location.href = "login.html";
            };
        }
            /* ================= AI TUTOR ================= */

    let aiCard = document.getElementById("aiCard");
    let aiModal = document.getElementById("aiModal");
    let closeAi = document.getElementById("closeAi");
    let sendBtn = document.getElementById("aiSend");
    let input = document.getElementById("aiInput");
    let chatArea = document.getElementById("chatArea");

    if(aiCard){
        aiCard.onclick = function(){
            aiModal.style.display = "flex";
        };
    }

    if(closeAi){
        closeAi.onclick = function(){
            aiModal.style.display = "none";
        };
    }

    if(sendBtn){
        sendBtn.onclick = sendMessage;
    }

    function sendMessage(){

        let question = input.value.trim();
        if(!question) return;

        addMessage(question,"user");
        input.value = "";

        let reply = generateReply(question);

        setTimeout(function(){
            addMessage(reply,"ai");
        },500);
    }

    function addMessage(text,type){

        let empty = document.querySelector(".ai-empty");
        if(empty) empty.remove();

        let div = document.createElement("div");
        div.className = type === "user" ? "user-msg" : "ai-msg";
        div.innerText = text;

        chatArea.appendChild(div);
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    function generateReply(question){

        question = question.toLowerCase();

        if(question.includes("math"))
            return "Mathematics involves numbers and problem solving. Which chapter do you need help with?";

        if(question.includes("science"))
            return "Science explains how the world works. Tell me the topic and I will simplify it for you.";

        if(question.includes("algebra"))
            return "Algebra uses variables and equations. Would you like a solved example?";

        if(question.includes("photosynthesis"))
            return "Photosynthesis is the process by which plants make food using sunlight.";

        return "That's a great question! Let me explain it in a simple way.";
    }
    });
