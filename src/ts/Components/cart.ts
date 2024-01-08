//anpassa koden efter de riktiga objekten. 
//Ska carten sparas i localstorage? antagligen. 

import { CartProduct } from "../models/CartProduct";


import "../../scss/main.scss"

export let cart: CartProduct[] = [];

//mock-data-------------------------------------------------------------------------
const mock: {id: number; name: string; thumbnail_image: string; price: number}[] = [
    {
        id: 8,
        name: "Noa",
        thumbnail_image: "src/images/photos/Noa_product_image.png",
        price: 10,
    },
    {
        id: 9,
        name: "Iris",
        thumbnail_image: "src/images/photos/Iris_product_image.png",
        price: 20,
    },
    {
      id: 10,
      name: "Greta",
      thumbnail_image: "src/images/photos/Iris_product_image.png",
      price: 30,
  },
  {
    id: 11,
    name: "Chlaes",
    thumbnail_image: "src/images/photos/Iris_product_image.png",
    price: 40,
}
];


const mockContainer = document.querySelector(".mock-container");
const cartContainer = document.querySelector(".cart-container");


//enkel createHTML kanske sedan kan heta createHTMLProducts?------------------------------
export function createHTMLMock(): void {

    //Använda "Non-null assertion operator" för att undvika squigglies? 
    
    mockContainer.innerHTML = "";
    for (let i = 0; i < mock.length; i++) {
      const card = document.createElement("article");
      card.classList.add("card");
      const text = document.createElement("h3");

      const priceText = document.createElement("h4");
    

      const submitBtn = document.createElement("button");
      submitBtn.innerHTML = "Lägg till";
      submitBtn.addEventListener("click", () => {
        createCartProduct(i);
      });
  
      card.appendChild(text);
      card.appendChild(priceText);
      card.appendChild(submitBtn);
      mockContainer.appendChild(card);
  
      text.innerHTML = mock[i].name;
      priceText.innerHTML = String(mock[i].price) + "kr";

    }
  };

  createHTMLMock();

  //CART HTML------------------------------------------------------------------------
export function createHTMLCart() {
    cartContainer.innerHTML = "";


    for (let i = 0; i < cart.length; i++) {
      const card = document.createElement("article");
      card.classList.add("card2");

      //Produktnamn
      const text = document.createElement("h3");
      card.appendChild(text);
      text.innerHTML = cart[i].name;

      //minska-mängd-knapp
      const decreaseBtn = document.createElement("button");
      decreaseBtn.innerHTML = "-"
      decreaseBtn.addEventListener("click", () => {
        decreaseAmount(i);
      });
      card.appendChild(decreaseBtn);

      //öka-mängd-knapp
      const increaseBtn = document.createElement("button");
      increaseBtn.innerHTML = "+"
      increaseBtn.addEventListener("click", () => {
        increaseAmount(i);
      });
      card.appendChild(increaseBtn);

      //mängd och totalpris per produkttyp
      const amountText = document.createElement("h2");
      card.appendChild(amountText);
      amountText.innerHTML = String(cart[i].amount) + " st, " + String((cart[i].price)*(cart[i].amount)) + "kr";

      //ta bort-knapp
      const removeBtn = document.createElement("button");
      removeBtn.innerHTML = "Ta bort";
      removeBtn.addEventListener("click", () => {
        deleteCartProduct(i);
      });
      card.appendChild(removeBtn);
      //Lägg card i container
      cartContainer.appendChild(card);
           
    }
    createHTMLMock();
    //Rubrik 
    calculateAmount();
    
    calculateTotalPrice();

    // dessa har hittats med queryselector längst ner. 
    amountCounter.textContent = `${totalAmount}` + " produkter, ";
    priceCounter.textContent = `${totalPrice}` + " kr";

    
  };

  //LÄGG TILL-knapp-funktion------------------------------
  export function createCartProduct(i: number) {

    const id = mock[i].id;
    const name = mock[i].name;
    const thumbnail_image = mock[i].thumbnail_image;
    const amount = mock[i].amount;
    const price = mock[i].price;
    //------------------------------------------------------------------------------

    //TODO: testa todo-funktionen

    //Om id redan existerar i cart[] ska det inte skapas ett nytt objekt.
    //dvs. loopa genom cart-listan och jämför med mock[i].id,

    let foundObject = null; 
    cart.forEach((product) => {
      if (product.id === id) {
        foundObject = product;
      }
    });

    if (foundObject) {
      foundObject.amount++;
      console.log("Objekt finns redan:", foundObject);
      console.log(foundObject.amount);
      createHTMLCart();
    } else {
      const newCartProduct = new CartProduct(id, name, thumbnail_image, amount, price)

      cart.push(newCartProduct);
      createHTMLCart();
      console.log("Din varukorg: ", cart.length, cart);
    }
  };


  export function deleteCartProduct(i: number) {
    cart.splice(i, 1);
    createHTMLCart();
  }

  export function decreaseAmount(i: number){

    if (cart[i].amount > 1){
      cart[i].amount --;
      console.log(cart);
      createHTMLCart();
    } else {
      deleteCartProduct(i);
    };
  }

  export function increaseAmount(i: number){
    cart[i].amount ++;
    console.log(cart);
    createHTMLCart();
  } 

const amountCounter = document.querySelector(".amountCounter");
const priceCounter = document.querySelector(".priceCounter");
console.log(amountCounter);

let totalAmount = 0;
let totalPrice = 0;

export function calculateAmount() {
  totalAmount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalAmount += cart[i].amount;
  }
};

export function calculateTotalPrice() {
  totalPrice = 0;


  for (let i = 0; i < cart.length; i++) {
    console.log("cart amount: ",cart[i].amount)
    console.log("cart price: ",cart[i].price)


    totalPrice += cart[i].amount * cart[i].price;
    console.log("total price:" ,totalPrice);
  }
};



