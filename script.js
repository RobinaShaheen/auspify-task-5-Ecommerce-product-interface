/* ========================================
   SHOPFLOW - E-COMMERCE PRODUCT INTERFACE
   ======================================== */


/* ---------- Product Catalog ---------- */

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 59.99,
    description: "Comfortable wireless headphones with clear sound.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },

  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 89.99,
    description: "Modern smartwatch for everyday activity tracking.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },

  {
    id: 3,
    name: "Minimal Sneakers",
    category: "fashion",
    price: 74.99,
    description: "Clean and comfortable sneakers for daily wear.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },

  {
    id: 4,
    name: "Classic Backpack",
    category: "fashion",
    price: 49.99,
    description: "Durable everyday backpack with a modern design.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
  },

  {
    id: 5,
    name: "Modern Desk Lamp",
    category: "home",
    price: 39.99,
    description: "Minimal desk lamp designed for focused work.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c"
  },

  {
    id: 6,
    name: "Ceramic Coffee Mug",
    category: "home",
    price: 19.99,
    description: "Simple ceramic mug for coffee and tea.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d"
  },

  {
    id: 7,
    name: "Leather Wallet",
    category: "accessories",
    price: 34.99,
    description: "Compact wallet with a classic leather finish.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93"
  },

  {
    id: 8,
    name: "Classic Sunglasses",
    category: "accessories",
    price: 29.99,
    description: "Timeless sunglasses with a lightweight frame.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
  }
];


/* ---------- Application State ---------- */

let cart = [];

let filteredProducts = [...products];


/* ---------- DOM Elements ---------- */

const productGrid = document.getElementById("productGrid");

const productCount = document.getElementById("productCount");

const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");

const sortFilter = document.getElementById("sortFilter");

const cartButton = document.getElementById("cartButton");

const cartCount = document.getElementById("cartCount");

const cartSidebar = document.getElementById("cartSidebar");

const cartOverlay = document.getElementById("cartOverlay");

const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const checkoutButton = document.getElementById("checkoutButton");

const menuButton = document.getElementById("menuButton");

const mainNav = document.getElementById("mainNav");

/* ========================================
   PRODUCT FUNCTIONS
   ======================================== */


/* ---------- Display Products ---------- */

function displayProducts(productList) {

  productGrid.innerHTML = "";

  productCount.textContent =
    `${productList.length} ${productList.length === 1 ? "product" : "products"}`;


  if (productList.length === 0) {

    emptyState.classList.add("show");

    return;
  }


  emptyState.classList.remove("show");


  productList.forEach((product) => {

    const productCard = document.createElement("article");

    productCard.className = "product-card";


    productCard.innerHTML = `
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        />
      </div>

      <div class="product-info">

        <p class="product-category">
          ${formatCategory(product.category)}
        </p>

        <h3 class="product-name">
          ${product.name}
        </h3>

        <p class="product-description">
          ${product.description}
        </p>

        <div class="product-bottom">

          <span class="product-price">
            $${product.price.toFixed(2)}
          </span>

          <button
            class="add-to-cart"
            data-id="${product.id}"
            type="button"
          >
            Add to Cart
          </button>

        </div>

      </div>
    `;


    productGrid.appendChild(productCard);
  });


  /* Add button event listeners */

  const addButtons =
    document.querySelectorAll(".add-to-cart");


  addButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const productId =
        Number(button.dataset.id);

      addToCart(productId);

    });

  });

}


/* ---------- Format Category ---------- */

function formatCategory(category) {

  return category.charAt(0).toUpperCase() +
    category.slice(1);

}


/* ========================================
   SEARCH & FILTER
   ======================================== */


/* ---------- Apply Filters ---------- */

function applyFilters() {

  const searchTerm =
    searchInput.value
      .trim()
      .toLowerCase();


  const selectedCategory =
    categoryFilter.value;


  filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchTerm) ||

        product.description
          .toLowerCase()
          .includes(searchTerm);


      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;


      return matchesSearch && matchesCategory;

    });


  applySorting();

}


/* ---------- Apply Sorting ---------- */

function applySorting() {

  const sortValue =
    sortFilter.value;


  if (sortValue === "price-low") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }


  else if (sortValue === "price-high") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }


  else if (sortValue === "name") {

    filteredProducts.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );

  }


  displayProducts(filteredProducts);

}


/* ---------- Search Event ---------- */

searchInput.addEventListener(
  "input",
  applyFilters
);


/* ---------- Category Event ---------- */

categoryFilter.addEventListener(
  "change",
  applyFilters
);


/* ---------- Sort Event ---------- */

sortFilter.addEventListener(
  "change",
  applyFilters
);


/* ========================================
   SHOPPING CART
   ======================================== */


/* ---------- Add Product to Cart ---------- */

function addToCart(productId) {

  const product =
    products.find(
      (item) => item.id === productId
    );


  if (!product) {
    return;
  }


  const existingItem =
    cart.find(
      (item) => item.id === productId
    );


  if (existingItem) {

    existingItem.quantity += 1;

  }

  else {

    cart.push({
      ...product,
      quantity: 1
    });

  }


  updateCart();


  /* Automatically open cart */

  openCart();

}


/* ---------- Remove Product ---------- */

function removeFromCart(productId) {

  cart =
    cart.filter(
      (item) => item.id !== productId
    );


  updateCart();

}


/* ---------- Update Cart ---------- */

function updateCart() {

  renderCart();

  updateCartCount();

  updateCartTotal();

}


/* ---------- Cart Count ---------- */

function updateCartCount() {

  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  cartCount.textContent =
    totalItems;

}


/* ---------- Cart Total ---------- */

function updateCartTotal() {

  const total =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );


  cartTotal.textContent =
    `$${total.toFixed(2)}`;

}


/* ========================================
   CART RENDERING
   ======================================== */


/* ---------- Render Cart ---------- */

function renderCart() {

  cartItems.innerHTML = "";


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="cart-empty">
        <p>
          Your cart is empty.
        </p>
      </div>
    `;

    return;
  }


  cart.forEach((item) => {

    const cartItem =
      document.createElement("div");


    cartItem.className =
      "cart-item";


    cartItem.innerHTML = `

      <div class="cart-item-image">

        <img
          src="${item.image}"
          alt="${item.name}"
        />

      </div>


      <div class="cart-item-info">

        <h3>
          ${item.name}
        </h3>

        <p class="cart-item-price">
          $${item.price.toFixed(2)}
          ×
          ${item.quantity}
        </p>

      </div>


      <button
        class="cart-item-remove"
        data-id="${item.id}"
        type="button"
      >
        Remove
      </button>

    `;


    cartItems.appendChild(cartItem);

  });


  /* Remove button listeners */

  const removeButtons =
    document.querySelectorAll(
      ".cart-item-remove"
    );


  removeButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const productId =
          Number(button.dataset.id);

        removeFromCart(productId);

      }
    );

  });

}


/* ========================================
   CART SIDEBAR
   ======================================== */


/* ---------- Open Cart ---------- */

function openCart() {

  cartSidebar.classList.add("active");

  cartOverlay.classList.add("active");

  document.body.classList.add("cart-open");

}


/* ---------- Close Cart ---------- */

function closeCartSidebar() {

  cartSidebar.classList.remove("active");

  cartOverlay.classList.remove("active");

  document.body.classList.remove("cart-open");

}


/* ---------- Cart Button ---------- */

cartButton.addEventListener(
  "click",
  openCart
);


/* ---------- Close Button ---------- */

closeCart.addEventListener(
  "click",
  closeCartSidebar
);


/* ---------- Overlay ---------- */

cartOverlay.addEventListener(
  "click",
  closeCartSidebar
);


/* ---------- Escape Key ---------- */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeCartSidebar();

    }

  }
);


/* ========================================
   CHECKOUT
   ======================================== */

checkoutButton.addEventListener(
  "click",
  () => {

    if (cart.length === 0) {

      alert(
        "Your cart is empty. Add a product first."
      );

      return;
    }


    alert(
      "Checkout interface is ready. Payment integration can be added later."
    );

  }
);

/* ---------- Mobile Menu ---------- */

menuButton.addEventListener("click", () => {

  const isOpen =
    mainNav.classList.toggle("active");

  menuButton.setAttribute(
    "aria-expanded",
    isOpen
  );

  menuButton.textContent =
    isOpen ? "×" : "☰";

});


/* Close menu after selecting a link */

const navLinks =
  document.querySelectorAll(".main-nav a");

navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("active");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.textContent = "☰";

  });

});

/* ========================================
   INITIALIZE APPLICATION
   ======================================== */

displayProducts(products);

updateCart();