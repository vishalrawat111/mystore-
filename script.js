const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category-select");

let products = [];

// Fetch products from API
async function loadProducts() {

    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    products = data.products;

    renderProducts(products);
}

// Render products
function renderProducts(list) {

    productContainer.innerHTML = "";

    list.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
        <img src="${product.thumbnail}" onclick="openProduct(${product.id})" style="cursor:pointer"/>
        <h3 onclick="openProduct(${product.id})" style="cursor:pointer">${product.title}</h3>
        <p>₹${product.price}</p>
        <p>${product.description}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productContainer.appendChild(card);

    });
}

// Open product details page
function openProduct(id) {
    window.location.href = "product.html?id=" + id;
}

// Add to cart
function addToCart(id) {

    const product = products.find(p => p.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.title + " added to cart");
}

// Update cart count
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

}

// Search products
searchInput.addEventListener("input", (e) => {

    const text = e.target.value.toLowerCase();

    const filtered = products.filter(p =>
        p.title.toLowerCase().includes(text)
    );

    renderProducts(filtered);

});

// Category filter
categorySelect.addEventListener("change", (e) => {

    const category = e.target.value;

    if (category === "All") {
        renderProducts(products);
    } else {

        const filtered = products.filter(p =>
            p.category.toLowerCase() === category.toLowerCase()
        );

        renderProducts(filtered);

    }

});
function goCheckout() {
    window.location.href = "checkout.html";
}

// Load products
loadProducts();

// Update cart count when page loads
updateCartCount();