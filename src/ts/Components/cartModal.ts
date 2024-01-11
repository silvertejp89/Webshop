import { CartProduct } from "../models/CartProduct";
import { createHTMLCart, totalAmount, totalPrice } from "./cart";

// id: number;
// name: string;
// thumbnail_image: string;
// color: string;
// priceSEK: number;
// size: string;
// amount: number;

export let cart: CartProduct[] = [
  {   
        "id": 1,
        "name": "Olof",
        "thumbnail_image": "src/images/photos/png/Olof_product_image.png",
        "color": "Black",
        "priceSEK": 895.00,
        "size": "One size",
        "amount": 3,
    },
    {
        "id": 2,
        "name": "Dante Vegan",
        "thumbnail_image": "src/images/photos/png/Dante_product_image.png",
        "color": "Black",
        "priceSEK": 1395.00,
        "size": "One size",
        "amount": 2,
    },
    {
        "id": 3,
        "name": "Tony Vegan",
        "thumbnail_image": "src/images/photos/png/Tony_product_image.png",
        "color": "Green",
        "priceSEK": 1295.00,
        "size": "One size",
        "amount": 8,
    },
    {
        "id": 4,
        "name": "Kurt",
        "thumbnail_image": "src/images/photos/png/Kurt_product_image.png",
        "color": "Pink",
        "priceSEK": 1295.00,
        "size": "One size",
        "amount": 1,
    }
];
export function saveCartToLocalStorage(): void {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function loadCartFromLocalStorage(): void {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    // createHTMLCart();
  }
}

console.log("hej", cart);

export function openCartModal(): void {


  //Cart Modal
const cartModal = document.createElement("div");
cartModal.innerText = "hello";

//-nav, container, cartcheckout
const cartNav = document.createElement("div");
cartModal.appendChild(cartNav);

const cartProductContainer = document.createElement("div");
cartProductContainer.classList.add("cart-product-container");
cartModal.appendChild(cartProductContainer);


const cartCheckout = document.createElement("div");
cartModal.appendChild(cartCheckout);

//------------------------------------------------------------
    // // dessa har hittats med queryselector längst ner. 

      // const amountCounter = document.querySelector(".amountCounter");
  // const priceCounter = document.querySelector(".priceCounter");

    // if(!amountCounter) return;
    // amountCounter.textContent = `${totalAmount}` + " produkter, ";
    // if(!priceCounter) return;
    // priceCounter.textContent = `${totalPrice}` + " kr";
//--------------------------------------------------------------

//--Nav - innehåll: 
const cartSpan = document.createElement("span");
cartSpan.classList.add("amountCounter");
cartSpan.textContent = "CART ("+ totalAmount + ")";
cartNav.appendChild(cartSpan);

const svgContainer = document.createElement("div");
const svgClose = document.createElement("img");
svgClose.src = "src/images/icons/svg/cross.svg"
svgContainer.appendChild(svgClose);
cartNav.appendChild(svgContainer);

//--Container - innehåll:
createHTMLCart();

//--Cartcheckout - innehåll: 
const shippingTitle = document.createElement("span");
shippingTitle.textContent = "Shipping";
cartCheckout.appendChild(shippingTitle);

const shippingtText = document.createElement("span");
shippingtText.textContent = "0.00 kr"
cartCheckout.appendChild(shippingtText);

const subtotalTitle = document.createElement("span");
subtotalTitle.textContent = "Subtotal"
cartCheckout.appendChild(subtotalTitle);

const subtotalText = document.createElement("span");
subtotalText.textContent = String(totalPrice) + " kr";
cartCheckout.appendChild(subtotalText);

//---------------------
const cartCheckoutBtn = document.createElement("button");
cartCheckoutBtn.classList.add("button_lg__secondary");

cartCheckout.appendChild(cartCheckoutBtn);
createHTMLCart()

const findModalContainer = document.getElementById("modal_container")
findModalContainer?.appendChild(cartModal);

}
//-----------------------------Hämtar cart från localstorage när sidan laddas.----------------------------
window.addEventListener("load", () => {
  loadCartFromLocalStorage();
});

