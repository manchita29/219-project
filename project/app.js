let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '4.jpeg',
        price: 500
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: '1image.webp',
        price: 500
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '2.webp',
        price: 1000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '3.jpg',
        price: 1000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.jpg',
        price: 800
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.jpg',
        price: 700
    },
    {
        id: 7,
        name: 'PRODUCT NAME 6',
        image: '7.jpg',
        price: 700
    },
    {
        id: 8,
        name: 'PRODUCT NAME 6',
        image: '8.jpg',
        price: 700
    },
    {
        id: 9,
        name: 'PRODUCT NAME 6',
        image: '9.jpg',
        price: 699
    },
    {
        id: 10,
        name: 'PRODUCT NAME 6',
        image: '10.jpg',
        price: 699
    },
    {
        id: 11,
        name: 'PRODUCT NAME 6',
        image: '11.webp',
        price: 599
    },
    {
        id: 12,
        name: 'PRODUCT NAME 1',
        image: '12.webp',
        price: 1000
    },
    {
        id: 13,
        name: 'PRODUCT NAME 1',
        image: '13.jpg',
        price: 500
    },
    {
        id: 14,
        name: 'PRODUCT NAME 1',
        image: '14.jpg',
        price: 1000
    },
    {
        id: 15,
        name: 'PRODUCT NAME 1',
        image: '15.jpeg',
        price: 900
    },
];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        // copy product from list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
};
function calculateTotalCost() {
    let totalCost = 0;

    // Loop through each item in the listCards array and sum up the prices
    listCards.forEach((value) => {
        totalCost += value.price;
    });

    // Store the total cost in localStorage
    localStorage.setItem('totalCost', totalCost);

    return totalCost;
}

// Call the function to calculate and store total cost when the page loads
const totalCost = calculateTotalCost();
console.log('Total cost:', totalCost); // L

