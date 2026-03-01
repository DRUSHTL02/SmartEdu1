document.addEventListener("DOMContentLoaded", function(){

    let subject = localStorage.getItem("testSubject");
    let classNum = localStorage.getItem("testClass");
    let type = localStorage.getItem("testType");

    let test = questionBank.find(q =>
        q.subject === subject &&
        q.class === classNum &&
        q.type === type
    );

    if(!test){
        let wrapper = document.querySelector(".test-wrapper");
        wrapper.innerHTML = `
        <div class="no-test-card">
            <i class="fa-solid fa-circle-exclamation"></i>
            <h2>No Questions Available</h2>
            <p>Questions for this test will be added soon.</p>
            <button onclick="window.location.href='tests.html'" class="back-btn">
                Back to Tests
            </button>
        </div>
    `;
    return;
    }

    document.getElementById("testTitle").innerText =
        subject + " " + type + " Test";

    let currentIndex = 0;
    let score = 0;

    let questionBox = document.getElementById("questionBox");
    let nextBtn = document.getElementById("nextBtn");

    function loadQuestion(){

        let q = test.questions[currentIndex];

        questionBox.innerHTML = `
            <h3>${q.question}</h3>
            ${q.options.map((opt, i) =>
                `<div>
                    <input type="radio" name="option" value="${i}">
                    ${opt}
                </div>`
            ).join("")}
        `;
    }

    nextBtn.onclick = function(){

        let selected = document.querySelector("input[name='option']:checked");

        if(selected){
            if(Number(selected.value) === test.questions[currentIndex].answer){
                score++;
            }
        }

        currentIndex++;

        if(currentIndex < test.questions.length){
            loadQuestion();
        } else {
            finishTest();
        }
    };

    function finishTest(){

        let user = JSON.parse(localStorage.getItem("smarteduUser"));
        let resultKey = "results_" + user.email;
        let results = JSON.parse(localStorage.getItem(resultKey)) || [];

        results.push({
            subject: subject,
            class: classNum,
            type: type,
            score: score,
            total: test.questions.length,
            date: new Date().toLocaleDateString()
        });

        localStorage.setItem(resultKey, JSON.stringify(results));

        questionBox.innerHTML =
            `<h2>Test Completed!</h2>
             <p>Your Score: ${score} / ${test.questions.length}</p>`;

        nextBtn.style.display = "none";
    }

    loadQuestion();

});