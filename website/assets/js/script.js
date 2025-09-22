'use strict';



/* add event on element */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);                                          
  }
}



/* navbar toggle */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/* header sticky & back top btn active */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/* scroll reveal effect */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

/*countdown*/

// Set the target date and time for the timer
const targetDate = new Date("October 2, 2024 00:00:00").getTime();

// Update the timer every second
const timerInterval = setInterval(() => {
    // Get the current date and time
    const now = new Date().getTime();

    // Calculate the time difference between now and the target date
    const timeDifference = targetDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = String(Math.floor(timeDifference / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((timeDifference % (1000 * 60)) / 1000)).padStart(2, '0');

    // Display the calculated time in the HTML elements
    document.querySelector('.time[aria-label="days"]').textContent = days;
    document.querySelector('.time[aria-label="hours"]').textContent = hours;
    document.querySelector('.time[aria-label="minutes"]').textContent = minutes;
    document.querySelector('.time[aria-label="seconds"]').textContent = seconds;

    // Check if the timer has expired
    if (timeDifference < 0) {
        clearInterval(timerInterval);
        document.querySelector('.countdown').textContent = "Timer expired";
    }
}, 1000);


/*CART INDEX*/

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        alert('Item already in cart');
    } else {
      cart.push({ name, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart');
    }
}



  /*CART */
 
// Initialize cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items in the table
function renderCart() {
    const cartTable = document.getElementById('cart-table');
    const totalPriceElement = document.getElementById('total-price');
    cartTable.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
        </tr>
    `; // Reset table and add headers
    let total = 0;

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity; // Calculate subtotal for the item
        total += itemSubtotal; // Add to total

        const cartRow = document.createElement('tr');
        cartRow.innerHTML = `
            <td>
                <div class="cart-info">
                   <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;"/>
                    <div>
                        <p>${item.name}</p>
                        <small>Price: $${item.price.toFixed(2)}</small>
                        <a href="#" onclick="removeFromCart('${item.name}')">Remove</a>
                    </div>
                </div>
            </td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)" />
            </td>
            <td>$${itemSubtotal.toFixed(2)}</td>
        `;
        cartTable.appendChild(cartRow);
    });

    totalPriceElement.innerText = `$${total.toFixed(2)}`; // Update total price
    updateCartCount();
}

// Function to remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Function to update quantity and recalculate totals
function updateQuantity(name, quantity) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity = parseInt(quantity); // Update the quantity in the cart
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); // Re-render the cart to show updated totals
        updateCartCount();
    }
}

// Function to update the cart count in the header
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementsByClassName('cart-count');
  cartCountElement[0].innerHTML = totalItems;
  console.log(totalItems);
  updateCartCount();
}

// Function to add item to cart
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
        cart.push({ name, price, image, quantity: 1 }); // Add new item with quantity 1
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Initial rendering of the cart
renderCart();

/*SEARCH*/
// Predefined list of suggestions
const suggestions = [
  "Apple",
  "Banana",
  "Orange",
  "Pineapple",
  "Strawberry",
  "Watermelon",
  "Grapes",
  "Peach",
  "Blueberry",
  "Cherry",
];

// Create a suggestions list element
const suggestionsList = document.createElement('div');
suggestionsList.classList.add('suggestions-list');
document.querySelector('.input-wrapper').appendChild(suggestionsList);

// Function to show suggestions based on input
function showSuggestions(value) {
  suggestionsList.innerHTML = ''; // Clear previous suggestions

  if (!value) {
      suggestionsList.style.display = 'none'; // Hide if input is empty
      return;
  }

  const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase())
  );

  if (filteredSuggestions.length === 0) {
      suggestionsList.style.display = 'none'; // Hide if no suggestions
      return;
  }

  filteredSuggestions.forEach(suggestion => {
      const div = document.createElement('div');
      div.textContent = suggestion;
      div.classList.add('suggestion-item');
      div.onclick = () => {
          document.querySelector('.search-field').value = suggestion;
          suggestionsList.style.display = 'none'; // Hide suggestions after selection
      };
      suggestionsList.appendChild(div);
  });

  suggestionsList.style.display = 'block'; // Show suggestions
}

// Event listener for input changes
document.querySelector('.search-field').addEventListener('input', function() {
  showSuggestions(this.value);
});

// Hide suggestions when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.input-wrapper')) {
      suggestionsList.style.display = 'none';
  }
});
