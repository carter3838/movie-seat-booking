let seats = document.querySelectorAll('.row .seat:not(.occupied)')
let container = document.querySelector('.container')
let count = document.getElementById('count')
let total = document.getElementById('total')
let movieSelect = document.getElementById('movie')
let ticketPrice = +movieSelect.value

populateUI();

//Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

//Get data from localstorage and populate UI

function populateUI() {
    let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    let selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

function updateSelectedCount() {
    let selectedSeats = document.querySelectorAll('.row .seat.selected')
    let seatsIndex = [...selectedSeats].map((seat) =>
        [...seats].indexOf(seat))
        
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    let selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice

}

//Movie select event

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
}
)

//Seat click event

container.addEventListener('click', event => {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        updateSelectedCount()
    }
})

//Initial count and total set
updateSelectedCount()
