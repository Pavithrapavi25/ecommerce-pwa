const cart = [];

// =========================
// LOAD SAVED CART
// =========================

const savedCart = localStorage.getItem("ecommerce-cart");

if (savedCart) {
  const parsedCart = JSON.parse(savedCart);

  parsedCart.forEach(function (item) {
    cart.push(item);
  });
}


// =========================
// SERVICE WORKER
// =========================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(function () {
        console.log("Service Worker Registered");
      })
      .catch(function (error) {
        console.error(
          "Service Worker Registration Failed:",
          error
        );
      });
  });
}


// =========================
// ADD TO CART
// =========================

const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const product = button.dataset.product;
    const price = parseFloat(button.dataset.price);

    const existingItem = cart.find(function (item) {
      return item.product === product;
    });

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        product: product,
        price: price,
        quantity: 1
      });
    }

    saveCart();
    updateCart();

    alert(product + " added to cart!");
  });
});


// =========================
// SAVE CART
// =========================

function saveCart() {
  localStorage.setItem(
    "ecommerce-cart",
    JSON.stringify(cart)
  );
}


// =========================
// UPDATE CART
// =========================

function updateCart() {
  const cartItems =
    document.getElementById("cart-items");

  const cartTotal =
    document.getElementById("cart-total");

  const cartCount =
    document.getElementById("cart-count");

  if (!cartItems || !cartTotal) {
    return;
  }

  let totalPrice = 0;
  let totalQuantity = 0;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<div class="empty-cart-box">' +
      '<div class="empty-cart-icon">🛒</div>' +
      '<h3>Your cart is empty</h3>' +
      '<p>Add some products to get started.</p>' +
      '<a href="#products" class="continue-shopping">' +
      "Continue Shopping" +
      "</a>" +
      "</div>";

    cartTotal.innerHTML = "";

    if (cartCount) {
      cartCount.textContent = "0";
    }

    return;
  }

  cart.forEach(function (item, index) {
    const itemTotal =
      item.price * item.quantity;

    totalPrice += itemTotal;
    totalQuantity += item.quantity;

    const itemElement =
      document.createElement("div");

    itemElement.className = "cart-item";

    itemElement.innerHTML =
      '<div class="cart-product-info">' +

      '<img src="images/product' +
      getProductImageNumber(item.product) +
      '.jpg" alt="' +
      item.product +
      '" class="cart-product-image">' +

      '<div>' +
      '<h3>' +
      item.product +
      "</h3>" +
      '<p>$' +
      item.price.toFixed(2) +
      " each</p>" +
      "</div>" +

      "</div>" +

      '<div class="quantity-controls">' +

      '<button class="quantity-btn decrease-btn" data-index="' +
      index +
      '">−</button>' +

      '<span class="quantity">' +
      item.quantity +
      "</span>" +

      '<button class="quantity-btn increase-btn" data-index="' +
      index +
      '">+</button>' +

      "</div>" +

      '<div class="cart-item-price">' +
      "<strong>$" +
      itemTotal.toFixed(2) +
      "</strong>" +

      '<button class="remove-btn" data-index="' +
      index +
      '">Remove</button>' +

      "</div>";

    cartItems.appendChild(itemElement);
  });

  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }

  cartTotal.innerHTML =
    '<div class="order-summary">' +

    "<h3>Order Summary</h3>" +

    '<div class="summary-row">' +
    "<span>Items</span>" +
    "<span>" +
    totalQuantity +
    "</span>" +
    "</div>" +

    '<div class="summary-row">' +
    "<span>Subtotal</span>" +
    "<span>$" +
    totalPrice.toFixed(2) +
    "</span>" +
    "</div>" +

    '<div class="summary-row">' +
    "<span>Delivery</span>" +
    "<span>Free</span>" +
    "</div>" +

    '<div class="summary-total">' +
    "<span>Total</span>" +
    "<span>$" +
    totalPrice.toFixed(2) +
    "</span>" +
    "</div>" +

    '<button class="checkout-btn">' +
    "Proceed to Checkout" +
    "</button>" +

    "</div>";


  // Increase quantity

  document
    .querySelectorAll(".increase-btn")
    .forEach(function (button) {
      button.addEventListener(
        "click",
        function () {
          const index =
            parseInt(button.dataset.index);

          cart[index].quantity++;

          saveCart();
          updateCart();
        }
      );
    });


  // Decrease quantity

  document
    .querySelectorAll(".decrease-btn")
    .forEach(function (button) {
      button.addEventListener(
        "click",
        function () {
          const index =
            parseInt(button.dataset.index);

          if (cart[index].quantity > 1) {
            cart[index].quantity--;
          } else {
            cart.splice(index, 1);
          }

          saveCart();
          updateCart();
        }
      );
    });


  // Remove item

  document
    .querySelectorAll(".remove-btn")
    .forEach(function (button) {
      button.addEventListener(
        "click",
        function () {
          const index =
            parseInt(button.dataset.index);

          cart.splice(index, 1);

          saveCart();
          updateCart();
        }
      );
    });


  // Checkout button

  const checkoutButton =
    document.querySelector(".checkout-btn");

  if (checkoutButton) {
    checkoutButton.addEventListener(
  "click",
  function () {

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const checkoutSection =
      document.getElementById("checkout");

    if (checkoutSection) {
      checkoutSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
);
  }
}


// =========================
// PRODUCT IMAGE NUMBER
// =========================

function getProductImageNumber(product) {
  const products = {
    "Trolly": 1,
    "Shoes": 2,
    "Sweater": 3,
    "Clothes": 4,
    "Earrings": 5,
    "Bracelet": 6,
    "Goggles": 7,
    "Neck Chain": 8,
    "Hat": 9,
    "Backpack": 10
  };

  return products[product] || 1;
}


// =========================
// NOTIFICATIONS
// =========================

const notifyButton =
  document.getElementById("notify-btn");

if (notifyButton) {
  notifyButton.addEventListener(
    "click",
    function () {
      if (!("Notification" in window)) {
        alert(
          "This browser does not support notifications."
        );
        return;
      }

      Notification.requestPermission().then(
        function (permission) {
          if (permission === "granted") {
            new Notification(
              "Notifications Enabled!",
              {
                body:
                  "You will now receive updates."
              }
            );
          } else {
            alert(
              "Notifications are disabled."
            );
          }
        }
      );
    }
  );
}


// =========================
// DISPLAY SAVED CART
// =========================

updateCart();


// =========================
// PRODUCT SEARCH
// CATEGORY FILTER
// SORTING
// =========================

const searchInput =
  document.getElementById("product-search");

const noProducts =
  document.getElementById("no-products");

const productCards =
  document.querySelectorAll(".gallery-item");

const gallery =
  document.querySelector(".gallery");

const sortSelect =
  document.getElementById("sort-products");

const categoryButtons =
  document.querySelectorAll(".category-btn");

let selectedCategory = "all";


function filterProducts() {
  const searchText =
    searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

  const sortValue =
    sortSelect
      ? sortSelect.value
      : "default";

  let visibleCards = [];


  productCards.forEach(function (card) {
    const productNameElement =
      card.querySelector(".product-name");

    const productName =
      productNameElement
        ? productNameElement.textContent.toLowerCase()
        : "";

    const productCategory =
      card.dataset.category;

    const matchesSearch =
      productName.includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      productCategory === selectedCategory;

    if (
      matchesSearch &&
      matchesCategory
    ) {
      visibleCards.push(card);
    } else {
      card.style.display = "none";
    }
  });


  // Sorting

  visibleCards.sort(function (cardA, cardB) {
    const nameA =
      cardA
        .querySelector(".product-name")
        .textContent
        .trim();

    const nameB =
      cardB
        .querySelector(".product-name")
        .textContent
        .trim();

    const priceA =
      parseFloat(
        cardA
          .querySelector(".product-price")
          .textContent
          .replace("$", "")
      );

    const priceB =
      parseFloat(
        cardB
          .querySelector(".product-price")
          .textContent
          .replace("$", "")
      );


    if (sortValue === "price-low") {
      return priceA - priceB;
    }

    if (sortValue === "price-high") {
      return priceB - priceA;
    }

    if (sortValue === "name-az") {
      return nameA.localeCompare(nameB);
    }

    if (sortValue === "name-za") {
      return nameB.localeCompare(nameA);
    }

    return 0;
  });


  visibleCards.forEach(function (card) {
    card.style.display = "";
    gallery.appendChild(card);
  });


  if (noProducts) {
    if (visibleCards.length === 0) {
      noProducts.style.display = "block";
    } else {
      noProducts.style.display = "none";
    }
  }
}


// Category buttons

categoryButtons.forEach(function (button) {
  button.addEventListener(
    "click",
    function () {

      categoryButtons.forEach(
        function (btn) {
          btn.classList.remove("active");
        }
      );

      button.classList.add("active");

      selectedCategory =
        button.dataset.category;

      filterProducts();
    }
  );
});


// Search

if (searchInput) {
  searchInput.addEventListener(
    "input",
    filterProducts
  );
}


// Sort

if (sortSelect) {
  sortSelect.addEventListener(
    "change",
    filterProducts
  );
}


// =========================
// PRODUCT DETAILS MODAL
// =========================

const productDetailsButtons =
  document.querySelectorAll(
    ".product-details-btn"
  );

const productModal =
  document.getElementById(
    "product-modal"
  );

const closeProductModal =
  document.getElementById(
    "close-product-modal"
  );

const modalProductImage =
  document.getElementById(
    "modal-product-image"
  );

const modalProductName =
  document.getElementById(
    "modal-product-name"
  );

const modalProductPrice =
  document.getElementById(
    "modal-product-price"
  );

const modalProductCategory =
  document.getElementById(
    "modal-product-category"
  );

const modalProductDescription =
  document.getElementById(
    "modal-product-description"
  );

const modalAddToCart =
  document.getElementById(
    "modal-add-to-cart"
  );

let selectedModalProduct = null;


const productDescriptions = {

  "Trolly":
    "A practical everyday trolley designed for convenient travel and easy movement.",

  "Shoes":
    "Comfortable everyday shoes designed for casual use and a stylish look.",

  "Sweater":
    "A comfortable sweater suitable for everyday wear and cooler weather.",

  "Clothes":
    "Comfortable and versatile clothing designed for everyday use.",

  "Earrings":
    "Elegant earrings that add a simple and stylish touch to your everyday outfit.",

  "Bracelet":
    "A stylish bracelet designed to complement both casual and special outfits.",

  "Goggles":
    "Modern protective goggles with a comfortable design for everyday outdoor use.",

  "Neck Chain":
    "A simple and elegant neck chain designed for a clean and stylish appearance.",

  "Hat":
    "A fashionable hat that provides a comfortable and stylish accessory for outdoor use.",

  "Backpack":
    "A practical backpack with a spacious design for carrying everyday essentials."
};


// Open product modal

productDetailsButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        const product =
          button.dataset.product;

        const productCard =
          button.closest(
            ".gallery-item"
          );

        if (!productCard) {
          return;
        }

        const priceButton =
          productCard.querySelector(
            ".add-to-cart"
          );

        if (!priceButton) {
          return;
        }

        const price =
          parseFloat(
            priceButton.dataset.price
          );

        const category =
          productCard.dataset.category;


        selectedModalProduct = {
          product: product,
          price: price
        };


        if (modalProductImage) {
          modalProductImage.src =
            "images/product" +
            getProductImageNumber(product) +
            ".jpg";

          modalProductImage.alt =
            product;
        }


        if (modalProductName) {
          modalProductName.textContent =
            product;
        }


        if (modalProductPrice) {
          modalProductPrice.textContent =
            "$" + price.toFixed(2);
        }


        if (modalProductCategory) {
          modalProductCategory.textContent =
            category;
        }


        if (modalProductDescription) {
          modalProductDescription.textContent =
            productDescriptions[product] ||
            "A quality product from our collection.";
        }


        if (productModal) {
          productModal.classList.add(
            "active"
          );

          productModal.setAttribute(
            "aria-hidden",
            "false"
          );
        }
      }
    );
  }
);


// Close Product Modal

if (closeProductModal) {
  closeProductModal.addEventListener(
    "click",
    function () {

      if (!productModal) {
        return;
      }

      productModal.classList.remove(
        "active"
      );

      productModal.setAttribute(
        "aria-hidden",
        "true"
      );
    }
  );
}


// Close outside modal

if (productModal) {
  productModal.addEventListener(
    "click",
    function (event) {

      if (
        event.target === productModal
      ) {

        productModal.classList.remove(
          "active"
        );

        productModal.setAttribute(
          "aria-hidden",
          "true"
        );
      }
    }
  );
}


// Close with Escape

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      productModal &&
      productModal.classList.contains("active")
    ) {

      productModal.classList.remove(
        "active"
      );

      productModal.setAttribute(
        "aria-hidden",
        "true"
      );
    }
  }
);


// Add to cart from modal

if (modalAddToCart) {
  modalAddToCart.addEventListener(
    "click",
    function () {

      if (!selectedModalProduct) {
        return;
      }

      const product =
        selectedModalProduct.product;

      const price =
        selectedModalProduct.price;

      const existingItem =
        cart.find(function (item) {
          return item.product === product;
        });


      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          product: product,
          price: price,
          quantity: 1
        });
      }


      saveCart();
      updateCart();

      alert(
        product + " added to cart!"
      );


      if (productModal) {
        productModal.classList.remove(
          "active"
        );

        productModal.setAttribute(
          "aria-hidden",
          "true"
        );
      }
    }
  );
}


// =========================
// WISHLIST
// =========================

const wishlist = [];

const savedWishlist =
  localStorage.getItem(
    "ecommerce-wishlist"
  );


if (savedWishlist) {
  const parsedWishlist =
    JSON.parse(savedWishlist);

  parsedWishlist.forEach(
    function (item) {
      wishlist.push(item);
    }
  );
}


const wishlistButtons =
  document.querySelectorAll(
    ".wishlist-btn"
  );

const wishlistItems =
  document.getElementById(
    "wishlist-items"
  );

const wishlistCount =
  document.getElementById(
    "wishlist-count"
  );

const wishlistLink =
  document.getElementById(
    "wishlist-link"
  );


function saveWishlist() {
  localStorage.setItem(
    "ecommerce-wishlist",
    JSON.stringify(wishlist)
  );
}


function updateWishlist() {

  if (wishlistCount) {
    wishlistCount.textContent =
      wishlist.length;
  }


  if (!wishlistItems) {
    return;
  }


  if (wishlist.length === 0) {

    wishlistItems.innerHTML =
      '<div class="empty-wishlist-box">' +

      '<div class="empty-wishlist-icon">♡</div>' +

      '<h3>Your wishlist is empty</h3>' +

      '<p>Add products you love to see them here.</p>' +

      '<a href="#products" class="continue-shopping">' +

      "Explore Products" +

      "</a>" +

      "</div>";

    return;
  }


  let html =
    '<div class="wishlist-grid">';


  wishlist.forEach(
    function (item, index) {

      html +=

        '<div class="wishlist-card">' +

        '<img src="images/product' +
        getProductImageNumber(item.product) +
        '.jpg" alt="' +
        item.product +
        '">' +

        '<h3>' +
        item.product +
        '</h3>' +

        '<p class="wishlist-card-price">$' +
        item.price.toFixed(2) +
        '</p>' +

        '<div class="wishlist-card-actions">' +

        '<button ' +
        'class="wishlist-cart-btn" ' +
        'data-index="' +
        index +
        '">' +

        "Add to Cart" +

        "</button>" +

        '<button ' +
        'class="wishlist-remove-btn" ' +
        'data-index="' +
        index +
        '">' +

        "Remove" +

        "</button>" +

        "</div>" +

        "</div>";
    }
  );


  html += "</div>";

  wishlistItems.innerHTML =
    html;


  // Add wishlist item to cart

  document
    .querySelectorAll(
      ".wishlist-cart-btn"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const index =
              parseInt(
                button.dataset.index
              );

            const item =
              wishlist[index];

            if (!item) {
              return;
            }


            const existingItem =
              cart.find(
                function (cartItem) {
                  return (
                    cartItem.product ===
                    item.product
                  );
                }
              );


            if (existingItem) {
              existingItem.quantity++;
            } else {
              cart.push({
                product:
                  item.product,

                price:
                  item.price,

                quantity: 1
              });
            }


            saveCart();
            updateCart();


            alert(
              item.product +
              " added to cart!"
            );
          }
        );
      }
    );


  // Remove wishlist item

  document
    .querySelectorAll(
      ".wishlist-remove-btn"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const index =
              parseInt(
                button.dataset.index
              );

            wishlist.splice(
              index,
              1
            );

            saveWishlist();
            updateWishlist();
            updateWishlistButtons();
          }
        );
      }
    );
}


function updateWishlistButtons() {

  wishlistButtons.forEach(
    function (button) {

      const product =
        button.dataset.product;

      const exists =
        wishlist.some(
          function (item) {
            return (
              item.product ===
              product
            );
          }
        );


      if (exists) {

        button.classList.add(
          "active"
        );

        button.textContent =
          "♥ In Wishlist";

      } else {

        button.classList.remove(
          "active"
        );

        button.textContent =
          "♡ Add to Wishlist";
      }
    }
  );
}


// Wishlist buttons

wishlistButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        const product =
          button.dataset.product;

        const productCard =
          button.closest(
            ".gallery-item"
          );

        if (!productCard) {
          return;
        }

        const addToCartButton =
          productCard.querySelector(
            ".add-to-cart"
          );

        if (!addToCartButton) {
          return;
        }

        const price =
          parseFloat(
            addToCartButton.dataset.price
          );


        const existingItem =
          wishlist.find(
            function (item) {
              return (
                item.product ===
                product
              );
            }
          );


        if (existingItem) {

          const index =
            wishlist.indexOf(
              existingItem
            );

          wishlist.splice(
            index,
            1
          );

        } else {

          wishlist.push({
            product: product,
            price: price
          });
        }


        saveWishlist();
        updateWishlist();
        updateWishlistButtons();
      }
    );
  }
);


// Wishlist navigation

if (wishlistLink) {

  wishlistLink.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      const wishlistSection =
        document.getElementById(
          "wishlist"
        );

      if (wishlistSection) {
        wishlistSection.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  );
}


updateWishlist();
updateWishlistButtons();


// =========================
// SIMPLE REGISTRATION
// =========================

const registerForm =
  document.getElementById(
    "register-form"
  );

const registerMessage =
  document.getElementById(
    "register-message"
  );


if (registerForm) {

  registerForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const name =
        document
          .getElementById("register-name")
          .value
          .trim();


      const email =
        document
          .getElementById("register-email")
          .value
          .trim();


      const password =
        document
          .getElementById("register-password")
          .value;


      if (
        !name ||
        !email ||
        !password
      ) {

        registerMessage.textContent =
          "Please fill in all fields.";

        return;
      }


      const existingUser =
        JSON.parse(
          localStorage.getItem(
            "ecommerceUser"
          )
        );


      if (
        existingUser &&
        existingUser.email === email
      ) {

        registerMessage.textContent =
          "An account with this email already exists.";

        return;
      }


      const user = {
        name: name,
        email: email,
        password: password
      };


      localStorage.setItem(
        "ecommerceUser",
        JSON.stringify(user)
      );


      registerMessage.textContent =
        "Account created successfully!";


      registerForm.reset();
    }
  );
}


// =========================
// SIMPLE LOGIN
// =========================

const loginForm =
  document.getElementById(
    "login-form"
  );

const loginMessage =
  document.getElementById(
    "login-message"
  );


if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const email =
        document
          .getElementById("login-email")
          .value
          .trim();


      const password =
        document
          .getElementById("login-password")
          .value;


      const savedUser =
        JSON.parse(
          localStorage.getItem(
            "ecommerceUser"
          )
        );


      if (!savedUser) {

        loginMessage.textContent =
          "No account found. Please register first.";

        return;
      }


      if (
        email === savedUser.email &&
        password === savedUser.password
      ) {

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );


        loginMessage.textContent =
          "Login successful! Welcome back.";

      } else {

        loginMessage.textContent =
          "Invalid email or password.";
      }
    }
  );
}


// =========================
// SIMPLE LOGOUT
// =========================

const logoutBtn =
  document.getElementById(
    "logout-btn"
  );


if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    function () {

      localStorage.removeItem(
        "isLoggedIn"
      );


      alert(
        "You have been logged out."
      );
      window.location.hash =
        "#login";
    }
  );
}
// =========================
// CHECKOUT NAVIGATION
// =========================

const checkoutForm =
  document.getElementById("checkout-form");

if (checkoutForm) {

  checkoutForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const name =
        document
          .getElementById("checkout-name")
          .value
          .trim();

      const phone =
        document
          .getElementById("checkout-phone")
          .value
          .trim();

      const address =
        document
          .getElementById("checkout-address")
          .value
          .trim();

      const city =
        document
          .getElementById("checkout-city")
          .value
          .trim();

      const pincode =
        document
          .getElementById("checkout-pincode")
          .value
          .trim();

      const paymentMethod =
        document.getElementById(
          "payment-method"
        ).value;

      const checkoutMessage =
        document.getElementById(
          "checkout-message"
        );

checkoutMessage.textContent =
  "Please fill in all delivery details.";


      if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !pincode ||
        !paymentMethod
      ) {

        checkoutMessage.textContent =
          "Please fill in all delivery details.";

        return;
      }


      checkoutMessage.textContent =
        "Details saved. Order placement is ready.";


      alert(
        "Checkout details saved successfully!"
      );
    }
  );
}
// =========================
// SIMPLE ORDER PLACEMENT
// =========================

const ordersList =
  document.getElementById("orders-list");

let orders =
  JSON.parse(
    localStorage.getItem("ecommerceOrders")
  ) || [];

function renderOrders() {

  if (!ordersList) {
    return;
  }

  if (orders.length === 0) {
    ordersList.innerHTML = `
      <div class="empty-orders-box">
        <div class="empty-orders-icon">📦</div>
        <h3>No orders yet</h3>
        <p>Your placed orders will appear here.</p>
        <a href="#products" class="continue-shopping">
          Start Shopping
        </a>
      </div>
    `;

    return;
  }

  ordersList.innerHTML = "";

  orders.forEach(function (order) {

    const orderCard =
      document.createElement("div");

    orderCard.className = "order-card";

    let itemsHTML = "";

    order.items.forEach(function (item) {

      itemsHTML += `
        <div class="order-item">
          <span>
            ${item.name} × ${item.quantity}
          </span>
          <span>
            $${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      `;

    });

    orderCard.innerHTML = `
      <div class="order-header">
        <div class="order-id">
          Order ID: ${order.id}
        </div>

        <div class="order-date">
          ${order.date}
        </div>
      </div>

      ${itemsHTML}

      <div class="order-total">
        Total: $${order.total.toFixed(2)}
      </div>

      <div class="order-status">
        Order Placed
      </div>
    `;

    ordersList.appendChild(orderCard);
  });
}


// Connect checkout form to order placement

if (checkoutForm) {

  checkoutForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const name =
        document
          .getElementById("checkout-name")
          .value
          .trim();

      const phone =
        document
          .getElementById("checkout-phone")
          .value
          .trim();

      const address =
        document
          .getElementById("checkout-address")
          .value
          .trim();

      const city =
        document
          .getElementById("checkout-city")
          .value
          .trim();

      const pincode =
        document
          .getElementById("checkout-pincode")
          .value
          .trim();

      const paymentMethod =
        document.getElementById(
          "payment-method"
        ).value;

      if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !pincode ||
        !paymentMethod
      ) {
        checkoutMessage.textContent =
          "Please fill in all delivery details.";

        return;
      }

      const order = {
        id:
          "ORD-" +
          Date.now(),

        date:
          new Date().toLocaleString(),

        customer: {
          name: name,
          phone: phone,
          address: address,
          city: city,
          pincode: pincode
        },

        paymentMethod:
          paymentMethod,

        items:
          [...cart],

        total:
          cart.reduce(
            function (sum, item) {
              return (
                sum +
                item.price *
                  item.quantity
              );
            },
            0
          )
      };

      orders.unshift(order);

      localStorage.setItem(
        "ecommerceOrders",
        JSON.stringify(orders)
      );

      cart.length = 0;

      saveCart();
      updateCart();
      renderOrders();

      checkoutForm.reset();

      checkoutMessage.textContent =
        "Order placed successfully!";

      alert(
        "Order placed successfully!\n\nOrder ID: " +
        order.id
      );

      window.location.hash =
        "#orders";
    }
  );
}


// Show saved orders when page loads

renderOrders();