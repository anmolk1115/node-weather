console.log('Client Side Javascript Loaded');
console.log('Client Side Javascript Loaded');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})


let form = document.querySelector('form');
let search = document.querySelector('input');

let message1 = document.querySelector('.message1');
let message2 = document.querySelector('.message2');


// message2.textContent = 'anmol';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';

    if (!location) {
        return message1.textContent = 'Pls enter a value';
    }

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                message1.textContent = 'Invalid input location or ' + data.error;

            } else {

                message1.textContent = data.location;
                message2.textContent = data.forecast;

            }
        })
    })
})