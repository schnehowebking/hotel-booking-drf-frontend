(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
    const authButtonsContainer = document.getElementById('authButtons');

    // Check if the user is logged in
    const userToken = localStorage.getItem('token');

    if (userToken) {
        // User is logged in
        const userProfileButton = document.createElement('div');
        userProfileButton.innerHTML = `
            <div class="col-md-6">
                <div class="dropdown">
                    <a class="badge bg-info p-2 dropdown-toggle" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        Profile
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" href="#">Dashboard</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" onclick="logoutUser()">Logout</a></li>
                    </ul>
                </div>
            </div>
        `;
        authButtonsContainer.appendChild(userProfileButton);
    } else {
        // User is not logged in
        const loginSignupButtons = document.createElement('div');
        loginSignupButtons.className = "row align-content-center justify-content-between";
        loginSignupButtons.innerHTML = `
            <div class="col-md-6"><a href="./login.html" class="badge bg-info p-2" >Login</a></div>
            <div class="col-md-6"><a href="./register.html" class="badge bg-primary p-2">Sign Up</a></div>
        `;
        authButtonsContainer.appendChild(loginSignupButtons);
    }
});

function displayUserInfo() {
    const userToken = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (userToken && userId) {
        fetch(`https://isthotelbookingdrf.onrender.com/account/list/${userId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${userToken}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }
            return response.json();
        })
        .then(data => {
            // Update HTML with user information
            const profileDashboard = document.getElementById('profileDashboard');
            profileDashboard.innerHTML = `
                <div class="col-md-6">
                    <h2>Welcome, ${data.username}!</h2>
                    <p>Email: ${data.email}</p>
                    <!-- Add more user information as needed -->
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching user information:', error);
        });
    }
}

// Function to fetch hotels from API
function fetchHotels() {
    fetch('https://isthotelbookingdrf.onrender.com/hotels/')
        .then(response => response.json())
        .then(data => {
            renderHotels(data);
        })
        .catch(error => console.error('Error:', error));
}

// Function to render hotels dynamically
function renderHotels(hotels) {
    const hotelsListContainer = document.getElementById('hotelsList');

    hotels.forEach(hotel => {
        const hotelItem = `
            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <div class="room-item shadow rounded overflow-hidden">
                    <div class="position-relative">
                        <img class="img-fluid" src="${hotel.image}" alt="${hotel.name}">
                        <small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">$${hotel.price_per_night}/Night</small>
                    </div>
                    <div class="p-4 mt-2">
                        <div class="d-flex justify-content-between mb-3">
                            <h5 class="mb-0">${hotel.name}</h5>
                            <div class="ps-2">
                                ${generateStarRating(hotel.average_ratings)}
                            </div>
                        </div>
                        <div class="d-flex mb-3">
                            <small class="border-end me-3 pe-3"><i class="fa fa-bed text-primary me-2"></i>${hotel.rooms}</small>
                            <small class="border-end me-3 pe-3"><i class="fa fa-bath text-primary me-2"></i>${hotel.bathrooms}</small>
                            <small><i class="fa fa-wifi text-primary me-2"></i>Wifi</small>
                        </div>
                        <p class="text-body mb-3">${hotel.description}</p>
                        <div class="d-flex justify-content-between">
                            <a class="btn btn-sm btn-primary rounded py-2 px-4" href="./hotel_details.html?hotelId=${hotel.id}">View Detail</a>
                            <a class="btn btn-sm btn-dark rounded py-2 px-4" href="#">Book Now</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        hotelsListContainer.innerHTML += hotelItem;
    });
}

// Function to generate star rating HTML based on average ratings
function generateStarRating(rating) {
    const roundedRating = Math.round(rating);
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < roundedRating) {
            starsHtml += '<small class="fa fa-star text-primary"></small>';
        } else {
            starsHtml += '<small class="fa fa-star"></small>';
        }
    }
    return starsHtml;
}

// Fetch hotels when the page loads
fetchHotels();

// Display user information on profile page
window.onload = function() {
    displayUserInfo();
};
