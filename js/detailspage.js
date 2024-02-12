// Function to fetch hotel details by hotelId
function fetchHotelDetails(hotelId) {
    fetch(`https://isthotelbookingdrf.onrender.com/hotels/${hotelId}`)
        .then(response => response.json())
        .then(data => {
            // Call function to render hotel details
            renderHotelDetails(data);
        })
        .catch(error => console.error('Error:', error));
}

// Function to render hotel details dynamically
function renderHotelDetails(hotel) {
    const hotelDetailsContainer = document.getElementById('hotelDetailsContainer');

    const hotelDetailsHTML = `
    <div class="col-lg-6">
    <img src="${hotel.image}" alt="${hotel.name}" class="img-fluid">
   </div>
   <div class="col-lg-6">
    <h1>${hotel.name}</h1>
    <p>Description: ${hotel.description}</p>
    <p>Price per Night: $${hotel.price_per_night}</p>
    <p>Ratings Avg: ${hotel.average_ratings}</p>
    <p>Address: ${hotel.address}</p>

   <a href="./booking.html/${hotel.id}">Book Now</a>
   </div>
                
            `;

    hotelDetailsContainer.innerHTML = hotelDetailsHTML;
}

// Extract hotelId from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get('hotelId');

// Fetch hotel details when the page loads
if (hotelId) {
    fetchHotelDetails(hotelId);
} else {
    console.error('Hotel ID not found in URL');
}