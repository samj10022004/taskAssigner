const axios = require('axios');
const express = require('express');
const app = express();
const port = 4000; // You can choose any available port



// Your Close CRM API key
const apiKey = 'YXBpXzVwdXdwOTZOUnY2b21SeGFHZ1d4bTcuNm9IdzFVTEVSdWFKY3NZeUdOQUs4Nzo6';

// Close CRM API endpoint to fetch opportunities
const apiUrl = 'https://api.close.com/api/v1/opportunity/';

// Parameters to retrieve the last 10 opportunities with a condition
const params = {
  _limit: 10,
  _sort: 'created', // To get the latest opportunities first
};

// Axios configuration with headers
const axiosConfig = {
  headers: {
    Authorization: `Basic ${apiKey}`,
  },
  params: params // Include the filter condition in the request
};

var userArray = [];

// funtion to calculate user to assign task and oppertunity
function assign(arr){
    const people = [
        { name: 'Ben Wright', percentage: 50, target: 5 },
        { name: 'Nicolas Comin Marques', percentage: 40, target: 4 },
        { name: 'Vy Huynh', percentage: 10, target: 1 }
    ]; 

    // Calculate how many times each person has been assigned in the last 10 tasks
    for (let person of people) {
        person.assigned = arr.filter(p => p === person.name).length;
    }

    // Find the person who is under their target assignments and assign the task to them
    for (let person of people) {
        if (person.assigned < person.target) {
            return person.name;
        }
    }
    
    // If everyone has been assigned according to their percentage, 
    // you can decide the logic. Here, I am assigning to the first person.
    return people[0].name;
}


  // Define a route to handle GET requests
app.get('/user', async (req, res) => {
  //var user = getUser();
  //console.log(user);
  var userToAssign
  await axios
    .get(apiUrl, axiosConfig)
    .then((response) => {
      // Handle the API response here
      const opportunities = response.data.data;
      console.log('users of last 10 oppertunities:');
      opportunities.forEach((opportunity) => {
        userArray.push(opportunity.user_name)
        // Add more fields as needed
      });
      console.log(userArray)
      userToAssign = assign(userArray)
      console.log(userToAssign)
      return userToAssign
    })
    .catch((error) => {
      console.error('Error fetching opportunities:', error);
      return error;
    });
  userArray.length = 0;
  res.send(userToAssign)
  // Send a simple response
});



  // Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
