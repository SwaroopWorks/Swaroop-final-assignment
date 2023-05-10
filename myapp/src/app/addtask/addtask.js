// Selecting the necessary HTML elements using their IDs and classes and storing them in variables
const form = document.querySelector('form'); // Selecting the form element
const taskLevel = document.querySelector('#task-level'); // Selecting the task level input field
const startedOn = document.querySelector('#started-on'); // Selecting the started on input field
const completedOn = document.querySelector('#completed-on'); // Selecting the completed on input field
const weightage = document.querySelector('#weightage'); // Selecting the weightage input field
const milestone = document.querySelector('#milestone'); // Selecting the milestone input field
const submitBtn = document.querySelector('#Submit-task'); // Selecting the submit button

// Adding an event listener to the form when it's submitted
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Preventing the default form submission behavior

  // Creating a JavaScript object and storing the values of the input fields in it
  const task = {
    taskLevel: taskLevel.value,
    startedOn: startedOn.value,
    completedOn: completedOn.value,
    weightage: weightage.value,
    milestone: milestone.value
  };

  // Making a POST request to the server with the data in the task object
  fetch('/addtask', {
    method: 'POST', // Setting the method of the request to POST
    headers: {
      'Content-Type': 'application/json' // Setting the content type to JSON
    },
    body: JSON.stringify(task) // Converting the task object to a JSON string and sending it as the request body
  })
    .then(response => {
      // Checking if the response is okay
      if (response.ok) {
        console.log('Task added successfully');
        // Reset form here
      } else {
        console.error('Error adding task');
      }
    })
    .catch(error => console.error(error)); // Catching any errors that occur during the request
});
