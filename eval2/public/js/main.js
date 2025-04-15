
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('log') === 'true'

    const logoutLink = document.getElementById('logout')
    const loginLink = document.getElementById('login')
    const question = document.getElementById('question')

    if (logoutLink && loginLink) { 
        if (isLoggedIn) {
            logoutLink.classList.remove('hidden')
            loginLink.classList.add('hidden')
            question.classList.remove('hidden')
        } else {
            logoutLink.classList.add('hidden')
            question.classList.add('hidden')
            loginLink.classList.remove('hidden')
        }
    }
})


const track = document.getElementById("image-track")
const cozy = document.getElementById("cozy")
const wave = document.getElementById("wave")

function moveTrack() {
    const expandingBlock = document.querySelector(".expanding") 
    const trackWidth = track.offsetWidth + (expandingBlock ? expandingBlock.offsetWidth : 50 * (window.innerWidth / 100))
    const newLeft = Math.max(window.innerWidth - trackWidth , window.innerWidth * 0.1)
    
    
    const leftyElements = document.getElementsByClassName("move")

    for (let i = 0; i < leftyElements.length; i++) {
        leftyElements[i].style.left = `${newLeft}px`
    }
    track.classList.add("move")
}



const imageContainers = document.querySelectorAll('#image-track .image-container')
let targetPercentage = 0
let currentPercentage = 0
let isScrolling = false

imageContainers.forEach((element, index) => {
const randomDuration = (1.5 + (index * 0.2)).toFixed(2) + 's'
element.style.animationDuration = randomDuration
})



window.onwheel = (e) => {
    const delta = e.deltaY || e.deltaX
    const percentageDelta = (delta / window.innerWidth) * -100
    targetPercentage = Math.max(Math.min(targetPercentage + percentageDelta, 0), -100)

    if (!isScrolling) {
        isScrolling = true
        animateScroll()
    }
    Array.from(track.getElementsByClassName("image")).forEach((image) => {
        image.style.objectPosition = `${100 + targetPercentage/15}% center`
    })

    const cozyOpacity = Math.max(0, 1 + (targetPercentage / 35))
    if (!cozy.classList.contains("dud") && !wave.classList.contains("dud")) {
        cozy.style.opacity = cozyOpacity
        wave.style.opacity = cozyOpacity
    }
}

function animateScroll() {
    currentPercentage += (targetPercentage - currentPercentage) * 0.1 
    track.style.transform = `translate(${currentPercentage}%, -50%)`

    if (Math.abs(targetPercentage - currentPercentage) > 0.1) {
        requestAnimationFrame(animateScroll)
    } else {
        isScrolling = false
    }
}



document.getElementById("login").addEventListener("click", openLogin)

function openLogin() {
    const loginDiv = document.getElementById("login")
    
    if (loginDiv.classList.contains("expanding")) return 

    
    document.getElementById('closeForm').classList.remove("hidden")
    track.classList.add("move")
    document.querySelectorAll('.headed').forEach(element => {
        element.classList.add("dud")
    })
    
    //track.style.transform = `translate(${currentPercentage}%, -50%)`
    loginDiv.classList.add("expanding")
    document.getElementById("login").classList.remove("image-container")

    setTimeout(() => {
        
        loginDiv.innerHTML = `
            <h1 id="formTitle" class ="bot">Login</h1>
            <form id="authForm" action="/login" method="POST">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required><br><br>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required><br><br>
                <button id="sub-btn" type="submit">Login</button>
            </form>
            <p id="toggleText">Don't have an account? <a href="#" id="toggleForm">Register</a></p>
        `

        
        document.getElementById("closeForm").addEventListener("click", closeLogin)
        document.getElementById("toggleForm").addEventListener("click", toggleForm)

    }, 500) 
}

function closeLogin() {
    const loginDiv = document.getElementById("login")
    
    document.getElementById('closeForm').classList.add("hidden")
    document.querySelectorAll('.headed').forEach(element => {
        element.classList.remove("dud")
    })
    track.classList.remove("move")
    loginDiv.classList.remove("expanding")



    loginDiv.classList.add("image-container")

    loginDiv.innerHTML = `
        <img class="image" src="/stuff/home/9a.jpg" draggable="false" />
        <div class="overlay">Join the Cozy Wave</div>
    `

    loginDiv.addEventListener("click", openLogin)
}





document.getElementById('logout')?.addEventListener('click', (event) => {
    event.preventDefault() 
    localStorage.removeItem('log') 
    window.location.href = '/' 
})



function toggleForm(event) {
    event.preventDefault() 

    const formTitle = document.getElementById("formTitle")
    const authForm = document.getElementById("authForm")
    const toggleText = document.getElementById("toggleText")
    const btn = document.getElementById("sub-btn")

    if (formTitle.innerText === "Login") {
        formTitle.innerText = "Register"
        authForm.action = "/register"
        btn.innerText = "Register"
        toggleText.innerHTML = `Already have an account? <a href="#" id="toggleForm">Login</a>`
    } else {
        formTitle.innerText = "Login"
        btn.innerText = "Login"
        authForm.action = "/login"
        toggleText.innerHTML = `Don't have an account? <a href="#" id="toggleForm">Register</a>`
    }

    
    document.getElementById("toggleForm").addEventListener("click", toggleForm)
}


if (window.location.search.includes('login=false')) {
    alert('Invalid credentials. Please try again.')
}

if (window.location.search.includes('login=true')) {
    localStorage.setItem('log', 'true')
}

if (window.location.search.includes('reg=true')) {
    alert('Registered Uzzer, Proceed with login')
}