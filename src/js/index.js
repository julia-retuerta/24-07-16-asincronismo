// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

// ASINCRONISMO

// Forma antigua

// const xhr = new XMLHttpRequest();

// xhr.open('GET', 'https://jsonplaceholder.typicode.com/users'); // petición de datos

// xhr.send(); // envío de la petición

// xhr.addEventListener('load', () => {
//   if (xhr.status >= 200 && xhr.status < 300) {
//     const data = JSON.parse(xhr.responseText);
//     console.log(data);
//   }
// });

// const allOk = data => console.log(data);
// // const getFirstUser = data => console.log(data[0]) // otra opción
// const printError = error => console.log(error);

// const getUsers = (url, success, sendError) => {
//   const xhr = new XMLHttpRequest(); // objeto que sirve para hacer peticiones

//   xhr.open('GET', url); // establecer qué tipo de petición de datos es y adónde se hace

//   xhr.send(); // envío de la petición

//   // me quedo a la espera de que los datos lleguen
//   // para saber si la inf llega correctamente
//   xhr.addEventListener('load', () => {
//     if (xhr.status >= 200 && xhr.status < 300) {
//       const data = JSON.parse(xhr.responseText);
//       success(data);
//     }
//   });

//   // me quedo a la espera de posibles errores en la petición
//   xhr.addEventListener('error', error => {
//     sendError(error);
//   });
// };

// getUsers('https://jsonplaceholder.typicode.com/users', allOk, printError);

// Forma actual

// PROMESAS -> Esperar a que la petición se resuelva y llevan internamente la función de  "todo ok" y la de error

// const getUsers = url => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', url); // establecer qué tipo de petición de datos es y adónde se hace

//     xhr.send(); // envío de la petición

//     // me quedo a la espera de que los datos lleguen
//     // para saber si la inf llega correctamente
//     xhr.addEventListener('load', () => {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         const data = JSON.parse(xhr.responseText);
//         success(data);
//       }
//     });

//     // me quedo a la espera de posibles errores en la petición
//     xhr.addEventListener('error', error => {
//       sendError(error);
//     });
//   });

//   // then -> TODO BIEN
//   // catch -> ERRORES

//   getUsers('https://jsonplaceholder.typicode.com/users')
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// };

// Ejemplo

// const fakePromise = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const randomNumber = Math.random();
//       if (randomNumber > 0.7) {
//         resolve('TODO OK');
//       } else {
//         reject('ERROR');
//       }
//     }, 1000);
//   });
// };

// Forma actual

// const getUsers = url => {
//   fetch(url) //contiene la devolución de una nueva promesa
//     .then(response => response.json()) // convertir los datos, pasa la inf al siguiente then
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// };

// getUsers('https://jsonplaceholder.typicode.com/users');

// SINTAXIS ASYNC AWAIT

const getUsers = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getUsers('https://jsonplaceholder.typicode.com/users');
