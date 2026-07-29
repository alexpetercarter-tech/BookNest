/* ==========================================================
   BookNest JavaScript
   Author : BookNest Sample Project
========================================================== */

// ==========================
// Mobile Navigation
// ==========================

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}

// ==========================
// Sample Book Data
// ==========================

const books = [

{
id:1,
title:"Java: The Masterclass",
author:"DR.Evan S.Reed & Amanda L.Chen",
category:"Programming",
rating:4.8,
price:29.99,
image:"images/java.png",
description:"A beginner-friendly guide to Java programming covering OOP, collections, multithreading, and modern Java."
},

{
id:2,
title:"Python: The Masterclass",
author:"Dr. Emily A. Davis & Mark S. Miller",
category:"Programming",
rating:4.7,
price:24.99,
image:"images/python.png",
description:"Learn Python from scratch including functions, file handling, object-oriented programming, and projects."
},

{
id:3,
title:"AI & ML: The Masterclass",
author:"Prof. Liam O'Sullivan & Dr. Maria Ruiz",
category:"Artificial Intelligence",
rating:4.9,
price:39.99,
image:"images/ai-ml.png",
description:"Understand AI concepts including intelligent agents, search algorithms, neural networks, and applications."
},

{
id:4,
title:"Cybersecurity & Threat Defense: The Masterclass",
author:"Dr. Liam G. O'Connell & Prof. Sophia J. Chen",
category:"Cyber Security",
rating:4.6,
price:31.99,
image:"images/cybersecurity.png",
description:"Learn ethical hacking, penetration testing, cryptography, and modern cyber defense strategies."
},

{
id:5,
title:"Databases & Data Systems: The Masterclass",
author:"Dr. Eleanor Vance & Prof. Elias Reed",
category:"Database",
rating:4.7,
price:28.99,
image:"images/database.png",
description:"Covers relational databases, SQL, normalization, indexing, transactions, and database design."
},

{
id:6,
title:"Cloud Computing & Advanced Architecture: The Masterclass",
author:"Dr. Benjamin Harris & Prof. Amanda Chen",
category:"Cloud Computing",
rating:4.5,
price:34.99,
image:"images/cloud.png",
description:"Learn cloud architecture, virtualization, AWS, Azure, containers, and cloud deployment models."
},

{
id:7,
title:"Web Applications & Full-Stack Development: The Masterclass",
author:"Dr. Liam S. O'Connell & Prof. Sophia J. Chen",
category:"Web Development",
rating:4.8,
price:27.99,
image:"images/web.png",
description:"HTML5, CSS3, JavaScript, responsive design, accessibility, and frontend best practices."
}

];

// ==========================
// Local Storage Cart
// ==========================

let cart = JSON.parse(localStorage.getItem("booknestCart")) || [];

// ==========================
// Save Cart
// ==========================

function saveCart(){

localStorage.setItem(
"booknestCart",
JSON.stringify(cart)
);

updateCartCount();

}

// ==========================
// Cart Count
// ==========================

function updateCartCount(){

const cartCount = document.getElementById("cart-count");

if(!cartCount) return;

cartCount.innerText = cart.length;

}

updateCartCount();

// ==========================
// Add To Cart
// ==========================

function addToCart(id){

const selectedBook = books.find(book => book.id === id);

cart.push(selectedBook);

saveCart();

alert(selectedBook.title + " added to cart.");

}

// ==========================
// Display Books
// ==========================

function displayBooks(bookArray){

const container = document.getElementById("books-container");

if(!container) return;

container.innerHTML="";

bookArray.forEach(book=>{

container.innerHTML += `

<div class="book-item">

<img src="${book.image}" alt="${book.title}">

<div class="book-content">

<h3>${book.title}</h3>

<p class="book-author">
${book.author}
</p>

<span class="category">
${book.category}
</span>

<div class="rating">
⭐ ${book.rating}
</div>

<p class="book-description">
${book.description}
</p>

<div class="book-price">
$${book.price}
</div>

<div class="book-buttons">

<button
class="details-btn"
onclick="viewBook(${book.id})">

Details

</button>

<button
class="cart-btn"
onclick="addToCart(${book.id})">

Add to Cart

</button>

</div>

</div>

</div>

`;

});

}

displayBooks(books);

// ==========================
// Search Books
// ==========================

const searchInput = document.getElementById("search");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const keyword =
searchInput.value.toLowerCase();

const filteredBooks = books.filter(book=>

book.title.toLowerCase().includes(keyword)

||

book.author.toLowerCase().includes(keyword)

||

book.category.toLowerCase().includes(keyword)

);

displayBooks(filteredBooks);

});

}
/* ==========================================================
   Category Filter
========================================================== */

const categoryFilter = document.getElementById("category");

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        const selectedCategory = this.value;

        if (selectedCategory === "All") {

            displayBooks(books);

        } else {

            const filteredBooks = books.filter(book =>
                book.category === selectedCategory
            );

            displayBooks(filteredBooks);

        }

    });

}

/* ==========================================================
   View Book Details
========================================================== */

function viewBook(id) {

    localStorage.setItem("selectedBook", id);

    window.location.href = "book-details.html";

}

/* ==========================================================
   Display Selected Book
========================================================== */

function loadBookDetails() {

    const detailsContainer = document.getElementById("book-details");

    if (!detailsContainer) return;

    const selectedId = Number(localStorage.getItem("selectedBook"));

    const book = books.find(item => item.id === selectedId);

    if (!book) {

        detailsContainer.innerHTML = "<h2>Book not found.</h2>";

        return;

    }

    detailsContainer.innerHTML = `

    <div class="details-container">

        <div class="details-image">

            <img src="${book.image}" alt="${book.title}">

        </div>

        <div class="details-content">

            <h2>${book.title}</h2>

            <p>${book.description}</p>

            <h3 class="price">$${book.price}</h3>

            <div class="book-info">

                <p><span>Author :</span> ${book.author}</p>

                <p><span>Category :</span> ${book.category}</p>

                <p><span>Rating :</span> ⭐ ${book.rating}</p>

                <p><span>Publisher :</span> BookNest Publications</p>

                <p><span>Language :</span> English</p>

                <p><span>ISBN :</span> 978-123456789${book.id}</p>

                <p><span>Availability :</span> In Stock</p>

            </div>

            <button onclick="addToCart(${book.id})">

                Add To Cart

            </button>

        </div>

    </div>

    `;

}

loadBookDetails();

/* ==========================================================
   Display Cart
========================================================== */

function displayCart() {

    const cartBody = document.getElementById("cart-body");

    const grandTotal = document.getElementById("grand-total");

    if (!cartBody) return;

    cartBody.innerHTML = "";

    let total = 0;

    cart.forEach((book, index) => {

        total += book.price;

        cartBody.innerHTML += `

        <tr>

            <td>

                <img src="${book.image}" alt="${book.title}">

            </td>

            <td>${book.title}</td>

            <td>1</td>

            <td>$${book.price.toFixed(2)}</td>

            <td>

                <button

                class="remove-btn"

                onclick="removeCartItem(${index})">

                Remove

                </button>

            </td>

        </tr>

        `;

    });

    if (grandTotal) {

        grandTotal.innerText = "$" + total.toFixed(2);

    }

}

displayCart();

/* ==========================================================
   Remove Item
========================================================== */

function removeCartItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}

/* ==========================================================
   Checkout
========================================================== */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    alert("Thank you for shopping with BookNest!");

    cart = [];

    saveCart();

    displayCart();

}

/* ==========================================================
   Contact Form Validation
========================================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();

        if (

            name === "" ||

            email === "" ||

            phone === "" ||

            subject === "" ||

            message === ""

        ) {

            alert("Please fill all required fields.");

            return;

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Enter a valid email address.");

            return;

        }

        const phonePattern =
            /^[0-9]{10}$/;

        if (!phonePattern.test(phone)) {

            alert("Phone number should contain exactly 10 digits.");

            return;

        }

        document.getElementById("success-message").style.display = "block";

        contactForm.reset();

    });

}

/* ==========================================================
   Continue Shopping
========================================================== */

function continueShopping() {

    window.location.href = "books.html";

}

/* ==========================================================
   Auto Update Cart Counter
========================================================== */

updateCartCount();