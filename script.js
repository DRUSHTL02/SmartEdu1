function selectClass(className){

    localStorage.setItem("selectedClass", className);

    window.location.href = "subjects.html";
}

if(window.location.pathname.includes("subjects.html")){

    let selectedClass = localStorage.getItem("selectedClass");

    let subjects = [];

    if(selectedClass === "1-5"){
        subjects = ["Maths","EVS","English"];
    }
    else if(selectedClass === "6-8"){
        subjects = ["Maths","Science","English","Social Science"];
    }
    else if(selectedClass === "9-10"){
        subjects = ["Maths","Science","English"];
    }
    else if(selectedClass === "11-12"){
        subjects = ["Physics","Chemistry","Maths/Biology"];
    }

    let container = document.getElementById("subjectsContainer");

    subjects.forEach(function(sub){

        container.innerHTML += `
            <div class="col-10 col-sm-6 col-md-3 mb-4">
                <div class="card h-100 p-3" onclick="selectSubject('${sub}',this)">
                    <h4>${sub}</h4>
                </div>
            </div>
        `;
    });
}
let selectedSubjects = [];

function selectSubject(sub, element){

    if(selectedSubjects.includes(sub)){
        selectedSubjects = selectedSubjects.filter(s => s !== sub);
        element.classList.remove("selected-card");
    }else{
        selectedSubjects.push(sub);
        element.classList.add("selected-card");
    }

    localStorage.setItem("subjects", JSON.stringify(selectedSubjects));
}

function calculateFee(){

    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    let type = document.querySelector('input[name="type"]:checked');

    if(!type) return;

    let total = subjects.length * 500; // subject fee

    if(type.value === "individual"){
        total += 300;
    }

    document.getElementById("totalFee").innerText = total;
}
function submitTest(){

    let score = 0;

    currentQuestions.forEach(function(item,index){

        let selected = document.querySelector(`input[name="q${index}"]:checked`);

        if(selected && selected.value === item.ans){
            score++;
        }
    });

    document.getElementById("score").innerText = score;
}
if(window.location.pathname.includes("test.html")){

    let selectedClass = localStorage.getItem("selectedClass");

    let questions = [];

    if(selectedClass === "1-5"){
        questions = [
            {q:"2 + 2 = ?", options:["3","4","5"], ans:"4"},
            {q:"A for ?", options:["Apple","Ball","Cat"], ans:"Apple"}
        ];
    }
    else if(selectedClass === "6-8"){
        questions = [
            {q:"Water formula?", options:["H2O","CO2","O2"], ans:"H2O"},
            {q:"Earth is a ?", options:["Planet","Star","Moon"], ans:"Planet"}
        ];
    }
    else if(selectedClass === "9-10"){
        questions = [
            {q:"Speed formula?", options:["d/t","t/d","m*v"], ans:"d/t"},
            {q:"India capital?", options:["Delhi","Pune","Goa"], ans:"Delhi"}
        ];
    }
    else if(selectedClass === "11-12"){
        questions = [
            {q:"Unit of Force?", options:["Newton","Joule","Watt"], ans:"Newton"},
            {q:"Electron charge?", options:["Negative","Positive","Neutral"], ans:"Negative"}
        ];
    }

    let container = document.getElementById("questionsContainer");

    questions.forEach(function(item,index){

        container.innerHTML += `
            <div class="mb-3">
                <h5>${index+1}. ${item.q}</h5>

                ${item.options.map(opt => `
                    <input type="radio" name="q${index}" value="${opt}"> ${opt}<br>
                `).join("")}
            </div>
        `;
    });

    // Save answers globally
    window.currentQuestions = questions;
}



