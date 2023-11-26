const fs = require("fs");
// For making HTTP requests in Node.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Read product data from the JSON file
const productsData = JSON.parse(fetch(api_url).then((res) => res));

// Define the API endpoint where you want to send the POST request
const api_url = "http://localhost:8080/Products"; // Replace with your actual API endpoint

// Send a POST request with the product data
productsData.forEach((item) => {
  fetch(api_url, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 201) {
        console.log("Product created successfully!");
      } else {
        console.log(
          `Failed to create product. Status code: ${response.status}`
        );
        return response.text();
      }
    })
    .then((data) => {
      console.log(data); // Response data for debugging
    })
    .catch((error) => {
      console.error(`Request error: ${error}`);
    });
});
