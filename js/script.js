let scoreHome = 0
let scoreGuest = 0
let period = 1
let isPaused = false
let currentLeader = null
let timerID 

const scoreHomeEl = document.getElementById("home_score")
const scoreGuestEl = document.getElementById("guest_score")
const newGameBtn = document.getElementById("new_game")
const pauseBtn = document.getElementById("pause_game")
const periodDisplay = document.getElementById("period")
const homeDisplay = document.getElementById("home_highlight")
const guestDisplay = document.getElementById("guest_highlight")
const winnerMsgDisplay = document.getElementById("winner_msg")

function newGame() {
    scoreHome = 0
    scoreGuest = 0
    period = 1
    isPaused = false
    currentLeader = null

    scoreHomeEl.textContent = scoreHome
    scoreGuestEl.textContent = scoreGuest
    document.getElementById('time').textContent = "10:00" 
    startClock()
    enableButtons()
}

function updateScore(team, points) {
    if (team === "guest") {
        scoreGuest += points
        scoreGuestEl.textContent = scoreGuest
        highlightLeader()
    } else if (team === "home") {
        scoreHome += points
        scoreHomeEl.textContent = scoreHome
        highlightLeader()
    }
      currentLeader = highlightLeader(currentLeader)
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds
    timerID = setInterval(function () {
        if (!isPaused) {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10)

            minutes = minutes < 10 ? "0" + minutes : minutes
            seconds = seconds < 10 ? "0" + seconds : seconds

            display.textContent = minutes + ":" + seconds

            if (--timer < 0) {
                period++
                periodDisplay.textContent = period
                timer = duration
            }

          
            if (period === 5) {
                period = 4
                periodDisplay.textContent = period
                disableButtons()
                clearInterval(timerID)
            }
        }
    }, 1000)
}

function startClock() {
    clearInterval(timerID) 
    let tenMinutes = 60 * 10
    let display = document.getElementById('time')
    startTimer(tenMinutes, display)
}

function highlightLeader(previousLeader = null) {
    let leader = null
    const tieMessage = "Scores are tied!"
    const homeAdvantageMsg = `Home team leads by ${scoreHome - scoreGuest}`
    const guestAdvantageMsg = `Guest team leads by ${scoreGuest - scoreHome}`

    if (scoreHome > scoreGuest) {
        leader = "home"
        winnerMsgDisplay.textContent = homeAdvantageMsg
    } else if (scoreGuest > scoreHome) {
        leader = "guest"
        winnerMsgDisplay.textContent = guestAdvantageMsg
    } else {
        winnerMsgDisplay.textContent = tieMessage
    }
    if (leader !== previousLeader) {
        homeDisplay.style.transition = "color 0.5s ease"
        guestDisplay.style.transition = "color 0.5s ease"
        
        homeDisplay.style.color = leader === "home" ? "wheat" : "white"
        guestDisplay.style.color = leader === "guest" ? "wheat" : "white"
        
        return leader
    }

    return previousLeader
}

function disableButtons() {
    document.querySelectorAll('.add_number button').forEach(button => {
        button.disabled = true
    })
}

function enableButtons() {
    document.querySelectorAll('.add_number button').forEach(button => {
        button.disabled = false
    })
}

function pauseGame() {
    if (isPaused) {
        isPaused = false
        enableButtons()
        pauseBtn.textContent = "Pause Game"
    } else {
        isPaused = true
        disableButtons()
        pauseBtn.textContent = "Resume Game"
    }
}
