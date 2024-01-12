import "../../scss/main.scss";
// import { CartProduct } from "../models/CartProduct";

import { cart } from "./cartModal";
import { loadCartFromLocalStorage } from "./cartModal";
import { saveCartToLocalStorage } from "./cartModal";

//mock-data-------------------------------------------------------------------------
// const mock: {id: number; name: string; thumbnail_image: string; image_back: string; image_side: string;
//   color: string; priceSEK: number, description: string; measurement: string, size: string}[] = [
//   {
//     "id": 1,
//     "name": "Olof",
//     "thumbnail_image": "src/images/photos/png/Olof_product_image.png",
//     "image_back": "src/images/photos/png/Olof_back.png",
//     "image_side": "src/images/photos/png/Olof_side.png",
//     "color": "Black",
//     "priceSEK": 895.00,
//     "description": "Funktionell och vattenavvisande cross-body väska tillverkad i 100% återvunnen polyester. Väskan är designad med två innerfickor, en avtagbar och justerbar axelrem och ett handtag. En perfekt extraväska för de dagar du bara behöver packa det viktigaste.",
//     "measurement": "24 x 16 x 9 cm",
//     "size": "One size"
// },
// {
//     "id": 2,
//     "name": "Dante Vegan",
//     "thumbnail_image": "src/images/photos/png/Dante_product_image.png",
//     "image_back": "src/images/photos/png/Dante_back_picture.png",
//     "image_side": "src/images/photos/png/Dante_side_product.png",
//     "color": "Black",
//     "priceSEK": 1395.00,
//     "description": "Dante Vegan är en rymlig och vattenavvisande rolltop-ryggsäck skapad för att kunna användas varje dag, oavsett om du pendlar till jobbet eller är ute i naturen. Dante Vegan en variant av vår bästsäljande modell Dante, men gjord utan läderdetaljer och i 100% återvunna och veganska material. Väskan stängs med ett spänne i metall och rymmer mellan 16–23 L. Ryggsäcken har två innerfack, varav ett passar de flesta datorer upp till 16 tum. Vadderade axelremmar för skön bärkomfort och ytterfack med dragkedja, samt handtag på sidan. Det här är en hållbar ryggsäck med hög kvalitet och tidlös design, som du kan använda och älska länge. Dante Vegan är en del av vår Ground-kollektion. Här hittar du fler väskor i samma serie.",
//     "measurement": "26 x 43/56 x 16 cm",
//     "size": "One size"
// },
// {
//     "id": 3,
//     "name": "Tony Vegan",
//     "thumbnail_image": "src/images/photos/png/Tony_product_image.png",
//     "image_back": "src/images/photos/png/Tony_back.png",
//     "image_side": "src/images/photos/png/Tony_side.png",
//     "color": "Green",
//     "priceSEK": 1295.00,
//     "description": "Ryggsäck i 100 % återvunnen polyester med vattentät TPU-beläggning. Väskan har ett 15' laptopfack, en yttrerficka med blixtlås och kan bära upp till 13 L. Funktionaliteten och den minimalistiska designen gör denna ryggsäck till en idealisk följeslagare, vart du än går.",
//     "measurement": "27 x 42 x 12 cm",
//     "size": "One size"
// },
// {
//     "id": 4,
//     "name": "Kurt",
//     "thumbnail_image": "src/images/photos/png/Kurt_product_image.png",
//     "image_back": "src/images/photos/png/Kurt_back.png",
//     "image_side": "src/images/photos/png/Kurt_side.png",
//     "color": "Pink",
//     "priceSEK": 1295.00,
//     "description": "Kurt är en minimalistisk, mångsidig och slitstark rolltop-ryggsäck med fina läderdetaljer. Den rymmer upp till 17 L och är gjord av vattenavvisande och 100% återvunnen polyester. Kurt har justerbara axelremmar, ett dolt ytterfack med dragkedja, samt ett laptopfack som passar de flesta datorer upp till 16 tum. Denna ryggsäck är perfekt att använda varje dag, oavsett om du pendlar till jobbet eller är ute i naturen. Kurt är ett av de senaste tillskotten i vår Ground-kollektion. Här hittar du fler väskor i samma serie.",
//     "measurement": "27 x 38 x 15 cm",
//     "size": "One size"
// }
// ];
//----------------------------------------------------

// const mockContainer = document.querySelector(".mock-container");
// const cartContainer = document.querySelector(".cart-container");

// export function createHTMLProducts(): void {

//     if(!mockContainer) return;
//     mockContainer.innerHTML = "";
//     for (let i = 0; i < mock.length; i++) {
//       const card = document.createElement("article");
//       card.classList.add("card");
//       const text = document.createElement("h3");

//       const priceText = document.createElement("h4");

//     //LÄGG TILL -knapp, skapar cart objekt och sparar i localstorage.
//       const submitBtn = document.createElement("button");
//       submitBtn.innerHTML = "Lägg till";
//       submitBtn.addEventListener("click", () => {
//         createCartProductQuickShop(i);
//         saveCartToLocalStorage();
//       });

//       card.appendChild(text);
//       card.appendChild(priceText);
//       card.appendChild(submitBtn);
//       mockContainer?.appendChild(card);
//       priceText.innerHTML = String(mock[i].priceSEK) + " kr";
//     }
//   };

// createHTMLProducts();

const cartProductContainer = document.querySelector(".cart-product-container");

export function createHTMLCart() {
  if (!cartProductContainer) return;
  cartProductContainer.innerHTML = "";
  loadCartFromLocalStorage();

  for (let i = 0; i < cart.length; i++) {
    const cartCard = document.createElement("article");
    cartCard.classList.add("cartCard");

    const cardTitle = document.createElement("div");
    const cardNumbers = document.createElement("div");
    cartCard.appendChild(cardTitle);
    cartCard.appendChild(cardNumbers);

    //Thumnail-bild
    const thumnailImage = document.createElement("img");
    cartCard.appendChild(thumnailImage);
    thumnailImage.src = cart[i].thumbnail_image;

    //---------------------------CARDTITLE---------------------------------------
    //Produktnamn
    const productName = document.createElement("span");
    cardTitle.appendChild(productName);
    productName.innerHTML = cart[i].name;

    //Färg och storlek
    const colorSizeText = document.createElement("p");
    cardTitle.appendChild(colorSizeText);
    colorSizeText.innerHTML = cart[i].color + "/" + cart[i].size;

    //ta bort-kryss(sparar till localstorage)
    const removeBtn = document.createElement("img");
    removeBtn.addEventListener("click", () => {
      deleteCartProduct(i);
      saveCartToLocalStorage();
    });
    cardTitle.appendChild(removeBtn);

    cartCard.appendChild(cardTitle);
    //-----------------------------------CARDNUMBERS---------------------------------------

    //minska-mängd-knapp
    const decreaseBtn = document.createElement("img");
    decreaseBtn.innerHTML = "-";
    decreaseBtn.addEventListener("click", () => {
      decreaseAmount(i);
      saveCartToLocalStorage();
    });
    cardNumbers.appendChild(decreaseBtn);

    //mängd
    const amountText = document.createElement("span");
    cardNumbers.appendChild(amountText);
    amountText.innerHTML = String(cart[i].amount) + " st, ";

    //öka-mängd-knapp
    const increaseBtn = document.createElement("img");
    increaseBtn.innerHTML = "+";
    increaseBtn.addEventListener("click", () => {
      increaseAmount(i);
      saveCartToLocalStorage();
    });
    cardNumbers.appendChild(increaseBtn);

    //totalpris per produkttyp
    const totalText = document.createElement("span");
    cardNumbers.appendChild(totalText);
    totalText.innerHTML = String(cart[i].priceSEK * cart[i].amount) + "kr";

    cartCard.appendChild(cardNumbers);
  }
  calculateAmount();
  calculateTotalPrice();
}

//Delete product------------------------------------
export function deleteCartProduct(i: number) {
  cart.splice(i, 1);
  createHTMLCart();
}

//Decrease amount-------------------------------------
export function decreaseAmount(i: number) {
  if (cart[i].amount > 1) {
    cart[i].amount--;
    console.log(cart);
    createHTMLCart();
  } else {
    deleteCartProduct(i);
  }
}

//Increase amount-------------------------------------------
export function increaseAmount(i: number) {
  cart[i].amount++;
  console.log(cart);
  createHTMLCart();
}

//Total amount & total price---------------------------------

// console.log(amountCounter);

export let totalAmount = 0;
export let totalPrice = 0;

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

// //Hämtar cart från localstorage när sidan laddas.
window.addEventListener("load", () => {
  loadCartFromLocalStorage();
  createHTMLCart();
});
