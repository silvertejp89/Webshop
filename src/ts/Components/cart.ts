import "../../scss/main.scss";
import { CartProduct } from "../Models/CartProduct";

export let cart: CartProduct[] = [];

function saveCartToLocalStorage(): void {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function loadCartFromLocalStorage(): void {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

//CART HTML------------------------------------------------------------------------
export function createHTMLCart(cartContainer: Element) {
  loadCartFromLocalStorage();
  cartContainer.innerHTML = "";

  calculateAmount();
  calculateTotalPrice();

  const cartTitle = document.createElement("h2");
  cartTitle.textContent = "CART (" + totalAmount + ")";

  cartContainer.appendChild(cartTitle);

  for (let i = 0; i < cart.length; i++) {
    const card = document.createElement("article");
    card.classList.add("card2");

    //Thumnail-bild
    const thumnailContainer = document.createElement("div");
    card.appendChild(thumnailContainer);
    thumnailContainer.classList.add("thumnail-image-container");

    const thumnailImage = document.createElement("img");
    thumnailContainer.appendChild(thumnailImage);
    thumnailImage.src = cart[i].thumbnail_image;

    //Produktnamn
    const productName = document.createElement("h2");
    card.appendChild(productName);
    productName.innerHTML = cart[i].name;

    //Färg och storlek
    const text = document.createElement("h3");
    card.appendChild(text);
    text.innerHTML = cart[i].color + "/" + cart[i].size;

    //minska-mängd-knapp
    const decreaseBtn = document.createElement("button");
    decreaseBtn.innerHTML = "-";
    decreaseBtn.addEventListener("click", () => {
      decreaseAmount(i);
      saveCartToLocalStorage();
      createHTMLCart(cartContainer);
    });
    card.appendChild(decreaseBtn);

    //öka-mängd-knapp
    const increaseBtn = document.createElement("button");
    increaseBtn.innerHTML = "+";
    increaseBtn.addEventListener("click", () => {
      increaseAmount(i);
      saveCartToLocalStorage();
      createHTMLCart(cartContainer);
    });
    card.appendChild(increaseBtn);

    //mängd och totalpris per produkttyp
    const amountText = document.createElement("h3");
    card.appendChild(amountText);
    amountText.innerHTML =
      String(cart[i].amount) +
      " st, " +
      String(cart[i].priceSEK * cart[i].amount) +
      " SEK";

    //ta bort-knapp (sparar till localstorage)
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "Ta bort";
    removeBtn.addEventListener("click", () => {
      deleteCartProduct(i);
      saveCartToLocalStorage();
      createHTMLCart(cartContainer);
    });
    cartContainer?.appendChild(card);
  }

  const subtotal = document.createElement("span");
  subtotal.textContent = "Subtotal: " + totalPrice + " SEK";
  cartContainer.appendChild(subtotal);

  const toCheckoutButton = document.createElement("button");
  toCheckoutButton.classList.add("button_lg__secondary");
  toCheckoutButton.classList.add("checkout-button");
  toCheckoutButton.innerText = "Go to Checkout";
  toCheckoutButton.addEventListener("click", function () {
    window.location.href = "/checkout.html";
  });
  cartContainer.appendChild(toCheckoutButton);
}

//LÄGG TILL-knapp-funktion------------------------------
export function createCartProduct(productToAdd: IProduct, container: Element) {
  const id = productToAdd.id;
  const name = productToAdd.name;
  const thumbnail_image = productToAdd.thumbnail_image;
  const price = productToAdd.priceSEK;
  const color = productToAdd.color;
  const size = productToAdd.size;

  let foundProductInCart = false;
  cart.forEach((product, i) => {
    if (product.id === id) {
      cart[i].amount++;
      foundProductInCart = true;
    }
  });

  if (!foundProductInCart) {
    const newCartProduct = new CartProduct(
      id,
      name,
      thumbnail_image,
      color,
      price,
      size
    );
    cart.push(newCartProduct);
  }

  saveCartToLocalStorage();

  createHTMLCart(container);
}

//Delete product------------------------------------
export function deleteCartProduct(i: number) {
  cart.splice(i, 1);
}

//Decrease amount-------------------------------------
export function decreaseAmount(i: number) {
  if (cart[i].amount > 1) {
    cart[i].amount--;
  } else {
    deleteCartProduct(i);
  }
}

//Increase amount-------------------------------------------
export function increaseAmount(i: number) {
  cart[i].amount++;
  console.log(cart);
}

//Total amount & total price---------------------------------
const amountCounter = document.createElement("div");
amountCounter.className = "amountCounter";
const priceCounter = document.createElement("div");
priceCounter.className = ".priceCounter";

let totalAmount = 0;
let totalPrice = 0;

export function calculateAmount() {
  totalAmount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalAmount += cart[i].amount;
  }
}

export function calculateTotalPrice() {
  totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    console.log("cart amount: ", cart[i].amount);
    console.log("cart price: ", cart[i].priceSEK);

    totalPrice += cart[i].amount * cart[i].priceSEK;
    console.log("total price:", totalPrice);
  }
}
