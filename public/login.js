const loginForm = document.getElementById('login-form')
const loginButton = document.getElementById('login');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const roleInput = document.getElementById('role');

const handleLogin = async (event) => {
    event.preventDefault(); 

    loginButton.style.pointerEvents = 'none'; // disable clicks while processing

    const data = {
        username: usernameInput.value,  
        password: passwordInput.value, 
        role: roleInput.value
    };
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error);
        }
        console.log('login successful:', result); 
        window.alert(result.message + '\n' + 'You have also received a JWT TOKEN!');
        // Re-enable button after error
        loginButton.style.pointerEvents = 'auto';
    } catch (error) {
        console.error('login failed');  
        window.alert(error.message);
        // Re-enable button after error
        loginButton.style.pointerEvents = 'auto';
    }
};

loginForm.addEventListener('submit', handleLogin);

