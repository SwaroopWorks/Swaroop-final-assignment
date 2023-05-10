const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose schema for user data
const userSchema = new mongoose.Schema({
  taskLevel: String,
  startedOn: Date,
  completedOn: Date,
  weightage: Number,
  milestone: Number
});

// Define Mongoose model for user data
const User = mongoose.model('User', userSchema);

// Parse incoming request body as JSON
app.use(express.json());

// Handle HTTP POST request to save user data to MongoDB
app.post('/addtask', (req, res) => {
  const userData = req.body;
  console.log('Received POST request to /user');

  const newUser = new User(userData);

  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving user data');
    } else {
      res.status(200).send('User data saved successfully!');
    }
  });
});


/// to update 
app.put('/updatetask/:id', (req, res) => {
  const taskId = req.params.id;
  const taskData = req.body;

  console.log(`Received PUT request to update task with id ${taskId}`);

  User.findByIdAndUpdate(taskId, taskData, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating task data');
    } else {
      res.status(200).send(`Task data with id ${taskId} updated successfully!`);
    }
  });
});


//to delete 
app.delete('/deletetask/:id', (req, res) => {
  const taskId = req.params.id;

  console.log(`Received DELETE request to delete task with id ${taskId}`);



  User.findByIdAndDelete(taskId, (err, user) => {
    if (err) {
      console.error(err);
      
      res.status(500).send('Error deleting task data');
    } else {
      res.status(200).send(`Task data with id ${taskId} deleted successfully!`);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
