const courses = document.getElementById('courses');

const button1 = document.getElementById('button-1');
const button2 = document.getElementById('button-2');
const button3 = document.getElementById('button-3');
const button4 = document.getElementById('button-4');
const button5 = document.getElementById('button-5');

let courseId;
const extractCourseId = (event) => {
    const buttonId = event.target.id;
    courseId = buttonId.match(/\d+/)[0];
}

const handleSubmit = async (event) => {
    event.preventDefault();
    //show brief info
    window.alert("Please wait 4-5 seconds, while your payment is processing 🧾")
    // disable all buttons
    const controlsArray = [...event.target.elements];
    controlsArray.forEach(button => {
        button.style.pointerEvents = 'none';
    });

    const jwtToken = localStorage.getItem('JWT-token');
    
    try {
        const response = await fetch(`/payment/checkout?course_id=${courseId}`, {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })

        if(!response.ok) {
            const result = await response.json();
            throw new Error(result.error)
        }

        const result = await response.json();
        console.log(result.message);
        window.alert(result.message)
        // enable all buttons
        controlsArray.forEach(button => {
        button.style.pointerEvents = 'auto';
    })
        
    } catch(error) {
        console.error(error)
        window.alert(error.message)
        //enable all buttons
        controlsArray.forEach(button => {
            button.style.pointerEvents = 'auto';
        })
    }   
}

courses.addEventListener('submit', handleSubmit);

button1.addEventListener('click', extractCourseId);
button2.addEventListener('click', extractCourseId);
button3.addEventListener('click', extractCourseId);
button4.addEventListener('click', extractCourseId);
button5.addEventListener('click', extractCourseId);
