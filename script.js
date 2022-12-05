'use strict';

const btn = document.querySelector('.nav__link');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.animal}" />
    <div class="country__data">
      <h1 class="country__name">${data.breed}</h3>
      <h2 class="country__region">${data.country}</h4>
      <p class="country__row"><span>👫</span>${weight}</p>
    </div>
  </article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   console.log(request.responseText);
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);
//     const neighbour = data.borders?.[0];
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

const getCountryData = function () {
  fetch(`http://localhost:8080/api/pets`)
    .then(response => {
      if (!response.ok)
        throw new Error(`country is not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => alert(err))
    .finally(console.log('finally is being proceeded'));
};

btn.addEventListener('click', function () {
  getCountryData();
});

// const WhereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}`);
//       return data.city;
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

// const city = WhereAmI(52.508, 13.381);
// getCountryData(city);

// console.log('Text start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('test end');

// const WhereIam = async function (country) {
//   const res = await fetch(`https://restcountries.com/v2/name/${country}`);
//   const data = await res.json();
//   console.log(data);
//   renderCountry(data[0]);
// };
// WhereIam('portugal');
