const newCourseForm = document.getElementById('new-course');
const courseSubmitButton = document.getElementById('course-submit');

const handleSubmit = async (event) => {
    event.preventDefault();
    courseSubmitButton.style.pointerEvents = 'none';

    const jwtToken = localStorage.getItem('JWT-token');
    const courseDescription = document.getElementById('course-description').value;
    const courseFaculty = document.getElementById('course-faculty-id').value;
    const courseFee = document.getElementById('course-fee').value;
    
    const courseDetails = {
        description: courseDescription, 
        price: courseFee, 
        instructor_id: courseFaculty
    }
    
    try {
        const response = await fetch('/courses/upload', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${jwtToken}`
            }, body: JSON.stringify(courseDetails)
            
        });

        if (!response.ok) {
            const result = await response.json();
            console.log(result)
            throw new Error(result.error)
        }

        const result = await response.json();

        window.alert(result.message);

        courseSubmitButton.style.pointerEvents = 'auto';
    } catch (error) {
        console.error(error.message);
        window.alert(error.message);
    }
}

newCourseForm.addEventListener('submit', handleSubmit);
