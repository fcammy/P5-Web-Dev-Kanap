// DOM elements
const firstName = document.querySelector("#firstName");
const lastName = document.getElementById("lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.getElementById("email");
const btnOrder = document.querySelector("#order");
const products = document.querySelector(".cart__item");
const form = document.querySelector("cart__order__form");
let deleteBtns,
  qtyInputs = [];

// FUNCTION TO CALCULATE THE TOTAL PRICE OF THE PRODUCTS IN THE CART AND UPDATE PRODUCTS NUMBER IN CART

const updateTotal = () => {
  let cartProducts = JSON.parse(localStorage.getItem("cart"));
  let cartQuantity = document.querySelector("#totalQuantity");
  cartQuantity.innerHTML = cartProducts.length;

  let cartItems = JSON.parse(localStorage.getItem("cart"));
  let total = document.querySelector("#totalPrice");
  let totalPrice = 0;
  if (cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
      // convert array object into number
      let priceString = cartItems[i].price.toString();
      let price = priceString.substring();
      let convertedPrice = parseInt(price);
      let itemPrice = convertedPrice * cartItems[i].qty;
      totalPrice += itemPrice;
      total.innerHTML = totalPrice;
    }
  }
};

// FUNCTION TO DISPLAY FRONT END DATA TO PAGE AND UPDATE PAGE WHEN PRODUCT ADDED OR REMOVED

const displayCart = () => {
  const cartItems = localStorage.getItem("cart");

  let cart = cartItems ? JSON.parse(cartItems) : [];
  cart = [...cart];

  products.innerHTML = "";

  cart.forEach((item) => {
    //console.log(item);

    // DISPLAYING PRODUCTS ON THE DOM

    products.innerHTML += `

        <section class="cart">
            <section id="cart__items>
                <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                    <img src="${item.imageUrl}" alt="Photo of a sofa">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2 class="product__name">${item.name}</h2>
                    <p class="product__color">${item.color}</p>
                    <p class="product__price">€ ${item.price}</p>
                </div>
                <div data-cartId="${item.cartId}" class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.qty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Delete</p>
                    </div>
                </div>
                </div>
            </article>
        </section>
      </section>
        `;
  });

  updateTotal();

  deleteBtns = document.querySelectorAll(".deleteItem");
  qtyInputs = document.querySelectorAll(".itemQuantity");

  deleteBtns.forEach((btn) => btn.addEventListener("click", removeProduct));
  qtyInputs.forEach((input) => {
    input.addEventListener("keyup", updateQuantity);
    input.addEventListener("change", updateQuantity);
  });

  // console.log(qtyInputs)
};
displayCart();

// FUNCTION TO REMOVE PRODUCTS FROM CART AND UPDATE LOCALSTORAGE

function removeProduct({ target }) {
  const cartId = Number(target.parentNode.parentNode.dataset.cartid);

  let cartItems = JSON.parse(localStorage.getItem("cart"));

  cartItems = cartItems.filter((item) => item.cartId !== cartId);

  localStorage.setItem("cart", JSON.stringify(cartItems));

  // update cart

  displayCart();
}

// CHANGE PRODUCT QUANTITY THEN UPDATE PRICE

function updateQuantity({ target }) {
  const cartId = Number(target.parentNode.parentNode.dataset.cartid);

  let cartItems = JSON.parse(localStorage.getItem("cart"));

  cartItems = cartItems.map((item) => {
    if (item.cartId === cartId) {
      item.qty = Number(target.value);
      return item;
    }

    return item;
  });
  

  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCart();
}


// VALIDATE FIRST NAME

firstName.addEventListener('blur', () => {

 const firstNamePattern = /^[a-zA-Z]+$/;
 const firstNameError = document.getElementById('firstNameErrorMsg');

 if(firstNamePattern.test(firstName.value)) {
   firstNameError.textContent = 'Name entered is valid';

 } else {
   firstNameError.textContent = 'Name must not contain a number';
 }

});

// VALIDATE LAST NAME

lastName.addEventListener('blur', () => {

  const lastNamePattern = /^[a-zA-Z]+$/;
  const lastNameError = document.getElementById('lastNameErrorMsg');
 
  if(lastNamePattern.test(lastName.value)) {
    lastNameError.textContent = 'Last Name entered is valid';
 
  } else {
    lastNameError.textContent = 'Last Name must not contain a number';
  }
 
 });
 

 // VALIDATE ADDRESS 

 address.addEventListener('blur', () => {

   const addressPattern = /^\s*\S+(?:\s+\S+){2}/;
   const addressError = document.getElementById('addressErrorMsg');

   if(addressPattern.test(address.value)) {
     addressError.textContent = 'Address entered is valid';
   } else {
     addressError.textContent = 'You must enter a valid address';
   }
 });

 // VALIDATE CITY

 city.addEventListener('blur', () => {

  const cityPattern =  /^[a-zA-Z]+$/;
  const cityError = document.getElementById('cityErrorMsg');

  if(cityPattern.test(city.value)) {
    cityError.textContent = 'City entered is valid';
  } else {
    cityError.textContent = 'You must enter a valid city';
  }
});

// VALIDATE EMAIL ADDRESS

email.addEventListener('blur', () => {
  const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const emailError = document.getElementById('emailErrorMsg');

  if(emailPattern.test(email.value)) {
    emailError.textContent = ' Email is valid';

  } else {
    emailError.textContent = ' Email is invalid';
  }
});