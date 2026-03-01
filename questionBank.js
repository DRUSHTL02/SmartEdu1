function hasQuestions(classNum, subject, type){

    console.log("Checking:", classNum, subject, type);

    return questionBank.some(q =>
        q.class === classNum &&
        q.subject === subject &&
        q.type === type
    );
}
const questionBank = [

    {
        class: "10",
        subject: "Mathematics",
        type: "weekly",
        questions: [
            {
                question: "What is 2 + 2?",
                options: ["3","4","5","6"],
                answer: 1
            }
        ]
    },

    {
        class: "10",
        subject: "Mathematics",
        type: "monthly",
        questions: [
            {
                question: "Solve x² - 4 = 0",
                options: ["2","-2","±2","0"],
                answer: 2
            }
        ]
    },

    {
        class: "10",
        subject: "Mathematics",
        type: "mock",
        questions: [
            {
                question: "Board pattern question example",
                options: ["A","B","C","D"],
                answer: 0
            }
        ]
    }

];