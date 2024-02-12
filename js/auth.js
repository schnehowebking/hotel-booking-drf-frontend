function registerUser() {
    const userData = {
        username: document.getElementById('username').value,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        confirm_password: document.getElementById('confirm_password').value
    };

    fetch('https://isthotelbookingdrf.onrender.com/account/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('User registered successfully:', data);
    })
    .catch(error => {
        console.error('Error registering user:', error);
        
    });
}


function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username && password) {
        fetch('https://isthotelbookingdrf.onrender.com/account/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return response.json();
        })
        .then(data => {
            console.log('User logged in successfully:', data);
            if (data.token && data.user_id) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.user_id);
                
                // Redirect to profile page
                window.location.href = 'profile.html'; // Assuming 'profile.html' is the correct path
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
        });
    }
}


// Function to logout the current user
function logoutUser() {
    const userToken = localStorage.getItem('token');

    fetch('https://isthotelbookingdrf.onrender.com/logout/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${userToken}`,
        },
    })
    .then(response => {
        console.log('User logged out successfully');
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
      
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
}