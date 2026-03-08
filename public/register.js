const registerForm = document.getElementById('register-form')
const signUpButton = document.getElementById('sign-up');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const handleSignUp = async (event) => {
    event.preventDefault(); 

    signUpButton.style.pointerEvents = 'none'; // disable clicks while processing

    const data = {
        username: usernameInput.value,  
        password: passwordInput.value  
    };
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
        }
        const result = await response.json();
        console.log('Registration successful:', result); 
        window.alert(result.message);
    } catch (error) {
        console.error('Registration failed:', error);  
        window.alert(error.message);
    }
};

registerForm.addEventListener('submit', handleSignUp);

