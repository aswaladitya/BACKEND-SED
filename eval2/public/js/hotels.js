
const roomList = document.getElementById('room-list')
const minPriceInput = document.getElementById('min-price')
const maxPriceInput = document.getElementById('max-price')
const ratingFilter = document.getElementById('rating-filter')

function filterRooms() {
    const minPrice = parseFloat(minPriceInput.value) || 0
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity
    const minRating = parseInt(ratingFilter.value)

    const rooms = roomList.getElementsByClassName('room-card')

    Array.from(rooms).forEach(room => {
        const roomPrice = parseFloat(room.getAttribute('data-price'))
        const roomRating = parseInt(room.getAttribute('data-rating'))

        if (roomPrice >= minPrice && roomPrice <= maxPrice && roomRating >= minRating) {
            room.style.display = 'block'
        } else {
            room.style.display = 'none'
        }
    })
}

minPriceInput.addEventListener('input', filterRooms)
maxPriceInput.addEventListener('input', filterRooms)
ratingFilter.addEventListener('change', filterRooms)



// Navigate

function navigateHome() {
    window.location.assign('/')
}

// Define the navigateToHotel function
function navigateToHotel(link) {
    window.location.href = link; // This will navigate to the given link
}

// Add event listeners to the room cards
document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('click', function() {
        const link = card.getAttribute('data-link'); // Get the link from the data-link attribute
        navigateToHotel(link); // Call the function with the link
    });
});





