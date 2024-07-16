// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

// ASINCRONISMO

// El código asíncrono SIEMPRE se ejecuta DESPUÉS del síncrono (que es el que se ejecuta en orden) Es decir, los setTimeout y los setInterval siempre se van a ejecutar después de todo lo demás

setTimeout(() => {
  console.log('HOLA');
}, 1000);
console.log(1);
console.log(2);
console.log(3);

// FORMA ANTIGUA (antes de 2015)

// Las peticiones se suelen hacer a una url
// https://jsonplaceholder.typicode.com/users esta url sirve para hacer pruebas

const xhr = new XMLHttpRequest(); // objeto que permite hacer peticiones

xhr.open('GET', 'https://jsonplaceholder.typicode.com/users'); // petición de datos: qué método se utiliza(GET) y adónde se envía(url)

xhr.send(); // envío de la petición

// El evento de escucha se dispara cuando llegan los datos, no antes
// si el código está entre 200 y 300 es que todo ha ido bien
// JSON.parse es para convertir xhr.responseText en un formato que js entienda
xhr.addEventListener('load', () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const data = JSON.parse(xhr.responseText); // llegada de datos y conversión
    console.log(data);
  }
});

/////////////////////////////////////////////////

// Para que el código anterior fuera reutilizable y no tener que volver a escribir todo se creó una función que recibiera la url, qué pasaba si todo iba bien y qué hacer en caso de error

const allOk = data => console.log(data); // esto es success
const printError = error => console.log(error); // esto es por si hay un error
const getFirstUser = data => console.log(data[0]); // otra opción según la inf que quieres

const getUsers = (url, success, sendError) => {
  const xhr = new XMLHttpRequest(); // objeto que sirve para hacer peticiones

  xhr.open('GET', url); // establecer qué tipo de petición de datos es y adónde se hace

  xhr.send(); // envío de la petición

  // me quedo a la espera de que los datos lleguen
  // esto es para saber si la inf llega correctamente
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      success(data);
    }
  });

  // me quedo a la espera de posibles errores en la petición
  xhr.addEventListener('error', error => {
    sendError(error);
  });
};

getUsers('https://jsonplaceholder.typicode.com/users', allOk, printError);

/////////////////////////////////////////////////

// FORMA ACTUAL (después de 2015)

// PROMESAS -> Esperan a que la petición se resuelva y llevan internamente implementada la función de "todo ok" y la de error. Las promesas son funciones

// resolve = todo va bien
// reject = algo ha ido mal
// ambos parámetros son automáticos. Ya no hace falta, por tanto, enviar success ni sendError porque ya los tiene la propia promesa

const getUsers2 = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url); // establecer qué tipo de petición de datos es y adónde se hace

    xhr.send(); // envío de la petición

    // me quedo a la espera de que los datos lleguen
    // para saber si la inf llega correctamente
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve(data); // el resolve se comunica con el then
      }
    });

    // me quedo a la espera de posibles errores en la petición
    xhr.addEventListener('error', error => {
      reject(error); // el reject se comunica con el catch
    });
  });
};

// then -> TODO BIEN
// catch -> ERRORES

getUsers2('https://jsonplaceholder.typicode.com/users')
  .then(data => console.log(data)) // todo va bien
  .catch(error => console.log(error)); // captura los errores

/////////////////////////////////////////////////

// Ejemplo más simple con una promesa:

const fakePromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber > 0.7) {
        resolve('TODO OK');
      } else {
        reject('ERROR');
      }
    }, 1000);
  });
};

fakePromise()
  .then(msg => console.log(msg))
  .catch(error => console.log(error));

/////////////////////////////////////////////////

// FORMA MÁS ACTUAL (2017) SINTAXIS THEN - CATCH

const getUsers3 = url => {
  fetch(url) //contiene internamente la devolución de una nueva promesa
    .then(response => response.json()) // convertir los datos para que se puedan leer, pasa los datos al siguiente then, es para leer el resolve
    .then(data => console.log(data)) // datos finales
    .catch(error => console.log(error));
};

getUsers3('https://jsonplaceholder.typicode.com/users');

/////////////////////////////////////////////////

// SINTAXIS ASYNC AWAIT (alternativa más cómoda a la forma actual de 2017)

// Esto se usa siempre que haya que hacer una petición de datos

// convertir la función en asíncrona con async
const getUsers4 = async url => {
  // try intenta ejecutar el código, si algo va mal, va al catch
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getUsers4('https://jsonplaceholder.typicode.com/users');
