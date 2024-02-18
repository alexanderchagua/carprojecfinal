import carData from '../public/json/car.json';

// Function to search for cars by name
function searchCarsByName(searchTerm) {
  const searchTermLowercase = searchTerm.toLowerCase().trim();
  return carData.filter(car => car.brand.toLowerCase().includes(searchTermLowercase));
}

// Function to go to the home page
function goToHome() {
  window.location.href = '../index.html';
}

// Function to go to the car details page
function goToCarDetails(car) {
  localStorage.setItem('selectedCar', JSON.stringify(car));
  window.location.href = 'car_pages/car.html';
}

export { searchCarsByName, goToHome, goToCarDetails };

// Function to get parameter from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Function to load header and footer


export async function renderWithTemplate(
  template,
  parentElement,
  data,
  callback,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlString = await template(data);
  
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}


function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('/partials/header.html');
  const footerTemplate = await loadTemplate('/partials/footer.html');
  const headerEl = document.querySelector('#main-header');
  const footerEl = document.querySelector('#main-footer');
  await renderWithTemplate(headerTemplate, headerEl);
  await renderWithTemplate(footerTemplate, footerEl);
}
