import { getParam } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();


async function renderCarDetails(carData) {
  const carDetailsContainer = document.getElementById('car-details');
  carDetailsContainer.innerHTML = `
    <img src="../${carData.image}" alt="${carData.brand}">
    <h2>${carData.brand} - ${carData.model}</h2>
    <p>Price: ${carData.price}</p>
    <p>Color: ${carData.color}</p>
  `;
}

async function init() {
  // Get the car ID from the URL parameters
  const carId = getParam('id');
  console.log('carId:', carId);

  // Check if carId is defined
  if (!carId) {
    console.error('No car ID provided in the URL parameters.');
    return;
  }

  // Load car details from JSON file
  const response = await fetch('/public/json/car.json');
  const carData = await response.json();
  console.log('carData:', carData);

  // Find the car with the corresponding ID
  const foundCar = carData.find(car => car.id === parseInt(carId));
  console.log('foundCar:', foundCar);

  // Check if a car with the provided ID was found
  if (!foundCar) {
    console.error('No car found with the provided ID.');
    return;
  }

  // Render the car details
  await renderCarDetails(foundCar);

  
}

// Call the init function when the page is loaded
init();
