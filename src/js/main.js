import { searchCarsByName, goToCarDetails } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = '';

  results.forEach(car => {
    const carElement = document.createElement('div');
    carElement.innerHTML = `
      <a href="car_pages/car.html?id=${car.id}">
        <img src="${car.image}" alt="${car.brand}">
        <p>${car.brand}</p>
      </a>
    `;
    searchResultsContainer.appendChild(carElement);
  });
}

// Get the search button by its ID
const searchButton = document.getElementById('searchButton');

// Add a click event to the search button
searchButton.addEventListener('click', () => {
  searchCars();
});

// Function to search for cars
function searchCars() {
  const searchTerm = document.getElementById('searchInput').value;
  const searchResults = searchCarsByName(searchTerm);
  displaySearchResults(searchResults);
}


