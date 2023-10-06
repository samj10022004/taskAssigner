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
    // Check if the last item in the array is "sale"
    salesPerson = 'Ben Wright'
    if (arr[0] === salesPerson) {
        // Start comparing from the 2nd last item (index arr.length - 2)
        for (let i = 1; i <= arr.length-2; i++) {
          console.log(i);
          console.log(arr[i]);
          if (arr[i] === salesPerson) {
            console.log(arr[i]);
            continue;
          } else {
            return salesPerson;
          }
        }
        // All items matched up to the 2nd last item
        return 'Nicolas Comin Marques';
      } else if(arr[0] === 'Nicolas Comin Marques'){
        
        for (let i = 1; i <= arr.length-7; i++) {
          console.log(i);
          console.log(arr[i]);
          if (arr[i] === 'Nicolas Comin Marques') {
            console.log(arr[i]);
            continue;
          } else {
            return 'Nicolas Comin Marques';
          }
          
        }
        return salesPerson;
      }

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
