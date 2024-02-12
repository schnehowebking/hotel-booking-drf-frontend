function submitPreBookRequestForm() {
    const preBookRequestData = {
        requesterName: document.getElementById('requesterName').value,
        email: document.getElementById('email').value,
        checkIn: document.getElementById('checkin').value,
        checkOut: document.getElementById('checkout').value,
        adult: document.getElementById('adult').value,
        child: document.getElementById('child').value,
        hotel: document.getElementById('hotel').value,
        specialReq: document.getElementById('specialReq').value
    };

    fetch('https://isthotelbookingdrf.onrender.com/pre-book-request/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(preBookRequestData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pre-Book Request submitted successfully:', data);
        // Optionally, you can show a success message to the user
    })
    .catch(error => {
        console.error('Error submitting Pre-Book Request:', error);
        // Optionally, you can show an error message to the user
    });
}

function submitContactUsForm() {
    const contactUsData = {
        senderName: document.getElementById('senderName').value,
        senderEmail: document.getElementById('senderEmail').value,
        contactSubject: document.getElementById('contactSubject').value,
        contactMessage: document.getElementById('contactMessage').value
    };

    fetch('https://isthotelbookingdrf.onrender.com/contact-us/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactUsData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Contact Us message submitted successfully:', data);
       
    })
    .catch(error => {
        console.error('Error submitting Contact Us message:', error);
        
    });
}


