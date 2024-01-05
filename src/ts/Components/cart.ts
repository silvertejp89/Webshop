//Jobba på funktionen öka antal.

import "../../scss/main.scss"

export let cart: CartProduct[] = [];

//förenklad klass--------------------------------------------------------------
export class CartProduct {
    id: number;
    name: string;
    thumbnail_image: string;
    amount: number;
  
    constructor(id: number, name: string, thumbnail_image: string, amount: number = 1) {
      this.id = id;
      this.name = name;
      this.thumbnail_image = thumbnail_image;
      this.amount = amount; 
    }
  }

//mock-data-------------------------------------------------------------------------
const mock: {id: number; name: string; thumbnail_image: string }[] = [
    {
        id: 8,
        name: "Noa",
        thumbnail_image: "src/images/photos/Noa_product_image.png",
    },
    {
        id: 9,
        name: "Iris",
        thumbnail_image: "src/images/photos/Iris_product_image.png",
    }
];

//enkel createHTML ------------------------------------------------------------------------
export function createHTMLMock(): void {

    const container = document.querySelector(".container");
    
    container.innerHTML = "";
    for (let i = 0; i < mock.length; i++) {
      const card = document.createElement("article");
      card.classList.add("card");
      const text = document.createElement("h3");

      const submitBtn = document.createElement("button");
      submitBtn.innerHTML = "Lägg till";
      submitBtn.addEventListener("click", () => {
        createCartProduct(i);
      });
  
      card.appendChild(text);
      card.appendChild(submitBtn);
      container.appendChild(card);
  
      text.innerHTML = mock[i].name;
    }
  };

  createHTMLMock();

  //andra createHTML ------------------------------------------------------------------------
export function createHTMLCart() {

    const container = document.querySelector(".container");
    for (let i = 0; i < cart.length; i++) {
      const card = document.createElement("article");
      card.classList.add("card2");
      const text = document.createElement("h3");
  
      card.appendChild(text);
      container.appendChild(card);
      text.innerHTML = cart[i].name;
    }
  };

  //knapp-funktion------------------------------
  export function createCartProduct(i: number) {

    const id = mock[i].id;
    const name = mock[i].name;
    const thumbnail_image = mock[i].thumbnail_image;

    const newCartProduct = new CartProduct(id, name, thumbnail_image)

    cart.push(newCartProduct);
    createHTMLCart();
    console.log("Din varukorg: ", cart);

  };