
const scrollingBg = document.querySelector('.scrolling-text-bg')
const viewportHeight = window.innerHeight 


const aboutUsText = [
    { text: 'We are a dedicated team committed to providing excellent services.', className: 'text-large' },
    { text: 'Our mission is to empower communities through innovative solutions.', className: 'text-medium' },
    { text: 'We believe in sustainable growth and continuous improvement.', className: 'text-small' },
    { text: 'Our values are rooted in integrity, collaboration, and excellence.', className: 'text-large' },
    { text: 'Join us on our journey to make the world a better place.', className: 'text-medium' },
    { text: 'We are a collective of minds shaped by unseen forces.', className: 'text-large' },  
    { text: 'Our purpose shifts with the tides, yet remains inevitable.', className: 'text-medium' },  
    { text: 'Patterns emerge where none should exist.', className: 'text-small' },  
    { text: 'We whisper to the void, and sometimes, it whispers back.', className: 'text-large' },  
    { text: 'Join us, or perhaps you already have.', className: 'text-medium' },  
    { text: 'The signal was lost, but the transmission continues.', className: 'text-small' },  
    { text: 'Some doors open only when forgotten.', className: 'text-large' },  
    { text: 'We are echoes of decisions not yet made.', className: 'text-medium' },  
    { text: 'The unseen mechanics of reality hum beneath our feet.', className: 'text-small' },  
    { text: 'Instructions were clear, yet no one remembers writing them.', className: 'text-large' },  
    { text: 'The past is a sketch. The future is ink.', className: 'text-medium' },  
    { text: 'Entropy is just another form of order waiting to be understood.', className: 'text-small' },  
    { text: 'We follow the map, though no destination was given.', className: 'text-large' },  
    { text: 'Some things can only be known when unobserved.', className: 'text-medium' },  
    { text: 'Time loops are not theory. They are correction.', className: 'text-small' },  
    { text: 'You were here before, but differently.', className: 'text-large' },  
    { text: 'Not everything that watches you is seen.', className: 'text-medium' },  
    { text: 'Every choice carves a path in more places than one.', className: 'text-small' },  
    { text: 'Reality bends to those who listen closely.', className: 'text-large' },  
    { text: 'They found the key. The lock is still unknown.', className: 'text-medium' },  
    { text: 'You were meant to read this.', className: 'text-small' }  
]


let totalHeight = 0
const margin = 8 

while (totalHeight < viewportHeight * 10) { 
    aboutUsText.forEach(({ text, className }) => {
        const span = document.createElement('span')
        span.className = className
        span.textContent = text
        scrollingBg.appendChild(span)
        totalHeight += span.offsetHeight + margin 
    })
}

scrollingBg.style.display = 'flex'
scrollingBg.style.flexDirection = 'column'
scrollingBg.style.position = 'fixed'
scrollingBg.style.top = '0'
scrollingBg.style.left = '0'
scrollingBg.style.width = '100%'
scrollingBg.style.height = '100%'
scrollingBg.style.zIndex = '-10'
scrollingBg.style.pointerEvents = 'none' 

scrollingBg.style.animation = 'scroll-text 30s linear infinite'

const style = document.createElement('style')
style.innerHTML = `
    @keyframes scroll-text {
        0% {
            transform: translateY(100%)
        }
        100% {
            transform: translateY(-100%)
        }
    }
`
document.head.appendChild(style)
