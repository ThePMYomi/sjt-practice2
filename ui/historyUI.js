export function showHistory(){

    const history =
        JSON.parse(localStorage.getItem("examHistory")) || []

    const quiz = document.getElementById("quiz")

    quiz.innerHTML = "<h2>Practice History</h2>"

    if(history.length === 0){

        quiz.innerHTML += "<p>No practice tests taken yet.</p>"
        return

    }

    history
        .slice()
        .reverse()
        .forEach((exam)=>{

            const div = document.createElement("div")

            div.className = "review-question"

            div.innerHTML = `

            <p><strong>Date:</strong> ${new Date(exam.date).toLocaleString()}</p>

            <p><strong>Score:</strong> ${exam.score} / ${exam.maxScore}</p>

            <p><strong>Percentage:</strong> ${exam.percent}%</p>

            <button onclick="reviewExam('${exam.id}')">
            Review Exam
            </button>

            `

            quiz.appendChild(div)

        })

}


window.reviewExam = function(examId){

    const history =
        JSON.parse(localStorage.getItem("examHistory")) || []

    const exam =
        history.find(e=>e.id === examId)

    if(!exam) return

    const quiz = document.getElementById("quiz")

    quiz.innerHTML = "<h2>Exam Review</h2>"

    exam.questions.forEach((q,i)=>{

        const userAnswer = exam.userAnswers[i]

        let html = `<div class="review-question">`

        html += `<p><strong>Scenario:</strong> ${q.scenario}</p>`

        html += `<p><strong>Your Answer:</strong> ${
            Array.isArray(userAnswer)
            ? userAnswer.join(", ")
            : userAnswer || "None"
        }</p>`

        html += `<p><strong>Correct Answer:</strong> ${q.answer}</p>`

        html += `<p><strong>Explanation:</strong><br>${q.explanation}</p>`

        html += `</div>`

        quiz.innerHTML += html

    })

}

export function renderPerformanceChart(){

    const history =
        JSON.parse(localStorage.getItem("examHistory")) || []

    if(history.length === 0) return

    const canvas = document.createElement("canvas")

    canvas.id = "performanceChart"

    document.getElementById("quiz").appendChild(canvas)

    const ctx = canvas.getContext("2d")

    const labels =
        history.map(h=> new Date(h.date).toLocaleDateString())

    const scores =
        history.map(h=> h.percent)

    new Chart(ctx,{

        type:"line",

        data:{

            labels:labels,

            datasets:[{

                label:"Score %",

                data:scores,

                borderColor:"#2c7be5",

                fill:false

            }]

        }

    })

}
