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
        image: 'https://example.com/image1.png',
        price: 1000
    },
    // Add more products here
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
}

let payButton = document.querySelector('.pay');
payButton.addEventListener('click', () => {
    // Get total cost
    let totalPrice = parseInt(total.innerText.replace(/[^0-9]/g, '')); // Extracts numerical value from total

    // Redirect to payment page with total cost as a query parameter
    window.location.href = `payment.html?total=${totalPrice}`;
});
// This is just a sample script to demonstrate storing total cost in localStorage
// In a real application, you would have your own logic to calculate and store the total cost

// Sample function to calculate and store total cost
function calculateTotalCost() {
    let totalCost = 0;
    // You may have your own logic to calculate the total cost from the cart items
    // For demonstration purposes, let's assume the total cost is 1000
    totalCost = 1000;

    // Store the total cost in localStorage
    localStorage.setItem('totalCost', totalCost);
}

// Call the function to calculate and store total cost when the page loads
calculateTotalCost();
