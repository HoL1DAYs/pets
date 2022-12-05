'use strict';

const btn = document.querySelector('.nav__link');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  data.array.forEach(element => {
    const html = `
    <article class="country ${className}">
      <div class="country__data">
        <h1 class="country__name>${element.animal}</h1>
        <h2 class="country__name">${element.breed}</h2>
        <h3 class="country__region">${element.country}</h3>
        <p class="country__row"><span></span>${element.weight}</p>
      </div>
    </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

const getCountryData = function () {
  fetch(`http://localhost:8080/api/pets`)
    .then(response => {
      if (!response.ok)
        throw new Error(`country is not found ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data))
    .catch(err => console.error(err))
    .finally(console.log('finally is being proceeded'));
};

btn.addEventListener('click', function () {
  getCountryData();
});
